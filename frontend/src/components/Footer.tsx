import { Row, Col, Typography, Input, Button, Divider, Space } from "antd";
import {
  BookOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  SendOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "../styles/Footer.css";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const Footer = () => {
  const { t } = useTranslation("footer");

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Row gutter={[40, 30]}>
          {/* Thương hiệu */}
          <Col xs={24} md={8}>
            <div className="footer-brand">
              <Space direction="horizontal" size="small">
                <BookOutlined className="brand-icon" />
                <Title level={4} className="brand-text">
                  BlogSystem
                </Title>
              </Space>
              <Text className="brand-description">
                {t("brandDescription")}
              </Text>
            </div>

            <div className="social-links">
              <Space size="middle">
                <Button type="text" icon={<FacebookOutlined />} className="social-btn" />
                <Button type="text" icon={<TwitterOutlined />} className="social-btn" />
                <Button type="text" icon={<InstagramOutlined />} className="social-btn" />
                <Button type="text" icon={<YoutubeOutlined />} className="social-btn" />
              </Space>
            </div>
          </Col>

          {/* Danh mục */}
          <Col xs={24} sm={12} md={5}>
            <Title level={5} className="footer-title">
              {t("categories.title")}
            </Title>
            <ul className="footer-links">
              <li><a href="#">{t("categories.marketing")}</a></li>
              <li><a href="#">{t("categories.seo")}</a></li>
              <li><a href="#">{t("categories.tech")}</a></li>
              <li><a href="#">{t("categories.writing")}</a></li>
              <li><a href="#">{t("categories.design")}</a></li>
              <li><a href="#">{t("categories.business")}</a></li>
            </ul>
          </Col>

          {/* Liên kết nhanh */}
          <Col xs={24} sm={12} md={5}>
            <Title level={5} className="footer-title">
              {t("quickLinks.title")}
            </Title>
            <ul className="footer-links">
              <li><a href="#">{t("quickLinks.home")}</a></li>
              <li><a href="#">{t("quickLinks.featuredPosts")}</a></li>
              <li><a href="#">{t("quickLinks.aboutUs")}</a></li>
              <li><a href="#">{t("quickLinks.terms")}</a></li>
              <li><a href="#">{t("quickLinks.privacy")}</a></li>
              <li><a href="#">{t("quickLinks.contact")}</a></li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col xs={24} md={6}>
            <Title level={5} className="footer-title">
              {t("newsletter.title")}
            </Title>
            <Text>{t("newsletter.description")}</Text>

            <div className="newsletter-form">
              <Input
                placeholder={t("newsletter.placeholder")}
                size="large"
                className="newsletter-input"
              />
              <Button
                type="primary"
                size="large"
                icon={<SendOutlined />}
                className="newsletter-btn"
              >
                {t("newsletter.subscribe")}
              </Button>
            </div>
          </Col>
        </Row>

        <Divider className="footer-divider" />

        {/* Contact & bản quyền */}
        <Row gutter={[20, 20]} align="middle">
          <Col xs={24} md={12}>
            <Space size="small" direction="vertical">
              <Space size="small">
                <EnvironmentOutlined />
                <Text>{t("contact.address")}</Text>
              </Space>
              <Space size="small">
                <PhoneOutlined />
                <Text>{t("contact.phone")}</Text>
              </Space>
              <Space size="small">
                <MailOutlined />
                <Text>{t("contact.email")}</Text>
              </Space>
            </Space>
          </Col>

          <Col xs={24} md={12} className="footer-copyright">
            <Text>{t("copyright")}</Text>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
