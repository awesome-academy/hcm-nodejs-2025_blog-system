import {
  Card,
  Typography,
  Row,
  Col,
  Button,
  Tag,
  Divider,
  Input,
  Avatar,
  Space,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  ArrowRightOutlined,
  BookOutlined,
  EyeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "../../styles/HomePage.css";
import { useTranslation } from "react-i18next";

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const HomePage = () => {
  const { t } = useTranslation("home");

  // Dữ liệu mẫu (không cần đa ngôn ngữ)
  const categories = [
    { name: "Marketing", count: 128, color: "#f50" },
    { name: "SEO", count: 76, color: "#2db7f5" },
    { name: "Công nghệ", count: 95, color: "#87d068" },
    { name: "Viết lách", count: 64, color: "#108ee9" },
    { name: "Design", count: 42, color: "#ff85c0" },
    { name: "Kinh doanh", count: 58, color: "#722ed1" },
  ];

  const recentPosts = [
    {
      title: "Cách tối ưu hóa bài viết cho featured snippet",
      excerpt: "Hướng dẫn chi tiết cách tối ưu bài viết để xuất hiện trong featured snippet của Google...",
      date: "12/12/2023",
      author: "Nguyễn Văn A",
      category: "SEO",
      readTime: "7 phút",
      image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Tương lai của AI trong content creation",
      excerpt: "Phân tích về cách AI đang thay đổi ngành sáng tạo nội dung và những điều cần lưu ý...",
      date: "10/12/2023",
      author: "Trần Thị B",
      category: "Công nghệ",
      readTime: "9 phút",
      image: "https://d24rsy7fvs79n4.cloudfront.net/atd.ueh.edu.vn/20250126142515_5898_1737876315.3471.jpeg",
    },
    {
      title: "Case study: Chiến dịch content viral triệu view",
      excerpt: "Phân tích chiến dịch content viral đạt triệu view và bài học cho marketer...",
      date: "05/12/2023",
      author: "Lê Văn C",
      category: "Marketing",
      readTime: "11 phút",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Cách xây dựng content pillar cho website",
      excerpt: "Hướng dẫn từng bước xây dựng hệ thống content pillar để tăng traffic cho website...",
      date: "03/12/2023",
      author: "Phạm Thị D",
      category: "Content Strategy",
      readTime: "8 phút",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&q=60",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Title className="hero-title">
            <span className="gradient-text">Blog System</span> - {t("hero.title")}
          </Title>
          <Paragraph className="hero-description">
            {t("hero.description")}
          </Paragraph>

          <Search
            placeholder={t("hero.searchPlaceholder")}
            enterButton={
              <Button type="primary" icon={<SearchOutlined />}>
                {t("hero.searchBtn")}
              </Button>
            }
            size="large"
            className="search-bar"
          />

          <div className="hero-stats">
            <div className="stat">
              <Title level={2} className="stat-number">
                1,000+
              </Title>
              <Text className="stat-label">{t("hero.stats.posts")}</Text>
            </div>
            <div className="stat">
              <Title level={2} className="stat-number">
                500+
              </Title>
              <Text className="stat-label">{t("hero.stats.authors")}</Text>
            </div>
            <div className="stat">
              <Title level={2} className="stat-number">
                50,000+
              </Title>
              <Text className="stat-label">{t("hero.stats.readers")}</Text>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
            alt="Blog illustration"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <Divider>
          <Title level={2} className="section-title">
            {t("categories.title")}
          </Title>
        </Divider>
        <Paragraph className="section-description">
          {t("categories.description")}
        </Paragraph>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <Card
              key={index}
              hoverable
              className="category-card"
              actions={[<ArrowRightOutlined />]}
            >
              <div className="category-icon">
                <BookOutlined style={{ fontSize: "32px", color: category.color }} />
              </div>
              <Title level={4} className="category-name">
                {category.name}
              </Title>
              <Text type="secondary" className="category-count">
                {category.count} {t("categories.postsCount")}
              </Text>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="section">
        <Divider>
          <Title level={2} className="section-title">
            {t("recentPosts.title")}
          </Title>
        </Divider>
        <Paragraph className="section-description">
          {t("recentPosts.description")}
        </Paragraph>

        <Row gutter={[24, 24]}>
          {recentPosts.map((post, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                className="recent-post-card"
                hoverable
                cover={
                  <div className="post-image-container">
                    <img alt={post.title} src={post.image} />
                    <Tag color="blue" className="post-category-tag">
                      {post.category}
                    </Tag>
                  </div>
                }
              >
                <div className="post-content">
                  <Title level={4} className="post-title">{post.title}</Title>
                  <Paragraph ellipsis={{ rows: 3 }} className="post-excerpt">
                    {post.excerpt}
                  </Paragraph>

                  <div className="post-meta">
                    <Space size="small">
                      <Avatar size="small" icon={<UserOutlined />} />
                      <Text>{post.author}</Text>
                    </Space>
                    <Space size="small" className="post-date">
                      <CalendarOutlined />
                      <Text type="secondary">{post.date}</Text>
                    </Space>
                  </div>

                  <div className="post-footer">
                    <Space size="small">
                      <ClockCircleOutlined />
                      <Text type="secondary">{post.readTime}</Text>
                    </Space>
                    <Button type="link" size="small">
                      {t("recentPosts.readMore")} <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="view-all-container">
          <Button type="primary" size="large" icon={<EyeOutlined />}>
            {t("recentPosts.viewAll")}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
