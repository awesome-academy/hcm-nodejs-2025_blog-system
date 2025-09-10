import { Link } from "react-router-dom";
import { Form, Input, Button, Card, Modal } from "antd";
import "../../styles/LoginPage.css";
import { useTranslation } from "react-i18next";
import ForgotPassword from "../../components/ForgotPassword";
import { useState } from "react";
const Login = () => {
  const { t } = useTranslation("login");
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  return (
    <div className="login-container">
      <Card title={t("login_title")} className="login-card">
        <Form layout="vertical">
          <Form.Item
            name="username"
            label={t("username")}
            rules={[{ required: true, message: t("username_required") }]}
          >
            <Input placeholder={t("username")} />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("password")}
            rules={[{ required: true, message: t("password_required") }]}
          >
            <Input.Password placeholder={t("password")} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("login")}
            </Button>
          </Form.Item>
        </Form>

        <div className="login-links">
          <p>
            {t("dont_have_account")} <Link to="/register">{t("register")}</Link>
          </p>
          <p>
            <span style={{ color: "#1677ff", cursor: "pointer" }}>
              {t("not_verified")}
            </span>
          </p>
          <p>
            <span
              style={{ color: "#1677ff", cursor: "pointer" }}
              onClick={() => setIsForgotOpen(true)}
            >
              {t("forgot_password")}
            </span>
          </p>
        </div>
      </Card>
      <Modal
        open={isForgotOpen}
        onCancel={() => setIsForgotOpen(false)}
        footer={null}
        destroyOnClose
      >
        <ForgotPassword onSuccess={() => setIsForgotOpen(false)} />
      </Modal>
    </div>
  );
};

export default Login;
