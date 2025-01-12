import { createPortal } from 'react-dom'
import type { Algorithm } from '@tradeb0t/core'
import RunAlgorithmForm, { RunAlgorithmFormProps } from './RunAlgorithmForm'
import { useRef } from 'react'

export interface RunAlgorithmModalProps {
  algorithm: Algorithm
  runAlgorithm: RunAlgorithmFormProps['onSubmit']
}

export default function RunAlgorithmModal({ algorithm, runAlgorithm }: RunAlgorithmModalProps) {
  const modalId = `run-algorithm-modal-checkbox-${algorithm.name}`
  const checkbox = useRef<HTMLInputElement>(null)

  function closeModal() {
    checkbox.current?.click()
  }

  function onSubmit(inputs: Parameters<RunAlgorithmFormProps['onSubmit']>[0]) {
    runAlgorithm(inputs)
    closeModal()
  }

  return (
    <>
      {/* The button to open modal */}
      <label htmlFor={modalId} className="btn btn-primary btn-sm">
        Run
      </label>

      {/* Put this part before </body> tag */}
      {createPortal(
        <>
          <input ref={checkbox} type="checkbox" id={modalId} className="modal-toggle" />
          <div className="modal">
            <RunAlgorithmForm
              className="modal-box p-2 md:p-6 bg-base-200 relative"
              algorithm={algorithm}
              onSubmit={onSubmit}
              closeComponent={
                <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">
                  ✕
                </label>
              }
              actionsComponent={
                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Run
                  </button>
                </div>
              }
            />
          </div>
        </>,
        document.querySelector('body') as HTMLElement,
        'run-algorithm-modal'
      )}
    </>
  )
}
