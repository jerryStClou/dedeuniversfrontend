
"use client"; // 


import classes from "@/styles/FormStyle/FormStyle1.module.css";
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
    }),
    imageSubCategory:z.string()
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
          "http://localhost:9197/api/subCategory/"+subCategoryId,{withCredentials: true}
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
          // Récupérer le token CSRF depuis le cookie
          const csrfToken = document.cookie
          .split(';')
          .find(cookie => cookie.trim().startsWith('XSRF-TOKEN='))?.split('=')[1];

      if (!csrfToken) {
          console.error("Token CSRF manquant");
          return;
      }

  console.log("Token CSRF envoyé:", csrfToken);
      const response = await axios.put(
        "http://localhost:9197/api/subCategory/update/"+subCategoryId,data,
        {
            withCredentials: true,  // Pour envoyer les cookies avec la requête
            headers: {
                'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
            }
        }
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

      
      
      <div className={classes.inputDivStyle}>
        <label htmlFor="imageSubCategory">Modifier le chemin de l'image de la sous catégorie</label>
        <input
          type="text"
          placeholder={subCategory?.imageSubCategory}
          {...register("imageSubCategory")}
          id="imageSubCategory"
          className={
            errors.imageSubCategory ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.imageSubCategory?.message}</p>
      </div>


      <button className={classes.buttonStyleContact}>
        Modifier une sous catégorie
      </button>
    </form>
    </div>
        </>
    )
}