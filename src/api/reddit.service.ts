export const baseUrl = "https://www.reddit.com";
const defaultSubreddit = "ProgrammerHumor";

export async function GetDefaultTopPosts(limit: number = 20): Promise<Response> {
    return GetTopPostsBySubReddit(defaultSubreddit, limit);
}

export async function GetTopPostsBySubReddit(subRedditName: string, limit: number = 20): Promise<Response> {
    let subredditUrl = `${baseUrl}/r/${subRedditName}/top.json?limit=${limit}&raw_json=1`;
    return fetch(subredditUrl, {
        mode: 'cors'
    })
    .then(res => res.json())
    .catch(error => error);
}