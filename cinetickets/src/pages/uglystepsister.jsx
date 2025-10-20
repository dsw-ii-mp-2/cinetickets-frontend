import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NombreDeLaPelicula() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1E232B] text-white">
      {/* Barra de navegación */}
      <nav className="sticky top-0 z-50 bg-[#1E232B] border-b-2 border-[#E50914] shadow-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">
                Cine<span className="text-[#E50914]">Tickets</span>
              </h1>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="px-4 py-2 bg-[#E50914] text-white rounded-lg font-semibold"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </nav>

      {/* Contenido de la película */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8">NOMBRE DE LA PELÍCULA</h1>
        
        <div className="max-w-4xl mx-auto">
          <video 
            controls 
            autoPlay 
            className="w-full rounded-lg shadow-2xl"
          >
            <source src="/Videos/nombre-del-trailer.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>

        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-gray-300 text-lg">
            Próximamente más información sobre esta película...
          </p>
        </div>
      </div>
    </div>
  );
}