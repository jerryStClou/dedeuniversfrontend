import { ProductImages } from "@/types/types";
import classes from "./SmallCarousel.module.css";
// import image from "../../../../assets/2.png";
// import image2 from "../../../../assets/tondeuse femme/3.png";
// import image3 from "../../../../assets/tondeuse femme/4.png";
// import image4 from "../../../../assets/tondeuse femme/5.png";
// import image5 from "../../../../assets/tondeuse femme/6.png";
import { useState, useEffect  } from "react";
import axios from "axios";


type PropsSmallCarousel = {
    top:number;
    left:number;
    productId:number;
  };

export default function SmallCarousel({top,left,productId }:PropsSmallCarousel){
    const [compteur,setCompteur] = useState(0);
    const [productImages,setProductImages] = useState<ProductImages[]>([]);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCompteur(prevCompteur => {
    //         if (prevCompteur === 4) {
    //           return 0;
    //         } else {
    //           return prevCompteur + 1;
    //         }
    //       });
    //     }, 2000);
    
    //     // Nettoyage de l'intervalle lorsque le composant est démonté
    //     return () => clearInterval(interval);
    //   }, []);



    useEffect(() => {
        //setIdSubCategory(subCategId);
      
        if (isNaN(productId)) {
            console.error("L'ID du produit est invalide.");
            return; // Si l'ID est invalide, on arrête l'exécution de la requête
        }

        const fetchProductImages = async () => {
            try {
                // Requête API pour récupérer les produits par sous-catégorie
                const response = await axios.get(
                    `http://localhost:9197/api/productImage/product/${productId}/card`
                );
                setProductImages(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des images du produit:", error);
            }
        };

        fetchProductImages();
    }, [productId]); // Déclenche la requête lorsque idSubCategory change





    return(
        <>
 <div className={classes.smallCarousel}>
                <div className={classes.allCardSmallCarousel} style={{top:top,left:left}}>
                {productImages.map((image, index) => (
                    <div
                    key={index} 
                    className={ compteur === 1 ?
                            classes.move1:
                            compteur === 2 ? 
                            classes.move2:
                            compteur === 3 ?
                            classes.move3:
                            compteur === 4 ?
                            classes.move4:
                            classes.cardSmallCarousel
                        }
                  >
                    <img src={image.productImages} alt="" />
                  </div>
                ))}
                </div>
                {/* <p>{compteur}</p> */}
            </div>

        </>
    )
}