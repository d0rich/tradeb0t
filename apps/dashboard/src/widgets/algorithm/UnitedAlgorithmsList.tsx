import { trpc } from '@/src/shared/api/trpc'
import MultipleBotsAlgorithmCard from '@/src/features/algorithm/ui/MultipleBotsAlgorithmCard'

export interface UnitedAlgorithmsListProps {}

export default function UnitedAlgorithmsList({}: UnitedAlgorithmsListProps) {
  const { data: algorithms } = trpc.control.algorithms.listForAllBots.useQuery()
  return (
    <>
      {algorithms?.map((algorithm) => (
        <MultipleBotsAlgorithmCard key={algorithm.name} algorithm={algorithm} />
      ))}
    </>
  )
}
