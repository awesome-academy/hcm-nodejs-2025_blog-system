import {
  Card,
  Form,
  Input,
  Button,
  Divider,
  Avatar,
  Spin,
  message,
  Modal,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../hooks/useUser";
import type {
  ProfileFormValues,
  ChangePasswordFormData,
} from "../../types/user.type";
import "../../styles/ProfilePage.css";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [form] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<ChangePasswordFormData>();
  const { user, updateProfileById, onChangePassword } = useUser();
  const { t } = useTranslation("profile");

  const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    form.setFieldsValue({
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      ...(user.role === "author" && {
        penName: user.author?.penName,
        bio: user.author?.bio,
      }),
    });
    setAvatarPreview(user.avatarUrl || null);
  }, [user, form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error(t("invalid_image_format"));
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = async () => {
    setIsSubmittingProfile(true);
    try {
      const values = await form.validateFields();
      await updateProfileById({
        ...values,
        image: avatarFile ? [{ originFileObj: avatarFile }] : undefined,
      });
      setAvatarFile(null);
    } finally {
      setIsSubmittingProfile(false);
    }
  };

  const handlePasswordSubmit = async (values: ChangePasswordFormData) => {
    setIsSubmittingPassword(true);
    const success = await onChangePassword(values);
    if (success) {
      passwordForm.resetFields();
      setPasswordModalVisible(false);
      setTimeout(() => {
        navigate("/");
      }, 500);
    }

    setIsSubmittingPassword(false);
  };
  return (
    <div className="profile-container">
      <Spin spinning={isSubmittingProfile}>
        <Card title={t("profile_info")} bordered={false}>
          <Form form={form} layout="vertical" onFinish={handleProfileSubmit}>
            <div className="avatar-wrapper">
              <input
                type="file"
                accept="image/*"
                id="avatarInput"
                hidden
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatarInput">
                <Avatar
                  size={160}
                  src={avatarPreview || undefined}
                  icon={<UserOutlined />}
                  style={{ cursor: "pointer" }}
                />
              </label>
            </div>

            <Form.Item
              label={t("full_name")}
              name="fullName"
              rules={[{ required: true, message: t("full_name_required") }]}
            >
              <Input placeholder={t("enter_full_name")} />
            </Form.Item>
            <Form.Item label={t("username")} name="username">
              <Input disabled />
            </Form.Item>

            <Form.Item label={t("email")} name="email">
              <Input disabled />
            </Form.Item>

            {/* Hiện thêm nếu user là author */}
            {user?.role === "author" && (
              <>
                <Form.Item
                  label={t("pen_name")}
                  name="penName"
                  rules={[{ required: true, message: t("pen_name_required") }]}
                >
                  <Input placeholder={t("enter_pen_name")} />
                </Form.Item>

                <Form.Item label={t("bio")} name="bio">
                  <Input.TextArea
                    rows={4}
                    placeholder={t("enter_bio")}
                    maxLength={500}
                  />
                </Form.Item>
              </>
            )}

            <Form.Item style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                {t("update_profile")}
              </Button>
            </Form.Item>
          </Form>

          <Divider />
          <div className="change-password-btn-wrapper">
            <Button type="dashed" onClick={() => setPasswordModalVisible(true)}>
              {t("change_password")}
            </Button>
          </div>
        </Card>
      </Spin>

      <Modal
        title={t("change_password")}
        open={isPasswordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Spin spinning={isSubmittingPassword}>
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordSubmit}
          >
            <Form.Item
              label={t("current_password")}
              name="currentPassword"
              rules={[
                { required: true, message: t("current_password_required") },
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item
              label={t("new_password")}
              name="newPassword"
              rules={[
                { required: true, message: t("new_password_required") },
                { min: 6, message: t("password_min_length") },
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item
              label={t("confirm_password")}
              name="confirmPassword"
              rules={[
                { required: true, message: t("confirm_password_required") },
                { min: 6, message: t("password_min_length") },
              ]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button
                onClick={() => setPasswordModalVisible(false)}
                style={{ marginRight: 8 }}
              >
                {t("cancel")}
              </Button>
              <Button type="primary" htmlType="submit">
                {t("change_password")}
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default ProfilePage;
