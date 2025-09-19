import { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Avatar,
  Tag,
  Typography,
  Card,
  Modal,
  Input,
  Select,
  message,
} from "antd";
import { CheckOutlined, CloseOutlined, EyeOutlined } from "@ant-design/icons";
import { useAdmin } from "../../hooks/useAdmin";
import type { PostSerializer } from "../../types/authorPost.type";
import { useTranslation } from "react-i18next";
import "../../styles/BlogContent.css";
import { usePosts } from "../../hooks/useAuthorPost";
const { Title, Paragraph } = Typography;
const { Option } = Select;

const PostManagement = () => {
  const {
    posts,
    loading,
    loadAllPosts,
    approvalPost,
    authors,
    loadAllAuthors,
  } = useAdmin();
  const { loadTagsAndCategories, tags, categories } = usePosts();
  const { t } = useTranslation("postManagement");

  const [selectedPost, setSelectedPost] = useState<PostSerializer | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [postToReject, setPostToReject] = useState<PostSerializer | null>(null);

  const [filter, setFilter] = useState({
    title: "",
    authorName: "",
    status: "pending",
    categoryName: "",
    tagName: "",
  });
  useEffect(() => {
    loadAllPosts(filter);
    loadTagsAndCategories();
    loadAllAuthors();
  }, [loadAllPosts, loadTagsAndCategories, loadAllAuthors, filter]);

  const handleFilterChange = (field: string, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const showDetail = (post: PostSerializer) => {
    setSelectedPost(post);
    setDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setDetailVisible(false);
    setSelectedPost(null);
  };

  const columns = [
    {
      title: t("thumbnail"),
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 90,
      align: "center" as const,
      render: (imageUrl: string) =>
        imageUrl ? <Avatar shape="square" size={64} src={imageUrl} /> : "-",
    },
    {
      title: t("title"),
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (text: string) => (
        <span style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
          {text}
        </span>
      ),
    },
    {
      title: t("author"),
      dataIndex: ["author", "penName"],
      key: "author",
      width: 150,
      render: (_: PostSerializer, record: PostSerializer) =>
        record.author?.penName || "-",
    },
    {
      title: t("category"),
      dataIndex: ["category", "name"],
      key: "category",
      width: 150,
      render: (_: PostSerializer, record: PostSerializer) =>
        record.category?.name || "-",
    },
    {
      title: t("tags"),
      dataIndex: "tags",
      key: "tags",
      render: (_: PostSerializer, record: PostSerializer) =>
        record.tags && record.tags.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
            {record.tags.map((tag) => (
              <Tag key={tag.id} color="blue">
                {tag.name}
              </Tag>
            ))}
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => {
        switch (status) {
          case "published":
            return <Tag color="green">{t("published")}</Tag>;
          case "rejected":
            return <Tag color="red">{t("rejected")}</Tag>;
          default:
            return <Tag color="orange">{t("pending")}</Tag>;
        }
      },
    },
    {
      title: t("action"),
      key: "action",
      width: 320,
      render: (_: PostSerializer, record: PostSerializer) => (
        <Space wrap>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showDetail(record)}
          >
            {t("viewDetail")}
          </Button>
          <Button
            size="small"
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => approvalPost(record.id, { status: "approved" })}
          >
            {t("publish")}
          </Button>
          <Button
            size="small"
            danger
            icon={<CloseOutlined />}
            onClick={() => {
              setPostToReject(record);
              setRejectReason("");
              setRejectModalVisible(true);
            }}
          >
            {t("reject")}
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (!selectedPost) return;

    const toc = document.querySelector("#toc ul");
    const headers = document.querySelectorAll("#blog h2");

    if (!toc || headers.length === 0) return;

    toc.innerHTML = "";

    headers.forEach((header, index) => {
      const id = "heading-" + index;
      header.id = id;

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + id;
      a.textContent = header.textContent || "";

      li.appendChild(a);
      toc.appendChild(li);
    });

    // xóa hết listener cũ trước khi add mới
    const links = toc.querySelectorAll("a");
    links.forEach((link) => {
      link.replaceWith(link.cloneNode(true));
    });

    toc.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute(
          "href"
        );
        if (targetId) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            window.scrollTo({
              top: targetEl.getBoundingClientRect().top + window.scrollY - 80,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }, [selectedPost]);

  return (
    <Card style={{ padding: "20px" }}>
      <Title level={3}>{t("postManagement")}</Title>

      {/* Filter UI */}
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder={t("title")}
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
        <Select
          placeholder={t("status")}
          value={filter.status || undefined}
          onChange={(val) => handleFilterChange("status", val)}
          style={{ width: 150 }}
          allowClear
        >
          <Option value="pending">{t("pending")}</Option>
          <Option value="approved">{t("approved")}</Option>
          <Option value="rejected">{t("rejected")}</Option>
        </Select>

        {/* Nút reset filter */}
        <Button
          type="primary"
          onClick={() =>
            setFilter({
              title: "",
              authorName: "",
              status: "pending",
              categoryName: "",
              tagName: "",
            })
          }
        >
          {t("resetFilters")}
        </Button>
      </Space>

      <Table
        rowKey="id"
        dataSource={posts}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
        style={{ wordBreak: "break-word" }}
      />

      <Modal
        open={detailVisible}
        title={<Title level={2}>{t("postDetail")}</Title>}
        onCancel={handleCloseDetail}
        footer={null}
        width={900}
      >
        {selectedPost && (
          <div>
            <h2>{selectedPost.title}</h2>
            <p>
              <b>{t("author")}:</b> {selectedPost.author?.penName}
            </p>
            <p>
              <b>{t("category")}:</b> {selectedPost.category?.name}
            </p>
            <p>
              <b>{t("tags")}:</b>{" "}
              {selectedPost.tags.map((tag) => (
                <Tag key={tag.id} color="blue">
                  {tag.name}
                </Tag>
              ))}
            </p>

            {/* TOC */}
            <div id="toc" className="toc-container">
              <h3>{t("tableOfContents")}</h3>
              <ul></ul>
            </div>

            {/* Blog content */}
            <Paragraph
              key={selectedPost?.id}
              id="blog"
              className="blog-content"
              style={{ whiteSpace: "normal", wordBreak: "break-word" }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: selectedPost.content.replace(/&nbsp;/g, " "),
                }}
              />
            </Paragraph>
          </div>
        )}
      </Modal>

      <Modal
        open={rejectModalVisible}
        title={t("rejectPost")}
        onCancel={() => setRejectModalVisible(false)}
        onOk={async () => {
          if (!rejectReason.trim()) {
            return message.error(t("reject_reason_required"));
          }
          if (postToReject) {
            await approvalPost(postToReject.id, {
              status: "rejected",
              rejectionReason: rejectReason,
            });
          }
          setRejectModalVisible(false);
        }}
      >
        <Input.TextArea
          placeholder={t("enter_reject_reason")}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={4}
        />
      </Modal>
    </Card>
  );
};

export default PostManagement;
