import { Modal, Spin, Avatar, Typography, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type { AuthorSerializer } from "../../types/author.type";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useFollower } from "../../hooks/useFollower";

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
  const { followedAuthors, loadFollowedAuthors, followAuthor, unfollowAuthor } =
    useFollower();

  // load danh sách follow khi mở modal
  useEffect(() => {
    if (open) loadFollowedAuthors();
  }, [open, loadFollowedAuthors]);

  const isFollowed = author
    ? followedAuthors.some((f) => f.author?.id === author.id)
    : false;

  const handleToggleFollow = async () => {
    if (!author) return;
    if (isFollowed) {
      await unfollowAuthor(author.id);
    } else {
      await followAuthor(author.id);
      await loadFollowedAuthors();
    }
  };

  return (
    <Modal
      open={open}
      title={title || t("authorInfo")}
      onCancel={onClose}
      footer={[
        <Button
          key="follow"
          type={isFollowed ? "default" : "primary"}
          onClick={handleToggleFollow}
        >
          {isFollowed ? t("unfollow") : t("follow")}
        </Button>,
      ]}
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
