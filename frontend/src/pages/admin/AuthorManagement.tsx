import { useEffect } from "react";
import { Table, Space, Button, Avatar, Tag, Typography, Card } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useAdmin } from "../../hooks/useAdmin";
import type { AuthorSerializer } from "../../types/author.type";
import { useTranslation } from "react-i18next";
const { Title } = Typography;

const AuthorApprovalManagement = () => {
  const { pendingAuthors, loading, approvalAuthor, loadPendingAuthors } =
    useAdmin();
  const { t } = useTranslation("author");

  useEffect(() => {
    loadPendingAuthors();
  }, [loadPendingAuthors]);

  const columns = [
    {
      title: t("avatar"),
      dataIndex: ["user", "avatarUrl"],
      key: "avatar",
      render: (avatarUrl: string) => <Avatar src={avatarUrl} size={50} />,
    },
    {
      title: t("penName"),
      dataIndex: "penName",
      key: "penName",
    },
    {
      title: t("fullName"),
      dataIndex: ["user", "fullName"],
      key: "fullName",
    },
    {
      title: t("email"),
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: t("status"),
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved: "pending" | "approved" | "rejected") => {
        switch (isApproved) {
          case "approved":
            return <Tag color="green">{t("approved")}</Tag>;
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
      render: (_: AuthorSerializer, record: AuthorSerializer) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() =>
              approvalAuthor(record.id, { isApproved: "approved" })
            }
          >
            {t("approve")}
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() =>
              approvalAuthor(record.id, { isApproved: "rejected" })
            }
          >
            {t("reject")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ padding: "20px" }}>
      <Title level={3}>{t("authorApprovalManagement")}</Title>
      <Table
        rowKey="id"
        dataSource={pendingAuthors}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default AuthorApprovalManagement;
