import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/db.ts')[env];

const db: any = {};
const sequelize: Sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

fs.readdirSync(__dirname)
  .filter(
    (file: any) => file.indexOf('.') !== 0
      && file !== path.basename(__filename)
      && file.slice(-3) === '.ts',
  )
  .forEach((file: any) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
