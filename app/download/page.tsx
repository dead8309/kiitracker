import { DownloadCard } from "../../components/md-download-card"
import { getGithubReleases } from "./get-github-releases"

export default async function DownloadPage() {
  const releases = await getGithubReleases()

  return (
    <main className="flex flex-col items-center gap-8 py-8 px-4">
      <h1 className="text-5xl sm:text-6xl font-bold">Download</h1>
      <p className="text-lg text-muted-foreground">
        Select the version you want to download
      </p>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {releases.map((release, index) => {
          return (
            <div key={release.id}>
              <DownloadCard
                latest={index === 0}
                url={release.html_url}
                version={release.tag_name}
                published_at={release.published_at}
                body={release.body}
                download_url={release.assets[0].browser_download_url}
                size={(release.assets[0].size / 1e6).toFixed(1)}
              />
            </div>
          )
        })}
      </section>
    </main>
  )
}
