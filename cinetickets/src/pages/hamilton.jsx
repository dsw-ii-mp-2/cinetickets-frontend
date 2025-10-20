import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Componente de navegación modernizado igual al Home
const NavigationBar = ({ onLogout }) => {
  return (
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
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Cine<span className="text-[#D4AF37]">Tickets</span>
            </h1>
          </div>

          {/* Navegación */}
          <div className="flex space-x-3 items-center">
            <Link
              to="/home"
              className="px-6 py-2.5 text-white bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#B8941F] hover:to-[#D4AF37] shadow-md border border-[#D4AF37]/30"
            >
              Cartelera
            </Link>
            <Link
              to="/profile"
              className="px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 font-semibold hover:scale-105 hover:bg-white/5 rounded-xl backdrop-blur-sm"
            >
              Mi Perfil
            </Link>
            <button
              onClick={onLogout}
              className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-[#8B0000] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#8B0000] hover:to-red-700 shadow-md border border-red-600/30"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Componente Modal para selección de asientos - MODERNIZADO
const SeatSelectionModal = ({ isOpen, onClose, movie, selectedTime, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Configuración de la sala de cine
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;
  const pricePerSeat = 14000;
  
  // Asientos ocupados (simulados)
  const occupiedSeats = ['A3', 'A4', 'B5', 'C2', 'D7', 'E1', 'E2', 'F8'];

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const handleConfirmSelection = () => {
    if (selectedSeats.length === 0) {
      alert('Por favor selecciona al menos un asiento');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }
    onConfirm(selectedSeats, paymentMethod);
  };

  const totalAmount = selectedSeats.length * pricePerSeat;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl border border-[#D4AF37]/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header del modal */}
        <div className="p-6 border-b border-[#D4AF37]/20 bg-gradient-to-r from-black/50 to-transparent">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                {showPayment ? 'Método de Pago' : 'Selecciona tus Asientos'}
              </h2>
              <p className="text-gray-300 text-sm bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1 inline-block border border-white/10">
                {movie.title} - {selectedTime}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl transition-all duration-200 hover:scale-110 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10"
            >
              ×
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          {!showPayment ? (
            <>
              {/* Leyenda mejorada */}
              <div className="flex justify-center gap-6 mb-8">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                  <div className="w-6 h-6 bg-gray-600 rounded-lg border border-gray-500 transform rotate-45 shadow-md"></div>
                  <span className="text-gray-300 text-sm font-medium">Disponible</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                  <div className="w-6 h-6 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-lg border border-[#D4AF37] transform rotate-45 shadow-md"></div>
                  <span className="text-gray-300 text-sm font-medium">Seleccionado</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                  <div className="w-6 h-6 bg-gradient-to-br from-red-700 to-[#8B0000] rounded-lg border border-red-600 transform rotate-45 shadow-md"></div>
                  <span className="text-gray-300 text-sm font-medium">Ocupado</span>
                </div>
              </div>

              {/* Pantalla del cine mejorada */}
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-[#D4AF37] via-[#B8941F] to-[#D4AF37] h-6 rounded-2xl mx-auto mb-3 max-w-2xl shadow-lg transform -skew-x-12"></div>
                <p className="text-gray-400 text-sm font-semibold bg-black/50 backdrop-blur-sm rounded-full px-6 py-2 inline-block border border-[#D4AF37]/30">
                  🎬 PANTALLA PRINCIPAL 🎬
                </p>
              </div>

              {/* Mapa de asientos modernizado */}
              <div className="flex flex-col items-center gap-4 mb-8">
                {rows.map(row => (
                  <div key={row} className="flex gap-3 items-center">
                    <div className="w-8 flex items-center justify-center">
                      <span className="text-[#D4AF37] font-bold text-lg bg-black/50 rounded-full w-8 h-8 flex items-center justify-center border border-[#D4AF37]/30">
                        {row}
                      </span>
                    </div>
                    {Array.from({ length: seatsPerRow }, (_, index) => {
                      const seatNumber = index + 1;
                      const seatId = `${row}${seatNumber}`;
                      const isOccupied = occupiedSeats.includes(seatId);
                      const isSelected = selectedSeats.includes(seatId);
                      
                      return (
                        <button
                          key={seatId}
                          onClick={() => toggleSeat(seatId)}
                          disabled={isOccupied}
                          className={`w-12 h-12 rounded-xl border-2 transition-all duration-300 transform rotate-45 hover:scale-110 shadow-lg ${
                            isOccupied
                              ? 'bg-gradient-to-br from-red-700 to-[#8B0000] border-red-600 cursor-not-allowed'
                              : isSelected
                              ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8941F] border-[#D4AF37] shadow-[#D4AF37]/25'
                              : 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-500 hover:bg-gradient-to-br hover:from-gray-500 hover:to-gray-600 hover:border-gray-400'
                          }`}
                          title={`Asiento ${seatId}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Información de selección mejorada */}
              {selectedSeats.length > 0 && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 mb-6 border border-gray-700 shadow-lg">
                  <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                    <span className="text-[#D4AF37]">🎫</span>
                    Resumen de Compra
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map(seat => (
                      <span key={seat} className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black px-4 py-2 rounded-full text-sm font-bold shadow-md border border-[#D4AF37]">
                        {seat}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center bg-black/30 rounded-xl p-4 border border-gray-600">
                    <span className="text-gray-300 font-semibold">
                      {selectedSeats.length} asiento(s) × $14,000
                    </span>
                    <span className="text-white font-bold text-xl text-[#D4AF37]">
                      ${totalAmount.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              )}

              {/* Botones de acción mejorados */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-br from-gray-600 to-gray-700 text-white py-4 rounded-xl font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 border border-gray-600 shadow-lg"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmSelection}
                  disabled={selectedSeats.length === 0}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border ${
                    selectedSeats.length > 0
                      ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black hover:from-[#B8941F] hover:to-[#D4AF37] border-[#D4AF37]'
                      : 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
                  }`}
                >
                  Continuar al Pago
                </button>
              </div>
            </>
          ) : (
            /* Sección de Métodos de Pago mejorada */
            <div className="space-y-6">
              {/* Resumen de compra */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-lg">
                <h3 className="text-white font-bold mb-4 text-lg flex items-center gap-2">
                  <span className="text-[#D4AF37]">📋</span>
                  Resumen de Compra
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-300">Película:</span>
                    <span className="text-white font-semibold">{movie.title}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-300">Horario:</span>
                    <span className="text-white font-semibold">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-600">
                    <span className="text-gray-300">Asientos:</span>
                    <span className="text-white font-semibold">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="text-gray-300 text-lg font-bold">Total:</span>
                    <span className="text-[#D4AF37] font-bold text-2xl">
                      ${totalAmount.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Métodos de pago mejorados */}
              <div className="space-y-4">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                  <span className="text-[#D4AF37]">💳</span>
                  Selecciona Método de Pago
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'credit', name: 'Tarjeta de Crédito', desc: 'Pago seguro con tu tarjeta', emoji: '💳', color: 'from-blue-500 to-blue-600' },
                    { id: 'debit', name: 'Tarjeta de Débito', desc: 'Pago directo desde tu cuenta', emoji: '🏦', color: 'from-green-500 to-green-600' },
                    { id: 'cash', name: 'Efectivo', desc: 'Paga en taquilla', emoji: '💵', color: 'from-emerald-500 to-emerald-600' },
                    { id: 'pse', name: 'PSE', desc: 'Pago en línea seguro', emoji: '🔐', color: 'from-purple-500 to-purple-600' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 text-left ${
                        paymentMethod === method.id 
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg' 
                          : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center shadow-md`}>
                          <span className="text-white font-bold text-lg">{method.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold text-left">{method.name}</p>
                          <p className="text-gray-400 text-sm text-left">{method.desc}</p>
                        </div>
                        {paymentMethod === method.id && (
                          <div className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center">
                            <span className="text-black text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Botones de pago mejorados */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 bg-gradient-to-br from-gray-600 to-gray-700 text-white py-4 rounded-xl font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 border border-gray-600 shadow-lg"
                >
                  Volver Atrás
                </button>
                <button
                  onClick={handlePayment}
                  disabled={!paymentMethod}
                  className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border ${
                    paymentMethod
                      ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black hover:from-[#B8941F] hover:to-[#D4AF37] border-[#D4AF37]'
                      : 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
                  }`}
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente principal para Hamilton - MODERNIZADO
export default function Hamilton() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showSeatModal, setShowSeatModal] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const handleBuyTickets = () => {
    if (!selectedTime) {
      alert('Por favor selecciona un horario');
      return;
    }
    setShowSeatModal(true);
  };

  const handleSeatConfirmation = (selectedSeats, paymentMethod) => {
    const totalAmount = selectedSeats.length * 14000;
    const paymentMethods = {
      'credit': 'Tarjeta de Crédito',
      'debit': 'Tarjeta de Débito', 
      'cash': 'Efectivo',
      'pse': 'PSE'
    };
    
    alert(`¡Compra exitosa!\n\nPelícula: HAMILTON\nHorario: ${selectedTime}\nAsientos: ${selectedSeats.join(', ')}\nTotal: $${totalAmount.toLocaleString('es-CO')}\nMétodo: ${paymentMethods[paymentMethod]}\n\n¡Disfruta de la función!`);
    setShowSeatModal(false);
    setSelectedTime(null);
  };

  // Datos de la película Hamilton
  const movieData = {
    title: "HAMILTON",
    originalTitle: "Hamilton",
    country: "United States of America",
    director: "Thomas Kail",
    actors: "Lin-Manuel Miranda, Phillipa Soo, Leslie Odom Jr",
    language: "Inglés",
    duration: "2h 40m",
    rating: "PG-13 - Mayores de 13 años",
    genres: ["Musical", "Drama", "Histórico"],
    imageUrl: "/hamilton.jpg",
    trailerUrl: "/Videos/hamilton-trailer.mp4",
    posterUrl: "/hamilton-poster.jpg",
    year: "2020"
  };

  // Todos los horarios en un solo array para facilitar la selección
  const allShowtimes = [
    "11:00 AM", "2:30 PM", "6:00 PM", "9:30 PM"
  ];

  const synopsis = [
    "Hamilton no es solo un musical, es una revolución escénica. Con una mezcla explosiva de hip-hop, R&B, y teatro clásico, esta obra maestra del aclamado compositor Lin-Manuel Miranda reinventa la historia del nacimiento de Estados Unidos.",
    "La historia sigue a Alexander Hamilton, un inmigrante huérfano que llegó al país sin nada y ayudó a construirlo todo. Desde su llegada a Nueva York hasta su papel crucial en la Guerra de Independencia y la creación del sistema financiero americano.",
    "A través de ritmos contemporáneos y un elenco diverso, Hamilton explora temas de legado, ambición y el precio de la libertad, ofreciendo una perspectiva fresca sobre los padres fundadores de Estados Unidos."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a0a0a] to-[#8B0000] relative overflow-hidden">
      {/* Patrón de textura sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(212,175,55,0.1),transparent_50%)] z-0"></div>
      
      <NavigationBar onLogout={handleLogout} />

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header mejorado */}
        <div className="mb-8 text-center">
          <h1 
            className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            style={{ 
              fontFamily: "'Bebas Neue', cursive",
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
              fontWeight: '400',
              letterSpacing: '2px'
            }}
          >
            <span className="text-[#D4AF37]">HAMILTON</span>
          </h1>

          {/* Géneros mejorados */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {movieData.genres.map((genre, index) => (
              <span 
                key={index} 
                className="bg-white/10 backdrop-blur-sm text-gray-300 px-4 py-2 rounded-full text-sm border border-white/20 hover:border-[#D4AF37] hover:text-white transition-all duration-300 font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Sección principal: Póster + Tráiler */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Póster - Columna izquierda */}
          <div className="lg:col-span-4">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#1E232B] to-[#0f1116] border border-white/10">
                <img 
                  src={movieData.imageUrl} 
                  alt={movieData.title}
                  className="w-full h-auto object-cover rounded-3xl transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Poster+No+Disponible';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              </div>
            </div>
          </div>

          {/* Tráiler - Columna derecha */}
          <div className="lg:col-span-8">
            <div className="relative group h-full">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-black to-gray-900 h-full min-h-[500px] border border-white/10">
                {/* Header del reproductor */}
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-black/80 to-transparent border-b border-[#D4AF37]/30">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full shadow-lg"></div>
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                      <span className="text-[#D4AF37]">🎬</span>
                      Tráiler Oficial
                    </h3>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full"></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full"></div>
                    <div className="w-3 h-3 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full"></div>
                  </div>
                </div>
                
                {/* Video con poster corregido */}
                <video 
                  ref={videoRef}
                  controls 
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                  poster={movieData.posterUrl}
                >
                  <source src={movieData.trailerUrl} type="video/mp4" />
                  Tu navegador no soporta videos en HTML5.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* Secciones de contenido inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Información de la película mejorada */}
          <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-[#D4AF37] to-[#B8941F] rounded-full"></div>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Información Técnica
              </span>
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                  <p className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-[#D4AF37]">🎭</span>
                    Título Original
                  </p>
                  <p className="text-white font-semibold text-lg">{movieData.originalTitle}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                  <p className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-[#D4AF37]">🌍</span>
                    País de Origen
                  </p>
                  <p className="text-white font-semibold text-lg">{movieData.country}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                  <p className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-[#D4AF37]">🎥</span>
                    Director
                  </p>
                  <p className="text-white font-semibold text-lg">{movieData.director}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                  <p className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-[#D4AF37]">🗣️</span>
                    Idioma
                  </p>
                  <p className="text-white font-semibold text-lg">{movieData.language}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                  <p className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-[#D4AF37]">⏱️</span>
                    Duración
                  </p>
                  <p className="text-white font-semibold text-lg">{movieData.duration}</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                  <p className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-[#D4AF37]">👁️</span>
                    Clasificación
                  </p>
                  <p className="text-white font-semibold text-lg">{movieData.rating}</p>
                </div>
              </div>

              {/* Reparto Principal */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                <p className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                  <span className="text-[#D4AF37]">🌟</span>
                  Reparto Principal
                </p>
                <p className="text-white font-semibold text-sm leading-relaxed">{movieData.actors}</p>
              </div>
            </div>
          </div>

          {/* Sinopsis mejorada */}
          <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-gradient-to-b from-[#D4AF37] to-[#B8941F] rounded-full"></div>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Sinopsis
              </span>
            </h2>
            <div className="text-gray-300 leading-relaxed space-y-6">
              {synopsis.map((paragraph, index) => (
                <p key={index} className="text-lg bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Horarios y compra mejorados */}
        <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl p-8 border border-[#D4AF37]/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-[#D4AF37] to-[#B8941F] rounded-full"></div>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Selecciona tu Horario
            </span>
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-[#D4AF37]">⏰</span>
                Horarios Disponibles
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allShowtimes.map((time, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedTime(time)}
                    className={`py-5 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 border-2 shadow-lg ${
                      selectedTime === time 
                        ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white border-[#D4AF37] shadow-[#D4AF37]/25' 
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 text-white border-gray-600 hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {selectedTime && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500 rounded-2xl">
                  <p className="text-green-400 font-semibold flex items-center gap-2">
                    <span className="text-xl">✅</span>
                    Horario seleccionado: <span className="text-white font-bold text-lg">{selectedTime}</span>
                  </p>
                </div>
              )}
            </div>

            <button 
              onClick={handleBuyTickets}
              disabled={!selectedTime}
              className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl mt-6 border-2 ${
                selectedTime 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:scale-105 hover:shadow-[#D4AF37]/30 border-[#D4AF37]' 
                  : 'bg-gradient-to-br from-gray-600 to-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
              }`}
            >
              {selectedTime ? '🎫 Comprar Boletos Ahora' : 'Selecciona un horario'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal de selección de asientos */}
      <SeatSelectionModal
        isOpen={showSeatModal}
        onClose={() => setShowSeatModal(false)}
        movie={movieData}
        selectedTime={selectedTime}
        onConfirm={handleSeatConfirmation}
      />

      {/* Efectos decorativos mejorados */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </div>
  );
}