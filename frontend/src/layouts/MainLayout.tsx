import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MainNavbar from "../components/navbar/MainNavbar";
import Footer from "../components/Footer";
const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <MainNavbar />
      </Header>

      <Content style={{ padding: "24px", minHeight: "calc(100vh - 134px)" }}>
        <Outlet />
      </Content>

      <Footer />
    </Layout>
  );
};

export default MainLayout;
