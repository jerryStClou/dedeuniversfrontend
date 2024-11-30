
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

  const categorieSchema = z.object({
    nameCategory: z
      .string()
      .min(2, {
        message: "Le nom de la categorie doit contenir au moins 2 lettres",
      })
      .regex(
        /^[a-zA-Z\u00C0-\u00FF\s]*$/,
        "Le nom de la catégorie ne doit contenir que des lettres et des espaces"
      ),
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
      const response = await axios.post(
        "http://localhost:9196/api/category/add",
        data
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