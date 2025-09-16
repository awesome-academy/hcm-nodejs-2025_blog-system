import { AppDataSource } from '../data-source';
import { seedCategoriesAndTags } from './category-tag.seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    await seedCategoriesAndTags(dataSource);
    await dataSource.destroy();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
