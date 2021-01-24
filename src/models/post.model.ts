import { Award } from "./award.model";
import { get, map } from "lodash";
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { baseUrl } from '../api/reddit.service';

dayjs.extend(relativeTime);

export class Post {
	id: string;
    subreddit: string;
    selfText: string;
    author: string;
    authorPermalink: string;
    authorFullname: string;
    title: string;
    upvoteRatio: number;
    ups: number;
    downs: number;
    isOriginalContent: boolean;
    score: number;
    thumbnail: string;
    createdDateUtc: number;
    commentsCount: number;
    permalink: string;
    awardsReceivedCount: number;
    awardsReceived: Array<Award>

    constructor(data: any) {
		this.id = data.id ?? "";
        this.subreddit = data.subreddit ?? "";
        this.selfText = data.selftext ?? "";
        this.author = data.author ?? "";
        this.authorPermalink = `${baseUrl}/u/${data.author}` ?? "";
        this.authorFullname = data.author_fullname ?? "";
        this.ups = data.ups ?? 0;
        this.downs = data.downs ?? 0;
        this.upvoteRatio = data.upvote_ratio ?? 0;
        this.title = data.title ?? "";
        this.isOriginalContent = data.is_original_content;
        this.score = data.score ?? 0;
        this.thumbnail = get(data, 'preview.images[0].source.url') ?? "";
        this.createdDateUtc = data.created_utc;
        this.commentsCount = data.num_comments ?? 0;
        this.permalink = `${baseUrl}${data.permalink}` ?? "";
        this.awardsReceivedCount = data.total_awards_received ?? 0;
        this.awardsReceived = this.MapAwards(data.all_awardings ?? []);
    }

    private MapAwards(awards: Array<any>): Array<Award> {
        return map(awards, (award: any) => new Award(award));
    }

    public getDateString(): string {
        let date = new Date(0);
        date.setUTCSeconds(this.createdDateUtc);
        return date.toString();
    }

    public getFromNowTime(): string {
        let date = dayjs.unix(this.createdDateUtc);
        return date.fromNow();
    }
}