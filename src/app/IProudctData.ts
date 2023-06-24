import { productGender, productType } from './usersType';

export declare type Iproduct = {
  id: number;
  imgSrc: string;
  name: string;
  price: number;
  onSale: boolean;
  quantity: number;
};

export interface Product {
  id: number;
  imgSrc: string;
  name: string;
  price: number;
  gender: productType;
  OnSale: boolean;
}

export type NewProductDto = {
  imgSrc: string;
  name: string;
  price: number;
  gender: productType;
  onSale: boolean;
  productType: productType;
};
export type UpdateProduct = {
  id: number;
  imgSrc: string;
  name: string;
  price: number;
  gender: productGender;
  productType: productType;
  onSale: boolean;
};
