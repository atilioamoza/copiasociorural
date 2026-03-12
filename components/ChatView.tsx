
import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'investor' | 'producer';
  timestamp: Date;
}

interface ChatViewProps {
  project: Project;
  onBack: () => void;
  onViewProfile?: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ project, onBack, onViewProfile }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hola ${project.producer.name}, estoy interesado en participar en tu proyecto "${project.title}". ¿Podríamos coordinar para revisar las garantías?`,
      sender: 'investor',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'investor',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Simular respuesta del productor usando Gemini
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Actúa como el productor rural ${project.producer.name} (DICOSE: ${project.producer.dicose}) en Uruguay. 
      Estás negociando con un inversor interesado en tu proyecto de ${project.category} llamado "${project.title}".
      El inversor acaba de decir: "${inputText}". 
      Responde de forma profesional, amable y campestre (estilo uruguayo). 
      Menciona brevemente algo sobre el negocio o las garantías si es pertinente. 
      Máximo 60 palabras.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      const producerReply: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text || "Gracias por tu mensaje, me pondré en contacto pronto.",
        sender: 'producer',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages(prev => [...prev, producerReply]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error al generar respuesta:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-300">
      {/* Header del Chat */}
      <div className="bg-[#4B5320] p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-xl cursor-pointer hover:bg-white/30 transition-all shadow-inner"
              onClick={onViewProfile}
              title="Ver perfil"
            >
              {project.producer.name.charAt(0)}
            </div>
            <div className="cursor-pointer group flex flex-col" onClick={onViewProfile}>
              <h3 className="font-bold text-lg leading-none group-hover:text-white/80 transition-colors flex items-center gap-2">
                {project.producer.name}
                <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </h3>
              <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1 font-black group-hover:text-white/80 transition-colors">DICOSE: {project.producer.dicose}</p>
            </div>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Proyecto Activo</p>
          <p className="text-xs font-bold">{project.title}</p>
        </div>
      </div>

      {/* Cuerpo del Chat */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-8 space-y-6 bg-[#f5f2ed]/50"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.sender === 'investor' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
              msg.sender === 'investor' 
                ? 'bg-[#4B5320] text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.text}
              <p className={`text-[9px] mt-2 font-bold uppercase opacity-40 ${msg.sender === 'investor' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl flex gap-1 items-center shadow-sm">
              <div className="w-1.5 h-1.5 bg-[#4B5320]/30 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-[#4B5320]/30 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-[#4B5320]/30 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input de Mensaje */}
      <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-100 flex gap-4 items-center">
        <input 
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu consulta al productor..."
          className="flex-grow bg-gray-50 border-0 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#4B5320] outline-none transition-all placeholder:text-gray-300"
        />
        <button 
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="bg-[#4B5320] text-white p-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </form>
    </div>
  );
};

export default ChatView;
