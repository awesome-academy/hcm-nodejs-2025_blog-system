import { Menu, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/MainNavbar.css";
import { useTranslation } from "react-i18next";
import { useAuthForm } from "../../hooks/useAuthForm";
import LanguageSwitcher from "../LanguageSwitcher";
const MainNavbar = () => {
  const { isLoggedIn, user } = useAuthContext();
  const { t } = useTranslation("navbar");
  const { handleLogout } = useAuthForm();

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">{t("profile")}</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        {t("logout")}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="main-navbar">
      {/* Menu trái */}
      <Menu
        theme="light"
        mode="horizontal"
        selectable={false}
        className="menu-left"
      >
        <Menu.Item key="home">
          <Link to="/">{t("home")}</Link>
        </Menu.Item>
        <Menu.Item key="blogs">
          <Link to="/blogs">{t("blogs")}</Link>
        </Menu.Item>
        {user?.role === "author" && (
          <Menu.Item key="my-posts">
            <Link to="/author/posts">{t("myPosts")}</Link>
          </Menu.Item>
        )}
      </Menu>

      {/* Menu phải */}
      <div className="menu-right">
        <LanguageSwitcher />

        {isLoggedIn ? (
          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className="user-avatar">
              <Avatar icon={<UserOutlined />} />
            </div>
          </Dropdown>
        ) : (
          <Menu theme="light" mode="horizontal" selectable={false}>
            <Menu.Item key="login">
              <Link to="/login">{t("login")}</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">{t("register")}</Link>
            </Menu.Item>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default MainNavbar;
