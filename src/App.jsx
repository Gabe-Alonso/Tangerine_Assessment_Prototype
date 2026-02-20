import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LetterSoundRecognition from './pages/games/LetterSoundRecognition'
import WordFluency from './pages/games/WordFluency'
import SentenceReading from './pages/games/SentenceReading'
import PassageComprehension from './pages/games/PassageComprehension'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/letter-sound-recognition" element={<LetterSoundRecognition />} />
        <Route path="/games/word-fluency" element={<WordFluency />} />
        <Route path="/games/sentence-reading" element={<SentenceReading />} />
        <Route path="/games/passage-comprehension" element={<PassageComprehension />} />
      </Routes>
    </BrowserRouter>
  )
}
