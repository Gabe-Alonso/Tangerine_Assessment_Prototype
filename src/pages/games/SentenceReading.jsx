import GameShell from './GameShell'

export default function SentenceReading() {
  return (
    <GameShell
      title="Sentence Reading"
      description="Read sentences aloud and answer comprehension questions."
    >
      {({ onComplete }) => (
        <div className="game-placeholder">
          <span className="game-placeholder__label">Coming Soon</span>
          <p className="game-placeholder__text">
            The student reads sentences and answers yes/no questions to check
            understanding. Tangerine form goes here.
          </p>
          <button
            className="game-placeholder__demo-btn"
            onClick={() =>
              onComplete({
                gameId: 'sentence-reading',
                completedAt: new Date().toISOString(),
                sentences: [
                  { text: 'The dog runs fast.', comprehensionCorrect: true },
                  { text: 'She likes to read books.', comprehensionCorrect: true },
                  { text: 'The sky is green.', comprehensionCorrect: false },
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
