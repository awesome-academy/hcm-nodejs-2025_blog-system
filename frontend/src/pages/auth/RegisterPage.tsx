import { Form, Input, Button, Card, Radio } from "antd";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../styles/RegisterPage.css";
import {useAuthForm } from "../../hooks/useAuthForm";
import { useState } from "react";

const Register = () => {
  const { t } = useTranslation("register");
  const { handleRegister } = useAuthForm();
  const [role, setRole] = useState<"user" | "author">("user");

  return (
    <div className="register-container">
      <Card title={t("register_title")} className="register-card">
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item
            name="username"
            label={t("username")}
            rules={[{ required: true, message: t("username_required") }]}
          >
            <Input placeholder={t("username")} />
          </Form.Item>

          <Form.Item
            name="email"
            label={t("email")}
            rules={[
              { required: true, message: t("email_required") },
              { type: "email", message: t("email_invalid") },
            ]}
          >
            <Input placeholder="abc@gmail.com" />
          </Form.Item>

          <Form.Item
            name="fullName"
            label={t("full_name")}
            rules={[{ required: true, message: t("full_name_required") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={t("password")}
            rules={[{ required: true, message: t("password_required") }]}
          >
            <Input.Password />
          </Form.Item>

          {/* Role radio button */}
          <Form.Item
            name="role"
            label={t("role")}
            initialValue={role}
            rules={[{ required: true, message: t("role_required") }]}
          >
            <Radio.Group onChange={(e) => setRole(e.target.value)}>
              <Radio value="user" style={{ marginRight: 20 }}>
                {t("user")}
              </Radio>
              <Radio value="author">{t("author")}</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Các field chỉ hiện khi role = author */}
          {role === "author" && (
            <>
              <Form.Item name="penName" label={t("pen_name")}>
                <Input placeholder={t("pen_name")} />
              </Form.Item>
              <Form.Item name="bio" label={t("bio")}>
                <Input.TextArea placeholder={t("bio")} />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t("register")}
            </Button>
          </Form.Item>
        </Form>

        <div className="register-links">
          <p>
            {t("already_have_account")} <Link to="/login">{t("login")}</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
