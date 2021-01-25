import styled from "styled-components";
import "./App.css";
import { Layout, Space } from "antd";
import "antd/dist/antd.css";
import PostList from "./components/postList";
import React from "react";
import { RedditOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;


function App() {
	return (
		<div className="App">
			<StyledLayout>
				<Header style={{ color: "white" }}><Space><RedditOutlined />r/ProgrammerHumor Top20 Topics</Space></Header>
				<Content>
					<PostList />
				</Content>
				<Footer>Footer</Footer>
			</StyledLayout>
		</div>
	);
}

export default App;
