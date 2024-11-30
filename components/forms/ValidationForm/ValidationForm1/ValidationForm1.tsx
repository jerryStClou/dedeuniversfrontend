
"use client"; // 


import classes from "./ValidationForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface PropsValidationForm {
  handleValidation: () => void;  
}

export default function ValidationForm({handleValidation}:PropsValidationForm) {
  
  const router = useRouter();

  type ValidationData = {
    code: string;
  };

  const registerSchema = z.object({
    code: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationData>({
    resolver: zodResolver(registerSchema),
  });

  async function loginUser(data:ValidationData) {
    try {
      const response = await axios.post(
        "http://localhost:9197/api/auth/activation",
        data.code
      );
      console.log(response.data);
      handleValidation();
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  }

  return (
    <>
      <form
        className={classes.formulaireContact}
        onSubmit={handleSubmit(loginUser)}
      >
        <h1>S'inscrire</h1>
        <div className={classes.nameUser}>
          <div className={classes.nameStyle}>
            <label htmlFor="name">code</label>
            <input
              type="text"
              placeholder="code"
              {...register("code")}
              className={
                errors.code
                  ? classes.nameinputStyleError
                  : classes.nameinputStyle
              }
            />
            <p className={classes.errorStyle}>{errors.code?.message}</p>
          </div>
        </div>

        <button className={classes.buttonStyleContact}>Valider</button>
        {/* <div className={classes.goToConnection}>
          <p>Déja inscrit ?</p>
          <Link to={"/login"}>Se connecter</Link>
        </div> */}
      </form>
    </>
  );
}