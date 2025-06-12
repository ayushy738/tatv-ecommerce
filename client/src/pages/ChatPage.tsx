
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const ChatPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container py-8">
        <div className="max-w-2xl mx-auto h-[70vh] border rounded-lg overflow-hidden shadow-lg">
          <ChatBot />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
