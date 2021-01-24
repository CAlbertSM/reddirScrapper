import styled from "styled-components";
import "./App.css";
import { Layout } from "antd";
import "antd/dist/antd.css";
import PostList from "./components/postList";

const { Header, Footer, Content } = Layout;

const StyledLayout = styled(Layout)`
  height: 100vh;
`;


function App() {
  return (
    <div className="App">
      <StyledLayout>
        <Header>Header</Header>
        <Content>
			<PostList/>
		</Content>
        <Footer>Footer</Footer>
      </StyledLayout>
    </div>
  );
}

export default App;
