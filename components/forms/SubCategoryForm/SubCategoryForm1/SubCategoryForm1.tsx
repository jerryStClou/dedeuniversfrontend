
"use client"; // 


import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SubCategory } from "@/types/types";

type PropsSubCategoryEditForm = {
  onClick: () => void;
  onSubCategoryAdded: () => void;
};

export default function SubCategoryForm1({onClick, onSubCategoryAdded}:PropsSubCategoryEditForm) {

  type SubCategoryData = {
    nameSubCategory: string;
  };
  const sousCategorieSchema = z.object({
    nameSubCategory: z
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
  } = useForm<SubCategory>({
    resolver: zodResolver(sousCategorieSchema),
  });

  async function addSousCategorie(data:SubCategory) {
    try {
      const response = await axios.post(
        "http://localhost:9196/api/subCategory/add",
        {
          "nameSubCategory":data.nameSubCategory,
        }
      );
      console.log("La sous categorie à été ajouté avec succès:", response.data.id);
      onSubCategoryAdded(); // Appelez cette fonction après l'ajout de la catégorie
    } catch (error) {
      console.error("Erreur lors de l'ajout de la sous categorie:", error);
    }
  }
  return (
    <>
<div className={classes.categoryForm}>
<button onClick={onClick} className={classes.buttonBack}>retour</button>
    <form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(addSousCategorie)}
    >
      <div className={classes.inputDivStyle}>
        <label htmlFor="nameSubCategory">Ajouter une sous catégorie</label>
        <input
          type="text"
          placeholder="Confirmation de mot de passe"
          {...register("nameSubCategory")}
          id="nameSubCategory"
          className={
            errors.nameSubCategory ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.nameSubCategory?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>
        Ajouter une sous catégorie
      </button>
    </form>
    </div>
        </>
  );
}