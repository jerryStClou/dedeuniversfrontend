"use client"; // 


import classes from "./LoginForm1.module.css";

import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginForm1() {
  type LoginData = {
    username: string;
    password: string;
  };
  const router = useRouter();



  const loginSchema = z.object({
    username: z.string().email({ message: 'Email incorrecte!' }),
    password: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });



  async function loginUser(data: LoginData) {
    try {
      // Envoi de la requête de connexion
      const response = await axios.post('http://localhost:9197/api/auth/login', data, {
        withCredentials: true, // S'assurer que les cookies sont envoyés avec la requête
      });
  
      // Les cookies seront ajoutés par le backend, vous n'avez pas besoin de les stocker à nouveau
      // Le backend s'occupe de l'envoi des cookies, il n'est donc pas nécessaire de les stocker côté client
  
      // console.log('Réponse reçue:', response.data);
  
      // Vous pouvez vérifier si les cookies sont effectivement envoyés, mais pas besoin de les manipuler ici
  
      // Rediriger l'utilisateur vers le dashboard après la connexion réussie
      // router.push('/user/dashboard/dashboardClient/dashboardClient');
      router.push('/test/Test');

      
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
  
      // Gérer l'erreur, afficher un message utilisateur, etc.
      alert('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    }
  }
  



  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <h1>Se connecter</h1>
      <div>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...register('username')}
          className={errors.username ? classes.inputError : classes.inputStyle}
        />
        <p>{errors.username?.message}</p>
      </div>

      <div>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          placeholder="Mot de passe"
          {...register('password')}
          className={errors.password ? classes.inputError : classes.inputStyle}
        />
        <p>{errors.password?.message}</p>
      </div>

      <button type="submit"  className={classes.buttonStyleContact}>Se connecter</button>
    </form>
  );
}
