
import { useEffect, useState } from "react";
import classes from "./CardsProductDashboard.module.css";
// import axios from "axios";
// import { Product } from "@/types/type";



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
  product:null;
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
  user:{
    imageProfil:string
  };
  product:null;
  createdAt: Date;  // Ajout du type Date pour createdAt
  updatedAt: Date;  // Ajout du type Date pour updatedAt

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


interface Props {
    onClick: () => void;
    idProduct:number;
    deleteClick: () => void;
  }
export default function ModalDelete({onClick,idProduct,deleteClick}:Props){
    const [product,setProduct]=useState<Product>();
    
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:9196/api/product/"+idProduct
  //       );
  //         setProduct(response.data);
  //       // console.log(response.data);
  //     } catch (error) {
  //       console.error("Erreur dans la récupération des produits:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);
return(
        <div className={classes.deleteModal}>
            <button className={classes.backButton} onClick={onClick}>retour</button>
              
              <div className={classes.deleteElementProduct}>
                <div className={classes.deleteModalProduct}>
                      <div className={classes.imageDeleteModal}>
                        {/* <img src={product? product.productImages[0].productImages:""} alt="" /> */}
                        
                      </div>
                </div>
                <div className={classes.alertMessage}>
                  <p>Voulez vous vraiment supprimer ce product</p>
                  <button onClick={deleteClick}>supprimer</button>
                </div>
              </div>
                
        </div>
)
}