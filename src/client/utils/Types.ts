export interface Shoes {
  id: Number;
  brand_name: string;
  model_name: string;
  price: Number;
  markdown: Number;
  type: string;
  purpose: string;
  imageURL: string;
}

export interface IMessage {
  id: Number;
  firstname: string;
  lastname: string;
  message: string;
  time: Date;
}
