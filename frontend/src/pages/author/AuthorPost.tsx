import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Typography,
  Space,
  Tag,
  Avatar,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { usePosts } from "../../hooks/useAuthorPost";
import PostModal from "../../components/post/PostModal";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;

const AuthorPost = () => {
  const { t } = useTranslation("post");
  const {
    posts,
    loadPosts,
    loading,
    tags,
    categories,
    loadTagsAndCategories,
    createNewPost,
  } = usePosts();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadPosts();
    loadTagsAndCategories();
  }, [loadPosts, loadTagsAndCategories]);

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <div>
      {/* Header + Create Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title level={2}>{t("my_posts_title")}</Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          {t("create_post_button")}
        </Button>
      </div>

      <Divider />

      {/* List Post */}
      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col xs={24} sm={12} lg={6} key={post.id}>
            <Card
              hoverable
              size="small"
              style={{ borderRadius: 8 }}
              cover={
                post.imageUrl ? (
                  <img
                    alt={post.title}
                    src={post.imageUrl}
                    style={{
                      height: 120,
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                ) : null
              }
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit()} />,
                <Popconfirm
                  title={t("delete_post_confirm")}
                  onConfirm={() => handleDelete()}
                  okText={t("yes")}
                  cancelText={t("no")}
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <Tag color="blue" style={{ fontSize: 12, marginBottom: 4 }}>
                {post.category?.name}
              </Tag>
              <Title level={5} style={{ margin: "4px 0" }}>
                {post.title}
              </Title>
              <Paragraph
                ellipsis={{ rows: 3 }}
                style={{ fontSize: 12, marginBottom: 8 }}
              >
                <span dangerouslySetInnerHTML={{ __html: post.content }} />
              </Paragraph>
              <Space size="small">
                <Avatar size={20} icon={<UserOutlined />} />
                <Text style={{ fontSize: 12 }}>
                  {post.author?.penName || post.author?.id}
                </Text>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {posts.length === 0 && !loading && (
        <Text type="secondary">{t("no_posts_yet")}</Text>
      )}

      {/* Modal for Create Post */}
      <PostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categories={categories}
        tags={tags}
        createNewPost={createNewPost}
      />
    </div>
  );
};

export default AuthorPost;
