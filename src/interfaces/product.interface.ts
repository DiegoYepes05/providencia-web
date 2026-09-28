export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  title: string;
  color: string;
  colorHex: string;
  motorW?: number | null;
  battery?: string | null;
  maxSpeed?: string | null;
  autonomy?: string | null;
  isActive?: boolean;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  color: string;
  image: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}
