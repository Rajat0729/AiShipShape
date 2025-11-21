import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginpage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* dashboard will come later */}
    </Routes>
  )
}

export default App
