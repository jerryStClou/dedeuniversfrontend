
"use client"; // 


import classes from "./ProductImageForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { ProductImages } from "@/types/types";

interface PropsProductImages {
  onClick: () => void;  
  idProduct:number;
  dashProImg: () => void;
}

export default function ProductImageForm1({onClick, idProduct, dashProImg}:PropsProductImages){

    const imageProduitSchema = z.object({
        id: z.string(),
        productImages: z.string(),
        typeProductImages: z
        .string()
        .min(2, {
          message: "Le type de l'image produit doit contenir au moins 2 lettres",
        })
        .regex(
          /^[a-zA-Z\u00C0-\u00FF\s]*$/,
          "Le type de l'image produit ne doit contenir que des lettres et des espaces"
        ),
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProductImages>({
        resolver: zodResolver(imageProduitSchema),
      });

      async function addImageProduit(data:ProductImages) {
        try {
          const response = await axios.post(
            "http://localhost:9196/api/productImage/add/"+idProduct,
            data
          );
          console.log(response);
          console.log("l'image du produit à été ajouter avec succès:", response.data.id);
          // console.log(data);
          dashProImg();
        } catch (error) {
          console.error("Erreur lors de la ajouter de l'image du produit:", error);
        }
      }
    
      return (
        <div className={classes.categoryForm}>
          <button onClick={onClick} className={classes.buttonBack}>retour</button>
        <form
          className={classes.formulaireContact}
          onSubmit={handleSubmit(addImageProduit)}
        >
          
          <input type="hidden" {...register("id")} value="2" />
          <div className={classes.inputDivStyle}>
            <label htmlFor="productImages">Ajouter une image au produit</label>
            <input
              type="text"
              placeholder="mettez url de votre image"
              {...register("productImages")}
              id="productImages"
              className={
                errors.productImages ? classes.inputError : classes.inputStyle
              }
            />
            <p className={classes.errorStyle}>
              {errors.productImages?.message}
            </p>
          </div>

          <div className={classes.inputDivStyle}>
            <label htmlFor="typeProductImages">de quelle type est votre image</label>
            <input
              type="text"
              placeholder="de quelle type est votre image"
              {...register("typeProductImages")}
              id="typeProductImages"
              className={
                errors.typeProductImages ? classes.inputError : classes.inputStyle
              }
            />
            <p className={classes.errorStyle}>
              {errors.typeProductImages?.message}
            </p>
          </div>

    
          <button className={classes.buttonStyleContact}>
            Ajouter une image au produit
          </button>
        </form>
        </div>
      );
}