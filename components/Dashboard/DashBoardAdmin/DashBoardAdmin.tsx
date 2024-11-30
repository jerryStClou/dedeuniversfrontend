
"use client"; // 
import { useContext, useState } from "react";
import classes from "./DashboardAdmin.module.css";
import CardsProductDashboard from "./CardsProductDashboard/CardsProductDashboard";
import ListUsers from "./ListUsers";
import DashboardCategory from "../DashboardCategory/DashboardCategory";
import CategoryForm1 from "@/components/forms/CategoryForm/CategoryForm1/CategoryForm1";

export default function DashboardAdmin() {
  // const { addProduit,toggleCategorieForm } = useContext(AddProduitContext);
  const [addProduit, setAddProduit] = useState("dashboardCategory");
  const [buttonChoiceAdmin, setButtonChoiceAdmin] = useState("liste de produit");
  
  function addProduct() {
    setButtonChoiceAdmin("add");
  }
  function productList() {
    setButtonChoiceAdmin("liste de produit");
  }
  function userList() {
    setButtonChoiceAdmin("liste des utilisateurs");
  }

  return(
    <>
    <p>{buttonChoiceAdmin}</p>
    <p>{addProduit}</p>
      <div className={classes.DashboardAdmin}>
        <div className={classes.cardDashboard}>
          
          <div className={classes.buttonsDashboard2}>

            <button
              onClick={productList}
              className={
                buttonChoiceAdmin === "liste de produit"
                  ? classes.buttonDashBoardStyle
                  : classes.buttonDashBoardStyle2
              }
            >
              liste de tous les produits
            </button>

            
          <button onClick={userList} className={
              buttonChoiceAdmin === "liste des utilisateurs"
                ? classes.buttonDashBoardStyle
                : classes.buttonDashBoardStyle2
            }
          >
            liste de tous les utilisateurs
          </button>
          <button
            onClick={addProduct}
            className={
              buttonChoiceAdmin === "add"
                ? classes.buttonDashBoardStyle
                : classes.buttonDashBoardStyle2
            }
          >
            Ajout de produits
          </button>
          </div>

          <div className={classes.cardsProductDashboard}>
            {buttonChoiceAdmin === "liste de produit" ? (
            <CardsProductDashboard />):
            buttonChoiceAdmin === "liste des utilisateurs" ?
            (<ListUsers/>):
            buttonChoiceAdmin === "add" && addProduit === "dashboardCategory"?
            (<DashboardCategory />):
            (null)
            }
          </div>

        </div>
      </div>
    </>
  )
}
