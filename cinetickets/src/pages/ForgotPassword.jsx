import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de proceso de recuperación
    setTimeout(() => {
      setIsLoading(false);
      setMessage('¡Se ha enviado un enlace de recuperación a tu correo!');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-[#1a0a0a] to-[#8B0000] relative overflow-hidden">
      {/* Patrón de textura sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(212,175,55,0.1),transparent_50%)] z-0"></div>
      
      {/* Efectos decorativos mejorados */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Columna izquierda - Imagen con overlay modernizado */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/bebida y palomitas.jpg")' }}
        />
        {/* Overlay gradiente moderno */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"></div>
        
        {/* Texto decorativo sobre la imagen */}
        <div className="absolute bottom-10 left-10 right-10 z-10">
          <h1 className="text-6xl font-black text-white mb-4 tracking-wider bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" style={{ fontFamily: "'Bebas Neue', cursive" }}>
            Cine<span className="text-[#D4AF37]">Tickets</span>
          </h1>
          <p className="text-2xl text-white opacity-90 font-medium bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block border border-white/20">
            🎬 Tu entrada al mejor cine 🍿
          </p>
        </div>

        {/* Efectos decorativos en la imagen */}
        <div className="absolute top-10 left-10">
          <div className="w-4 h-4 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full shadow-lg animate-pulse"></div>
        </div>
        <div className="absolute top-20 right-10">
          <div className="w-3 h-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full shadow-lg animate-pulse delay-300"></div>
        </div>
      </div>

      {/* Columna derecha - Formulario de recuperación */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative z-10">
        <div 
          className="p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:shadow-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#1E232B] to-[#0f1116] backdrop-blur-sm"
        >
          {/* Header del formulario */}
          <div className="text-center mb-10 transform transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full animate-pulse shadow-lg"></div>
              </div>
            </div>
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              Recuperar Contraseña
            </h2>
            <p className="text-lg font-medium text-gray-300 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-white/10">
              🔑 Te enviaremos un enlace de recuperación
            </p>
          </div>

          {/* Mensaje de éxito */}
          {message && (
            <div className="mb-8 p-6 rounded-2xl text-white text-center font-bold transition-all duration-300 transform bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">✅</span>
                <span>{message}</span>
              </div>
            </div>
          )}

          <form className="space-y-7" onSubmit={handleSubmit}>
            {/* Campo Email */}
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-bold mb-3 text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">📧</span>
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 transition-all duration-300 group-focus-within:text-[#D4AF37] group-focus-within:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-6 py-5 rounded-2xl text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-30 border-2 border-transparent focus:border-[#D4AF37] bg-white/5 backdrop-blur-sm placeholder-gray-400"
                  placeholder="ejemplo@correo.com"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium bg-white/5 backdrop-blur-sm rounded-xl px-3 py-2 inline-block border border-white/10">
                📝 Ingresa el correo asociado a tu cuenta
              </p>
            </div>

            {/* Botón Principal */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-black py-5 rounded-2xl font-black text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-2xl relative overflow-hidden group border-2 border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37]"
            >
              {/* Efecto de brillo al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
              
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin mr-3"></div>
                  <span className="font-bold">Enviando...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  ✉️ Enviar Enlace de Recuperación
                </span>
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-gray-400 bg-gradient-to-b from-[#1E232B] to-[#0f1116] font-medium">
                ¿Recordaste tu contraseña?
              </span>
            </div>
          </div>

          {/* Volver al Login */}
          <div className="text-center transform transition-all duration-300 hover:scale-105">
            <Link 
              to="/login"
              className="inline-flex items-center justify-center w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-[#D4AF37] text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] bg-transparent group"
            >
              <span className="flex items-center gap-2">
                🔐 Volver al inicio de sesión
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center transform transition-all duration-300 hover:scale-105">
            <p className="text-xs font-medium text-gray-400 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              Al continuar, aceptas nuestros{" "}
              <a 
                href="#" 
                className="transition-all duration-300 hover:text-white font-bold text-gray-300 hover:underline"
              >
                Términos y Condiciones
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}