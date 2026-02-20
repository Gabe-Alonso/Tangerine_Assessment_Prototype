import { useNavigate } from 'react-router-dom'
import './Home.css'

const MINIGAMES = [
  {
    id: 'letter-sound-recognition',
    title: 'Letter Sound Recognition',
    description: 'Identify letters and their corresponding sounds.',
    icon: '🔤',
    path: '/games/letter-sound-recognition',
  },
  {
    id: 'word-fluency',
    title: 'Word Fluency',
    description: 'Read as many words as possible within the time limit.',
    icon: '📖',
    path: '/games/word-fluency',
  },
  {
    id: 'sentence-reading',
    title: 'Sentence Reading',
    description: 'Read sentences aloud and answer comprehension questions.',
    icon: '📝',
    path: '/games/sentence-reading',
  },
  {
    id: 'passage-comprehension',
    title: 'Passage Comprehension',
    description: 'Read a short passage and respond to questions about it.',
    icon: '📚',
    path: '/games/passage-comprehension',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__title">Reading Minigames</h1>
        <p className="home__subtitle">Select a minigame to begin</p>
      </header>

      <main className="home__grid">
        {MINIGAMES.map((game) => (
          <div key={game.id} className="game-card">
            <div className="game-card__icon">{game.icon}</div>
            <h2 className="game-card__title">{game.title}</h2>
            <p className="game-card__description">{game.description}</p>
            <button
              className="game-card__button"
              onClick={() => navigate(game.path)}
            >
              Play
            </button>
          </div>
        ))}
      </main>
    </div>
  )
}
