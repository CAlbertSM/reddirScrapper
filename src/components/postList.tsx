import { List, Space, Tooltip, message } from 'antd';
import { MessageOutlined, LikeOutlined, DislikeOutlined, RiseOutlined, TrophyOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { GetDefaultTopPosts } from '../api/reddit.service';
import { Post } from '../models/post.model';
import styled from 'styled-components';
import { map } from 'lodash';

const PostList = () => {
    const [topPosts, setTopPosts] = useState([] as Post[]);

    useEffect(() => {
      GetDefaultTopPosts().then((data:any) => {
        let topPostsResult = map(data.data.children, (postData:any) => new Post(postData.data));
        console.log(topPosts);
        console.log(topPostsResult);
        setTopPosts(topPostsResult);
      }).catch((error) => {
        message.error(error);
      });
    }, []);


    type IconTextProps = {
      icon: any;
      text: string|number;
    }
    const IconText = ({icon, text}: IconTextProps) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    
    const orange = "#E7B392";
    const blue = "#8191A9";
    const StyleListItem = styled(List.Item)<{score: number}>`
      background-color: ${props => (props.score % 2 === 0 ? orange : blue)}
    `;

    const Thumbnail = styled.img`
      
    `;

    return (
        <List
            itemLayout="vertical"
            size="large"
            dataSource={topPosts}
            renderItem={ post => (
                <StyleListItem
                  score={post.score}
                  key={post.id}
                  actions={[
                    <IconText icon={LikeOutlined} text={post.ups}/>,
                    <IconText icon={DislikeOutlined} text={post.downs}/>,
                    <IconText icon={MessageOutlined} text={post.commentsCount}/>,
                    <IconText icon={RiseOutlined} text={`${post.upvoteRatio * 100}% Upvoted`}/>,
                    <IconText icon={TrophyOutlined} text={`${post.awardsReceivedCount} Award${post.awardsReceivedCount === 1 ? '' : 's'} Received`}/>
                  ]}
                  extra={
                    <Thumbnail
                      width={272}
                      height={272}
                      alt="thumbnail"
                      src={post.thumbnail}
                    />
                  }
                >
                  <List.Item.Meta
                    title={<a href={post.permalink} target="_blank" rel="noreferrer">{post.title}</a>}
                    description={<Tooltip title={post.getDateString()}><span>By <a href={post.authorPermalink} target="_blank" rel="noreferrer">{`/u/${post.author}`}</a> {post.getFromNowTime()}</span></Tooltip>}
                  />
                </StyleListItem>
              )}
        />
    );
}

export default PostList;