import { Model, BuildOptions } from 'sequelize';

export interface Matches {
  readonly id: string;
  fromUserId: string;
  toUserId: string;
}

export type MatchesStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): Matches;
};
