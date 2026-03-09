import GitHubCalendar from "react-github-calendar"

export default function GitHubGraph() {
  return (
    <div className="bg-zinc-800/50 py-3 px-4 rounded-2xl backdrop-blur-sm w-full overflow-x-auto github-graph-scroll">
      <GitHubCalendar username="crspy2" fontSize={12} throwOnError />
    </div>
  )
}
