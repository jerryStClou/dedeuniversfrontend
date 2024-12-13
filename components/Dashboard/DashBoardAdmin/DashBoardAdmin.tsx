import { useState } from "react";
import classes from "./DashboardAdmin.module.css";
import CardsProductDashboard from "./CardsProductDashboard/CardsProductDashboard";
import { useRouter } from 'next/router';

export default function DashboardAdmin(){

    return(
        <>

            <h1>DashboardAdmin</h1>
            <div className={classes.profil}>
                <div className={classes.imageProfil}>
                    <img src="https://i-mom.unimedias.fr/2020/09/16/dragon-ball-songohan.jpg?auto=format,compress&cs=tinysrgb&w=1200" alt="" />
                </div>
                <p className={classes.nameProfil}>Nom prenom </p>
            </div>
            <div className={classes.allButtons}>
                <button className={classes.buttonDashboardAdminActive}>
                   Tous les produits
                </button>
                <button className={classes.buttonDashboardAdmin}>
                   Ajouter un produit
                </button>
                <button className={classes.buttonDashboardAdmin}>
                    gérer les catégories
                </button>
                <button className={classes.buttonDashboardAdmin}>
                    gérer les sous catégories
                </button>
                <button className={classes.buttonDashboardAdmin}>
                    gérer les promotions
                </button>
                <button className={classes.buttonDashboardAdmin}>
                    Ajouter un produit
                </button>
            </div>

            <CardsProductDashboard/>
        </>
    )
}