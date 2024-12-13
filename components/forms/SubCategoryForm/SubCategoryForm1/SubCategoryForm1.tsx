
"use client"; // 


import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { SubCategory } from "@/types/types";
import Cookies from 'js-cookie';

type PropsSubCategoryEditForm = {
  onClick: () => void;
  onSubCategoryAdded: () => void;
};

export default function SubCategoryForm1({onClick, onSubCategoryAdded}:PropsSubCategoryEditForm) {
  const [csrf,setCsrf] = useState<string>("");

  const fetchTokenCsrf = async () => {
      const response = await axios.get("http://localhost:9197/api/csrf-token", {
        withCredentials: true,
    });
      // console.log(response.data);
      // setCsrf(response.data.csrfToken);
      // console.log("le token à bien été récupérer "+response.data.csrfToken);
      return response.data.csrfToken;
    
  };



  type SubCategoryData = {
    nameSubCategory: string;
  };
  const sousCategorieSchema = z.object({
    nameSubCategory: z.string(),
    imageSubCategory:z.string()
});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubCategory>({
    resolver: zodResolver(sousCategorieSchema),
  });

  // const csrfToken = Cookies.get('XSRF-TOKEN');
  // axios.defaults.withCredentials = true;
  // axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;


//   async function addSousCategorie(data: SubCategory) {
//     console.log(csrfToken);
//     // axios.post('http://localhost:9197/api/subCategory/add', {data})
//     // .then(response => console.log(response))
//     // .catch(error => console.error(error));
//     // onSubCategoryAdded();
// }

function getCookie(name:string) {
  const cookies = document.cookie.split(';'); // Divise les cookies en tableau
  for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('='); // Supprime les espaces et sépare clé/valeur
      if (key === name) {
          return decodeURIComponent(value); // Décoder la valeur en cas de caractères encodés
      }
  }
  return undefined; // Retourne undefined si le cookie n'est pas trouvé
}

  
  async function addSousCategorie(data: SubCategory) {
    try {
        // Récupérer le token CSRF depuis le cookie
        // const csrfToken = document.cookie
        //     .split(';')
        //     .find(cookie => cookie.trim().startsWith('XSRF-TOKEN='))?.split('=')[1];

        // if (!csrfToken) {
        //     console.error("Token CSRF manquant");
        //     return;
        // }

        // console.log("Token CSRF envoyé:", csrfToken);
        // const csrfToken = getCookie("XSRF-TOKEN");
        // console.log(document.cookie);

        //Effectuer la requête POST avec le token CSRF dans les en-têtes
        const csrfToken = await fetchTokenCsrf();
        console.log(csrfToken);
        const response = await axios.post(
            "http://localhost:9197/api/subCategory/add",
            data,
            {
                withCredentials: true, // Assurez-vous d'envoyer les cookies avec la requête,  // Pour envoyer les cookies avec la requête
                headers: {
                    'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
                }
                
            }
        );
        console.log("La sous-catégorie a été ajoutée avec succès:", response.data.id);
        onSubCategoryAdded();
        //console.log("le token dans la requete post "+csrf);
    } catch (error) {
        console.error("Erreur lors de l'ajout de la sous-catégorie:", error);
    }
}



  // async function addSousCategorie(data:SubCategory) {
  //   try{
  //     const response = await axios.post("http://localhost:9197/api/subCategory/add",data,{withCredentials: true});
  //     console.log("sous categorie ajouter avec succès");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Erreur lors de l'ajout de la sous-catégorie:", error);
  //   }
  // }

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
          placeholder="Nom de la sous categorie"
          {...register("nameSubCategory")}
          id="nameSubCategory"
          className={
            errors.nameSubCategory ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.nameSubCategory?.message}</p>
      </div>

      
      <div className={classes.inputDivStyle}>
        <label htmlFor="imageSubCategory">Ajouter l'image de la sous categorie</label>
        <input
          type="text"
          placeholder="Image de la sous catégorie"
          {...register("imageSubCategory")}
          id="imageSubCategory"
          className={
            errors.imageSubCategory ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.imageSubCategory?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>
        Ajouter une sous catégorie
      </button>
    </form>
    </div>
        </>
  );
}