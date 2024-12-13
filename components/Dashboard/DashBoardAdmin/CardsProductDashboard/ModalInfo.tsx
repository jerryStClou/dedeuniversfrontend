

import { useEffect, useState } from "react";
import classes from "./CardsProductDashboard.module.css";
// import axios from "axios";
// import { Product } from "@/types/type";

interface Props {
    onClick: () => void;
    // statisticClick: () => void;
    // buyClick: () => void;
    // likeClick: () => void;
    // dislikeClick: () => void;
    idProduct:number;
  }




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
  

export default function ModalInfo({
  onClick,idProduct,
  // statisticClick,buyClick,likeClick,dislikeClick
}:Props
){
    
    const [product,setProduct]=useState<Product>(
      {
        "id":1,
        "nameProduct":"casque de football americain",
        "description":"casque de football americain",
        "basePrice":78,
        "baseWeight":89,
        "stock":45,
        "subCategory":{
          "id":1,
          "nameSubCategory":"micro",
          "imageSubCategory":"aaa"
        },
        "comments":[{
          "id":1,
          "comment":"produit cool",
          "note":5,
          "titleComment":"produit ouf",
          "updatedAt": new Date(2024, 0, 1),
          "createdAt":new Date(2024, 0, 1),
          "imageComment":"image",
          "user":{
            "imageProfil":"yellow"
          },
          "product":null
        }],
        "productImages":[
          {
            "id":1,
            "productImages":"https://www.spiralfootball.fr/1931-thickbox_default/casque-football-americain-riddell-speed-icon-taille-xl.jpg",
            "typeProductImages":"card",
            "product":null
          },
          {
            "id":1,
            "productImages":"https://sportlandamerican.com/31922-large_default/casque-de-football-americain-schutt-f7-vtd-collegiate.webp",
            "typeProductImages":"card",
            "product":null
          },
          {
            "id":1,
            "productImages":"https://m.media-amazon.com/images/I/61GfZrhRvEL._AC_UF894,1000_QL80_.jpg",
            "typeProductImages":"card",
            "product":null
          }
        ],
        "productOptions":[]
       }
  );
    
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:9196/api/product/"+idProduct
  //       );
  //         setProduct(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Erreur dans la récupération des produits:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  
    
  // Fonction pour calculer la moyenne des notes d'un produit
  const calculateAverageNote = (comments: Comment[]): number => {
    if (comments.length === 0) return 0;
    const totalNotes = comments.reduce((sum, comment) => sum + comment.note, 0);
    return Math.round(totalNotes / comments.length);
  };


  
  const averageNote = calculateAverageNote(product.comments);
  const hasNotes = product.comments.length > 0;

  return(
    
    <div className={classes.infoModal}>
    <button className={classes.backButton} onClick={onClick}>retour</button>
    <div className={classes.elementInfoModal}>

        <div className={classes.modalProduct}>
          {/* <img src={product? product.productImages[0].productImages:"acune image trouver"}  alt="" /> */}
          <div className={classes.infoModalProduct}>
            <p>{product? product.nameProduct : "produit non disponible"}</p>
            {
              product.productImages.map((productImage)=>{
                return(
                  <>
                      <img src={productImage.productImages} alt="" />
                  </>
                )
              })
            }
          </div>
        </div>

        <div className={classes.paragraphModal}>
          {/* <p>nombre de product vendu : 34</p>
          <p>nombre de product vendu : 45</p>
          <p>Liste des product à succès : 45</p>
          <p>Chiffre d'affaires: 3000€</p> */}
          <p><span>Nom du produit :</span> {product.nameProduct}</p>
          <p><span>Prix :</span> {product.basePrice}</p>
          <p><span>Nombre de commentaire : </span>{product.comments.length}</p>
          <p><span>Note moyenne :</span> {averageNote}/5 </p>
          <div className={classes.contentParagrapheModal}>
              <p className={classes.descriptionTitle}>Description :</p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam vitae animi 
                labore debitis maiores dolorem nam enim molestias. 
                Iusto ullam molestias esse sunt hic minima unde mollitia nemo totam voluptates.

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam vitae animi 
                labore debitis maiores dolorem nam enim molestias. 
                Iusto ullam molestias esse sunt hic minima unde mollitia nemo totam voluptates.

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam vitae animi 
                labore debitis maiores dolorem nam enim molestias. 
                Iusto ullam molestias esse sunt hic minima unde mollitia nemo totam voluptates.

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam vitae animi 
                labore debitis maiores dolorem nam enim molestias. 
                Iusto ullam molestias esse sunt hic minima unde mollitia nemo totam voluptates.

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam vitae animi 
                labore debitis maiores dolorem nam enim molestias. 
                Iusto ullam molestias esse sunt hic minima unde mollitia nemo totam voluptates.


              </p>
          </div>
       
         
        </div>

    </div>

  </div>
  )
    

}