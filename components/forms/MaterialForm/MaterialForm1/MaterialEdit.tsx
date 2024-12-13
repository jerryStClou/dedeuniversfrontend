
"use client"; // 

import { useEffect, useState } from "react";
import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Material } from "@/types/types";
  
interface PropsMaterialForm {
    onClick: () => void;
    onMaterialAdded: () => void;  
    materialId:number;
  }

export default function MaterialEdit({onClick, onMaterialAdded, materialId}:PropsMaterialForm){
    
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};
    const [materialProduct, setMaterialProduct] = useState<Material>();

    useEffect(() => {
        const fetchMaterial = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9197/api/material/"+materialId,
              {
                withCredentials: true,  // Ajout de cette option pour envoyer les cookies
              }
            );
            setMaterialProduct(response.data);
            console.log(response.data);
            console.log("hello world");
          } catch (error) {
            console.error("Error fetching Color:", error);
          }
        };
    
        fetchMaterial();
      }, []);

    const materialSchema = z.object({
      material: z
        .string()
        .min(2, {
          message: "Le nom du matériaux doit contenir au moins 2 lettres",
        })
        .regex(
          /^[a-zA-Z\u00C0-\u00FF\s]*$/,
          "Le nom du matériaux ne doit contenir que des lettres et des espaces"
        ),
        influenceMaterialPrice:z.number(),
        influenceMaterialWeight:z.number()
    });
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Material>({
      resolver: zodResolver(materialSchema),
    });
  
    async function updateMaterial(data:Material) {
      try {
        const csrfToken = await fetchTokenCsrf();
        const response = await axios.put(
          "http://localhost:9197/api/material/update/"+materialId,
          data,
          {
              withCredentials: true,  // Pour envoyer les cookies avec la requête
              headers: {
                  'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
              }
          }
        );
        console.log("couleur ajouté avec succès:", response.data.id);
        onMaterialAdded(); // Appelez cette fonction après l'ajout de la catégorie
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
        onSubmit={handleSubmit(updateMaterial)}
      >
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="material">Modifier un matériaux</label>
          <input
            type="text"
            placeholder={materialProduct?.material}
            {...register("material")}
            id="material"
            className={
              errors.material ? classes.inputError : classes.inputStyle
            }
          />
          <p className={classes.errorStyle}>{errors.material?.message}</p>
        </div>
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="influenceMaterialPrice">influenceMaterialPrice</label>
          <input
            type="number"
            placeholder={materialProduct?.influenceMaterialPrice?.toString()}
            {...register("influenceMaterialPrice", { valueAsNumber: true })}
            className={
              errors.influenceMaterialPrice ? classes.inputError : classes.inputStyle
            }
          />
          <p className={classes.errorStyle}>{errors.influenceMaterialPrice?.message}</p>
        </div>
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="influenceMaterialWeight">influenceMaterialWeight</label>
          <input
            type="number"
            placeholder={materialProduct?.influenceMaterialWeight?.toString()}
            {...register("influenceMaterialWeight", { valueAsNumber: true })}
            className={
              errors.influenceMaterialWeight ? classes.inputError : classes.inputStyle
            }
          />
          <p className={classes.errorStyle}>{errors.influenceMaterialWeight?.message}</p>
        </div>
  
        <button className={classes.buttonStyleContact}>
          Modifier un matériaux
        </button>
      </form>
      </div>
          </>
      )
  }