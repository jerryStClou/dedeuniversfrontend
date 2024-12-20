
"use client"; // 


import classes from "./RegisterForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserRegister } from "@/types/types";


export default function RegisterForm1(){
  const router = useRouter();
  
const passwordSchema = z
.string()
.min(12, "Le mot de passe doit contenir au moins 12 caractères.")
.regex(/[A-Z].*[A-Z]/, "Le mot de passe doit contenir au moins 2 lettres majuscules.")
.regex(/\d.*\d/, "Le mot de passe doit contenir au moins 2 chiffres.")
.regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins 1 caractère spécial.");

const registerSchema = z.object({
lastname: z.string().min(2, { message: "Le nom doit contenir au moins 2 lettres." }),
firstname: z.string().min(2, { message: "Le prénom doit contenir au moins 2 lettres." }),
pseudo: z.string().min(2, { message: "Le pseudo doit contenir au moins 2 lettres." }),
imageProfil: z.string().optional(),
email: z.string().email({ message: "Email incorrecte !" }),
password: passwordSchema,
confirmPassword: z.string()
  .min(12, "La confirmation de mot de passe doit contenir au moins 12 caractères.")
// roleId: z.number().optional(),  // Décommente si nécessaire
});


    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserRegister>({
      resolver: zodResolver(registerSchema),
    });
  
    async function registerUser(data:UserRegister) {
      try {
        const response = await axios.post(
          "http://localhost:9197/api/auth/register",
          data
        );
        console.log(response.data);
        // router.push("auth/login");
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
      }
    }
  
    return (
      <form
        className={classes.formulaireContact}
        onSubmit={handleSubmit(registerUser)}
      >
        <h1>S'inscrire</h1>
        <div className={classes.nameUser}>
  
          <div className={classes.nameStyle}>
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              placeholder="lastname"
              {...register("lastname")}
              className={
                errors.lastname ? classes.nameinputStyleError : classes.nameinputStyle
              }
            />
            <p className={classes.errorStyle}>{errors.lastname?.message}</p>
          </div>
          
          <div className={classes.nameStyle}>
            <label htmlFor="name">Prenom</label>
            <input
              type="text"
              placeholder="firstname"
              {...register("firstname")}
              className={
                errors.firstname ? classes.nameinputStyleError : classes.nameinputStyle
              }
            />
            <p className={classes.errorStyle}>{errors.firstname?.message}</p>
          </div>
        </div>
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="pseudo">pseudo</label>
          <input
            type="pseudo"
            placeholder="pseudo"
            {...register("pseudo")}
            className={errors.pseudo ? classes.inputError : classes.inputStyle}
          />
          <p className={classes.errorStyle}>{errors.pseudo?.message}</p>
        </div>

        
        <div className={classes.inputDivStyle}>
          <label htmlFor="imageProfil">imageProfil</label>
          <input
            type="imageProfil"
            placeholder="imageProfil"
            {...register("imageProfil")}
            className={errors.imageProfil ? classes.inputError : classes.inputStyle}
          />
          <p className={classes.errorStyle}>{errors.imageProfil?.message}</p>
        </div>

        <div className={classes.inputDivStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={errors.email ? classes.inputError : classes.inputStyle}
          />
          <p className={classes.errorStyle}>{errors.email?.message}</p>
        </div>
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            {...register("password")}
            className={errors.password ? classes.inputError : classes.inputStyle}
          />
          <p className={classes.errorStyle}>{errors.password?.message}</p>
        </div>
  
  
  
        <div className={classes.inputDivStyle}>
          <label htmlFor="confirmPassword">Confirmation de Mot de passe</label>
          <input
            type="password"
            placeholder="Mot de passe"
            {...register("confirmPassword")}
            className={errors.confirmPassword ? classes.inputError : classes.inputStyle}
          />
          <p className={classes.errorStyle}>{errors.confirmPassword?.message}</p>
        </div>
  
              {/* <input type="hidden" {...register("roleId")} value={2} /> */}

        <button className={classes.buttonStyleContact}>S'incrire</button>
        <div className={classes.goToConnection}>
          <p>Déja inscrit ?</p>
          <Link href="/login">Se connecter</Link>
        </div>
      </form>
    )
}