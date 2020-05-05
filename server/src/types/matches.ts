import { Model, BuildOptions } from 'sequelize';

export interface Matches {
  readonly id: string;
  userId1: string;
  userId2: string;
  unmatchedAt: string;
}

export type MatchesStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): Matches;
};
