import { Model, BuildOptions } from 'sequelize';

export interface Users {
  readonly id: string;
  discoverable: boolean;
  githubUsername: string;
  name: string;
  gender: string;
  attractedTo: string[];
  age: Date;
  bio?: string;
  occupation?: string[];
  education?: string[];
  position: any;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  photo5?: string;
  photo6?: string;
  minAge?: number;
  maxAge?: number;
  maxDistance?: number;
  distanceType: string;
  refreshToken: string;
}

export type UsersStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): Users;
}
