// Danh sách sản phẩm
export interface IResProduct {
  id: number;
  parentId: number;
  code: string;
  barcode: string;
  name: string;
  otherName: string;
  status: number;
  category: IResCategory;
  internalCategory: IResInternalCategory;
  prices: IResPrices;
  vat: number;
  images: IResImages;
  order: number;
  previewLink: string;
  shows: IResShows;
  warranty: IResWarranty;
  brand: IResBrand;
  type: number;
  shipping: IResShipping;
  countryName: string;
  units: IResUnits;
  combos: any[];
  inventory: IResInventory;
  attributes: IResAttribute[];
  updatedAt: number;
  createdAt: number;
  createdDateTime: string;
}

interface IResCategory {
  id: number;
  name: string;
  code: string;
}

interface IResInternalCategory {
  id: number;
  name: string;
  code: string;
}

interface IResPrices {
  retail: number;
  import: number;
  old: number;
  wholesale: number;
  avgCost: number;
}

interface IResImages {
  avatar: string;
  others: string[];
}

interface IResShows {
  home: number;
  hot: number;
  new: number;
}

interface IResWarranty {
  month: number;
  phone: string;
  address: string;
}

interface IResBrand {
  id: number;
  name: string;
}

interface IResShipping {
  width: number;
  height: number;
  length: number;
  weight: number;
}

interface IResUnits {
  name: string;
  list: any[];
}

interface IResInventory {
  remain: number;
  shipping: number;
  damaged: number;
  holding: number;
  available: number;
  warranty: IResInventoryWarranty;
  depots: any[];
}

interface IResInventoryWarranty {
  remain: number;
  holding: number;
}

interface IResAttribute {
  attributeName: string;
  id: number;
  name: string;
  value: string;
  order: number;
}

// Chi tiết sản phẩm

export interface IResProductDetail {
  id: number;
  name: string;
  otherName: string;
  type: number;
  status: string;
  code: string;
  barcode: string;
  parentId: number;
  show: IProductShow;
  category: IProductCategory;
  internalCategory: IProductCategory;
  brand: IProductCategory;
  created: IProductCreated;
  dimension: IProductDimension;
  importPrice: number;
  avgCost: number;
  oldPrice: number;
  price: number;
  wholesalePrice: number;
  vat: number;
  shippingWeight: number;
  unit: string;
  description: string;
  content: string;
  image: string;
  images: string[];
  website: IProductWebsite;
  warranty: IProductWarranty;
  combos: any[];        // nếu có cấu trúc rõ thì định nghĩa thêm
  suppliers: any[];        // tương tự
  attributes: any[];
  videos: any[];
  branchPrices: any[];
  childs: any[];
  inventory: IProductInventory;
}

export interface IProductShow {
  hot: number;
  new: number;
  home: number;
}

export interface IProductCategory {
  id: number;
  name: string;
}

export interface IProductCreated {
  id: number;
  name: string;
  datetime: string;
}

export interface IProductDimension {
  length: number;
  width: number;
  height: number;
}

export interface IProductWebsite {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  highlights: string[];
  tags: string[];
}

export interface IProductWarranty {
  month: number;
  mobile: string;
  address: string;
  content: string;
}

export interface IProductInventory {
  remain: number;
  shipping: number;
  damaged: number;
  holding: number;
  warranty: number;
  warrantyHolding: number;
  holdingNew: number;
  shippingExport: number;
  available: number;
  depots: IProductDepot[];
}

export interface IProductDepot {
  id: number;
  remain: number;
  shipping: number;
  damaged: number;
  holding: number;
  warranty: number;
  warrantyHolding: number;
  holdingNew: number;
  shippingExport: number;
  available: number;
}
