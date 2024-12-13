
import { Product,Comment  } from "@/types/types";
import classes from "./SimilarProduct.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';
import etoileNoire from '@/public/images/etoile.png';
import etoileGrise from '@/public/images/etoile2.png';

type PropsProductImageDetail = {
    SubCategoryId: number | undefined;
  };
export default function SimilarProduct({SubCategoryId}:PropsProductImageDetail) {
    const [products, setProducts] = useState<Product[]>();
   
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:9196/api/product/products/subcategory/${SubCategoryId}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
    
      fetchProduct();
    }, [SubCategoryId]);

    
  // Fonction pour calculer la moyenne des notes d'un produit
  const calculateAverageNote = (comments: Comment[]): number => {
    if (comments.length === 0) return 0;
    const totalNotes = comments.reduce((sum, comment) => sum + comment.note, 0);
    return Math.round(totalNotes / comments.length);
  };


    
    return(
        <div className={classes.similarProduct}>

         {
            products?.map((product)=>{
                const averageNote = calculateAverageNote(product.comments);
                const hasNotes = product.comments.length > 0;
                return(
                    
        <div className={classes.basicCard}>
        <div className={classes.imageCardCarousel}>
            <div className={classes.allImageCard}>

            {product.productImages && product.productImages[0] !== undefined ? (
                    <div className={classes.imageCard}>
                <img
                    src={product.productImages[0].productImages}
                    alt=""
                />
                </div>
            ) : null}
                
            </div>
        </div>
        <div className={classes.infoCard}>
            <div className={classes.allCardButtons}>
                <button className={classes.activeCardButton}></button>
                <button className={classes.cardButton}></button>
                <button className={classes.cardButton}></button>
                <button className={classes.cardButton}></button>
            </div>
            <p>Riddell NFL Speed Mini Casque</p>
            <div className={classes.note}>
                
                {/* Affichage des étoiles ou du message selon les notes */}
                {hasNotes ? (
                  [...Array(5)].map((_, index) => (
                    <Image
                      key={index}
                      src={index < averageNote ? etoileNoire : etoileGrise}
                      alt="Étoile"
                      width={20} // Ajustez selon vos besoins
                      height={20} // Ajustez selon vos besoins
                    />
                  ))
                ) : (
                  // Affiche un message si le produit n'a aucune note
                  <p>Aucune note pour le moment</p>
                )}

            </div>
            <p>{product.stock} produit en stock</p>
            <p>{product.basePrice}€</p>
            <button className={classes.addCartButton}>Ajouter au panier</button>
        </div>
    </div>
                )
            })
         }

        </div>
       
    )

}