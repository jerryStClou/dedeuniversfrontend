import classes from "./BasicCarousel.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product,Comment   } from "@/types/types";
import Image from 'next/image';
import etoileNoire from '@/public/images/etoile.png';
import etoileGrise from '@/public/images/etoile2.png';
import BasicCard from "@/components/Cards/BasicCard/BasicCard";


type PropsSubCategoryElement = {
    subCategoryId: number | undefined;
  };
export default function BasicCarousel({subCategoryId}:PropsSubCategoryElement){
    
    
    const [products, setProducts] = useState<Product[]>();
    const [compteur,setCompteur]= useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`http://localhost:9197/api/product/products/subCategory/${subCategoryId}/top10`);
            setProducts(response.data);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
      }, [subCategoryId]);
    
    function handleMoveLeft(){
        if(compteur>0){
            setCompteur(compteur-1);
        }
        // console.log(compteur);
    }
    
    function handleMoveRight(){
        if(compteur<=4){
            setCompteur(compteur+1);
        }
        // console.log(compteur);
    }

    
    
  // Fonction pour calculer la moyenne des notes d'un produit
  const calculateAverageNote = (comments: Comment[]): number => {
    if (comments.length === 0) return 0;
    const totalNotes = comments.reduce((sum, comment) => sum + comment.note, 0);
    return Math.round(totalNotes / comments.length);
  };


    
return(
    <>
    <h1>Casque football</h1><br />
    <div className={classes.basicCarousel}>
        <div className={classes.moveButtonCarousel} onClick={handleMoveLeft}>
            {/* <img src={image} alt="" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </div>
        <div className={classes.cardCarouselDiv}>
            <div className={classes.allCardCarousel}>

                {
                    products?.map((product:Product)=>{
                       
                const averageNote = calculateAverageNote(product.comments);
                const hasNotes = product.comments.length > 0; 
                return(
                //     <div className={
                //         compteur ===0?
                //         classes.basicCard:
                //         compteur === 1?
                //         classes.move1:
                //         compteur ===2?
                //         classes.move2:
                //         compteur ===3?
                //         classes.move3:
                //         classes.move4
                //         }
                //         key={product.id}>
                //         <div className={classes.imageCardCarousel}>
                //             <div className={classes.allImageCard}>
    
                //             {product.productImages && product.productImages[0] !== undefined ? (
                //                     <div className={classes.imageCard}>
                //                         <img
                //                             src={product.productImages[0].productImages}
                //                             alt=""
                //                         />
                //                     </div>
                //             ) : null}
                        
                //             </div>
                //         </div>
                //         <div className={classes.infoCard}>
                //             <div className={classes.allCardButtons}>
                //                 <button className={classes.activeCardButton}></button>
                //                 <button className={classes.cardButton}></button>
                //                 <button className={classes.cardButton}></button>
                //                 <button className={classes.cardButton}></button>
                //             </div>
                //             <p>{product.nameProduct}</p>
                //             <div className={classes.note}>
                               
                // {/* Affichage des étoiles ou du message selon les notes */}
                // {hasNotes ? (
                //   // Affiche les étoiles si le produit a des notes
                //   [...Array(5)].map((_, index) => (
                //     <Image
                //       key={index}
                //       src={index < averageNote ? etoileNoire : etoileGrise}
                //       alt="Étoile"
                //       width={20} // Ajustez selon vos besoins
                //       height={20} // Ajustez selon vos besoins
                //     />
                //   ))
                // ) : (
                //   // Affiche un message si le produit n'a aucune note
                //   <p>Aucune note pour le moment</p>
                // )}
    
                //             </div>
                //             <p>{product.stock}  produit en stock</p>
                //             <p>{product.basePrice}€</p>
                //             <button className={classes.addCartButton}>Ajouter au panier</button>
                //         </div>
                //     </div>

                <BasicCard product={product} width="4%"/>


                )
                    })
                }



                {/* -------------------------------------------------------------------------- */}


            </div>
        </div>
        <div className={classes.moveButtonCarousel} onClick={handleMoveRight}>
            {/* <img src={image2} alt="" /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
    </div>
    </>
)
}