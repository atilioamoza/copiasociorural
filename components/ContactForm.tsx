
import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ContactFormProps {
  onBackToMuro: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onBackToMuro }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to a backend
    console.log('Contact form submitted:', { email, phone, message });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#4B5320]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-[#4B5320] mb-4 uppercase tracking-tight">¡Gracias por contactarte!</h2>
          <p className="text-gray-500 font-medium mb-8">Hemos recibido tu mensaje. Nos pondremos en contacto contigo a la brevedad.</p>
          <button
            onClick={onBackToMuro}
            className="w-full py-4 bg-[#4B5320] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
          >
            Volver a Cartelera
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 md:px-8 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-[#4B5320] tracking-tight uppercase mb-2">Contacto</h1>
          <p className="text-gray-500 font-medium">Envíanos un mensaje directo y te responderemos pronto.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Correo Electrónico *</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#4B5320]/20 focus:border-[#4B5320] outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Teléfono (Opcional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="099 123 456"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#4B5320]/20 focus:border-[#4B5320] outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Mensaje *</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#4B5320]/20 focus:border-[#4B5320] outline-none transition-all font-medium resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-5 bg-[#4B5320] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform active:scale-95"
              >
                Enviar Mensaje
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={onBackToMuro}
            className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#4B5320] transition-colors"
          >
            Cancelar y volver
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
