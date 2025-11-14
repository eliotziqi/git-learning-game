import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LevelPage from './pages/LevelPage'
import ChallengePage from './pages/ChallengePage'
import AchievementsPage from './pages/AchievementsPage'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/level/:id" element={<LevelPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Routes>
    </div>
  )
}

export default App
