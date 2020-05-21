export type Error = {
  status?: number;
  message?: string;
};

export interface IUser {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: string;
  _created?: Date;
}

export interface IShoe {
  id?: number;
  model_name?: string;
  brand_name?: string;
  price?: number;
  type?: string;
  purpose?: string;
  image?: string;
}

export interface IPayload {
  [key: string]: any;
  userid: number;
  unique?: string;
}
