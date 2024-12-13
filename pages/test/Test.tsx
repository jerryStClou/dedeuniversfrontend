import { useRouter } from 'next/router'; // Pour rediriger
import Cookies from 'js-cookie'; // Pour manipuler les cookies
import axios, { AxiosError } from 'axios'; // Pour faire des requêtes HTTP et importer le type d'erreur Axios

import { useEffect, useState } from 'react';


interface UserData {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export default function DashboardClient() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
  
    // useEffect(() => {
    //   // Appel pour récupérer les données utilisateur
    //   const fetchUserData = async () => {
    //     try {
    //       const response = await axios.get('http://localhost:9197/api/protected/userdata', {
    //         withCredentials: true,  // Envoi automatique des cookies
    //       });
    //       setUserData(response.data); // Stocker les données utilisateur
    //     } catch (error: unknown) {
    //       // TypeScript ne connaît pas 'error' par défaut, donc on le typé comme 'AxiosError'
    //       if (axios.isAxiosError(error)) {
    //         const axiosError = error as AxiosError; // Type assertion
    //         if (axiosError.response?.status === 403) {
    //           alert('Accès interdit, vérifiez votre token.');
    //         } else if (axiosError.response?.status === 401) {
    //           alert('Utilisateur non authentifié.');
    //         } else {
    //           alert('Erreur réseau');
    //         }
    //       } else {
    //         // Si ce n'est pas une erreur Axios, gérer l'erreur autrement
    //         console.error('Erreur inconnue:', error);
    //         alert('Erreur inconnue');
    //       }
    //     }
    //   };
  
    //   fetchUserData();
    // }, []);
  
    async function logout() {
      try {
        const response = await axios.post('http://localhost:9197/api/auth/logout', {}, {
          withCredentials: true,
        });
        // alert(response.data);
        router.push('/auth/login');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error('Erreur lors de la déconnexion:', axiosError);
          alert('Erreur lors de la déconnexion.');
        } else {
          console.error('Erreur inconnue lors de la déconnexion:', error);
          alert('Erreur inconnue lors de la déconnexion.');
        }
      }
    }
  
    return (
      <div>
        <h1>Dashboard client</h1>
        {/* {userData ? (
          <div>
            <p>Nom: {userData.firstName} {userData.lastName}</p>
            <p>Email: {userData.email}</p>
          </div>
        ) : (
          <p>Chargement des données...</p>
        )} */}
        <button onClick={logout}>Déconnexion</button>
      </div>
    );
  }
  