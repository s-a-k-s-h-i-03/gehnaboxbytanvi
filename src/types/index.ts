export type ItemStockType = "READY_TO_SHIP" | "MADE_TO_ORDER";

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  categorySlug: string;
  price: number;
  mrp: number;
  itemType: ItemStockType;
  leadTimeDays: number;
  baseMaterial: string;
  platingType: string;
  stoneType: string;
  isGiftWrappable: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  variants: ProductVariant[];
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  badge: string;
  image: string;
  accentColor?: string;
}

export interface ReelItem {
  id: string;
  creatorName: string;
  handle: string;
  caption: string;
  videoPlaceholder: string;
  featuredProductSlug: string;
  likes: string;
  tag: string;
}
