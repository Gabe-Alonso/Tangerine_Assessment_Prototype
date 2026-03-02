import { useMemo } from 'react'
import GameShell from './GameShell'
import TangerineForm from '../../components/TangerineForm'

// ── Passages ─────────────────────────────────────────────────────────────────
// Each passage is ~110-120 words — enough for a fast reader to finish in 60 s
// while giving average readers a realistic stopping point mid-passage.
// Words are stored as arrays so punctuation stays attached to the word it
// belongs to, matching how the student sees the text on the page.

const PASSAGES = [
  {
    id: 'three-little-pigs',
    title: 'The Three Little Pigs',
    words: `Once upon a time three little pigs left home to seek their fortune.
      The first pig was lazy. He built his house out of straw.
      The second pig built his house out of sticks.
      But the third pig worked hard all day.
      He built his house out of bricks.
      One day a big bad wolf came to the straw house.
      He huffed and he puffed and he blew it down.
      The pig ran to the stick house.
      The wolf blew that down too.
      They both ran to the brick house.
      The wolf huffed and puffed but he could not blow it down.
      The three pigs were safe inside and the wolf went away.`
      .split(/\s+/).filter(Boolean),
  },
  {
    id: 'goldilocks',
    title: 'Goldilocks and the Three Bears',
    words: `Once upon a time a girl named Goldilocks went for a walk in the forest.
      She came upon a small cottage and knocked on the door.
      No one answered so she went inside.
      She saw three bowls of porridge on the table.
      She tasted the first bowl but it was too hot.
      She tasted the second bowl but it was too cold.
      She tasted the third bowl and it was just right so she ate it all up.
      Then she saw three chairs.
      The first was too big. The second was too big too.
      The third was just right but when she sat down it broke.
      Goldilocks jumped up and ran out of the cottage and never went back again.`
      .split(/\s+/).filter(Boolean),
  },
  {
    id: 'tortoise-and-hare',
    title: 'The Tortoise and the Hare',
    words: `A hare was very proud of how fast he could run.
      One day he saw a tortoise walking very slowly along the road.
      The hare laughed and said the tortoise was the slowest thing he had ever seen.
      The tortoise was not upset.
      He asked the hare to have a race. The hare thought this was very funny but he agreed.
      They started and the hare sped off down the road.
      Soon he was so far ahead that he stopped to take a nap under a shady tree.
      While the hare slept the tortoise kept walking and walking without stopping.
      When the hare woke up he saw the tortoise crossing the finish line.
      The tortoise had won the race.`
      .split(/\s+/).filter(Boolean),
  },
]

// ── Form builder ─────────────────────────────────────────────────────────────
// How tangy-timed works (same as letter sound recognition):
//   - All words start as CORRECT by default.
//   - TAP a word → marks it INCORRECT (red). TAP again → undo.
//   - When 60 s expire (or Stop Early is clicked):
//       1. Grid flashes red.
//       2. Alert: "Please tap on last item attempted." → click OK.
//       3. Tap the LAST word the student reached (right or wrong).
//       4. Press Submit to record.
//   - auto-stop fires silently after 5 consecutive errors, skipping steps 2-3.

function buildFormHtml(passage) { return `
<style>
  :root {
    --accent-color:      #d1d5db;
    --primary-color:     #ef4444;
    --accent-text-color: #1f2937;
    --tangy-toggle-button-font-size: 1rem;
  }
</style>

<tangy-form id="word-fluency-form">

  <tangy-form-item id="instructions" label="Instructions">
    <tangy-box>
      <p style="font-size:1.05rem; font-weight:600; margin-bottom:0.5rem;">
        Passage: ${passage.title}
      </p>
      <p><strong>Say to the student:</strong></p>
      <p style="font-style:italic; margin:8px 0 16px;">
        "I would like you to read this story out loud. Start at the beginning
        and read as quickly and carefully as you can. Ready? Begin."
      </p>
      <p><strong>Assessor workflow:</strong></p>
      <ol style="margin:8px 0 0 20px; line-height:2;">
        <li>Press <strong>Play</strong> to start the 60-second timer.</li>
        <li>All words start as <strong>correct</strong> (gray).
            Tap a word to mark it <strong>incorrect</strong> (red).
            Tap again to undo.</li>
        <li>When the timer ends, tap the <strong>last word the student
            attempted</strong> — this tells the scoring where they stopped.</li>
        <li>Press <strong>Submit</strong> to record the results.</li>
      </ol>
      <p style="margin-top:12px; color:#6b7280; font-size:0.875rem;">
        The form auto-stops and skips step 3 if the student makes
        5 consecutive errors.
      </p>
    </tangy-box>
  </tangy-form-item>

  <tangy-form-item id="assessment" label="${passage.title} — 60 seconds">
    <tangy-timed
      name="passage_words"
      duration="60"
      columns="8"
      auto-stop="5"
      auto-stop-mode="consecutive">
      ${passage.words.map(w => `<option value="${w}">${w}</option>`).join('\n      ')}
    </tangy-timed>
    <tangy-box>
      <p style="margin-top:1rem; font-size:0.875rem; color:#6b7280;">
        Student finished early? Stop the timer to mark the last word attempted.
      </p>
      <button
        onclick="document.querySelector('#word-fluency-form tangy-timed').stopGrid()"
        style="margin-top:0.4rem; padding:0.5rem 1.25rem; background:#f97316;
               color:white; border:none; border-radius:6px; font-size:0.9rem;
               font-weight:600; cursor:pointer;">
        Stop Timer Early
      </button>
    </tangy-box>
  </tangy-form-item>

</tangy-form>
`}

// ── Component ─────────────────────────────────────────────────────────────────
export default function WordFluency() {
  // Pick one passage randomly per mount; doesn't change mid-assessment.
  const passage = useMemo(
    () => PASSAGES[Math.floor(Math.random() * PASSAGES.length)],
    []
  )
  const formHtml = useMemo(() => buildFormHtml(passage), [passage])

  return (
    <GameShell
      title="Word Fluency"
      description="60-second timed reading — tap words the student reads WRONG."
    >
      {({ onComplete }) => (
        <TangerineForm
          formHtml={formHtml}
          onComplete={(data) => {
            const items = data.values?.passage_words ?? []

            let lastHighlightedIndex = -1
            let lastPressedIndex = -1
            for (let i = items.length - 1; i >= 0; i--) {
              if (lastHighlightedIndex === -1 && items[i].highlighted) lastHighlightedIndex = i
              if (lastPressedIndex === -1 && items[i].pressed)         lastPressedIndex = i
              if (lastHighlightedIndex !== -1 && lastPressedIndex !== -1) break
            }

            const lastAttemptedIndex = lastHighlightedIndex >= 0
              ? lastHighlightedIndex
              : lastPressedIndex

            const attempted = lastAttemptedIndex >= 0 ? lastAttemptedIndex + 1 : 0
            const incorrect = items.slice(0, attempted).filter(i => i.pressed).length
            const correct   = attempted - incorrect

            onComplete({
              gameId:     'word-fluency',
              passageId:  passage.id,
              passageTitle: passage.title,
              completedAt: new Date().toISOString(),
              total:      passage.words.length,
              attempted,
              correct,
              incorrect,
              raw: data,
            })
          }}
        />
      )}
    </GameShell>
  )
}
