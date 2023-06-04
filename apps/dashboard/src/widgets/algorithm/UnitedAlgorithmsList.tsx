import { trpc } from '@/src/shared/api/trpc'
import MultipleBotsAlgorithmCard from '@/src/features/algorithm/ui/MultipleBotsAlgorithmCard'
import LoadingCard from '@/src/shared/ui/LoadingCard'

export interface UnitedAlgorithmsListProps {}

export default function UnitedAlgorithmsList({}: UnitedAlgorithmsListProps) {
  const { data: algorithms, isLoading } = trpc.control.algorithms.listForAllBots.useQuery()
  return (
    <>
      {isLoading && <LoadingCard />}
      {algorithms?.map((algorithm) => (
        <MultipleBotsAlgorithmCard key={algorithm.name} algorithm={algorithm} />
      ))}
    </>
  )
}
