"use client"

import { cn } from "@/lib/utils"
import useSWR from "swr"
import { fetcher } from "@/lib/utils/fetcher"
import { WeatherResponse } from "@/lib/types/weather.types"

type Props = { className?: string }

function Page({ className }: Props) {
  const { data, error, isLoading } = useSWR<WeatherResponse>(
    "https://api.tomorrow.io/v4/weather/realtime?location=toronto&apikey=vqG6hlif6vh8happOknYTnRUFxIw6iyX",
    fetcher,
    { shouldRetryOnError: false },
  )

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>Empty</div>

  return (
    <div className={cn(className, "mt-10")}>
      <h1 className={"text-2xl"}>Weather</h1>
      <p className={"text-md"}>
        Weather in {data.location.name} is {data.data.values.temperature}{" "}
        degrees
      </p>
    </div>
  )
}

export default Page
