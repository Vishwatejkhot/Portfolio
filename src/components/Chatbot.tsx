import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";
import Groq from "groq-sdk";
import data from "../data.json";


const getAI = () => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ API key missing. Please add VITE_GROQ_API_KEY in your .env file."
    );
  }

  return new Groq({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm Vishwatej's AI assistant. Ask me anything about his experience, projects, or skills!"
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    setInput("");

    setMessages(prev => [
      ...prev,
      { role: "user", content: userMessage }
    ]);

    setIsLoading(true);

    try {
      const ai = getAI();

      const prompt = `
You are an AI assistant for Vishwatej Khot's portfolio.

Use the resume data below to answer questions accurately.

Resume Data:
${JSON.stringify(data)}

User Question:
${userMessage}
`;

      const completion = await ai.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful, professional AI assistant for Vishwatej Khot. Answer using only the provided resume data. Keep answers concise."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.4
      });

      const aiResponse =
        completion.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a response.";

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: aiResponse }
      ]);
    } catch (error: any) {
      console.error("AI Error:", error);

      let errorMessage =
        "Sorry, I'm having trouble connecting to the AI right now.";

      if (!import.meta.env.VITE_GROQ_API_KEY) {
        errorMessage =
          "API key missing. Please add VITE_GROQ_API_KEY in your .env file.";
      }

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 text-black shadow-2xl shadow-emerald-500/20 flex items-center justify-center"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}

            <div className="p-4 border-b border-white/10 bg-emerald-500/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>

                <div>
                  <div className="text-sm font-bold text-white">
                    VK Assistant
                  </div>

                  <div className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">
                    Online
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: msg.role === "user" ? 10 : -10
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                      ? "bg-emerald-500 text-black font-medium rounded-tr-none"
                      : "bg-white/5 text-zinc-300 border border-white/5 rounded-tl-none"
                      }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}

            <div className="p-4 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e =>
                    e.key === "Enter" && handleSend()
                  }
                  placeholder="Ask about Vishwatej..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-500 disabled:text-zinc-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2 text-[10px] text-zinc-600 text-center font-mono uppercase tracking-widest">
                Powered by Groq AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
