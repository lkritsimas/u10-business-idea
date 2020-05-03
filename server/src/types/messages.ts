import { Model, BuildOptions } from 'sequelize';

export interface Messages {
  readonly id: string;
  matchId: string;
  fromUserId: string;
  toUserId: string;
  message: string;
}

export type MessagesStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): Messages;
};
