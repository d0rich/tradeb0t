import UnitedPortfolioCard from '@/src/features/portfolio/ui/UnitedPortfolioCard'
import UnitedAlgorithmsList from '../widgets/algorithm/UnitedAlgorithmsList'

export default function IndexPage() {
  return (
    <div>
      <UnitedPortfolioCard />
      <h2 className="text-2xl font-bold my-4">All bots algorithms</h2>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <UnitedAlgorithmsList />
      </div>
    </div>
  )
}
