"use client"

import { cn } from "@/lib/utils"
import useSWRInfinite from "swr/infinite"
import { fetcher } from "@/lib/utils/fetcher"
import { APIResponse } from "@/lib/types/yc-api-response.types"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useFilterStore } from "@/lib/hooks/filter-store"

type Props = { className?: string }

function CompanyList({ className }: Props) {
  const filters = useFilterStore()

  const { data, size, setSize, isLoading, error } = useSWRInfinite<APIResponse>(
    (index, previousPageData: APIResponse) => {
      if (index === 0) {
        let searchString = `https://api.ycombinator.com/v0.1/companies`
        if (filters.search) searchString += `?q=${filters.search}`
        return searchString
      }
      if (previousPageData && !previousPageData.nextPage) return null

      return previousPageData.nextPage
    },
    fetcher,
  )

  const companies = data ? data.flatMap(page => page.companies) : []
  const isEmpty = !isLoading && companies.length === 0

  const { ref, inView } = useInView({
    threshold: 0.4,
  })

  const loadMore = () => {
    setSize(size => size + 1)
  }

  useEffect(() => {
    if (inView) {
      loadMore()
    }
  }, [inView])

  if (error) {
    return <div>Error...</div>
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isEmpty) {
    return <span>No companies found</span>
  }

  return (
    <div className={cn(className, "mt-10")}>
      <div
        className={"flex flex-col space-y-4 mt-10 items-center justify-center"}
      >
        {companies.map((company, index) => (
          <div key={index} className={"w-full"}>
            <h2>{company.name}</h2>
            <div className={" w-full h-[1px] bg-gray-200 "} />
          </div>
        ))}
        <Button ref={ref} onClick={loadMore}>
          Load More
        </Button>
      </div>
    </div>
  )
}

export default CompanyList
