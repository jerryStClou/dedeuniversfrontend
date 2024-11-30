
"use client"; // 



import classes from "./SearchNameProduct.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
export default function SearchNameProduct(){

  type SearchNameProductData = {
    nomProduit: string;
  };

    
    const [produits, setProduits] = useState([]);

    const searchByNameProductSchema = z.object({
		nomProduit:z.string()
		.min(2, { message: "Le nom doit contenir au moins 2 lettres" })
		.regex(/^[a-zA-Z\s]*$/, 'Le nom ne doit contenir que des lettres et des espaces'),
		
	})

    

	const {
		register,
		handleSubmit,
		formState: { errors },
	  } = useForm<SearchNameProductData>({
		resolver: zodResolver(searchByNameProductSchema),
	  });

      
	async function searchByNameProduct(nomProduit:SearchNameProductData) {
		console.log("yolo");
		try {
			const response = await axios.get(`http://localhost:9195/api/produit/nom/${nomProduit}`);
            setProduits(response.data);
	  } catch (error) {
		console.error('Erreur lors de la récupération des produits:', error);
	  }

	  }

    return(
        <>
        <form 
            className={classes.trieCategorieParNomCateg}
		    onSubmit={handleSubmit(searchByNameProduct)}
			
        >
                      <div className={classes.divCategSearchByName}>
                          <label htmlFor="SearchByName">Rechercher un produit a partir du nom de la categorie</label>
                           <input 
                                type="text" 
                                // name="" 
                                id="SearchByName" 
                                placeholder="Rechercher un produit a partir du nom de la categorie" 
                                {...register("nomProduit")}
                            />
			                <p className={classes.errorStyle}>{errors.nomProduit?.message}</p>
                      </div>
                      <button>Rechercher</button>
        </form>
        </>
    )
}