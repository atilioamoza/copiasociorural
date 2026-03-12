
import React from 'react';
import { ChatSession } from '../types';

interface ChatListViewProps {
  onBack: () => void;
  onOpenChat: (session: ChatSession) => void;
  sessions: ChatSession[];
}

const ChatListView: React.FC<ChatListViewProps> = ({ onBack, onOpenChat, sessions }) => {
  const handleSessionClick = (session: ChatSession) => {
    onOpenChat(session);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 h-[85vh] flex gap-8">
      {/* Sidebar de Chats */}
      <div className="w-full md:w-[400px] flex flex-col bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 border-b border-gray-50 bg-[#4B5320]">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Volver a mi perfil</span>
          </button>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Mis Conversaciones</h2>
          <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Matchmaking Rural Directo</p>
        </div>

        <div className="flex-grow overflow-y-auto">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => handleSessionClick(session)}
              className={`w-full p-8 border-b border-gray-50 text-left transition-all hover:bg-[#f5f2ed] flex items-start gap-4 ${session.unread ? 'bg-[#4B5320]/5' : ''}`}
            >
              <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center font-black text-[#4B5320] text-xl shadow-sm relative shrink-0">
                {session.participantName.charAt(0)}
                {session.unread && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-lg tracking-tight truncate leading-none ${session.unread ? 'font-black text-gray-900' : 'font-bold text-gray-600'}`}>
                    {session.participantName}
                  </h4>
                  <span className="text-[9px] font-black text-gray-400 uppercase shrink-0 ml-2">{session.timestamp}</span>
                </div>
                <p className="text-[10px] text-[#8B4513] font-bold uppercase tracking-widest mb-2 truncate">
                  {session.projectTitle}
                </p>
                <p className={`text-xs truncate ${session.unread ? 'font-bold text-gray-700' : 'text-gray-400'}`}>
                  {session.lastMessage}
                </p>
              </div>
            </button>
          ))}
          {sessions.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-gray-400 italic">No tienes conversaciones activas.</p>
            </div>
          )}
        </div>
      </div>

      {/* Placeholder de Chat (Hidden on Mobile) */}
      <div className="hidden md:flex flex-grow bg-white/50 rounded-[3rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        </div>
        <h3 className="text-2xl font-black text-gray-400 uppercase tracking-tighter">Selecciona un chat</h3>
        <p className="text-gray-400 max-w-xs mt-2 text-sm">Mantén contacto directo con tus socios e inversores para agilizar tus proyectos ganaderos.</p>
      </div>
    </div>
  );
};

export default ChatListView;
