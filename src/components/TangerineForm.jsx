import { useEffect, useRef } from 'react'

/**
 * TangerineForm
 *
 * Props:
 *   formHtml   {string}    Raw HTML string containing a <tangy-form> element.
 *   onComplete {function}  Called with { values, response, inputs } on submit.
 */
export default function TangerineForm({ formHtml, onComplete }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let removeListener = null

    async function mount() {
      await customElements.whenDefined('tangy-form')
      if (cancelled) return

      container.innerHTML = formHtml

      const form = container.querySelector('tangy-form')
      if (!form) {
        console.warn('[TangerineForm] No <tangy-form> element found in formHtml.')
        return
      }

      function handleSubmit(event) {
        const data = {
          values:   event.target.values,
          response: event.target.response,
          inputs:   event.target.inputs,
        }
        console.log('[TangerineForm] Data collected:', data)
        onComplete?.(data)
      }

      form.addEventListener('submit', handleSubmit)
      removeListener = () => form.removeEventListener('submit', handleSubmit)
    }

    mount()

    return () => {
      cancelled = true
      removeListener?.()
    }
  }, [formHtml])

  return <div ref={containerRef} className="tangerine-form-container" />
}
