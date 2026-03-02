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

const LETTERS = [
  'm','a','s','t','p','n','r','d','f','g',
  'c','h','e','i','l','o','b','u','k','w',
  'j','v','z','y','q','x',
  'M','A','S','T','P','N','R','D','F','G',
  'C','H','E','I','L','O','B','U','K','W',
]

// --- How tangy-timed works ---
//
// Items start as CORRECT by default (gray = not yet judged).
// TAP an item → marks it INCORRECT (red).
// TAP again → un-marks it (back to gray/correct).
//
// When the 60-second timer hits zero:
//   1. The grid flashes red.
//   2. A browser alert says "Please tap on last item attempted."
//      Click OK to dismiss it.
//   3. The grid enters LAST_ATTEMPTED mode — tap the final letter
//      the student tried (even if wrong) to mark where they stopped.
//   4. The form then lets you proceed to submit.
//
// If auto-stop="N" fires (N consecutive incorrect), steps 2-3 are
// skipped automatically and the last marked item is used instead.

function buildFormHtml(letters) { return `
<style>
  /* ── Color overrides for tangy-timed ──────────────────────────────
     --accent-color    : default/unpressed button  → gray  (= correct)
     --primary-color   : pressed/incorrect button  → red
     --accent-text-color: text on buttons          → dark gray
  ──────────────────────────────────────────────────────────────── */
  :root {
    --accent-color:       #d1d5db;
    --primary-color:      #ef4444;
    --accent-text-color:  #1f2937;
    --tangy-toggle-button-font-size: 1.6rem;
  }
</style>

<tangy-form id="letter-sound-form">

  <tangy-form-item id="instructions" label="Instructions">
    <tangy-box>
      <p><strong>Say to the student:</strong></p>
      <p style="font-style:italic; margin:8px 0 16px;">
        "Here are some letters. Tell me the <u>sound</u> each letter makes,
        going left to right across every row. Do as many as you can.
        Ready? Begin."
      </p>
      <p><strong>Assessor workflow:</strong></p>
      <ol style="margin:8px 0 0 20px; line-height:2;">
        <li>Press <strong>Play</strong> to start the 60-second timer.</li>
        <li>All letters start as <strong>correct</strong> (gray).
            Tap a letter to mark it <strong>incorrect</strong> (red).
            Tap again to undo.</li>
        <li>When the timer ends, tap the <strong>last letter the student
            attempted</strong> (right or wrong) — this tells the scoring
            where the student stopped.</li>
        <li>Press <strong>Submit</strong> to record the results.</li>
      </ol>
      <p style="margin-top:12px; color:#6b7280; font-size:0.875rem;">
        The form auto-stops and skips step 3 if the student makes
        5 consecutive errors.
      </p>
    </tangy-box>
  </tangy-form-item>

  <tangy-form-item id="assessment" label="Letter Sounds — 60 seconds">
    <tangy-timed
      name="letter_sounds"
      duration="60"
      columns="10"
      auto-stop="5"
      auto-stop-mode="consecutive">
      ${letters.map(l => `<option value="${l}">${l}</option>`).join('\n      ')}
    </tangy-timed>
    <tangy-box>
      <p style="margin-top:1rem; font-size:0.875rem; color:#6b7280;">
        Student finished early? Stop the timer to mark the last letter attempted.
      </p>
      <button
        onclick="document.querySelector('#letter-sound-form tangy-timed').stopGrid()"
        style="margin-top:0.4rem; padding:0.5rem 1.25rem; background:#f97316;
               color:white; border:none; border-radius:6px; font-size:0.9rem;
               font-weight:600; cursor:pointer;">
        Stop Timer Early
      </button>
    </tangy-box>
  </tangy-form-item>

</tangy-form>
`}

export default function LetterSoundRecognition() {
  // Shuffle once per mount so the order is different every time the
  // student returns to this page, without re-shuffling mid-assessment.
  const formHtml = useMemo(() => buildFormHtml(shuffle(LETTERS)), [])

  return (
    <GameShell
      title="Letter Sound Recognition"
      description="60-second timed assessment — tap letters the student gets WRONG."
    >
      {({ onComplete }) => (
        <TangerineForm
          formHtml={formHtml}
          onComplete={(data) => {
            // tangy-timed value is an array of { value, pressed, highlighted } objects.
            // pressed=true     → assessor marked this letter incorrect
            // highlighted=true → set only when timer ends + assessor picks "last attempted"
            const items = data.values?.letter_sounds ?? []

            // Walk backwards to find the last of each marker type.
            let lastHighlightedIndex = -1
            let lastPressedIndex = -1
            for (let i = items.length - 1; i >= 0; i--) {
              if (lastHighlightedIndex === -1 && items[i].highlighted) lastHighlightedIndex = i
              if (lastPressedIndex === -1 && items[i].pressed) lastPressedIndex = i
              if (lastHighlightedIndex !== -1 && lastPressedIndex !== -1) break
            }

            // Normal flow (timer expired): assessor explicitly picked the last item → use it.
            // Early submit: no highlighted item, so fall back to the last pressed (incorrect)
            // letter as the boundary. If nothing was pressed at all, attempted = 0.
            const lastAttemptedIndex = lastHighlightedIndex >= 0
              ? lastHighlightedIndex
              : lastPressedIndex

            const attempted = lastAttemptedIndex >= 0 ? lastAttemptedIndex + 1 : 0
            const incorrect = items.slice(0, attempted).filter(i => i.pressed).length
            const correct = attempted - incorrect

            onComplete({
              gameId: 'letter-sound-recognition',
              completedAt: new Date().toISOString(),
              total: LETTERS.length,
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
