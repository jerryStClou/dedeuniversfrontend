
"use client"; // 

import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Color } from "@/types/types";
import { useEffect, useState } from "react";
  
interface PropsColorForm {
    onClick: () => void;
    onColorAdded: () => void;  
    colorId:number;
  }

export default function ColorEdit({onClick, onColorAdded, colorId}:PropsColorForm){
    
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};
    const [colorProduct, setColorProduct] = useState<Color>();

    useEffect(() => {
        const fetchColor = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9197/api/color/"+colorId,
              {
                withCredentials: true,  // Ajout de cette option pour envoyer les cookies
              }
            );
            setColorProduct(response.data);
            console.log(response.data);
            console.log("hello world");
          } catch (error) {
            console.error("Error fetching Color:", error);
          }
        };
    
        fetchColor();
      }, []);
  const colorSchema = z.object({
    color: z
      .string()
      .min(2, {
        message: "Le nom de la couleur doit contenir au moins 2 lettres",
      })
      .regex(
        /^[a-zA-Z\u00C0-\u00FF\s]*$/,
        "Le nom de la couleur ne doit contenir que des lettres et des espaces"
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Color>({
    resolver: zodResolver(colorSchema),
  });

  async function updateColor(data:Color) {
    try {
      const csrfToken = await fetchTokenCsrf();
      const response = await axios.put(
        "http://localhost:9197/api/color/update/"+colorId,
        data,
        {
            withCredentials: true,  // Pour envoyer les cookies avec la requête
            headers: {
                'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
            }
        }
      );
      console.log("couleur ajouté avec succès:", response.data.id);
      onColorAdded(); // Appelez cette fonction après l'ajout de la catégorie
    } catch (error) {
      console.error("Erreur lors de l'ajout de la couleur:", error);
    }
  }

    return(
        <>

<div className={classes.categoryForm}>
      <button onClick={onClick} className={classes.buttonBack}>retour</button>
    <form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(updateColor)}
    >

      <div className={classes.inputDivStyle}>
        <label htmlFor="color">Modifier une couleur</label>
        <input
          type="text"
          placeholder={colorProduct?.color}
          {...register("color")}
          id="color"
          className={
            errors.color ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.color?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>
        Modifier une couleur
      </button>
    </form>
    </div>
        </>
    )
}