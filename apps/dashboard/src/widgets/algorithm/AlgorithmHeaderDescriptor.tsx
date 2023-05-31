import type { Algorithm } from '@tradeb0t/core'
import InputsDescriptor from '@/src/entities/algorithm/ui/InputsDescriptor'

export interface AlgorithmHeaderDescriptorProps {
  algorithm: Algorithm
}

export default function AlgorithmHeaderDescriptor({ algorithm }: AlgorithmHeaderDescriptorProps) {
  return (
    <>
      <div className="flex items-center flex-wrap">
        <h1 className="font-bold text-3xl m-5">
          Algorithm <span className="kbd">{algorithm.name}</span>
        </h1>
      </div>
      <InputsDescriptor inputs={algorithm.inputTypes} />
    </>
  )
}
