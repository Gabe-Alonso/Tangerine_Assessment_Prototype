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

// 4 fable-level passages, each with 4 comprehension questions.
// Correct option always uses value="correct"; others use value="b"/"c"/"d".
const PASSAGE_BANK = [
  {
    id: 'little-red-hen',
    title: 'The Little Red Hen',
    text: `The Little Red Hen found some wheat seeds in the yard. She asked her friends — the cat, the dog, and the duck — who would help her plant them. "Not I," said each of them. So she planted the seeds herself.

When the wheat grew tall, she asked who would help her cut it. Again, no one wanted to help. She cut it all herself. Then she ground the wheat into flour, all alone.

When the bread was ready to bake, she asked one more time. Still no one helped. She baked the bread herself. At last it came out golden and warm.

"Who will help me eat the bread?" she asked.

"I will!" said the cat. "I will!" said the dog. "I will!" said the duck.

"No," said the Little Red Hen. "I did all the work, so I will eat it myself." And she did.`,
    questions: [
      {
        id: 'lrh_q1',
        question: 'What did the Little Red Hen find at the start of the story?',
        options: [
          { value: 'correct', text: 'Wheat seeds',   correct: true  },
          { value: 'b',       text: 'A loaf of bread', correct: false },
          { value: 'c',       text: 'A bag of flour', correct: false },
          { value: 'd',       text: 'A garden shovel', correct: false },
        ],
      },
      {
        id: 'lrh_q2',
        question: 'How many friends did the hen ask for help?',
        options: [
          { value: 'correct', text: 'Three',  correct: true  },
          { value: 'b',       text: 'Two',    correct: false },
          { value: 'c',       text: 'Four',   correct: false },
          { value: 'd',       text: 'One',    correct: false },
        ],
      },
      {
        id: 'lrh_q3',
        question: 'What did the hen make with the wheat?',
        options: [
          { value: 'correct', text: 'Bread',    correct: true  },
          { value: 'b',       text: 'Cake',     correct: false },
          { value: 'c',       text: 'Soup',     correct: false },
          { value: 'd',       text: 'Porridge', correct: false },
        ],
      },
      {
        id: 'lrh_q4',
        question: 'Why did the hen eat the bread by herself?',
        options: [
          { value: 'correct', text: 'She did all the work',         correct: true  },
          { value: 'b',       text: 'She was not hungry',           correct: false },
          { value: 'c',       text: 'Her friends were asleep',      correct: false },
          { value: 'd',       text: 'The bread was too small to share', correct: false },
        ],
      },
    ],
  },

  {
    id: 'boy-who-cried-wolf',
    title: 'The Boy Who Cried Wolf',
    text: `A young shepherd boy watched over his flock of sheep on a hill near a village. One day he thought it would be funny to trick the villagers. "Wolf! Wolf!" he shouted as loud as he could.

The villagers came running to help. When they arrived, the boy laughed. There was no wolf. The next day, he did the same thing. The villagers came again, and again there was no wolf. They went home feeling angry.

Then one afternoon, a real wolf crept out of the forest and began to chase the sheep. The boy shouted "Wolf! Wolf!" with all his might. But this time, no one came. The villagers thought he was playing another trick.

The boy lost his whole flock that day. He learned a painful lesson: no one trusts a liar, even when he tells the truth.`,
    questions: [
      {
        id: 'wolf_q1',
        question: "What was the boy's job?",
        options: [
          { value: 'correct', text: 'Watching over sheep',   correct: true  },
          { value: 'b',       text: 'Fishing in the river',  correct: false },
          { value: 'c',       text: 'Working in a bakery',   correct: false },
          { value: 'd',       text: 'Cutting wood',          correct: false },
        ],
      },
      {
        id: 'wolf_q2',
        question: 'Why did the boy first shout "Wolf!"?',
        options: [
          { value: 'correct', text: 'To trick the villagers',    correct: true  },
          { value: 'b',       text: 'Because he saw a real wolf', correct: false },
          { value: 'c',       text: 'He was scared',             correct: false },
          { value: 'd',       text: 'To call his friends',       correct: false },
        ],
      },
      {
        id: 'wolf_q3',
        question: 'What happened when the real wolf came?',
        options: [
          { value: 'correct', text: 'No one came to help',            correct: true  },
          { value: 'b',       text: 'The villagers chased the wolf',  correct: false },
          { value: 'c',       text: 'The sheep ran into the village', correct: false },
          { value: 'd',       text: 'The boy ran away',               correct: false },
        ],
      },
      {
        id: 'wolf_q4',
        question: 'What lesson does this story teach?',
        options: [
          { value: 'correct', text: "People won't trust a liar",   correct: true  },
          { value: 'b',       text: 'Wolves are very dangerous',   correct: false },
          { value: 'c',       text: 'Always stay close to home',   correct: false },
          { value: 'd',       text: 'Never leave sheep alone',     correct: false },
        ],
      },
    ],
  },

  {
    id: 'ant-and-grasshopper',
    title: 'The Ant and the Grasshopper',
    text: `All summer long, a grasshopper hopped and sang in the warm sunshine. He played all day without a care. Nearby, an ant worked hard every day. She carried food from the fields back to her home underground.

The grasshopper laughed. "Why do you work so hard?" he asked. "Come and sing with me instead!" The ant shook her head. "I am getting ready for winter," she said. "You should do the same." But the grasshopper kept playing.

When winter came, the ground was covered in snow. The grasshopper had no food and was cold and hungry. He knocked on the ant's door. "Please, may I have some food?" he begged.

The ant looked at him kindly. "Come in," she said. "But remember next summer — you must work as well as play." The grasshopper nodded and promised he would.`,
    questions: [
      {
        id: 'ant_q1',
        question: 'What did the grasshopper do all summer?',
        options: [
          { value: 'correct', text: 'He played and sang',       correct: true  },
          { value: 'b',       text: 'He collected food',        correct: false },
          { value: 'c',       text: 'He built a home',          correct: false },
          { value: 'd',       text: 'He slept in the sun',      correct: false },
        ],
      },
      {
        id: 'ant_q2',
        question: 'What did the ant do all summer?',
        options: [
          { value: 'correct', text: 'She stored food for winter',  correct: true  },
          { value: 'b',       text: 'She played with the grasshopper', correct: false },
          { value: 'c',       text: 'She dug a new tunnel',        correct: false },
          { value: 'd',       text: 'She looked for water',        correct: false },
        ],
      },
      {
        id: 'ant_q3',
        question: 'Why was the grasshopper hungry in winter?',
        options: [
          { value: 'correct', text: 'He had not saved any food',   correct: true  },
          { value: 'b',       text: 'The ant ate all his food',    correct: false },
          { value: 'c',       text: 'A bird stole his seeds',      correct: false },
          { value: 'd',       text: 'Winter came too early',       correct: false },
        ],
      },
      {
        id: 'ant_q4',
        question: 'What did the ant tell the grasshopper to remember?',
        options: [
          { value: 'correct', text: 'To work as well as play',       correct: true  },
          { value: 'b',       text: 'To stay inside all winter',     correct: false },
          { value: 'c',       text: 'To find a warmer home',         correct: false },
          { value: 'd',       text: 'To leave before the snow came', correct: false },
        ],
      },
    ],
  },

  {
    id: 'crow-and-pitcher',
    title: 'The Crow and the Pitcher',
    text: `A thirsty crow flew over the land looking for water. At last, she spotted a tall pitcher sitting in a garden. She flew down and peered inside. There was a little water at the bottom — but the pitcher was too tall and narrow for her beak to reach it. She tried pushing the pitcher over, but it was too heavy.

Then the crow had a clever idea. She picked up a small stone and dropped it into the pitcher. The stone sank, and the water rose just a little. She found another stone and dropped it in. Then another, and another.

Each stone made the water rise a tiny bit higher. The crow worked slowly and carefully, one stone at a time. At last, the water reached the top of the pitcher. The crow dipped her beak in and drank until she was no longer thirsty.

She had solved her problem not by giving up, but by thinking carefully.`,
    questions: [
      {
        id: 'crow_q1',
        question: 'What was the crow looking for?',
        options: [
          { value: 'correct', text: 'Water',           correct: true  },
          { value: 'b',       text: 'Food',            correct: false },
          { value: 'c',       text: 'A place to rest', correct: false },
          { value: 'd',       text: 'Other birds',     correct: false },
        ],
      },
      {
        id: 'crow_q2',
        question: "Why couldn't the crow reach the water at first?",
        options: [
          { value: 'correct', text: 'The pitcher was too tall and narrow', correct: true  },
          { value: 'b',       text: 'The water was frozen',                correct: false },
          { value: 'c',       text: 'The lid was stuck',                   correct: false },
          { value: 'd',       text: 'The pitcher was empty',               correct: false },
        ],
      },
      {
        id: 'crow_q3',
        question: 'How did the crow get the water to rise?',
        options: [
          { value: 'correct', text: 'She dropped stones into the pitcher', correct: true  },
          { value: 'b',       text: 'She broke the pitcher open',          correct: false },
          { value: 'c',       text: 'She waited for rain to fill it',      correct: false },
          { value: 'd',       text: 'She asked another animal for help',   correct: false },
        ],
      },
      {
        id: 'crow_q4',
        question: 'What does this story teach us?',
        options: [
          { value: 'correct', text: 'Think carefully instead of giving up', correct: true  },
          { value: 'b',       text: 'Always ask for help when stuck',       correct: false },
          { value: 'c',       text: 'Bigger animals are always stronger',   correct: false },
          { value: 'd',       text: 'Water is easy to find',                correct: false },
        ],
      },
    ],
  },
]

