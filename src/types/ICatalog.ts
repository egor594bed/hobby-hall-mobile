export interface ICategory {
  _id: string;
  name: string;
  imgSrc: string;
  subCategories: ISubCategory[];
}

export interface ISubCategory {
  _id: string;
  name: string;
  imgSrc: string;
  categoryId?: string;
  subCategories?: ISubCategory[];
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  article: string;
  imgSrc?: string;
  quantity: number;
  subCategoryId: string;
  description?: string;
  colors?: string[];
  total?: number;
}
