import { useEffect, useRef } from "react"
import { GitHubCalendar } from "react-github-calendar"

export default function GitHubGraph() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const interval = setInterval(() => {
      const scrollEl = container.querySelector<HTMLElement>(
        ".react-activity-calendar__scroll-container",
      )
      if (scrollEl && scrollEl.scrollWidth > scrollEl.clientWidth) {
        scrollEl.scrollLeft = scrollEl.scrollWidth
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={ref} className="bg-zinc-800/50 py-3 px-4 rounded-2xl backdrop-blur-sm w-full">
      <GitHubCalendar username="crspy2" fontSize={12} throwOnError />
    </div>
  )
}