import { useEffect, useState, useMemo } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Button,
  Tag,
  Avatar,
  Space,
  Pagination,
  Select,
  Input,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useUserPost } from "../../hooks/useUserPost";
import "../../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthor } from "../../hooks/useAuthor";
import AuthorModal from "../../components/author/authorInfo";
const { Title, Paragraph, Text } = Typography;
import { usePosts } from "../../hooks/useAuthorPost";
import { useAdmin } from "../../hooks/useAdmin";
const { Option } = Select;

const BlogList = () => {
  const { t } = useTranslation("blog");
  const { loadUserPosts, posts } = useUserPost();
  const { loadAuthorInfo, author, loading } = useAuthor();
  const { authors, loadAllAuthors } = useAdmin();

  const [currentPage, setCurrentPage] = useState(1);
  const [authorModalVisible, setAuthorModalVisible] = useState(false);

  const pageSize = 8;
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    title: "",
    authorName: "",
    categoryName: "",
    tagName: "",
    status: "approved",
  });
  const { loadTagsAndCategories, tags, categories } = usePosts();

  useEffect(() => {
    loadUserPosts(filter);
    loadTagsAndCategories();
    loadAllAuthors();
  }, [loadUserPosts, filter, loadTagsAndCategories, loadAllAuthors]);

  // Paginate
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, [posts, currentPage]);

  const handleOpenAuthor = async (authorId: number) => {
    await loadAuthorInfo(authorId);
    setAuthorModalVisible(true);
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="blog-list-container">
      <Title level={2}>{t("title")}</Title>

      <Space style={{ marginBottom: 16 }} className="search-filter-bar" wrap>
        <Input
          placeholder={t("titileInput")}
          value={filter.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder={t("author")}
          value={filter.authorName || undefined}
          onChange={(val) => handleFilterChange("authorName", val)}
          style={{ width: 150 }}
          allowClear
        >
          {authors.map((author) => (
            <Option key={author.id} value={author.penName}>
              {author.penName}
            </Option>
          ))}
        </Select>
        <Select
          placeholder={t("category")}
          value={filter.categoryName || undefined}
          onChange={(val) => handleFilterChange("categoryName", val)}
          style={{ width: 150 }}
          allowClear
        >
          {categories.map((cat) => (
            <Option key={cat.id} value={cat.name}>
              {cat.name}
            </Option>
          ))}
        </Select>
        <Select
          placeholder={t("tags")}
          value={filter.tagName || undefined}
          onChange={(val) => handleFilterChange("tagName", val)}
          style={{ width: 150 }}
          allowClear
        >
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.name}>
              {tag.name}
            </Option>
          ))}
        </Select>

        {/* Nút reset filter */}
        <Button
          type="primary"
          onClick={() =>
            setFilter({
              title: "",
              authorName: "",
              status: "approved",
              categoryName: "",
              tagName: "",
            })
          }
        >
          {t("resetFilters")}
        </Button>
      </Space>

      <Row gutter={[24, 24]}>
        {paginatedPosts.map((post) => {
          const excerpt = post.content.replace(/<[^>]+>/g, "").slice(0, 150);
          const readTime =
            Math.ceil(post.content.replace(/<[^>]+>/g, "").length / 200) +
            ` ${t("minute")}`;

          return (
            <Col xs={24} sm={12} lg={6} key={post.id}>
              <Card
                hoverable
                cover={
                  <div className="post-image-container">
                    <img alt={post.title} src={post.imageUrl} />
                    {post.category && (
                      <Tag color="blue" className="post-category-tag">
                        {post.category.name}
                      </Tag>
                    )}
                  </div>
                }
              >
                <div className="post-content">
                  <Title level={4}>{post.title}</Title>
                  <Paragraph ellipsis={{ rows: 3 }}>{excerpt}</Paragraph>

                  <div className="post-meta">
                    <Space size="small">
                      <Avatar size="small" icon={<UserOutlined />} />
                      <Text onClick={() => handleOpenAuthor(post.author.id)}>
                        {post.author?.penName}
                      </Text>
                    </Space>
                    <Space size="small" className="post-date">
                      <CalendarOutlined />
                      <Text type="secondary">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </Text>
                    </Space>
                  </div>

                  <div className="post-footer" style={{ marginTop: 8 }}>
                    <Space size="small">
                      <ClockCircleOutlined />
                      <Text type="secondary">{readTime}</Text>
                    </Space>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => navigate(`/blogs/${post.id}`)}
                    >
                      {t("readMore")} <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {posts.length > pageSize && (
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={posts.length}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      {/* Modal hiển thị thông tin tác giả */}
      <AuthorModal
        open={authorModalVisible}
        loading={loading}
        author={author}
        onClose={() => setAuthorModalVisible(false)}
        title={t("authorInfo")}
      />
    </div>
  );
};

export default BlogList;
