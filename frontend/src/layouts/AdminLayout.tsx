import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/navbar/AdminSidebar";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <AdminSidebar />
      </Sider>

      <Layout>
        <Content style={{ padding: "24px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
