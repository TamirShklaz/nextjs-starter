import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useFilterStore } from "@/lib/hooks/filter-store"

type Props = { className?: string }

function SearchBar({ className }: Props) {
  const filterStore = useFilterStore()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    filterStore.onSearchChange(e.target.value)
  }

  return (
    <Input
      className={cn(className)}
      placeholder={"Search..."}
      onChange={handleSearchChange}
    />
  )
}

export default SearchBar
