import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.js'
import Dashboard from './pages/Dashboard.js'
import './style/global.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
