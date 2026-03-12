
import React from 'react';
import { User } from '../types';

interface MuroProps {
  currentUser: User | null;
  onCreatePost: () => void;
}

const Muro: React.FC<MuroProps> = ({ 
  currentUser, 
  onCreatePost
}) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Header / Action Bar */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 id="oportunidades-muro" className="text-4xl font-black text-[#4B5320] tracking-tight uppercase">Cartelera Rural</h1>
          <p className="text-gray-500 font-medium">Noticias y Oportunidades del Agro Uruguayo</p>
        </div>
        
        {currentUser && (
          <button 
            onClick={onCreatePost}
            className="w-14 h-14 bg-[#4B5320] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group relative"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
            </svg>
            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#4B5320] text-white text-[10px] font-black py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">Publicar</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Muro;
