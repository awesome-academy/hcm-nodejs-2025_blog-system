import { Menu } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useTranslation } from "react-i18next";

const AdminSidebar = () => {
  const { handleLogout } = useAuthForm();
  const { t } = useTranslation("navbar");

  return (
    <Menu theme="dark" mode="inline">
      <Menu.Item key="users" icon={<UserOutlined />}>
        <Link to="/admin/users">{t("manageUsers")}</Link>
      </Menu.Item>
      <Menu.Item key="posts" icon={<FileTextOutlined />}>
        <Link to="/admin/posts">{t("managePosts")}</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        {t("logout")}
      </Menu.Item>
    </Menu>
  );
};

export default AdminSidebar;
