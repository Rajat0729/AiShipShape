import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
