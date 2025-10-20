import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    navigate("/");
  };

  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Datos del usuario (inicialmente vacíos)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    telephone: "",
    age: "",
    membership: "Premium",
    joinDate: "",
    totalTickets: 0,
    favoriteGenre: "Ciencia Ficción"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

    // Cargar datos del usuario y historial de compras al montar el componente
    useEffect(() => {
    fetchUserData();
    fetchPurchaseHistory();
    }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      if (!token) {
        setError('No hay token de autenticación');
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://cinetickets-backend-glcg.onrender.com/api/users/me/', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Formatear los datos según la respuesta de tu API
        setUserData({
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          email: data.email,
          telephone: data.telephone,
          age: data.age,
          membership: "Premium",
          joinDate: data.created_at ? new Date(data.created_at).toLocaleDateString('es-ES', {
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          }) : "15-Ene-2024",
          totalTickets: 12,
          favoriteGenre: "Ciencia Ficción"
        });
      } else {
        setError('Error al cargar los datos del usuario');
        // Datos de ejemplo como fallback
        setUserData({
          name: "Ana García",
          email: "ana.garcia@email.com",
          telephone: "+57 300 123 4567",
          age: "30",
          membership: "Premium",
          joinDate: "15-Ene-2024",
          totalTickets: 12,
          favoriteGenre: "Ciencia Ficción"
        });
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión al cargar los datos');
      // Datos de ejemplo como fallback
      setUserData({
        name: "Ana García",
        email: "ana.garcia@email.com",
        telephone: "+57 300 123 4567",
        age: "30",
        membership: "Premium",
        joinDate: "15-Ene-2024",
        totalTickets: 12,
        favoriteGenre: "Ciencia Ficción"
      });
    } finally {
      setIsLoading(false);
    }
  };

    const fetchPurchaseHistory = async () => {
    try {
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
        if (!token) return;

        const response = await fetch('https://cinetickets-backend-glcg.onrender.com/api/tickets/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        });

        if (response.ok) {
        const data = await response.json();
        setPurchaseHistory(data.results || []);  // handle pagination
        } else {
        console.error('Error al cargar el historial de compras');
        setPurchaseHistory([]);
        }
    } catch (error) {
        console.error('Error de conexión al cargar compras:', error);
        setPurchaseHistory([]);
    }}

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const [firstName, ...lastNameParts] = userData.name.split(' ');
      const lastName = lastNameParts.join(' ');

      const response = await fetch('https://cinetickets-backend-glcg.onrender.com/api/users/me/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: userData.email,
          telephone: userData.telephone,
          age: userData.age
        })
      });

      if (response.ok) {
        setIsEditing(false);
        alert("Datos actualizados correctamente");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión al guardar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Recargar datos originales
    fetchUserData();
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      
      const response = await fetch('https://cinetickets-backend-glcg.onrender.com/api/users/me/', {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Limpiar tokens
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        
        alert("Cuenta eliminada correctamente");
        navigate("/");
      } else {
        setError('Error al eliminar la cuenta');
        setShowDeleteConfirm(false);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión al eliminar la cuenta');
      setShowDeleteConfirm(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
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
                to="/home"
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
        <div className="text-center py-12 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 
              className="text-6xl font-black text-white mb-6 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              style={{ 
                fontFamily: "'Hug Me Tight', cursive",
                textShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              MI PERFIL
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-light bg-white/5 backdrop-blur-sm rounded-2xl py-3 px-6 inline-block border border-white/10">
              Gestiona tu información y preferencias
            </p>
          </div>
        </div>

        {/* Indicador de carga y errores */}
        {isLoading && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-white font-semibold">Cargando datos...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/20 rounded-2xl border border-red-500/30">
              <span className="text-red-300">⚠️ {error}</span>
            </div>
          </div>
        )}

        {/* Contenido del perfil */}
        <div className="container mx-auto px-4 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna izquierda - Información personal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tarjeta de información personal */}
              <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl p-8 border border-[#D4AF37]/20 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 
                    className="text-2xl font-black text-white"
                    style={{ fontFamily: "'Hug Me Tight', cursive" }}
                  >
                    Información Personal
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-[#B8941F] hover:to-[#D4AF37] shadow-md border border-[#D4AF37]/30"
                      style={{ fontFamily: "'Comic Jungle', cursive" }}
                    >
                      Editar Datos
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md border border-green-500/30"
                        style={{ fontFamily: "'Comic Jungle', cursive" }}
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md border border-gray-500/30"
                        style={{ fontFamily: "'Comic Jungle', cursive" }}
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <label className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="text-[#D4AF37]">👤</span>
                      Nombre Completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full bg-transparent text-white font-semibold text-lg border-b border-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                      />
                    ) : (
                      <p className="text-white font-semibold text-lg">{userData.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <label className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="text-[#D4AF37]">📧</span>
                      Correo Electrónico
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-transparent text-white font-semibold text-lg border-b border-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                      />
                    ) : (
                      <p className="text-white font-semibold text-lg">{userData.email}</p>
                    )}
                  </div>

                  {/* Telephone */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <label className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="text-[#D4AF37]">📱</span>
                      Telephone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.telephone}
                        onChange={(e) => handleInputChange('telephone', e.target.value)}
                        className="w-full bg-transparent text-white font-semibold text-lg border-b border-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                      />
                    ) : (
                      <p className="text-white font-semibold text-lg">{userData.telephone}</p>
                    )}
                  </div>

                  {/* Edad */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <label className="text-gray-400 text-sm font-medium mb-2 flex items-center gap-2">
                      <span className="text-[#D4AF37]">🎯</span>
                      Edad
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={userData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="w-full bg-transparent text-white font-semibold text-lg border-b border-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
                        min="13"
                        max="120"
                      />
                    ) : (
                      <p className="text-white font-semibold text-lg">{userData.age} años</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Historial de compras */}
              <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl p-8 border border-[#D4AF37]/20 shadow-2xl">
                <h3 
                  className="text-2xl font-black text-white mb-6"
                  style={{ fontFamily: "'Hug Me Tight', cursive" }}
                >
                  Historial de Compras
                </h3>
                
                <div className="space-y-4">
                    {purchaseHistory.map(ticket => (
                    <div key={ticket.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300">
                        <div className="flex justify-between items-start">
                        <div className="flex-1">
                            <h4 className="text-white font-bold text-lg mb-2" style={{ fontFamily: "'Hug Me Tight', cursive" }}>
                            🎬 {ticket.movie}
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Fecha:</span>
                                <p className="text-white font-medium">{new Date(ticket.function).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Hora:</span>
                                <p className="text-white font-medium">{new Date(ticket.function).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Asiento:</span>
                                <p className="text-white font-medium">{ticket.seat}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Estado:</span>
                                <p className="text-green-400 font-bold">Completada</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Columna derecha - Estadísticas y acciones */}
            <div className="space-y-8">
              {/* Tarjeta de estadísticas */}
              <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl p-8 border border-[#D4AF37]/20 shadow-2xl">
                <h3 
                  className="text-2xl font-black text-white mb-6"
                  style={{ fontFamily: "'Hug Me Tight', cursive" }}
                >
                  Mis Estadísticas
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Membresía</span>
                      <span className="text-[#D4AF37] font-bold">{userData.membership}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Miembro desde</span>
                      <span className="text-white font-semibold">{userData.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Boletos comprados</span>
                      <span className="text-white font-semibold">{userData.totalTickets}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Género favorito</span>
                      <span className="text-white font-semibold">{userData.favoriteGenre}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta de acciones peligrosas */}
              <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl p-8 border border-red-500/20 shadow-2xl">
                <h3 
                  className="text-2xl font-black text-white mb-6"
                  style={{ fontFamily: "'Hug Me Tight', cursive" }}
                >
                  Acciones de Cuenta
                </h3>
                
                <div className="space-y-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full py-4 bg-gradient-to-r from-red-700 to-[#8B0000] text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md border border-red-600/30 flex items-center justify-center gap-3"
                    style={{ fontFamily: "'Comic Jungle', cursive" }}
                  >
                    <span>🗑️</span>
                    Eliminar Cuenta
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md border border-gray-500/30 flex items-center justify-center gap-3"
                    style={{ fontFamily: "'Comic Jungle', cursive" }}
                  >
                    <span>🚪</span>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar cuenta */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#1E232B] to-[#0f1116] rounded-3xl border border-red-500/30 max-w-md w-full p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 text-center" style={{ fontFamily: "'Hug Me Tight', cursive" }}>
              ¿Eliminar Cuenta?
            </h3>
            <p className="text-gray-300 text-center mb-6">
              Esta acción no se puede deshacer. Se perderán todos tus datos y historial de compras.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3 bg-gradient-to-r from-red-700 to-[#8B0000] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Efectos decorativos sutiles */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse delay-700"></div>
      </div>
    </div>
  );
}