
// import classes from "@/styles/FormStyle/FormStyle1.module.css";
import classes from "./AddressForm.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Address } from "@/types/types";

export default function AddressForm(){
    
  const addressSchema = z.object({
    city: z.string().min(2, {message: "Le nom de la couleur doit contenir au moins 2 lettres",}),
    street:z.string().min(2),
    postalCode:z.string().min(2)
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>({
    resolver: zodResolver(addressSchema),
  });

  async function addAddress(data:Address) {
    try {
      
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'adresse:", error);
    }
  }

    return(
        <>
            <form className={classes.addressForm}>
                  <div className={classes.divInput}>
                      <label htmlFor="">Ville</label>
                      <input 
                        type="text" 
                        placeholder="ville" 
                        {...register("city")}
                        className={
                          errors.city ? classes.inputError : classes.inputStyle
                        }
                      />
                  </div>

                  <div className={classes.divInput}>
                      <label htmlFor="">Rue</label>
                      <input 
                        type="text" 
                        placeholder="rue" 
                        {...register("street")}
                        className={
                          errors.street ? classes.inputError : classes.inputStyle
                        }
                      />
                  </div>
                  
                  <div className={classes.divInput}>
                      <label htmlFor="">Code postale</label>
                      <input 
                        type="text" 
                        placeholder="Code postale" 
                        {...register("postalCode")}
                        className={
                          errors.postalCode ? classes.inputError : classes.inputStyle
                        }
                      />
                  </div>

                  <button className={classes.buttonAddress}>Ajouter</button>
            </form>
        </>
    )
}