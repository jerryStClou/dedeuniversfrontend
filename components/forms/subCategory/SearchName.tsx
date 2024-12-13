"use client";

// import { Link, useNavigate } from "react-router-dom";
import classes from "./SearchName.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";  
export default function SearchName(){

  const router = useRouter();

const searchNameSubCategorySchema = z.object({
  nameSubCategory: z
    .string()
    .min(1, "Le nom de la sous-catégorie est requis")
    .max(100, "Le nom de la sous-catégorie est trop long"),
});


type SearchFormData = z.infer<typeof searchNameSubCategorySchema>;
const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
  resolver: zodResolver(searchNameSubCategorySchema),
});


const onSubmit = (data: SearchFormData) => {
  // Redirection vers la page subCategory avec le nom de la sous-catégorie
  router.push(`subCategory/${encodeURIComponent(data.nameSubCategory)}`);
}; 



    return(
        <>
    <form onSubmit={handleSubmit(onSubmit)} className={classes.searchName}>
        <input
          type="text"
          placeholder="Nom de la sous categorie"
          {...register("nameSubCategory")}
        />
      <button className={classes.buttonStyleContact}>Rechercher</button>
    </form>

        </>
    )
}