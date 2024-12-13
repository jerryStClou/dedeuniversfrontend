
"use client"; // 

import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Product } from "@/types/types";

type PropsProductForm = {
  onClick: () => void;
  onProductAdded: () => void; 
  idSubCategory: number;
};

export default function ProductForm1({onClick, onProductAdded, idSubCategory}:PropsProductForm){

  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};
  const addProductSchema = z.object({
    nameProduct: z
      .string()
      .min(2, { message: "Le nom du produit doit contenir au moins 2 lettres" })
      .regex(
        /^[a-zA-Z\s]*$/,
        "Le nom ne doit contenir que des lettres et des espaces"
      ),
    description: z
      .string()
      .min(6, { message: "la description doit avoir au moin 6 lettre" }),
    stock: z
      .number()
      .positive(),
  basePrice: z
        .number()
        .positive(/*{ message: "le stock ne peut être négative " }*/),
  baseWeight: z
            .number()
            .positive(/*{ message: "le stock ne peut être négative " }*/),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    resolver: zodResolver(addProductSchema),
  });

  async function addProduct(data:Product) {
    try {
      const csrfToken = await fetchTokenCsrf();
      const response = await axios.post(
        "http://localhost:9197/api/product/add/"+idSubCategory,data,
        {
            withCredentials: true,  // Pour envoyer les cookies avec la requête
            headers: {
                'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
            }
        }
        
      );
      // console.log(data);
      console.log("Produit ajouté avec succès:", response.data.id);
      onProductAdded();
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  }

  return (
    <>
    <div className={classes.categoryForm}>
      <button onClick={onClick} className={classes.buttonBack}>retour</button>
    
    <form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(addProduct)}
    >
      <div className={classes.inputDivStyle}>
        <label htmlFor="nameProduct">nom du produit</label>
        <input
          type="text"
          placeholder="nom du produit"
          {...register("nameProduct")}
          className={
            errors.nameProduct ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.nameProduct?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="description du produit"
          {...register("description")}
          className={
            errors.description ? classes.inputError : classes.inputStyle
          }
        ></textarea>
        <p className={classes.errorStyle}>{errors.description?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="stock">stock du produit</label>
        <input
          type="number"
          placeholder="stock du produit"
          {...register("stock", { valueAsNumber: true })}
          className={
            errors.stock ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.stock?.message}</p>
      </div>

      
      <div className={classes.inputDivStyle}>
        <label htmlFor="basePrice">prix du produit</label>
        <input
          type="number"
          placeholder="prix du produit"
          {...register("basePrice", { valueAsNumber: true })}
          className={
            errors.basePrice ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.basePrice?.message}</p>
      </div>


      
      <div className={classes.inputDivStyle}>
        <label htmlFor="baseWeight">poids du produit</label>
        <input
          type="number"
          placeholder="poids du produit"
          {...register("baseWeight", { valueAsNumber: true })}
          className={
            errors.baseWeight ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.baseWeight?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>Ajouter</button>
    </form>
    </div>
    </>
  );
}