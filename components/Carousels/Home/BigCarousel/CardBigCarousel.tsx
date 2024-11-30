import { useEffect, useState } from "react";
import classes from "./CardBigCarousel.module.css";
import SmallCarousel from "./SmallCarousel";
import { Product } from "@/types/types";
import axios from "axios";

type PropsCardBigCarousel = {
    subCategoryId:number;
  };
  
export default function CardBigCarousel({subCategoryId}:PropsCardBigCarousel){

    const [products,setProducts] = useState<Product[]>();

    
    useEffect(() => {
        //setIdSubCategory(subCategId);
      
        if (isNaN(subCategoryId)) {
            console.error("L'ID du produit est invalide.");
            return; // Si l'ID est invalide, on arrête l'exécution de la requête
        }

        const fetchProducts = async () => {
            try {
                // Requête API pour récupérer les produits par sous-catégorie
                const response = await axios.get(
                    `http://localhost:9197/api/product/top4/${subCategoryId}`
                );
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
            }
        };

        fetchProducts();
    }, [subCategoryId]); // Déclenche la requête lorsque idSubCategory change


    return(
        <>
            <div    
                style={{
                    backgroundImage:`url(${products && products.length > 0 ?products[0].subCategory.imageSubCategory:''})`,
                    backgroundSize:"100%",
                    height:"100vh",
                    width:"100%"
                }}
                // className={classes.cardBigCarousel}
            >
                {/* <img src={imageCardBigCarousel} alt="" /> */}
                <div className={classes.allSmallCarousel}>
                    <SmallCarousel
                        top={0}
                        left={0}
                        productId={products && products.length > 0 ?products[0].id:0}
                    />

                    
                    <SmallCarousel
                        
                        top={45}
                        left={2}
                        productId={products && products[1] ? products[1].id : 1}
                    />

                    
                    <SmallCarousel
                        
                        top={4}
                        left={80}
                        productId={products && products.length > 0 ?products[2].id:2}
                    />

                    
                    <SmallCarousel
                        
                        top={45}
                        left={80}
                        productId={products && products.length > 0 ?products[3].id:3}
                    />
                </div>

            </div>


        </>
    )
}