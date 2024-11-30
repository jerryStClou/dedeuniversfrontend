
"use client"; // 

import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ProductSize } from "@/types/types";
  
interface PropsProductSizeForm {
    onClick: () => void;
    onProductSizeAdded: () => void;  
    idProduct:number;
  }

export default function SizeForm1({onClick, onProductSizeAdded, idProduct}:PropsProductSizeForm){
    
    const productSizeSchema = z.object({
        productSize: z
        .string()
        .min(2, {
          message: "Le nom de la taille du produit doit contenir au moins 2 lettres",
        })
        .regex(
          /^[a-zA-Z\u00C0-\u00FF\s]*$/,
          "Le nom de la taille du produit ne doit contenir que des lettres et des espaces"
        ),
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
  
    async function addProductSize(data:ProductSize) {
      try {
        const response = await axios.post(
          "http://localhost:9196/api/productSize/add/"+idProduct,
          data
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
        onSubmit={handleSubmit(addProductSize)}
      >
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="productSize">Ajouter une taille aux produit</label>
          <input
            type="text"
            placeholder="Ecrivez le matériaux"
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
            placeholder="influenceProductSizePrice"
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
            placeholder="influenceProductSizeWeight"
            {...register("influenceProductSizeWeight", { valueAsNumber: true })}
            className={
              errors.influenceProductSizeWeight ? classes.inputError : classes.inputStyle
            }
          />
          <p className={classes.errorStyle}>{errors.influenceProductSizeWeight?.message}</p>
        </div>
  
        <button className={classes.buttonStyleContact}>
          Ajouter une taille aux produit
        </button>
      </form>
      </div>
          </>
      )
  }