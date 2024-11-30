import classes from "./SelectSousCategorie.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function SelectSousCategorie(){
    
    const categorieSchema = z.object({
		choiceSousCategorie:z.string()
		});
  ;

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorieSchema),
  });

  

  function loginUser() {
    console.log("yolo");
  }

    return(
        <form
            className={classes.formulaireContact}
            onSubmit={handleSubmit(loginUser)}
        >
            <div className={classes.inputDivStyle}>
			    <label for="selectSousCategorie">Nom de la sous catégorie</label>
			    <select 
                    name="" 
                    id="selectSousCategorie"
                    {...register("choiceSousCategorie")}
                >
                   <option value="">Choississez une sous catégorie</option>
                   {/* <option value="dog"></option> */}
                </select>
			    <p className={classes.errorStyle}>{errors.choiceSousCategorie?.message}</p>
		    </div>
        </form>
    )
}