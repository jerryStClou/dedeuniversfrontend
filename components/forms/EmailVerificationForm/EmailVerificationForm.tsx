
import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { EmailVerification } from "@/types/types";
import { useRouter } from 'next/router'; // Importer useRouter

interface PropsEmailVerificationForm {
    handleEmailVerification: () => void;  
  }

export default function EmailVerificationForm({handleEmailVerification}:PropsEmailVerificationForm){
    
  const emailVerificationSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "L'email doit contenir au moins 2 lettres",
      })
      
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerification>({
    resolver: zodResolver(emailVerificationSchema),
  });

  async function emailVerifySubmit(data:EmailVerification) {
    try {
    //   const response = await axios.post(
    //     "http://localhost:9197/api/auth/generate/validation-code",
    //     data.email
    //   );
    //   console.log("l'email à été vérifier avec succès:", response.data.id);
      handleEmailVerification(); // Appelez cette fonction après l'ajout de la catégorie
      const email = data.email;
    console.log(data.email);
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email", error);
    }
  }

    return(
        <>

<div className={classes.categoryForm}>
    <form
      className={classes.formulaireContact}
      onSubmit={handleSubmit(emailVerifySubmit)}
    >

      <div className={classes.inputDivStyle}>
        <label htmlFor="email">Ecrivez votre email</label>
        <input
          type="text"
          placeholder="Ecrivez  votre email"
          {...register("email")}
          id="email"
          className={
            errors.email ? classes.inputError : classes.inputStyle
          }
        />
        <p className={classes.errorStyle}>{errors.email?.message}</p>
      </div>


      <button className={classes.buttonStyleContact}>
        Envoyer
      </button>
    </form>
    </div>
        </>
    )
}