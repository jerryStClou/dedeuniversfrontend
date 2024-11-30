
"use client"; // 


import classes from "./SubCategoryForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubCategory } from "@/types/types";
import { useEffect, useState } from "react";

type PropsSubCategoryEditForm = {
    subCategoryId: number;
    onClick: () => void;
    onSubCategoryAdded: () => void;
  };

export default function SubCategoryEditForm({subCategoryId,onClick, onSubCategoryAdded}:PropsSubCategoryEditForm){
    const [subCategory,setSubCategory] = useState<SubCategory>();
    
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

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/subCategory/"+subCategoryId
        );
        setSubCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);




  async function EditSubCategory(data:SubCategory) {
    try {
      const response = await axios.put(
        "http://localhost:9196/api/subCategory/update/"+subCategoryId,data
      );
      console.log("La sous categorie à été ajouté avec succès:", response.data.id);
      onSubCategoryAdded();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la sous categorie:", error);
    }
  }


    return(
        <>
        <div className={classes.categoryForm}>
        <button onClick={onClick} className={classes.buttonBack}>retour</button>

<form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(EditSubCategory)}
    >
      <div className={classes.inputDivStyle}>
        <label htmlFor="nameSubCategory">Modifier une sous catégorie</label>
        <input
          type="text"
          placeholder={subCategory?.nameSubCategory}
          {...register("nameSubCategory")}
          id="nameSubCategory"
          className={
            errors.nameSubCategory ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.nameSubCategory?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>
        Modifier une sous catégorie
      </button>
    </form>
    </div>
        </>
    )
}