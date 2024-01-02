import { Octokit, RestEndpointMethodTypes } from "@octokit/rest"

const octokit = new Octokit()

export const getGithubReleases = async () => {
    const releases = await octokit.repos.listReleases({
        owner: 'dead8309',
        repo: 'kiitracker-app',
    })
    return releases.data
}