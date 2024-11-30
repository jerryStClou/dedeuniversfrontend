
"use client"; // 

import { Product, Promotion } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./AddProductPromotion.module.css";

export default function AddProductPromotion(){
    
  const [promotions,setPromotions] = useState<Promotion[]>([]);
  const [products,setProducts] = useState<Product[]>([]);
  const [select1,setSelect1] = useState<number>(0);
  const [select2,setSelect2] = useState<number>(0);

  const [clickButton1,setClickButton1] = useState<boolean>(false);
  const [clickButton2,setClickButton2] = useState<boolean>(false);

  const [idPromotion,setIdPromotion] = useState(0);
  const [idProduct,setIdProduct] = useState(0);

  
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
    setClickButton1(true);
  }

  function selectProduct(productId:number){
    setIdProduct(productId);
    setSelect2(productId);
    setClickButton2(true);
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

  async function addProductPromotion(){
    try {
        const response = await axios.post(
          `http://localhost:9196/api/productPromotion/add/${idProduct}/${idPromotion}`
        );
        console.log("le lien entre le produit et la promotion à été avec succès:", response.data.id);
      } catch (error) {
        console.error("Erreur lors de l'ajout du lien entre le produit et la promotion:", error);
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
            {
                    clickButton1 === true && clickButton2 === true?
                    (
                        <button onClick={addProductPromotion}>Valider</button>
                    ):(null)
                }
        </>
    )
}