
import React, { useState } from 'react';
import { AppView } from '../types';
import { Home } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onGoToMyProfile: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  userName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, onGoToMyProfile, onLogout, isLoggedIn, userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (view: AppView) => {
    setView(view);
    setIsMenuOpen(false);
    if (view === 'home') {
      setTimeout(() => {
        document.getElementById('oportunidades')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleGoToProfile = () => {
    onGoToMyProfile();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#f5f2ed]/80 backdrop-blur-xl border-b border-[#4B5320]/10 px-4 md:px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div 
          className="flex items-center cursor-pointer group h-[80px] w-[260px]" 
          onClick={() => {
            handleNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img src="https://i.ibb.co/Y7Y7FNHf/logosociorural.png" alt="SocioRural Logo" className="h-full w-full object-contain" />
        </div>

        {/* Right Section Actions */}
        <div className="flex items-center gap-2 md:gap-6">
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <div className="flex bg-[#4B5320]/5 p-1 rounded-full border border-[#4B5320]/10 mr-4">
              <button 
                onClick={() => handleNavigate('home')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${currentView === 'home' || currentView === 'muro' ? 'bg-[#4B5320] text-white shadow-md' : 'text-[#4B5320]/60 hover:text-[#4B5320]'}`}
              >
                <Home className="w-3 h-3" />
                Cartelera
              </button>
              {isLoggedIn && (
                <button 
                  onClick={handleGoToProfile}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${currentView === 'producer-profile' || currentView === 'producer-dashboard' ? 'bg-[#4B5320] text-white shadow-md' : 'text-[#4B5320]/60 hover:text-[#4B5320]'}`}
                >
                  Mi Perfil
                </button>
              )}
            </div>

            <div className="flex gap-4 items-center font-bold text-[#4B5320] text-xs uppercase tracking-widest border-l border-[#4B5320]/10 pl-6">
              {!isLoggedIn ? (
                <button 
                  onClick={() => handleNavigate('login')}
                  className="bg-[#4B5320] text-white px-7 py-2.5 rounded-full hover:bg-[#3a4119] transition-all shadow-xl hover:shadow-none transform hover:translate-y-0.5"
                >
                  Iniciar Sesión
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 font-medium lowercase hidden lg:block">@{userName?.toLowerCase().replace(/\s+/g, '')}</span>
                  <button 
                    onClick={onLogout}
                    className="px-4 py-2 border border-red-200 text-red-400 rounded-xl hover:bg-red-50 transition-all text-[10px] font-black uppercase tracking-widest"
                  >
                    Salir
                  </button>
                  <button 
                    onClick={() => handleNavigate('producer-registration')}
                    className="bg-[#4B5320] text-white px-6 py-2.5 rounded-full hover:bg-[#3a4119] transition-all shadow-xl hover:shadow-none transform hover:translate-y-0.5 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                    </svg>
                    Publicar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button Trigger */}
          <button className="md:hidden text-[#4B5320] p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#f5f2ed] border-b border-[#4B5320]/10 p-8 flex flex-col gap-6 text-center animate-in slide-in-from-top duration-300 shadow-2xl">
          <button onClick={() => handleNavigate('home')} className="text-lg font-black text-[#4B5320] uppercase tracking-widest flex items-center justify-center gap-3">
            <Home className="w-5 h-5" />
            Cartelera Rural
          </button>
          {isLoggedIn && (
            <button onClick={handleGoToProfile} className="text-lg font-black text-[#4B5320] uppercase tracking-widest">Mi Perfil</button>
          )}
          
          {!isLoggedIn ? (
             <button onClick={() => handleNavigate('login')} className="bg-[#4B5320] text-white py-4 rounded-2xl text-lg font-black uppercase tracking-widest">Iniciar Sesión</button>
          ) : (
             <>
               <button onClick={() => handleNavigate('producer-registration')} className="bg-[#4B5320] text-white py-4 rounded-2xl text-lg font-black uppercase tracking-widest flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                  </svg>
                  Publicar
               </button>
               <button onClick={onLogout} className="text-lg font-black text-red-400 uppercase tracking-widest">Cerrar Sesión</button>
             </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
