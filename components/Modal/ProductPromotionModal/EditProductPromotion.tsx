import { Product, Promotion } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./AddProductPromotion.module.css";

interface PropsEditProductPromotion {
    productId:number;
    promotionId:number;
    productPromotionId:number;
  }

export default function EditProductPromotion({productId, promotionId,productPromotionId}:PropsEditProductPromotion){
    
  const [promotions,setPromotions] = useState<Promotion[]>([]);
  const [products,setProducts] = useState<Product[]>([]);
  const [select1,setSelect1] = useState<number>(promotionId);
  const [select2,setSelect2] = useState<number>(productId);


  const [idPromotion,setIdPromotion] = useState(promotionId);
  const [idProduct,setIdProduct] = useState(productId);

  
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/promotions/all"
        );
        setPromotions(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Erreur dans la récupération des promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  function selectPromotion(promotionId:number){
    setIdPromotion(promotionId);
    setSelect1(promotionId);
  }

  function selectProduct(productId:number){
    setIdProduct(productId);
    setSelect2(productId);
  }



  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/product/all"
        );
        setProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Erreur dans la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);

  async function updateProductPromotion(){
    try {
        const response = await axios.put(
          `http://localhost:9196/api/productPromotion/update/${productPromotionId}/${idProduct}/${idPromotion}`
        );
        console.log("le lien entre le produit et la promotion à été modifier avec succès:", response.data.id);
        //console.log(`http://localhost:9196/api/productPromotion/update/${productPromotionId}/${idProduct}/${idPromotion}`);
      } catch (error) {
        console.error("Erreur lors de la modification du lien entre le produit et la promotion:", error);
      }
  } 

  
    return(
        <>

<h1>Les differents produit et promotion</h1>
            <div className={classes.modal}>
                <div className={classes.colonne}>
                    <p>Les produits</p>
                    {
                        products.map((product)=>{
                            return(
                                <>
                                    <div 
                                        className={
                                                select2 === product.id?
                                                classes.selected:
                                                classes.card
                                        }  
                                        key={product.id}
                                    >
                                        {Array.isArray(product.productImages) && product.productImages.length > 0 ? (
                                                <img src={product.productImages[0].productImages} alt="" />
                                            ) : (
                                                <p>Ce produit n'a pas d'image</p>
                                        )}
                                        <p>{product.nameProduct}</p>
                                        <p>{product.description}</p>
                                        <p>{product.basePrice}</p>
                                        <p>{product.baseWeight}</p>
                                        <p>{product.stock}</p>
                                        <button onClick={()=>selectProduct(product.id)}>Selectionner</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className={classes.colonne}>
                    <p>Les promotions</p>
                    {
                        promotions.map((promotion)=>{
                            return(
                                <>
                                    <div 
                                        className={
                                                select1 === promotion.id?
                                                classes.selected:
                                                classes.card
                                        }  
                                        key={promotion.id}
                                    >
                                        <p>{promotion.description}</p>
                                        <p>{promotion.type}</p>
                                        <p>{promotion.discountPercentage}</p>
                                        <button onClick={()=>selectPromotion(promotion.id)}>Selectionner</button>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
                
            </div>
                <button onClick={updateProductPromotion}>Valider</button>
        </>
    )
}