export interface GoodsImage {
  id: number;
  url: string;
}

export interface Goods {
  id: number;
  goodsName: string;
  price: number;
  description: string;
  goodsImages: GoodsImage[];
}

export type GoodsList = Goods[];
