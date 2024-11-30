
"use client"; // 

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import classes from "./ModifProductForm.module.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";


export default function ModifProductForm(){
  

  type ModifProducData = {
    nomProduit: string;
    description: string;
    prix: number;
    stock: number;
  };
    
  const [produits, setProduits] = useState([]);
  //   const parametres = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/produit/1`);
        setProduits(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const addProductSchema = z.object({
    nomProduit: z
      .string()
      .min(2, { message: "Le nom du produit doit contenir au moins 2 lettres" })
      .regex(
        /^[a-zA-Z\s]*$/,
        "Le nom ne doit contenir que des lettres et des espaces"
      ),
    description: z
      .string()
      .min(6, { message: "la description doit avoir au moin 6 lettre" }),
    prix: z
      .number()
      .positive(/*{ message: "le stock ne peut être négative " }*/),
    // image:z.string({message:"l'image doit être une chaine de caractère "}),
    stock: z
      .number()
      .positive(/*{ message: "le stock ne peut être négative " }*/),
    id: z.number(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ModifProducData>({
    resolver: zodResolver(addProductSchema),
  });

  async function updateProduct(data:ModifProducData) {
    try {
      const response = await axios.put(
        `http://localhost:8084/api/produit/modif`,
        {
          nomProduit: data.nomProduit,
        }
      );
      console.log("Produit modifié:", response.data);
    } catch (error) {
      console.error("Erreur lors de la modification du produit:", error);
    }
    console.log("hello");
  }

  return (
    <form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(updateProduct)}
    >
      <div className={classes.inputDivStyle}>
        <label htmlFor="nomProduit">
          Nom du produit: 
          {/* {produits.nomProduit} */}
          </label>
        <input
          type="text"
          // placeholder={`${produits.nomProduit}`}
          {...register("nomProduit")}
          className={
            errors.nomProduit ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.nomProduit?.message}</p>
      </div>
      <input type="hidden" value="1" />
      <div className={classes.inputDivStyle}>
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="description du produit"
          {...register("description")}
          className={
            errors.nomProduit ? classes.inputError : classes.inputStyle
          }
        ></textarea>
        <p className={classes.errorStyle}>{errors.description?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="prix">Prix</label>
        <input
          type="number"
          placeholder="prix du produit"
          {...register("prix", { valueAsNumber: true })}
          className={errors.prix ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.prix?.message}</p>
      </div>

      {/*         

		<div className={classes.inputDivStyle}>
			<label htmlFor="imageProduit">image du produit</label>
			<input 
				type="text" 
				placeholder="image du produit"
				{...register("imageProduit")}
				className={
					errors.imageProduit?
					classes.inputError:
					classes.inputStyle
				}
			/>
			<p className={classes.errorStyle}>{errors.imageProduit?.message}</p>
		</div> */}

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

      <button className={classes.buttonStyleContact}>Ajouter</button>
    </form>
  );
}