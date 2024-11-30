import classes from "../CategoryForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Category } from "@/types/types";
import { useEffect, useState } from "react";

type PropsCategoryEditForm = {
    categoryId: number;
    onClick: () => void;
    onCategoryAdded: () => void;
  };
  
export default function CategoryEditForm({categoryId,onClick, onCategoryAdded}:PropsCategoryEditForm){
    const [category,setCategory] = useState<Category>();
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

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/category/"+categoryId
        );
        setCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);


  async function categoryEdit(data:Category) {
    try {
      const response = await axios.put(
        "http://localhost:9196/api/category/update/"+categoryId,
        data
      );
      console.log("categorie ajouté avec succès:", response.data.id);
      onCategoryAdded(); // Appelez cette fonction après l'ajout de la catégorie
    // console.log("http://localhost:9196/api/category/update/"+categoryId);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la categorie:", error);
    }
  }

    return(
        <>
    <div className={classes.categoryForm}>
    <button onClick={onClick} className={classes.buttonBack}>retour</button>
    <form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(categoryEdit)}
    >

      <div className={classes.inputDivStyle}>
        <label htmlFor="nameCategory">Ajouter une catégorie</label>
        <input
          type="text"
          placeholder={category?.nameCategory}
          {...register("nameCategory")}
          id="nameCategory"
          className={
            errors.nameCategory ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.nameCategory?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>
        Modifier une catégorie
      </button>
    </form>
    </div>
        </>
    )
}