import GameShell from './GameShell'

export default function PassageComprehension() {
  return (
    <GameShell
      title="Passage Comprehension"
      description="Read a short passage and respond to questions about it."
    >
      {({ onComplete }) => (
        <div className="game-placeholder">
          <span className="game-placeholder__label">Coming Soon</span>
          <p className="game-placeholder__text">
            The student reads a short passage, then answers multiple-choice
            comprehension questions. Tangerine form goes here.
          </p>
          <button
            className="game-placeholder__demo-btn"
            onClick={() =>
              onComplete({
                gameId: 'passage-comprehension',
                completedAt: new Date().toISOString(),
                passageId: 'sample-passage-01',
                questions: [
                  { question: 'What is the passage about?', selectedOption: 'B', correct: true },
                  { question: 'Who is the main character?', selectedOption: 'A', correct: false },
                ],
                score: 1,
                totalItems: 2,
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
