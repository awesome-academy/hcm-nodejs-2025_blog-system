import { Modal, List, Avatar, Button, Spin, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useFollower } from "../../hooks/useFollower";
import { useEffect } from "react";
import type { FollowerSerializer } from "../../types/follower.type";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

interface FollowedAuthorsModalProps {
  open: boolean;
  onClose: () => void;
}

const FollowedAuthorsModal: React.FC<FollowedAuthorsModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation("blog");
  const { followedAuthors, loading, loadFollowedAuthors, unfollowAuthor } =
    useFollower();

  useEffect(() => {
    if (open) {
      loadFollowedAuthors();
    }
  }, [open, loadFollowedAuthors]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={t("followedAuthors")}
    >
      {loading ? (
        <Spin />
      ) : followedAuthors.length === 0 ? (
        <Text>{t("noFollowedAuthors")}</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={followedAuthors}
          renderItem={(f: FollowerSerializer) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => unfollowAuthor(f.author.id)}
                >
                  {t("unfollow")}
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={f.author.avatarUrl} icon={<UserOutlined />} />
                }
                title={f.author.penName}
                description={f.author.bio}
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

export default FollowedAuthorsModal;
