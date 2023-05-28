import type { InputTypes } from '@tradeb0t/core'

export interface InputsDescriptorProps {
  inputs: InputTypes
}

export default function InputsDescriptor({ inputs }: InputsDescriptorProps) {
  return (
    <div className="card bg-base-100 p-2 gap-y-1">
      <h3 className="card-title">Inputs: </h3>
      {Object.keys(inputs).map((input) => (
        <label className="input-group input-group-sm" key={input}>
          <span>{input}</span>
          <input type="text" value={inputs[input]} readOnly className="input input-sm input-bordered" />
        </label>
      ))}
    </div>
  )
}
