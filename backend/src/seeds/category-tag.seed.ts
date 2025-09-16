import { DataSource } from 'typeorm';
import { Category } from '@/modules/categories/entities/category.entity';
import { Tag } from '@/modules/tags/entities/tag.entity';

export async function seedCategoriesAndTags(dataSource: DataSource) {
  const categoryRepo = dataSource.getRepository(Category);
  const tagRepo = dataSource.getRepository(Tag);

  const categories = [
    { name: 'Marketing', description: 'Các bài viết liên quan đến Marketing' },
    { name: 'Seo', description: 'Các bài viết liên quan đến SEO' },
    { name: 'Công nghệ', description: 'Các bài viết về Công nghệ' },
    { name: 'Viết lách', description: 'Các bài viết về kỹ năng viết' },
    { name: 'Design', description: 'Các bài viết về thiết kế' },
    { name: 'Kinh doanh', description: 'Các bài viết về kinh doanh' },
  ];

  const tags = [
    // Marketing
    'Facebook Ads', 'Google Ads', 'Content Marketing', 'Branding', 'Tiktok Marketing',
    // SEO
    'SEO Onpage', 'SEO Offpage', 'Backlink', 'Keyword Research', 'Technical SEO',
    // Công nghệ
    'JavaScript', 'React', 'AI', 'Cloud Computing', 'Cyber Security',
    // Viết lách
    'Copywriting', 'Storytelling', 'Blogging', 'Kỹ năng viết sáng tạo', 'Content Strategy',
    // Design
    'UI/UX', 'Figma', 'Photoshop', 'Illustrator', 'Typography',
    // Kinh doanh
    'Startup', 'Quản trị dự án', 'Kinh doanh online', 'E-commerce', 'Leadership',
  ];

  // Seed categories (nếu chưa có)
  for (const c of categories) {
    const exist = await categoryRepo.findOneBy({ name: c.name });
    if (!exist) {
      await categoryRepo.save(categoryRepo.create(c));
    }
  }

  // Seed tags (nếu chưa có) 
  for (const name of tags) {
    const exist = await tagRepo.findOneBy({ name });
    if (!exist) {
      await tagRepo.save(tagRepo.create({ name }));
    }
  }

  console.log('✅ Seed categories & tags done!');
}
