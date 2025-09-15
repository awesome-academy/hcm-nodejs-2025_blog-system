import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  message,
  AutoComplete,
  Spin,
  Upload,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload";
import type {
  TagSerializer,
  CategorySerializer,
  CreatePostFormValues,
  CreateCategoryDto,
  CreateTagDto,
} from "../../types/authorPost.type";
import "../../styles/PostModal.css";
import { useTranslation } from "react-i18next";
const { Option } = Select;

interface Props {
  visible: boolean;
  onClose: () => void;
  categories: CategorySerializer[];
  tags: TagSerializer[];
  createNewPost: (values: CreatePostFormValues) => Promise<boolean>;
}

const PostModal = ({
  visible,
  onClose,
  categories,
  tags,
  createNewPost,
}: Props) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("postModal");

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Xử lý category: nếu chọn từ danh sách -> có id, còn nếu nhập mới -> chỉ có name
      const selectedCategory = categories.find(
        (c) => c.name === values.category
      );
      const category: CreateCategoryDto = selectedCategory
        ? { id: selectedCategory.id, name: selectedCategory.name }
        : { name: values.category };

      // Xử lý tags: nếu chọn từ list có sẵn -> có id, nếu nhập mới -> chỉ có name
      const tagDtos: CreateTagDto[] = (values.tags || []).map(
        (tagName: string) => {
          const existing = tags.find((t) => t.name === tagName);
          return existing
            ? { id: existing.id, name: existing.name }
            : { name: tagName };
        }
      );

      const payload: CreatePostFormValues = {
        title: values.title,
        content,
        category,
        tags: tagDtos,
        image: imageFile ? [{ originFileObj: imageFile }] : undefined,
      };

      const success = await createNewPost(payload);
      if (success) {
        form.resetFields();
        setContent("");
        setImageFile(null);
        onClose();
      }
    } catch (err) {
      message.error("Please fix the errors in the form.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={t("modal_title")}
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      okText={t("ok_button")}
      cancelText={t("cancel_button")}
      width="80vw"
      style={{ top: 0, padding: 0 }}
      className="post-modal"
      destroyOnClose
    >
      <Spin spinning={loading} tip={t("submitting_tip")}>
        <Form form={form} layout="vertical" className="post-modal-form">
          <Form.Item
            name="title"
            label={t("title_label")}
            rules={[{ required: true, message: t("title_required") }]}
          >
            <Input placeholder={t("title_placeholder")} />
          </Form.Item>

          <Form.Item
            name="category"
            label={t("category_label")}
            rules={[{ required: true, message: t("category_required") }]}
          >
            <AutoComplete
              options={categories.map((c) => ({ value: c.name }))}
              placeholder={t("category_placeholder")}
            />
          </Form.Item>

          <Form.Item
            name="tags"
            label={t("tags_label")}
            rules={[{ required: true, message: t("tags_required") }]}
          >
            <Select
              mode="tags"
              placeholder={t("tags_placeholder")}
              tokenSeparators={[","]}
            >
              {tags.map((tag) => (
                <Option key={tag.id} value={tag.name}>
                  {tag.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label={t("content_label")} required>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              className="post-modal-quill"
            />
          </Form.Item>

          <Form.Item
            label={t("cover_image_label")}
            name="image"
            rules={[{ required: true, message: t("cover_image_required") }]}
          >
            <Upload
              listType="picture-card"
              beforeUpload={(file) => {
                setImageFile(file);
                return false;
              }}
              fileList={
                imageFile
                  ? [
                      {
                        uid: "1",
                        name: imageFile.name,
                        status: "done",
                        originFileObj: imageFile,
                      },
                    ]
                  : []
              }
              onRemove={() => setImageFile(null)}
            >
              {!imageFile && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>{t("upload_button")}</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default PostModal;
