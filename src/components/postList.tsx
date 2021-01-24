import { List, Space, Tooltip, Image, message, Card, Popover, Badge } from "antd";
import {
	MessageOutlined,
	LikeOutlined,
	DislikeOutlined,
	RiseOutlined,
	TrophyOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { GetDefaultTopPosts } from "../api/reddit.service";
import { Post } from "../models/post.model";
import styled from "styled-components";
import { map, orderBy } from "lodash";
import { Award } from "../models/award.model";
import Avatar from "antd/lib/avatar/avatar";
const { Meta } = Card;

const PostList = () => {
	const placeholderImage = "data:image/png;base64,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";
	const [topPosts, setTopPosts] = useState([] as Post[]);
	const [listLoader, setLoader] = useState(true);

	useEffect(() => {
		GetDefaultTopPosts()
			.then((data: any) => {
				let topPostsResult = orderBy(map(
					data.data.children,
					(postData: any) => new Post(postData.data)
				), ['commentsCount'], ['desc']);
				setTopPosts(topPostsResult);
			})
			.catch((error) => {
				message.error(error);
			})
			.finally(() => {
				setLoader(false);
			});
	}, []);

	const orange = "#E7B392";
	const blue = "#8191A9";
	const gold = "#D4AF37";

	const StyleListItem = styled(List.Item) <{ score: number }>`
    	background-color: ${(props) => (props.score % 2 === 0 ? orange : blue)};
	  `;

	const StyledCard = styled(Card)`
		width: 450px;
	`;

	const GoldAwardBadge = styled(Badge)`
		.ant-badge-count {
			background-color: ${gold};
		}
	`;

	type IconTextProps = {
		icon: any;
		text: string | number;
	};
	const IconText = ({ icon, text }: IconTextProps) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);
	
	type AwardsIconTextProps = IconTextProps & {
		awards: Array<Award>
	};

	const AwardsIconText = ({ icon, text, awards }: AwardsIconTextProps) => (
		<Popover
			trigger="hover"
			placement="top"
			title="Awards Received"
			content={
				map(awards, award => {
					return (<p>
						<Space>
							<GoldAwardBadge
								count={award.awardedCount}
							>
								<Avatar shape="square" src={award.iconUrl} />
							</GoldAwardBadge>
							<span>{award.name}</span>
						</Space>
					</p>);
				})
			}
		>
			<Space>
				{React.createElement(icon)}
				{text}
			</Space>
		</Popover>
	);

	return (
		<List
			loading={listLoader}
			itemLayout="vertical"
			size="large"
			dataSource={topPosts}
			renderItem={(post) => (
				<StyleListItem
					score={post.score}
					key={post.id}
				>
					<StyledCard
						hoverable={true}
						cover={
							<Image
								height={400}
								alt="thumbnail"
								src={post.thumbnail}
								fallback={placeholderImage}
							/>
						}
						actions={[
							<IconText icon={LikeOutlined} text={post.ups} />,
							<IconText icon={DislikeOutlined} text={post.downs} />,
							<IconText icon={MessageOutlined} text={post.commentsCount} />,
							<IconText
								icon={RiseOutlined}
								text={`${post.upvoteRatio * 100}%`}
							/>,
							<AwardsIconText
								icon={TrophyOutlined}
								text={post.awardsReceivedCount}
								awards={post.awardsReceived}
							/>
						]}
					>
						<Meta
							title={
								<a href={post.permalink} target="_blank" rel="noreferrer">
									{post.title}
								</a>
							}
							description={
								<Tooltip title={post.getDateString()}>
									<span>
										By{" "}
										<a
											href={post.authorPermalink}
											target="_blank"
											rel="noreferrer"
										>{`/u/${post.author}`}</a>{" "}
										{post.getFromNowTime()}
									</span>
								</Tooltip>
							}
						/>
					</StyledCard>
				</StyleListItem>
			)}
		/>
	);
};

export default PostList;
