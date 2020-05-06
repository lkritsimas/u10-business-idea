import { Model, BuildOptions } from 'sequelize';

export interface Swipes {
  id: string;
  fromUserId: string; // Swiping user
  toUserId: string; // User receiving swipe
  like: boolean;
}

export type SwipesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Swipes;
};
