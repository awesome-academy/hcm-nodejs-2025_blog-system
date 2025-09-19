import { Modal, Spin, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { AuthorSerializer } from "../../types/author.type";
import { useTranslation } from "react-i18next";
const { Title, Paragraph, Text } = Typography;

interface AuthorModalProps {
  open: boolean;
  loading: boolean;
  author: AuthorSerializer | null;
  onClose: () => void;
  title?: string;
}

const AuthorModal: React.FC<AuthorModalProps> = ({
  open,
  loading,
  author,
  onClose,
  title,
}) => {
  const { t } = useTranslation("blog");
  return (
    <Modal
      open={open}
      title={title || t("authorInfo")}
      onCancel={onClose}
      footer={null}
    >
      {loading ? (
        <Spin />
      ) : author ? (
        <div style={{ textAlign: "center" }}>
          <Avatar src={author.avatarUrl} size={64} icon={<UserOutlined />} />
          <Title level={4} style={{ marginTop: 12 }}>
            {author.penName}
          </Title>
          <Paragraph>{author.bio}</Paragraph>
        </div>
      ) : (
        <Text>{t("noData")}</Text>
      )}
    </Modal>
  );
};

export default AuthorModal;
