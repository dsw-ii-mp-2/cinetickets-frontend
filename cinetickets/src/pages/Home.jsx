import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Datos de películas reorganizados - PRIMERAS 4: AVATAR, TELÉFONO NEGRO 2, TRON, MASCOTAS AL RESCATE
  const featuredMovies = [
    {
      id: 2,
      title: "AVATAR",
      genre: "Ciencia Ficción, Aventura",
      duration: "2h 52m",
      rating: 4.8,
      image: "/avatar.jpg",
      releaseDate: "16-Oct-2025",
      ageRating: "Para todos los públicos",
      slug: "avatar"
    },
    {
      id: 7,
      title: "TELÉFONO NEGRO 2",
      originalTitle: "BLACK PHONE 2",
      genre: "Suspenso, Terror",
      duration: "1h 56m",
      rating: 4.6,
      image: "/telefononegro2.jpg",
      releaseDate: "16-Oct-2025",
      ageRating: "Mayores de 15 años",
      slug: "telefononegro2"
    },
    {
      id: 5,
      title: "TRON: ARES",
      genre: "Acción, Aventura, Ciencia Ficción",
      duration: "1h 59m",
      rating: 4.2,
      image: "/tron.jpg",
      releaseDate: "09-Oct-2025",
      ageRating: "Mayores de 12 años",
      slug: "tron"
    },
    {
      id: 3,
      title: "MASCOTAS AL RESCATE",
      genre: "Animación, Aventura, Comedia",
      duration: "1h 48m",
      rating: 4.3,
      image: "/mascotasalrescate.jpg",
      releaseDate: "30-Oct-2025",
      ageRating: "Para todos los públicos",
      slug: "mascotasalrescate"
    },
    {
      id: 1,
      title: "200 LOBO",
      genre: "Animación, Aventura",
      duration: "1h 45m",
      rating: 4.5,
      image: "/200lobo.jpg",
      releaseDate: "25-Sept-2025",
      ageRating: "Mayores de 12 años",
      slug: "200lobo"
    },
    {
      id: 4,
      title: "EL CONJURO 4",
      genre: "Terror, Suspenso",
      duration: "1h 52m",
      rating: 4.2,
      image: "/elconjuro4.jpg",
      releaseDate: "13-Nov-2025",
      ageRating: "Mayores de 16 años",
      slug: "elconjuro4"
    },
    {
      id: 6,
      title: "HAMILTON",
      genre: "Musical, Drama, Histórico",
      duration: "2h 40m",
      rating: 4.8,
      image: "/hamilton.jpg",
      releaseDate: "20-Nov-2025",
      ageRating: "Mayores de 12 años",
      slug: "hamilton"
    },
    {
      id: 8,
      title: "NEZHA 2",
      originalTitle: "NEZHA 2",
      genre: "Animación, Aventura, Fantasía",
      duration: "2h 24m",
      rating: 4.1,
      image: "/nezha2.jpg",
      releaseDate: "25-Sept-2025",
      ageRating: "Mayores de 7 años",
      slug: "nezha2"
    },
    {
      id: 9,
      title: "UNA BATALLA TRAS OTRA",
      originalTitle: "ONE BATTLE AFTER ANOTHER",
      genre: "Acción, Crimen, Drama, Suspenso",
      duration: "2h 41m",
      rating: 4.4,
      image: "/unabatallatrasotra.jpg",
      releaseDate: "25-Sept-2025",
      ageRating: "Mayores de 12 años",
      slug: "unabatallatrasotra"
    },
    {
      id: 10,
      title: "UGLY STEPSISTER",
      genre: "Comedia, Drama",
      duration: "1h 52m",
      rating: 4.2,
      image: "/uglystepsister.jpg",
      releaseDate: "13-Nov-2025",
      ageRating: "Mayores de 12 años",
      slug: "uglystepsister"
    },
    {
      id: 11,
      title: "THE LONG GAME",
      originalTitle: "THE LONG GAME",
      genre: "Drama, Deportes",
      duration: "2h 15m",
      rating: 4.3,
      image: "/thelong.jpg",
      releaseDate: "15-Nov-2025",
      ageRating: "Mayores de 12 años",
      slug: "thelonggame"
    },
    {
      id: 12,
      title: "HIM",
      originalTitle: "HIM",
      genre: "Drama, Misterio",
      duration: "1h 58m",
      rating: 4.0,
      image: "/him.jpg",
      releaseDate: "22-Nov-2025",
      ageRating: "Mayores de 16 años",
      slug: "him"
    }
  ];

  const handleMovieClick = (movieSlug) => {
    navigate(`/movie/${movieSlug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a0a0a] to-[#8B0000] relative overflow-hidden">
      {/* Patrón de textura sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(212,175,55,0.1),transparent_50%)] z-0"></div>
      
      {/* Barra de navegación superior */}
      <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl border-b border-[#D4AF37]/30 shadow-2xl relative">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
                  </svg>
                </div>
              </div>
              <h1 
                className="text-3xl font-black text-white tracking-tighter"
                style={{ fontFamily: "'Comic Jungle', cursive" }}
              >
                Cine<span className="text-[#D4AF37]">Tickets</span>
              </h1>
            </div>

            {/* Navegación */}
            <div className="flex space-x-3 items-center">
              <Link
                to="/"
                className="px-6 py-2.5 text-white bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#B8941F] hover:to-[#D4AF37] shadow-md border border-[#D4AF37]/30"
                style={{ fontFamily: "'Comic Jungle', cursive" }}
              >
                Cartelera
              </Link>
              <Link
                to="/profile"
                className="px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 font-semibold hover:scale-105 hover:bg-white/5 rounded-xl backdrop-blur-sm"
                style={{ fontFamily: "'Comic Jungle', cursive" }}
              >
                Mi Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-[#8B0000] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#8B0000] hover:to-red-700 shadow-md border border-red-600/30"
                style={{ fontFamily: "'Comic Jungle', cursive" }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Encabezado */}
        <div className="text-center py-16 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 
              className="text-6xl font-black text-white mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              style={{ 
                fontFamily: "'Hug Me Tight', cursive",
                textShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              BIENVENIDO A CINETICKETS
            </h2>
            <p className="text-xl text-gray-300 mb-12 font-light bg-white/5 backdrop-blur-sm rounded-2xl py-3 px-6 inline-block border border-white/10">
              Descubre las mejores experiencias cinematográficas
            </p>
            
            {/* Sección Películas en Cartelera */}
            <div className="relative inline-block mb-12">
              <h3 
                className="text-4xl font-black text-white"
                style={{ 
                  fontFamily: "'Hug Me Tight', cursive"
                }}
              >
                PELÍCULAS EN CARTELERA
              </h3>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>

        {/* Grid de películas */}
        <div className="container mx-auto px-4 pb-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredMovies.map(movie => (
              <div 
                key={movie.id}
                className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                onClick={() => handleMovieClick(movie.slug)}
              >
                {/* Tarjeta de película */}
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col border border-white/10 bg-gradient-to-b from-[#1E232B] to-[#0f1116] backdrop-blur-sm"
                >
                  {/* Contenedor de imagen */}
                  <div className="relative h-[500px] overflow-hidden bg-black flex-shrink-0">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Poster+No+Disponible';
                      }}
                      style={{ 
                        objectFit: 'cover',
                        objectPosition: 'center top'
                      }}
                    />
                    
                    {/* Overlay gradiente sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300"></div>
                    
                    {/* Rating en círculo dorado */}
                    <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-black/90 rounded-full border-2 border-[#D4AF37] backdrop-blur-sm">
                      <div className="flex items-center justify-center">
                        <span 
                          className="text-white text-base font-bold"
                          style={{ fontFamily: "'Comic Jungle', cursive" }}
                        >
                          {movie.rating}
                        </span>
                      </div>
                    </div>

                    {/* Botón play flotante en hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="bg-white rounded-full p-5 shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-[#D4AF37]">
                          <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Información de la película */}
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Título principal - CON HUG ME TIGHT */}
                    <h4 
                      className="text-white font-bold text-xl mb-3 leading-tight"
                      style={{ 
                        fontFamily: "'Hug Me Tight', cursive"
                      }}
                    >
                      {movie.title}
                    </h4>
                    
                    {/* Título original si existe */}
                    {movie.originalTitle && (
                      <p 
                        className="text-gray-400 text-sm font-medium mb-3 italic"
                        style={{ fontFamily: "'Comic Jungle', cursive" }}
                      >
                        {movie.originalTitle}
                      </p>
                    )}
                    
                    {/* Género */}
                    <div 
                      className="text-gray-300 text-base font-medium mb-4"
                      style={{ fontFamily: "'Comic Jungle', cursive" }}
                    >
                      {movie.genre.split(',')[0].trim()}
                    </div>
                    
                    {/* Información adicional */}
                    <div className="mt-auto space-y-3">
                      <div 
                        className="text-gray-400 text-base font-medium"
                        style={{ fontFamily: "'Comic Jungle', cursive" }}
                      >
                        {movie.releaseDate}
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span 
                          className="text-gray-400 font-medium"
                          style={{ fontFamily: "'Comic Jungle', cursive" }}
                        >
                          {movie.ageRating}
                        </span>
                        <span 
                          className="text-gray-300 font-bold px-3 py-2 rounded bg-gray-700/50"
                          style={{ fontFamily: "'Comic Jungle', cursive" }}
                        >
                          {movie.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efectos decorativos sutiles */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse delay-700"></div>
      </div>
    </div>
  );
}