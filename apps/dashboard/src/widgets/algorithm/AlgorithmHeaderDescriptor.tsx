import type { Algorithm } from '@tradeb0t/core'
import InputsDescriptor from '@/src/entities/algorithm/ui/InputsDescriptor'
import { trpc } from '@/src/shared/api/trpc'
import { useAppDispatch } from '@/src/shared/model/hooks'
import { pushNotification } from '@/src/shared/model/notificationsSlice'
import { algorithmRunSuccessNotification } from '@/src/entities/algorithm/notifications/algorithmRunSuccessNotification'
import { algorithmRunErrorNotification } from '@/src/entities/algorithm/notifications/algorithmRunErrorNotification'
import RunAlgorithmForm from '@/src/entities/algorithm/ui/RunAlgorithmForm'

export interface AlgorithmHeaderDescriptorProps {
  botUrl: string
  algorithm: Algorithm
}

export default function AlgorithmHeaderDescriptor({ algorithm, botUrl }: AlgorithmHeaderDescriptorProps) {
  const dispatch = useAppDispatch()
  const runAlgorithmMutation = trpc.control.algorithms.run.useMutation({
    onSuccess: (result) => {
      dispatch(pushNotification(algorithmRunSuccessNotification(algorithm, result)))
    },
    onError: (error) => {
      dispatch(pushNotification(algorithmRunErrorNotification(algorithm)))
    }
  })

  return (
    <>
      <div className="flex items-center flex-wrap">
        <h1 className="font-bold text-3xl m-5">
          Algorithm <span className="kbd">{algorithm.name}</span>
        </h1>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Description</h2>
            <p>{algorithm.description}</p>
          </div>
        </div>
        <InputsDescriptor className="bg-base-200 card-compact" inputs={algorithm.inputTypes} />
        <RunAlgorithmForm
          className="col-span-1 md:col-span-2 xl:col-span-1"
          algorithm={algorithm}
          onSubmit={(inputs) =>
            runAlgorithmMutation.mutate({
              url: botUrl,
              algorithmName: algorithm.name,
              inputs
            })
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
    </>
  )
}
