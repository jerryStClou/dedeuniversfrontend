"use client"; // 



import classes from "./ContactForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export default function ContactForm1(){

  
  
type ContactData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  content: string;
};



const contactSchema = z.object({
  firstname: z
  .string()
  .min(2, { message: "Le prenom doit contenir au moins 2 lettres" })
  .regex(
    /^[a-zA-Z\s]*$/,
    "Le prenom ne doit contenir que des lettres et des espaces"
  ),
  lastname:z
  .string()
  .min(2, { message: "Le nom doit contenir au moins 2 lettres" })
  .regex(
    /^[a-zA-Z\s]*$/,
    "Le nom ne doit contenir que des lettres et des espaces"
  ),

  email: z.string().email({ message: "Email incorrecte!" }),

  phone:z.string()
  .min(6, { message: "Le numero de téléphone doit contenir au moins 6 caractère" }),

  content: z.string()
  .min(2, { message: "Le message doit contenir au moins 2 lettres" })
});

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<ContactData>({
  resolver: zodResolver(contactSchema),
});


async function contactSubmit(data:ContactData) {
  try {
    console.log("hello");
  } catch (error) {
    console.log("error");
  }
}
    
  return (
    <form className={classes.formulaireContact}
    onSubmit={handleSubmit(contactSubmit)}
  >
      <div className={classes.nameUser}>
        <div className={classes.nameStyle}>
          <label htmlFor="firstName">Prenom</label>
          <input
            type="text"
            placeholder="Prenom"
            className={
                errors.firstname ? classes.nameinputStyleError : classes.nameinputStyle
              }
            {...register("firstname")}
          />
            <p className={classes.errorStyle}>{errors.firstname?.message}</p>
        </div>

        <div className={classes.nameStyle}>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            placeholder="Nom"
            className={
                errors.lastname ? classes.nameinputStyleError : classes.nameinputStyle
              }
            {...register("lastname")}
          />
            <p className={classes.errorStyle}>{errors.lastname?.message}</p>
        </div>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          className={errors.email ? classes.inputError : classes.inputStyle}
          {...register("email")}
        />
            <p className={classes.errorStyle}>{errors.email?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="phone">Téléphone</label>
        <input
          type="text"
          placeholder="Téléphone"
          className={errors.phone ? classes.inputError : classes.inputStyle}
          {...register("phone")}
        />
            <p className={classes.errorStyle}>{errors.phone?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="phone">Message</label>
        <textarea 
          placeholder="Ecrivez vos messages"
              {...register("content")}
        ></textarea>
            <p className={classes.errorStyle}>{errors.content?.message}</p>
      </div>

      <button className={classes.buttonStyleContact}>Envoyer</button>
    </form>
  );
}