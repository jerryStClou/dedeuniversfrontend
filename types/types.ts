import { boolean } from "zod";

export interface Category {
    id: number;
    nameCategory: string;
  }

  export interface SubCategory {
    id: number;
    nameSubCategory: string;
    imageSubCategory:string;
  }

  export interface ProductImages{
    id:number;
    productImages:string;
    typeProductImages:string;
    product:null;
  }



  export interface Product {
    id: number;
    nameProduct: string;
    description: string;
    stock: number;
    basePrice: number;
    baseWeight: number;
    subCategory: SubCategory;
   productImages:ProductImages[];
   comments:Comment[];
   productOptions:ProductOption[];
    // ajouter d'autres propriétés nécessaires
  }

  export interface ProductOption{
    id:number;
    product:Product;
    size:ProductSize;
    color:Color;
    material:Material;

  }

  export interface Role{
    id:number;
    role:string;
  }

  export interface User{
    id:number;
    lastname:string;
    firstname:string;
    pseudo:string;
    imageProfil:string;
    email:string;
    password:string;
    role: Role
  }

  export interface Comment{
    id:number;
    comment:string;
    titleComment:string;
    note:number;
    imageComment:string;
    user:User;
    product:Product
  }



  export interface Color{
    id:number;
    color:string;

  }

  
  export interface Material{
    id:number;
    material:string;
    influenceMaterialPrice:number;
    influenceMaterialWeight:number;

  }

  
  export interface ProductSize{
    id:number;
    productSize:string;
    influenceProductSizePrice:number;
    influenceProductSizeWeight:number;

  }

  
export interface CartProduct extends Product {
  quantity: number;
}


export interface Address{
  id:number;
  city:string;
  street:string;
  postalCode:string;
}

export interface Promotion{
  id:number;
  code:string;
  description:string;
  discountPercentage:number;
  discountValue:number;
  usageLimit:number;
  usageCount:number;
  isFirstPurchaseOnly:boolean;
  type:string;
  requiredLoyaltyPoints:number;
  startDate: Date; 
  endDate: Date; 
}


export interface ProductPromotion{
  id:number;
  product:Product;
  promotion:Promotion;
}


export interface EmailVerification{
  email:string;
}