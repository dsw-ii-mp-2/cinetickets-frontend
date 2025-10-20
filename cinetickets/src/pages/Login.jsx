import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    recordarme: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://cinetickets-backend-glcg.onrender.com/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso
        console.log('Login exitoso:', data);
        
        // Guardar el token en localStorage o sessionStorage
        if (data.token) {
          if (formData.recordarme) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));
          }
        }
        
        // Redirigir al home
        navigate("/home");
      } else {
        // Error del servidor
        setError(data.detail || data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      // Error de red
      console.error('Error de conexión:', error);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
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

      {/* Columna derecha - Formulario de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 relative z-10">
        <div 
          className="p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 hover:shadow-2xl border border-[#D4AF37]/30 bg-gradient-to-b from-[#1E232B] to-[#0f1116] backdrop-blur-sm"
        >
          {/* Header del formulario con animación */}
          <div className="text-center mb-10 transform transition-transform duration-300 hover:scale-105">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full animate-pulse shadow-lg"></div>
              </div>
            </div>
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" style={{ fontFamily: "'Bebas Neue', cursive" }}>
              Iniciar Sesión
            </h2>
            <p className="text-lg font-medium text-gray-300 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 inline-block border border-white/10">
              🎭 Bienvenido de vuelta
            </p>
          </div>

          {/* Mostrar mensaje de error si existe */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/20 border border-red-500/50 text-red-200 text-center">
              {error}
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-6 py-5 rounded-2xl text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-30 border-2 border-transparent focus:border-[#D4AF37] bg-white/5 backdrop-blur-sm placeholder-gray-400"
                  placeholder="ejemplo@correo.com"
                  required
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-bold mb-3 text-white flex items-center gap-2">
                <span className="text-[#D4AF37]">🔒</span>
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 transition-all duration-300 group-focus-within:text-[#D4AF37] group-focus-within:scale-110">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-6 py-5 rounded-2xl text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-30 border-2 border-transparent focus:border-[#D4AF37] bg-white/5 backdrop-blur-sm placeholder-gray-400"
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Recordarme y Olvidé contraseña */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white cursor-pointer transition-all duration-300 hover:text-gray-200 group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    name="recordarme"
                    checked={formData.recordarme}
                    onChange={handleChange}
                    className="w-5 h-5 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-gray-800 appearance-none border-2 border-gray-600 checked:border-[#D4AF37] checked:bg-[#D4AF37]"
                  />
                  {formData.recordarme && (
                    <div className="absolute inset-0 flex items-center justify-center text-black text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
                <span className="ml-3 font-bold group-hover:scale-105 transition-transform duration-300">
                  Recordarme
                </span>
              </label>
              
              {/* CAMBIADO: Ahora es un Link a ForgotPassword */}
              <Link 
                to="/forgot-password" 
                className="font-bold transition-all duration-300 hover:underline text-[#D4AF37] hover:text-[#B8941F] hover:scale-105"
              >
                ¿Olvidaste tu contraseña?
              </Link>
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
                  <span className="font-bold">Iniciando sesión...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🎬 Iniciar Sesión
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
                ¿No tienes cuenta?
              </span>
            </div>
          </div>

          {/* CAMBIADO: Ahora es un Link a Signup */}
          <div className="text-center transform transition-all duration-300 hover:scale-105">
            <Link 
              to="/signup" 
              className="inline-flex items-center justify-center w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-[#D4AF37] text-[#D4AF37] hover:text-white hover:bg-[#D4AF37] bg-transparent group"
            >
              <span className="flex items-center gap-2">
                ✨ Crear Cuenta
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}