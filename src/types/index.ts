export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface ProductListItem {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ProductDetail extends ProductListItem {
  description: string;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: ProductListItem[];
  specs: Record<string, string>;
}

export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  imageUrl: string;
  color: string;
  storage: string;
  price: number;
  quantity: number;
}
