"use client"

import { cn } from "@/lib/utils"
import CompanyList from "@/app/companies/_components/company-list"
import SearchBar from "@/app/companies/_components/search-bar"

type Props = { className?: string }

function Page({ className }: Props) {
  return (
    <div className={cn(className, "flex flex-col space-y-4 mt-10")}>
      <h1 className={"text-2xl"}>Companies</h1>
      <SearchBar className={"mt-10"} />
      <CompanyList />
    </div>
  )
}

export default Page
