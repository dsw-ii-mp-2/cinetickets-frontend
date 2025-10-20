import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import Profile from './pages/Profile' // Agregar esta importación
// Importar todas las páginas de películas
import Lobo200 from './pages/200lobo'
import Avatar from './pages/avatar'
import ElConjuro4 from './pages/elconjuro4'
import TelefonoNegro2 from './pages/telefononegro2'
import Tron from './pages/tron'
import UnaBatallaTrasOtra from './pages/unabatallatrasotra'
import Nezha2 from './pages/nezha2'
import MascotasAlRescate from './pages/mascotasalrescate'
import UglyStepsister from './pages/uglystepsister'
import Hamilton from './pages/hamilton'
import TheLongGame from './pages/thelong'
import Him from './pages/him'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} /> {/* Agregar esta ruta */}
      
      {/* Rutas individuales para cada película */}
      <Route path="/movie/200lobo" element={<Lobo200 />} />
      <Route path="/movie/avatar" element={<Avatar />} />
      <Route path="/movie/elconjuro4" element={<ElConjuro4 />} />
      <Route path="/movie/telefononegro2" element={<TelefonoNegro2 />} />
      <Route path="/movie/tron" element={<Tron />} />
      <Route path="/movie/unabatallatrasotra" element={<UnaBatallaTrasOtra />} />
      <Route path="/movie/nezha2" element={<Nezha2 />} />
      <Route path="/movie/mascotasalrescate" element={<MascotasAlRescate />} />
      <Route path="/movie/uglystepsister" element={<UglyStepsister />} />
      <Route path="/movie/hamilton" element={<Hamilton />} />
      <Route path="/movie/thelonggame" element={<TheLongGame />} />
      <Route path="/movie/him" element={<Him />} />
    </Routes>
  )
}

export default App