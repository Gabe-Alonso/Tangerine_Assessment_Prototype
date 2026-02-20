import GameShell from './GameShell'

export default function WordFluency() {
  return (
    <GameShell
      title="Word Fluency"
      description="Read as many words as possible within the time limit."
    >
      {({ onComplete }) => (
        <div className="game-placeholder">
          <span className="game-placeholder__label">Coming Soon</span>
          <p className="game-placeholder__text">
            The student reads a list of words aloud within a timed session.
            Tangerine form goes here.
          </p>
          <button
            className="game-placeholder__demo-btn"
            onClick={() =>
              onComplete({
                gameId: 'word-fluency',
                completedAt: new Date().toISOString(),
                timeLimitSeconds: 60,
                wordsRead: 24,
                wordsCorrect: 21,
                words: ['cat', 'dog', 'run', 'jump'],
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
