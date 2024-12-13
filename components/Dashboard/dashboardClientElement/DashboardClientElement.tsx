import { useEffect, useState } from "react";
import classes from "./DashboardClient.module.css";
import iconAddress from "@/public/images/address.png";
import iconProfil from "@/public/images/profil.png";
import iconComment from "@/public/images/comment.png";
import EditProfil from "./EditProfil/EditProfil";
import ListAddress from "../../List/ListAddress/ListAddress";
import EditAddress from "../../forms/AddressForm/EditAddress";
import AddressForm from "../../forms/AddressForm/AddressForm";
import ListComment from "../../List/ListComment/ListComment";
import Image from 'next/image';
import axios from "axios";


interface UserData {
    firstname: string;
    lastname: string;
    pseudo:string;
    imageProfil:string;
    email: string;
    role:string;
  }
  


export default function DashboardClientElement(){
    const [modal,setModal] = useState<boolean>(false);
    const [component,setComponent] = useState<string>("dashboard client");

    
    const [userData, setUserData] = useState<UserData | null>(null);
    
  
    useEffect(() => {
      // Appel pour récupérer les données utilisateur
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:9197/api/protected/userdata', {
            withCredentials: true,  // Envoi automatique des cookies
          });
          setUserData(response.data); // Stocker les données utilisateur
          console.log(response.data);
        } catch (error: unknown) {
          // TypeScript ne connaît pas 'error' par défaut, donc on le typé comme 'AxiosError'
          if (axios.isAxiosError(error)) {
            const axiosError = error;
            if (axiosError.response?.status === 403) {
              alert('Accès interdit, vérifiez votre token.');
            } else if (axiosError.response?.status === 401) {
              alert('Utilisateur non authentifié.');
            } else {
              alert('Erreur réseau');
            }
          } else {
            console.error('Erreur inconnue:', error);
            alert('Erreur inconnue');
          }
        }
      };
  
      fetchUserData();
    }, []);


    function editProfil(){
        setComponent("edit profil");
        setModal(!modal);
    }

    function backtoMenu(){
        setComponent("dashboard client");
        setModal(!modal);
    }

    function addressesList(){
        setComponent("addresses list");
        setModal(!modal);
    }

    function addAdress(){
        setComponent("add address");

    }

    function editAddress(){
        setComponent("edit address");
    }

    function seeComments(){
        setComponent("see comments");
        setModal(!modal);
    }
    return(
        <>
            <h1>DashboardClient</h1>
            <div className={classes.profil}>
                <div className={classes.imageProfil}>
                    <img src={userData?.imageProfil} alt="" />
                </div>
                <p className={classes.nameProfil}>{userData?.firstname} {userData?.lastname}</p>
            </div>
            <div className={classes.allButtons}>
                <button onClick={addressesList}>
                    <Image src={iconAddress} alt="Etoile" />
                    <p>Gérer les addresses</p>
                </button>
                <button onClick={editProfil}>
                    <Image src={iconProfil} alt="Etoile" />
                    <p>Modifier son profil</p>
                </button>
                <button onClick={seeComments}>
                    <Image src={iconComment} alt="Etoile" />
                    <p>Voir ses commentaires</p>
                </button>
            </div>
            {
                modal === true ? 
                (
                    <>
                        <div className={classes.modal}  onClick={backtoMenu}></div>

                    </>
                ):
                (null)
            }

            {
                component === "edit profil"?
                (
                    <div className={classes.modalDiv}>
                        <button className={classes.retourButtonStyle} onClick={backtoMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>

                        </button>
                        <EditProfil />
                    </div>
                ) :
                component === "addresses list"?
                (
                    <>

                    <div className={classes.modalDiv}>
                        <button className={classes.retourButtonStyle} onClick={backtoMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                        </button>
                        <ListAddress handleAddAddress={addAdress} idUser={1} handleEditAddress={editAddress}/>
                    </div>
                    </>
                ):component === "edit address"?
                (
                    <>

                    <div className={classes.modalDiv}>
                        <button className={classes.retourButtonStyle} onClick={backtoMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                        </button>
                        <EditAddress/>
                    </div>
                    </>
                ):component === "add address"?
                (
                    <>

                    <div className={classes.modalDiv}>
                        <button className={classes.retourButtonStyle} onClick={backtoMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                        </button>
                        <AddressForm/>
                    </div>
                    </>
                ):component === "see comments"?
                (
                    <>

                    <div className={classes.modalDiv}>
                        <button className={classes.retourButtonStyle} onClick={backtoMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                        </button>
                        <ListComment/>
                    </div>
                    </>
                ):
                (null)
            }
        </>
    )
}