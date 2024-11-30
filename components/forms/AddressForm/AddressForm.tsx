
import classes from "@/styles/FormStyle/FormStyle1.module.css";
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

  async function addColor(data:Address) {
    try {
      
    } catch (error) {
      console.error("Erreur lors de l'ajout de la couleur:", error);
    }
  }

    return(
        <>

        </>
    )
}