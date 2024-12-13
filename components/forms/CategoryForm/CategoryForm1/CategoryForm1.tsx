
"use client"; // 

import classes from "./CategoryForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Category } from "@/types/types";
  
interface PropsCategoryForm {
  onClick: () => void;
  onCategoryAdded: () => void;
}
export default function CategoryForm1({onClick, onCategoryAdded}:PropsCategoryForm) {

  
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};

  const categorieSchema = z.object({
    nameCategory: z.string(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    resolver: zodResolver(categorieSchema),
  });

  async function addCategorie(data:Category) {
    try {
      const csrfToken = await fetchTokenCsrf();
      const response = await axios.post(
        "http://localhost:9197/api/category/add",
        data,
        {
            withCredentials: true,  // Pour envoyer les cookies avec la requête
            headers: {
                'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
            }
        }
      );
      console.log("categorie ajouté avec succès:", response.data.id);
      onCategoryAdded(); // Appelez cette fonction après l'ajout de la catégorie
    } catch (error) {
      console.error("Erreur lors de l'ajout de la categorie:", error);
    }
  }

  return (
    <div className={classes.categoryForm}>
      <button onClick={onClick} className={classes.buttonBack}>retour</button>
    <form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(addCategorie)}
    >

      <div className={classes.inputDivStyle}>
        <label htmlFor="nameCategory">Ajouter une catégorie</label>
        <input
          type="text"
          placeholder="Ecrivez la catégorie"
          {...register("nameCategory")}
          id="nameCategory"
          className={
            errors.nameCategory ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.nameCategory?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>
        Ajouter une catégorie
      </button>
    </form>
    </div>

  );
}