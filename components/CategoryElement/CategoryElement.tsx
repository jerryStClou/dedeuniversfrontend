"use client";

import { useEffect, useState } from "react";
import classes from "./CategoryElement.module.css";
import { Product,Comment } from "@/types/types";
import axios from "axios";
import Image from 'next/image';
import etoileNoire from '@/public/images/etoile.png';
import etoileGrise from '@/public/images/etoile2.png';
import BasicCard from "../Cards/BasicCard/BasicCard";
type PropsCategoryElement = { 
  onAddToCart: (product: Product) => void;
    nameSubCategory: string | string[] | undefined;
  };
  
export default function CategoryElement({onAddToCart,nameSubCategory}:PropsCategoryElement){

    const [products, setProducts] = useState<Product[]>();
    
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9197/api/product/products/by-subcategory/${nameSubCategory}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [nameSubCategory]);


  // Fonction pour calculer la moyenne des notes d'un produit
  const calculateAverageNote = (comments: Comment[]): number => {
    if (comments.length === 0) return 0;
    const totalNotes = comments.reduce((sum, comment) => sum + comment.note, 0);
    return Math.round(totalNotes / comments.length);
  };

  


  
return(
    <>
        
        <div className={classes.categoryElement}>
        {
            products?.map((product)=>{
              const averageNote = calculateAverageNote(product.comments);
              const hasNotes = product.comments.length > 0;
                return(
                    
    //     <div className={classes.basicCard} key={product.id}>
    //     <div className={classes.imageCardCarousel}>
    //         <div className={classes.allImageCard}>

    //         {product.productImages && product.productImages[0] !== undefined ? (
    //                 <div className={classes.imageCard}>
    //             <img
    //                 src={product.productImages[0].productImages}
    //                 alt=""
    //             />
    //             </div>
    //         ) : null}
    //             {/*  */}
    //         </div>
    //     </div>
    //     <div className={classes.infoCard}>
    //         <div className={classes.allCardButtons}>
    //             <button className={classes.activeCardButton}></button>
    //             <button className={classes.cardButton}></button>
    //             <button className={classes.cardButton}></button>
    //             <button className={classes.cardButton}></button>
    //         </div>
    //         <p>{product.nameProduct}</p>
    //         <div className={classes.note}>
                
    //             {/* Affichage des étoiles ou du message selon les notes */}
    //             {hasNotes ? (
    //               // Affiche les étoiles si le produit a des notes
    //               [...Array(5)].map((_, index) => (
    //                 <Image
    //                   key={index}
    //                   src={index < averageNote ? etoileNoire : etoileGrise}
    //                   alt="Étoile"
    //                   width={20} // Ajustez selon vos besoins
    //                   height={20} // Ajustez selon vos besoins
    //                 />
    //               ))
    //             ) : (
    //               // Affiche un message si le produit n'a aucune note
    //               <p>Aucune note pour le moment</p>
    //             )}
    //         </div>
    //         <p>{product.stock} produit en stock</p>
    //         <p>{product.basePrice}€</p>
    //         <button className={classes.addCartButton} onClick={() => onAddToCart(product)}>Ajouter au panier</button>
    //     </div>
    // </div>
            <BasicCard  product={product} width="15%" onAddToCart={onAddToCart}/>
                )
            })
         }
        </div>
    </>
)
     
}