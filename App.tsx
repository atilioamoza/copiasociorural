
import React, { useState, useMemo, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { AppView, Project, Producer, User } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import ProducerProfileForm from './components/ProducerProfileForm';
import ProducerDashboard from './components/ProducerDashboard';
import ProducerProfileView from './components/ProducerProfileView';
import ProfileEditForm from './components/ProfileEditForm';
import HowItWorks from './components/HowItWorks';
import LoginView from './components/LoginView';
import Muro from './components/Muro';
import VerificationView from './components/VerificationView';
import MatchModal from './components/MatchModal';
import ContactView from './components/ContactView';
import ContactForm from './components/ContactForm';
import ReferenceValues from './components/ReferenceValues';
import Footer from './components/Footer';
import AboutProjectModal from './components/AboutProjectModal';
import TermsModal from './components/TermsModal';
import { MOCK_PROJECTS, MOCK_PRODUCER_FREE } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<AppView>('home');
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [activeProjectContext, setActiveProjectContext] = useState<Project | null>(null);
  const [activeProducerForProfile, setActiveProducerForProfile] = useState<Producer | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [projectToRestoreAfterLogin, setProjectToRestoreAfterLogin] = useState<Project | null>(null);
  
  // Scroll reset on view or modal change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, selectedProject, isAboutModalOpen, isTermsModalOpen]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setView('home');
    
    if (projectToRestoreAfterLogin) {
      setSelectedProject(projectToRestoreAfterLogin);
      setProjectToRestoreAfterLogin(null);
    } else {
      setTimeout(() => {
        document.getElementById('oportunidades')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  const unreadMessagesCount = 0;

  // Filter projects to only show active ones for the general marketplace
  const activeProjects = useMemo(() => {
    return projects.filter(p => p.status === 'active');
  }, [projects]);

  // Filter projects to only show active ones for the general marketplace
  const sortedProjects = useMemo(() => {
    return [...activeProjects].sort((a, b) => {
      if (a.producer.plan === 'premium' && b.producer.plan !== 'premium') return -1;
      if (a.producer.plan !== 'premium' && b.producer.plan === 'premium') return 1;
      return 0;
    });
  }, [activeProjects]);

  const handleContactProducer = (project: Project) => {
    if (!currentUser) {
      setProjectToRestoreAfterLogin(project);
      setSelectedProject(null);
      setView('login');
      return;
    }
    setActiveProjectContext(project);
    setView('chat'); // Repurposing 'chat' view for ContactView
  };

  const handleViewProducerProfile = (producer: Producer, project: Project | null) => {
    if (!currentUser) {
      if (project) setProjectToRestoreAfterLogin(project);
      setSelectedProject(null);
      setView('login');
      return;
    }
    setActiveProducerForProfile(producer);
    if (project) {
      setActiveProjectContext(project);
    }
    setView('producer-profile');
  };

  const handleGoToMyProfile = () => {
    if (!currentUser) {
      setView('login');
      return;
    }
    if (currentUser.producerData) {
      setActiveProducerForProfile(currentUser.producerData);
    }
    setView('producer-profile');
  };

  const handlePublishProject = (newProject: Project) => {
    setProjects(prev => {
      const maxId = prev.reduce((max, p) => {
        const idNum = parseInt(p.id, 10);
        return !isNaN(idNum) && idNum > max ? idNum : max;
      }, 999);
      const projectWithId = { ...newProject, id: (maxId + 1).toString() };
      return [projectWithId, ...prev];
    });
  };

  const handleCloseProject = (projectId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, status: 'closed' } : p
    ));
  };

  const handleUpgradeProducer = () => {
    if (currentUser && currentUser.producerData) {
      const updatedProducer = { ...currentUser.producerData, plan: 'premium' as const };
      const updatedUser = { ...currentUser, producerData: updatedProducer };
      
      setCurrentUser(updatedUser);
      setProjects(prev => prev.map(p => 
        p.producer.name === currentUser.name 
          ? { ...p, producer: updatedProducer } 
          : p
      ));
      if (activeProducerForProfile?.name === currentUser.name) {
        setActiveProducerForProfile(updatedProducer);
      }
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'login':
        return <LoginView onLogin={handleLogin} onCancel={() => setView('home')} />;
      case 'home':
        return (
          <>
            {!currentUser ? (
              <Hero 
                onStartInvest={() => setView('login')} 
                onShowHowItWorks={() => setView('how-it-works')}
              />
            ) : (
              <Muro 
                currentUser={currentUser}
                onCreatePost={() => setView('producer-registration')}
              />
            )}
            {!currentUser && (
              <div className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-[#2d3312] mb-4 tracking-tight leading-tight">El Nuevo Agro Uruguayo es Directo</h2>
                  <p className="text-gray-500 max-w-2xl mx-auto">Invierte en fracciones, o totalidad, de proyectos productivos concretos. Rentabilidad directa.</p>
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="group p-8 rounded-[2.5rem] bg-[#f5f2ed] border border-[#4B5320]/5 hover:border-[#4B5320]/20 transition-all">
                    <div className="w-16 h-16 bg-[#4B5320]/10 rounded-3xl flex items-center justify-center text-[#4B5320] mb-8 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2d3312] mb-4">Multi-Socios</h3>
                    <p className="text-gray-600 font-light leading-relaxed">No necesitas el 100% del capital. Comparte el negocio con otros inversores de la comunidad.</p>
                  </div>
                  <div className="group p-8 rounded-[2.5rem] bg-[#f5f2ed] border border-[#4B5320]/5 hover:border-[#4B5320]/20 transition-all">
                    <div className="w-16 h-16 bg-[#8B4513]/10 rounded-3xl flex items-center justify-center text-[#8B4513] mb-8 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2d3312] mb-4">Plazos Claros</h3>
                    <p className="text-gray-600 font-light leading-relaxed">Ciclos de producción cerrados con fechas de entrada y salida pactadas de antemano.</p>
                  </div>
                  <div className="group p-8 rounded-[2.5rem] bg-[#f5f2ed] border border-[#4B5320]/5 hover:border-[#4B5320]/20 transition-all">
                    <div className="w-16 h-16 bg-D2B48C/20 rounded-3xl flex items-center justify-center text-[#8B4513] mb-8 group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#2d3312] mb-4">Match Verificado</h3>
                    <p className="text-gray-600 font-light leading-relaxed">El inversor elije los proyectos y productores. El productor valida a sus socios. SocioRural facilita los contactos para que acuerden directo el mejor negocio y su forma.</p>
                  </div>
                </div>
              </div>
            )}
            <Dashboard 
              projects={sortedProjects}
              isLoggedIn={!!currentUser}
              currentUserName={currentUser?.name}
              onContactProducer={handleContactProducer} 
              onViewProducerProfile={handleViewProducerProfile}
              onLoginRequired={() => setView('login')}
              onSelectProject={setSelectedProject}
            />
          </>
        );
      case 'muro':
        return (
          <Muro 
            currentUser={currentUser}
            onCreatePost={() => setView('producer-registration')}
          />
        );
      case 'producer-registration':
        if (!currentUser) {
          setView('login');
          return null;
        }
        if (currentUser.verificationLevel < 2) {
          setView('verification');
          return null;
        }
        return <ProducerProfileForm onBack={handleGoToMyProfile} onPublish={handlePublishProject} currentUser={currentUser.producerData || MOCK_PRODUCER_FREE} />;
      case 'producer-dashboard':
        if (!currentUser) {
           setView('login');
           return null;
        }
        return (
          <ProducerDashboard 
            projects={projects}
            onBack={() => setView('producer-profile')} 
            onViewProfile={(producer) => handleViewProducerProfile(producer, null)}
            onCloseProject={handleCloseProject}
            currentUserName={currentUser.name}
          />
        );
      case 'chat':
        if (!currentUser || !activeProjectContext) {
           setView('login');
           return null;
        }
        return (
          <div className="py-12 px-4">
            <ContactView 
              project={activeProjectContext} 
              onBack={() => setView('muro')} 
            />
          </div>
        );
      case 'chat-list':
        setView('muro');
        return null;
      case 'producer-profile':
        if (!activeProducerForProfile || !currentUser) {
           setView('login');
           return null;
        }
        return (
          <ProducerProfileView 
            producer={activeProducerForProfile} 
            projects={activeProjects}
            onBack={() => setView('muro')}
            onMessage={() => {
              if (activeProjectContext) {
                setView('chat');
              } else {
                setView('muro');
              }
            }}
            isOwnProfile={activeProducerForProfile.name === currentUser.name}
            onEdit={() => setView('profile-edit')}
            onViewProjects={() => setView('producer-dashboard')}
            onCreateProject={() => setView('producer-registration')}
            onLoginRequired={() => setView('login')}
            onSelectProject={setSelectedProject}
          />
        );
      case 'profile-edit':
        if (!activeProducerForProfile || !currentUser) {
           setView('login');
           return null;
        }
        return (
          <ProfileEditForm 
            producer={activeProducerForProfile}
            onBack={() => setView('producer-profile')}
            onSave={(updatedProducer) => {
               setActiveProducerForProfile(updatedProducer);
               if (currentUser) {
                 setCurrentUser({ ...currentUser, producerData: updatedProducer, name: updatedProducer.name });
               }
               setView('producer-profile');
            }}
          />
        );
      case 'verification':
        if (!currentUser) {
          setView('login');
          return null;
        }
        return (
          <VerificationView 
            user={currentUser}
            onUpdateUser={setCurrentUser}
            onBack={() => setView('muro')}
          />
        );
      case 'how-it-works':
        return <HowItWorks onBack={() => setView('home')} />;
      case 'contact':
        return <ContactForm onBackToMuro={() => setView('home')} />;
      case 'reference-values':
        return <ReferenceValues onBack={() => setView('home')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        currentView={view} 
        setView={setView} 
        onGoToMyProfile={handleGoToMyProfile} 
        onLogout={handleLogout} 
        isLoggedIn={!!currentUser}
        userName={currentUser?.name}
        unreadCount={unreadMessagesCount}
      />
      <main>
        {renderContent()}
      </main>

      <Footer 
        setView={setView} 
        onOpenAbout={() => setIsAboutModalOpen(true)} 
        onOpenTerms={() => setIsTermsModalOpen(true)}
      />
      
      <AboutProjectModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />

      <TermsModal 
        isOpen={isTermsModalOpen} 
        onClose={() => setIsTermsModalOpen(false)} 
      />
      
      <MatchModal 
        project={selectedProject} 
        isLoggedIn={!!currentUser}
        isOwnProject={selectedProject?.producer.name === currentUser?.name}
        onClose={() => setSelectedProject(null)} 
        onLoginRequired={() => {
          setProjectToRestoreAfterLogin(selectedProject);
          setSelectedProject(null);
          setView('login');
        }} 
        onContactProducer={(p) => {
          setSelectedProject(null);
          handleContactProducer(p);
        }}
        onViewProducerProfile={(prod, proj) => handleViewProducerProfile(prod, proj)}
      />
    </div>
  );
};

export default App;
