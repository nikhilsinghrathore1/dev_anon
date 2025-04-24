"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AoPrompt = void 0;
exports.AoPrompt = `
Generate a React project make sure that you don't any external dependancy always add the arweave connect wallet button that works and always write msg spawners according to the projects
with a structured, component-based architecture, organizing files into separate folders with .js extensions if needed. Use Tailwind CSS for styling,, and lucide-react icons where necessary (Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight).  Utilize react-chartjs-2 for dynamic charts and date-fns for date formatting. structured layouts smooth transitions, and responsive optimization for both mobile and desktop. 

Return the response in JSON format with the following schema:

json
Copy code
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}
Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field and the app.js file should not be inside src folder, following this example:
files:{
    // Arweave Documentation
    const AOModule = "Do_Uc2Sju_ffp6Ev0AnLVdPtot15rvMjP-a9VVaA5fM"; // aos 2.0.1
    const AOScheduler = "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA";
    const CommonTags = [
      { name: "Name", value: "Anon" },
      { name: "Version", value: "0.2.1" },
    ];

    import {
      spawn,
      message,
      createDataItemSigner,
      createSigner
    } from "@permaweb/aoconnect"
    import axios from 'axios';

  

    // connect wallet
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
    };

    // disconnect wallet
    export async function disconnectWallet() {
      return await window.arweaveWallet.disconnect();
    };

    // get wallet details
    export async function getWalletAddress() {
      const walletAddress = await window.arweaveWallet.getActiveAddress();
      console.log(walletAddress)
      return walletAddress ;
    };


    // spawn process [ don't change anything in the function use it as it is *important]

    export const spawnProcess = async (name, tags = []) => {
      try {
        const allTags = [...CommonTags, ...tags];
        if (name) {
          allTags.push({ name: "Name", value: name });
        }

        console.log(allTags)
        
        const signi = await getWalletAddress(); 
        console.log(signi)
        const processId = await spawn({
          module: AOModule,
          scheduler: AOScheduler,
          signer: createDataItemSigner(window.arweaveWallet),
          tags: allTags
        });
        console.log(processId)

        return processId;
      } catch (error) {
        console.error("Error spawning process:", error);
        throw error;
      }
    };

    // send message to process
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
    };

   
    Make sure to add logic as well in the handlers that you will create.
    always make sure to add a connect wallet button and once the wallet is connected show the wallet address and display full process id
    Ensure all React components are correctly exported and imported to prevent Element type is invalid errors by maintaining consistent export types (default or named), verifying accurate import paths, using the correct .jsx file extensions, and ensuring all dependencies are installed. Implement strict type checking to catch undefined components early, and simulate the render process before finalizing to detect import/export issues in advance."

Design a modern and visually stunning UI with a uniform color scheme and an interactive background featuring a full-height gradient that enhances depth and vibrancy. The background should respond to user interactions. Ensure all elements are center-aligned for a balanced and immersive layout. The UI should feel dynamic yet elegant, with smooth transitions, rounded corners, and a well-structured composition. Prioritize usability while delivering a futuristic and visually engaging experience.
    - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg

    You don't have to directly create an app, you have to integrate these functions in the app that you would create, For example when you build a project, it would be a process that will be spawned only once only when user click on spawn process button. Then all the major interactions(like chatting, payments, send messages and others) under that webdapp will be handled by through messages/transactionsp.
    `;
