import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TodoForm from './components/TodoForm';
import Footer from './components/Footer';
import { connectWallet, disconnectWallet, getWalletAddress, spawnProcess, messageAR } from './arweave';
import { Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight } from 'lucide-react';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [processId, setProcessId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.arweaveWallet) {
      try {
        const address = await getWalletAddress();
        if (address) {
          setWalletAddress(address);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        setIsConnected(false);
      }
    }
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      const address = await getWalletAddress();
      setWalletAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnectWallet = async () => {
    try {
      await disconnectWallet();
      setWalletAddress(null);
      setIsConnected(false);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const handleSpawnProcess = async () => {
    try {
      const newProcessId = await spawnProcess("MyTodoApp");
      setProcessId(newProcessId);
      alert(`Process spawned with ID: ${newProcessId}`);
    } catch (error) {
      console.error("Error spawning process:", error);
      alert("Failed to spawn process. Check console for details.");
    }
  };

  const handleSendMessage = async (messageData) => {
    if (!processId) {
      alert("No process ID available. Please spawn a process first.");
      return;
    }

    try {
      const messageId = await messageAR({
        process: processId,
        data: messageData,
      });
      alert(`Message sent with ID: ${messageId}`);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Check console for details.");
    }
  };

  const handleAddTodo = async (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);

    // Send todo to Arweave
    if (processId) {
      try {
        await messageAR({
          process: processId,
          data: JSON.stringify({ type: 'ADD_TODO', todo: newTodo }),
        });
      } catch (error) {
        console.error('Error sending todo to Arweave:', error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 text-white">
      {/* <Header /> */}
      
      <main className="container mx-auto p-4 flex-grow">
        <div className="flex justify-center items-center">
          {!isConnected ? (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <div>
              <p>Wallet Address: {walletAddress}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                onClick={handleDisconnectWallet}
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSpawnProcess}
            disabled={processId != null}
          >
            Spawn Process
          </button>
        </div>

        {processId && (
          <div className="mt-4">
            <p>Process ID: {processId}</p>
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleSendMessage('Hello from the App!')}
            >
              Send Test Message
            </button>
          </div>
        )}

        <TodoForm onAddTodo={handleAddTodo} />

        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