function buildFormHtml(passage) {
  return `
<style>
  :root {
    --primary-color:     #f97316;
    --accent-color:      #f3f4f6;
    --accent-text-color: #1f2937;
  }
</style>

<tangy-form id="passage-comprehension-form">

  <tangy-form-item id="pc-instructions" label="Instructions">
    <tangy-box>
      <p><strong>Say to the student:</strong></p>
      <p style="font-style:italic; margin:8px 0 16px;">
        "Read the story on the next page carefully.
        Then answer four questions about it. Take your time."
      </p>
      <p style="color:#6b7280; font-size:0.875rem;">
        Press <strong>Next</strong> to read the story.
      </p>
    </tangy-box>
  </tangy-form-item>

  <tangy-form-item id="pc-passage" label="${passage.title}">
    <tangy-box>
      <p style="
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0 0 1rem;
        color: #f97316;
      ">${passage.title}</p>
      <div style="
        font-size: 1.05rem;
        line-height: 1.85;
        white-space: pre-line;
      ">${passage.text}</div>
      <p style="margin-top:1.25rem; font-size:0.875rem; color:#6b7280;">
        Press <strong>Next</strong> when you are ready to answer the questions.
      </p>
    </tangy-box>
  </tangy-form-item>

  ${passage.questions.map((q, i) => {
    const opts = shuffle([...q.options])
    return `
  <tangy-form-item id="pc-q${i}" label="Question ${i + 1} of 4">
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

export default function PassageComprehension() {
  const passage  = useMemo(() => PASSAGE_BANK[Math.floor(Math.random() * PASSAGE_BANK.length)], [])
  const formHtml = useMemo(() => buildFormHtml(passage), [passage])

  return (
    <GameShell
      title="Passage Comprehension"
      description="Read the story, then answer four questions about it."
    >
      {({ onComplete }) => (
        <TangerineForm
          formHtml={formHtml}
          onComplete={(data) => {
            let correct = 0
            passage.questions.forEach(q => {
              // tangy-radio-buttons stores value as an array of { name, value } objects.
              // The selected button has value === 'on'; correct option has name === 'correct'.
              const items = data.values?.[q.id] ?? []
              const selected = items.find(item => item.value === 'on')
              if (selected?.name === 'correct') correct++
            })

            onComplete({
              gameId:       'passage-comprehension',
              passageId:    passage.id,
              passageTitle: passage.title,
              completedAt:  new Date().toISOString(),
              total:        passage.questions.length,
              attempted:    passage.questions.length,
              correct,
              incorrect:    passage.questions.length - correct,
              raw:          data,
            })
          }}
        />
      )}
    </GameShell>
  )
}
