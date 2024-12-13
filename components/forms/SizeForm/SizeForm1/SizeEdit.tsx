
"use client"; // 

import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ProductSize } from "@/types/types";
import { useEffect, useState } from "react";
  
interface PropsProductSizeForm {
    onClick: () => void;
    onProductSizeAdded: () => void;  
    productSizeId:number;
  }

export default function SizeEdit({onClick, onProductSizeAdded, productSizeId}:PropsProductSizeForm){
    
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};

    const [productSize, setProductSize] = useState<ProductSize>();

    useEffect(() => {
        const fetchColor = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9197/api/productSize/"+productSizeId,
              {
                withCredentials: true,  // Ajout de cette option pour envoyer les cookies
              }
            );
            setProductSize(response.data);
            console.log(response.data);
            console.log("hello world");
          } catch (error) {
            console.error("Error fetching Color:", error);
          }
        };
    
        fetchColor();
      }, []);

    const productSizeSchema = z.object({
        productSize: z.string(),
        influenceProductSizePrice:z.number(),
        influenceProductSizeWeight:z.number()
    });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ProductSize>({
      resolver: zodResolver(productSizeSchema),
    });
  
    async function updateProductSize(data:ProductSize) {
      try {
        const csrfToken = await fetchTokenCsrf();
        const response = await axios.put(
          "http://localhost:9197/api/productSize/update/"+productSizeId,
          data,
          {
              withCredentials: true,  // Pour envoyer les cookies avec la requête
              headers: {
                  'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
              }
          }
        );
        console.log("couleur ajouté avec succès:", response.data.id);
        onProductSizeAdded(); // Appelez cette fonction après l'ajout de la catégorie
      } catch (error) {
        console.error("Erreur lors de l'ajout de la couleur:", error);
      }
    }
  
      return(
          <>
  
  <div className={classes.categoryForm}>
        <button onClick={onClick} className={classes.buttonBack}>retour</button>
      <form
        className={classes.formulaireContact}
        onSubmit={handleSubmit(updateProductSize)}
      >
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="productSize">Modifier une taille aux produit</label>
          <input
            type="text"
            placeholder={productSize?.productSize}
            {...register("productSize")}
            id="productSize"
            className={
              errors.productSize ? classes.inputError : classes.inputStyle
            }
          />
          <p className={classes.errorStyle}>{errors.productSize?.message}</p>
        </div>
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="influenceProductSizePrice">influenceProductSizePrice</label>
          <input
            type="number"
            placeholder={productSize?.influenceProductSizePrice?.toString()}
            {...register("influenceProductSizePrice", { valueAsNumber: true })}
            className={
              errors.influenceProductSizePrice ? classes.inputError : classes.inputStyle
            }
          />
          <p className={classes.errorStyle}>{errors.influenceProductSizePrice?.message}</p>
        </div>
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="influenceProductSizeWeight">influenceProductSizeWeight</label>
          <input
            type="number"
            placeholder={productSize?.influenceProductSizeWeight?.toString()}
            {...register("influenceProductSizeWeight", { valueAsNumber: true })}
            className={
              errors.influenceProductSizeWeight ? classes.inputError : classes.inputStyle
            }
          />
          <p className={classes.errorStyle}>{errors.influenceProductSizeWeight?.message}</p>
        </div>
  
        <button className={classes.buttonStyleContact}>
          Modifier une taille aux produit
        </button>
      </form>
      </div>
          </>
      )
  }