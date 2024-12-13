import classes from "./ProductImageForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ProductImages } from "@/types/types";

interface PropsProductImages {
  onClick: () => void;  
    productImagesId:number;
    dashProImg: () => void;
  }
  
export default function ProductImageEdit({onClick, productImagesId, dashProImg}:PropsProductImages){
    
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};
    const imageProduitSchema = z.object({
        productImages: z.string(),
        typeProductImages: z
        .string()
        .min(2, {
          message: "Le type de l'image produit doit contenir au moins 2 lettres",
        })
        .regex(
          /^[a-zA-Z\u00C0-\u00FF\s]*$/,
          "Le type de l'image produit ne doit contenir que des lettres et des espaces"
        ),
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<ProductImages>({
        resolver: zodResolver(imageProduitSchema),
      });

      async function editImageProduit(data:ProductImages) {
        try {
          const csrfToken = await fetchTokenCsrf();
          const response = await axios.put(
            "http://localhost:9197/api/productImage/update/"+productImagesId,
            data,
            {
                withCredentials: true,  // Pour envoyer les cookies avec la requête
                headers: {
                    'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
                }
            }
          );
          console.log(response);
          console.log("l'image du produit à été modifier avec succès:", response.data.id);
          // console.log(data);
          dashProImg();
        } catch (error) {
          console.error("Erreur lors de la modification de l'image du produit:", error);
        }
      }
    
    return(
        <>
        <div className={classes.categoryForm}>
          <button onClick={onClick} className={classes.buttonBack}>retour</button>
        <form
          className={classes.formulaireContact}
          onSubmit={handleSubmit(editImageProduit)}
        >
          
          <div className={classes.inputDivStyle}>
            <label htmlFor="productImages">Modifier une image au produit</label>
            <input
              type="text"
              placeholder="mettez url de votre image"
              {...register("productImages")}
              id="productImages"
              className={
                errors.productImages ? classes.inputError : classes.inputStyle
              }
            />
            <p className={classes.errorStyle}>
              {errors.productImages?.message}
            </p>
          </div>

          <div className={classes.inputDivStyle}>
            <label htmlFor="typeProductImages">de quelle type est votre image</label>
            <input
              type="text"
              placeholder="de quelle type est votre image"
              {...register("typeProductImages")}
              id="typeProductImages"
              className={
                errors.typeProductImages ? classes.inputError : classes.inputStyle
              }
            />
            <p className={classes.errorStyle}>
              {errors.typeProductImages?.message}
            </p>
          </div>

    
          <button className={classes.buttonStyleContact}>
            Modifier une image au produit
          </button>
        </form>
        </div>

        </>
    )
}