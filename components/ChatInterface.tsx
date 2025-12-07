import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Cpu, AlertTriangle, X } from 'lucide-react';
import { ChatMessage } from '../types';
import { streamGeminiResponse } from '../services/geminiService';
import { GenerateContentResponse } from '@google/genai';

interface ChatInterfaceProps {
  onClose?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "Connection established. mfourlabs Lab Interface active. I am the Architect. Are you here to consume, or to build?",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const stream = await streamGeminiResponse(history, userMsg.text);

      const responseId = (Date.now() + 1).toString();

      // Initial placeholder
      setMessages(prev => [...prev, {
        id: responseId,
        role: 'model',
        text: '',
        timestamp: Date.now(),
        isThinking: true
      }]);

      let fullText = '';

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullText += c.text;
          setMessages(prev => prev.map(msg =>
            msg.id === responseId
              ? { ...msg, text: fullText, isThinking: false }
              : msg
          ));
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "ERR: Connection instability. The architecture rejected the request. Please verify your API Key.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-brand-black border-l border-brand-white/10 font-mono text-sm relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-brand-white/10 bg-brand-dark/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></div>
            <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-brand-yellow animate-ping opacity-20"></div>
          </div>
          <span className="text-brand-white font-bold tracking-wider">ARCHITECT_V1.0</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-brand-sub hover:text-brand-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-brand-gray border border-brand-white/10' : ''} p-4 rounded-lg`}>
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 text-brand-yellow/80 text-xs uppercase tracking-widest">
                  <Terminal className="w-3 h-3" />
                  <span>mfourlabs</span>
                </div>
              )}
              <div className={`leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-brand-white' : 'text-gray-300'}`}>
                {msg.text}
                {msg.isThinking && <span className="inline-block w-2 h-4 ml-1 bg-brand-yellow animate-pulse align-middle"></span>}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-brand-black border-t border-brand-white/10">
        <div className="relative flex items-center gap-2 group">
          <Cpu className={`w-5 h-5 ${isLoading ? 'text-brand-yellow animate-spin' : 'text-brand-sub'}`} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the Architect..."
            className="w-full bg-transparent border-none focus:ring-0 text-brand-white placeholder-brand-sub/50 font-mono py-3 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 text-brand-yellow hover:bg-brand-yellow/10 rounded transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        {/* Warning/Disclaimer */}
        <div className="mt-2 flex items-center gap-2 text-[10px] text-brand-sub/60">
          <AlertTriangle className="w-3 h-3" />
          <span>AI responses generated by Gemini 2.5. Verify critical architectural decisions.</span>
        </div>
      </form>
    </div>
  );
};
