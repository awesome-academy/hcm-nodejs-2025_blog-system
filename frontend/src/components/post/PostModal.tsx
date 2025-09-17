import { useState, useEffect } from "react";
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
import type { RcFile, UploadFile } from "antd/es/upload";
import type {
  TagSerializer,
  CategorySerializer,
  CreatePostFormValues,
  CreateCategoryDto,
  CreateTagDto,
  UpdatePostFormValues,
  PostSerializer,
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
  updatePost?: (id: number, values: UpdatePostFormValues) => Promise<boolean>;
  editingPost?: PostSerializer | null;
}

const PostModal = ({
  visible,
  onClose,
  categories,
  tags,
  createNewPost,
  updatePost,
  editingPost,
}: Props) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<RcFile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("postModal");

  useEffect(() => {
    if (editingPost) {
      form.setFieldsValue({
        title: editingPost.title,
        category: editingPost.category?.name,
        tags: editingPost.tags?.map((t) => t.name),
      });
      setContent(editingPost.content);

      if (editingPost.imageUrl) {
        setPreviewImage(editingPost.imageUrl);
        setImageFile(null);
      }
    } else {
      form.resetFields();
      setContent("");
      setImageFile(null);
      setPreviewImage(null);
    }
  }, [editingPost, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const selectedCategory = categories.find(
        (c) => c.name === values.category
      );
      const category: CreateCategoryDto = selectedCategory
        ? { id: selectedCategory.id, name: selectedCategory.name }
        : { name: values.category };

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
        imageUrl: previewImage || undefined,
      };

      let success = false;
      if (editingPost && updatePost) {
        success = await updatePost(editingPost.id, payload);
      } else {
        success = await createNewPost(payload);
      }

      if (success) {
        form.resetFields();
        setContent("");
        setImageFile(null);
        setPreviewImage(null);
        onClose();
      }
    } catch (err) {
      message.error("Please fix the errors in the form.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Tạo fileList cho Upload component
  const fileList: UploadFile<RcFile>[] = [];
  if (imageFile) {
    fileList.push({
      uid: "1",
      name: imageFile.name,
      status: "done",
      originFileObj: imageFile,
    });
  } else if (previewImage) {
    fileList.push({
      uid: "1",
      name: "existing_image",
      status: "done",
      url: previewImage,
    } as UploadFile<RcFile>);
  }

  return (
    <Modal
      title={editingPost ? t("edit_modal_title") : t("modal_title")}
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

          <Form.Item label={t("cover_image_label")} name="image">
            <Upload
              listType="picture-card"
              beforeUpload={(file) => {
                setImageFile(file);
                setPreviewImage(null);
                return false;
              }}
              fileList={fileList}
              onRemove={() => {
                setImageFile(null);
                setPreviewImage(null);
              }}
            >
              {fileList.length === 0 && (
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
