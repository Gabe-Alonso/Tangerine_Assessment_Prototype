import { useMemo } from 'react'
import GameShell from './GameShell'
import TangerineForm from '../../components/TangerineForm'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 10 first-grade-level sentences with 4-option comprehension questions.
// Each question has exactly one option with correct: true.
const QUESTION_BANK = [
  {
    id: 'dog_ball',
    sentence: 'The dog ran fast to catch the red ball.',
    question: 'What did the dog want to catch?',
    options: [
      { value: 'correct', text: 'A red ball',   correct: true  },
      { value: 'b',       text: 'A blue stick', correct: false },
      { value: 'c',       text: 'A cat',        correct: false },
      { value: 'd',       text: 'A bird',       correct: false },
    ],
  },
  {
    id: 'girl_coat',
    sentence: 'The girl put on her coat because it was cold.',
    question: 'Why did the girl put on her coat?',
    options: [
      { value: 'correct', text: 'It was cold',            correct: true  },
      { value: 'b',       text: 'She liked the color',    correct: false },
      { value: 'c',       text: 'It was raining',         correct: false },
      { value: 'd',       text: 'She was going swimming', correct: false },
    ],
  },
  {
    id: 'boy_ducks',
    sentence: 'The boy fed bread to the ducks at the pond.',
    question: 'Where did the boy feed the ducks?',
    options: [
      { value: 'correct', text: 'At the pond', correct: true  },
      { value: 'b',       text: 'At school',   correct: false },
      { value: 'c',       text: 'At the park', correct: false },
      { value: 'd',       text: 'At home',     correct: false },
    ],
  },
  {
    id: 'stars',
    sentence: 'The sun went down and the stars came out.',
    question: 'What came out after the sun went down?',
    options: [
      { value: 'correct', text: 'Stars',    correct: true  },
      { value: 'b',       text: 'Clouds',   correct: false },
      { value: 'c',       text: 'The moon', correct: false },
      { value: 'd',       text: 'Rain',     correct: false },
    ],
  },
  {
    id: 'birthday_cake',
    sentence: 'Mom made a big cake for my birthday.',
    question: 'What did Mom make for the birthday?',
    options: [
      { value: 'correct', text: 'A big cake', correct: true  },
      { value: 'b',       text: 'Cookies',    correct: false },
      { value: 'c',       text: 'A pie',      correct: false },
      { value: 'd',       text: 'Dinner',     correct: false },
    ],
  },
  {
    id: 'cat_mat',
    sentence: 'The cat sat on the warm mat by the fire.',
    question: 'Where did the cat sit?',
    options: [
      { value: 'correct', text: 'On a mat by the fire', correct: true  },
      { value: 'b',       text: 'On a chair',           correct: false },
      { value: 'c',       text: 'On the bed',           correct: false },
      { value: 'd',       text: 'On the table',         correct: false },
    ],
  },
  {
    id: 'bird_nest',
    sentence: 'The bird built a nest in the tall tree.',
    question: 'What did the bird build?',
    options: [
      { value: 'correct', text: 'A nest', correct: true  },
      { value: 'b',       text: 'A web',  correct: false },
      { value: 'c',       text: 'A home', correct: false },
      { value: 'd',       text: 'A den',  correct: false },
    ],
  },
  {
    id: 'jake_rain',
    sentence: 'Jake and his dog went for a walk in the rain.',
    question: "What was the weather like on Jake's walk?",
    options: [
      { value: 'correct', text: 'Rainy', correct: true  },
      { value: 'b',       text: 'Sunny', correct: false },
      { value: 'c',       text: 'Windy', correct: false },
      { value: 'd',       text: 'Snowy', correct: false },
    ],
  },
  {
    id: 'frog_log',
    sentence: 'The frog jumped off the log into the water.',
    question: 'What did the frog jump off of?',
    options: [
      { value: 'correct', text: 'A log',    correct: true  },
      { value: 'b',       text: 'A rock',   correct: false },
      { value: 'c',       text: 'A leaf',   correct: false },
      { value: 'd',       text: 'A branch', correct: false },
    ],
  },
  {
    id: 'sam_kite',
    sentence: 'Sam saw a big red kite fly up in the sky.',
    question: 'What did Sam see in the sky?',
    options: [
      { value: 'correct', text: 'A big red kite', correct: true  },
      { value: 'b',       text: 'A bird',         correct: false },
      { value: 'c',       text: 'A plane',        correct: false },
      { value: 'd',       text: 'A cloud',        correct: false },
    ],
  },
]

function buildFormHtml(questions) {
  return `
<style>
  :root {
    --primary-color:     #f97316;
    --accent-color:      #f3f4f6;
    --accent-text-color: #1f2937;
  }
</style>

<tangy-form id="sentence-reading-form">

  <tangy-form-item id="sr-instructions" label="Instructions">
    <tangy-box>
      <p><strong>Say to the student:</strong></p>
      <p style="font-style:italic; margin:8px 0 16px;">
        "I will show you some sentences. Read each one and pick
        the best answer to the question. Take your time."
      </p>
      <p style="color:#6b7280; font-size:0.875rem;">
        There are 4 sentences. Press <strong>Next</strong> to begin.
      </p>
    </tangy-box>
  </tangy-form-item>

  ${questions.map((q, i) => {
    const opts = shuffle([...q.options])
    return `
  <tangy-form-item id="sr-q${i}" label="Sentence ${i + 1} of 4">
    <tangy-box>
      <p style="
        font-size: 1.35rem;
        font-weight: 600;
        line-height: 1.7;
        padding: 1rem 1.25rem;
        background: #fffbeb;
        border-left: 4px solid #f97316;
        border-radius: 0 8px 8px 0;
        margin-bottom: 0.25rem;
      ">${q.sentence}</p>
    </tangy-box>
    <tangy-radio-buttons
      name="${q.id}"
      label="${q.question}"
      columns="2"
      required>
      ${opts.map(o => `<option value="${o.value}">${o.text}</option>`).join('\n      ')}
    </tangy-radio-buttons>
  </tangy-form-item>`
  }).join('')}

</tangy-form>
`
}

export default function SentenceReading() {
  // Pick 4 unique questions per session; options are also shuffled inside buildFormHtml.
  const questions = useMemo(() => shuffle([...QUESTION_BANK]).slice(0, 4), [])
  const formHtml  = useMemo(() => buildFormHtml(questions), [questions])

  return (
    <GameShell
      title="Sentence Reading"
      description="Read each sentence and choose the best answer."
    >
      {({ onComplete }) => (
        <TangerineForm
          formHtml={formHtml}
          onComplete={(data) => {
            let correct = 0
            questions.forEach(q => {
              // tangy-radio-buttons stores value as an array of { name, value, ... }
              // objects — one per option. The selected item has value === 'on'.
              // We named the correct option value="correct", so we check name === 'correct'.
              const items = data.values?.[q.id] ?? []
              const selected = items.find(item => item.value === 'on')
              if (selected?.name === 'correct') correct++
            })

            onComplete({
              gameId:      'sentence-reading',
              completedAt: new Date().toISOString(),
              total:       questions.length,
              attempted:   questions.length,
              correct,
              incorrect:   questions.length - correct,
              raw:         data,
            })
          }}
        />
      )}
    </GameShell>
  )
}
