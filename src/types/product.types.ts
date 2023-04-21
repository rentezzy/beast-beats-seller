export interface IProductStoreState {
  products: IProduct[];
  search: {
    searchName: string;
  };
}
export interface IProduct {
  id: number;
  beatName: string;
  beatAuthor: string;
  images: {
    big: string;
    small: string;
  };
  duration: number;
}
export interface IProductData extends Omit<IProduct, "id"> {}
