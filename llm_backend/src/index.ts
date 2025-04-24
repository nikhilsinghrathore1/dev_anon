import express from "express";
import cors from 'cors';
import { Request, Response } from "express";
import { GenAiCode, sanitizeAndParseJSON } from "./aiModels/Model";
import fs from "fs";
import path from "path";
import FilesData from "./FilesData";

const AoPrompt = `
Generate a Vite project with a structured, component-based architecture using .js extensions where needed, ensuring App.jsx is placed inside the /src folder. Use Tailwind CSS for styling, lucide-react icons (Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight), react-chartjs-2 for dynamic charts, and date-fns for date formatting. Always include an Arweave "Connect Wallet" button that works, shows wallet address once connected, and displays the full process ID. Integrate the following Arweave functions: connectWallet, disconnectWallet, getWalletAddress, spawnProcess (only spawn once), and messageAR (for future messaging). All interactions (e.g., chat, payments, sending data) must be handled via messageAR using the spawned process.

Use modern, responsive UI/UX principles: center-aligned layout, vibrant full-height gradient background that reacts to user interactions, rounded corners, smooth transitions, and immersive, futuristic aesthetics. Placeholder images should use: https://archive.org/download/placeholder-image/placeholder-image.jpg.

Ensure all React components are correctly exported and imported to avoid "Element type is invalid" errors. Use strict type checking, simulate the render process to catch issues, and maintain accurate imports/exports.

Return the output in JSON format using the schema below. The App.jsx file should reside in the src folder and must be included in the response:

{
  "files": {
    "/src/App.jsx": {
      "code": ""
    },
    "/src/components/Header.jsx": {
      "code": ""
    },
    ...
  },
 
}
  

Include the following Arweave logic exactly as given below and wire it into the project:

// Arweave Documentation
const AOModule = "Do_Uc2Sju_ffp6Ev0AnLVdPtot15rvMjP-a9VVaA5fM";
const AOScheduler = "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA";
const CommonTags = [
  { name: "Name", value: "Anon" },
  { name: "Version", value: "0.2.1" },
];

import {
  spawn,
  message,
  createDataItemSigner
} from "@permaweb/aoconnect";

export async function connectWallet() {
  try {
    if (!window.arweaveWallet) {
      alert('No Arconnect detected');
      return;
    }
    await window.arweaveWallet.connect(
      ['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_TOKENS'],
      {
        name: 'Anon',
        logo: 'https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk',
      },
      {
        host: 'g8way.io',
        port: 443,
        protocol: 'https',
      }
    );
  } catch (error) {
    console.error(error);
  } finally {
    console.log('connection finished execution');
  }
}

export async function disconnectWallet() {
  return await window.arweaveWallet.disconnect();
}

export async function getWalletAddress() {
  const walletAddress = await window.arweaveWallet.getActiveAddress();
  console.log(walletAddress);
  return walletAddress;
}

export const spawnProcess = async (name, tags = []) => {
  try {
    const allTags = [...CommonTags, ...tags];
    if (name) {
      allTags.push({ name: "Name", value: name });
    }

    console.log(allTags);
    
    const signi = await getWalletAddress();
    console.log(signi);

    const processId = await spawn({
      module: AOModule,
      scheduler: AOScheduler,
      signer: createDataItemSigner(window.arweaveWallet),
      tags: allTags
    });

    console.log(processId);
    return processId;
  } catch (error) {
    console.error("Error spawning process:", error);
    throw error;
  }
}

export const messageAR = async ({ tags = [], data, anchor = '', process }) => {
  try {
    if (!process) throw new Error("Process ID is required.");
    if (!data) throw new Error("Data is required.");

    const allTags = [...CommonTags, ...tags];
    const messageId = await message({
      data,
      anchor,
      process,
      tags: allTags,
      signer: createDataItemSigner(globalThis.arweaveWallet)
    });

    return messageId;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}

Only spawn the process once when the user clicks the "Spawn Process" button and save the process ID in state. All major user interactions within the app should be handled via messages tied to that process ID.

    `;

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Helper to recursively delete contents of a directory
function deleteFolderContents(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);

      // Skip node_modules directory
      if (fs.lstatSync(curPath).isDirectory() && file === 'node_modules') {
        return;
      }

      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursively delete subdirectory
        fs.rmSync(curPath, { recursive: true, force: true });
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
  }
}


app.post("/generate", async (req: Request, res: Response) => {
  const { prompt } = req.body;
  console.log(prompt);

  try {
    const result = await GenAiCode.sendMessage(prompt + AoPrompt);
    const resp = sanitizeAndParseJSON(result.response.text());
    console.log("this is the native llm response",resp)
    const files = resp.files;
    const mergedFiles = {
      ...FilesData.DEFAULT_FILE,
      ...files,
    };
    const projectDir = "/app/app/anon_files";

    // Delete existing files/folders
    deleteFolderContents(projectDir);
    
    // Ensure the base directory still exists
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    // Create new files
    for (const filePath in mergedFiles) {
      const absoluteFilePath = path.join(projectDir, filePath);
      const dir = path.dirname(absoluteFilePath);

      // Create subdirectories as needed
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write file content
      fs.writeFileSync(absoluteFilePath, mergedFiles[filePath].code, "utf-8");
    }

    res
      .status(200)
      .json({ message: "Files created successfully in anon_files", ...resp });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: err });
  }
});
app.listen(3000, () => {
  console.log("server started at port 4000");
});
