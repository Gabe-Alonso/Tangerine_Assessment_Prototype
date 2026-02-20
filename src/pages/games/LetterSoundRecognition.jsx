import GameShell from './GameShell'

export default function LetterSoundRecognition() {
  return (
    <GameShell
      title="Letter Sound Recognition"
      description="Identify letters and their corresponding sounds."
    >
      {({ onComplete }) => (
        <div className="game-placeholder">
          <span className="game-placeholder__label">Coming Soon</span>
          <p className="game-placeholder__text">
            This game will present a series of letters. The student identifies
            each letter's sound. Tangerine form goes here.
          </p>
          {/* Demo button — simulates a completed Tangerine form submission */}
          <button
            className="game-placeholder__demo-btn"
            onClick={() =>
              onComplete({
                gameId: 'letter-sound-recognition',
                completedAt: new Date().toISOString(),
                responses: [
                  { letter: 'A', correct: true },
                  { letter: 'B', correct: true },
                  { letter: 'C', correct: false },
                ],
                score: 2,
                totalItems: 3,
              })
            }
          >
            Simulate Completion (demo)
          </button>
        </div>
      )}
    </GameShell>
  )
}
