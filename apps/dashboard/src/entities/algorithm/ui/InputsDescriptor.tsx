import type { InputTypes } from '@tradeb0t/core'

export interface InputsDescriptorProps {
  inputs: InputTypes
  className?: string
}

export default function InputsDescriptor({ inputs, className = '' }: InputsDescriptorProps) {
  return (
    <div className={`card gap-y-1 ${className}`}>
      <div className="card-body">
        <h3 className="card-title">Inputs: </h3>
        {Object.keys(inputs).map((input) => (
          <label className="input-group input-group-sm" key={input}>
            <span>{input}</span>
            <input
              type="text"
              value={inputs[input]}
              readOnly
              size={1}
              className="input input-sm input-bordered flex-1"
            />
          </label>
        ))}
      </div>
    </div>
  )
}
