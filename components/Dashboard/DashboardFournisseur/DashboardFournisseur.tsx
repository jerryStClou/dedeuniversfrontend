import { useContext } from "react";
import classes from "./DashboardFournisseur.module.css";
import { AddProduitContext } from "../../Context/ProduitContext/AddProduitContext/AddProduitContext";
import { IdAddProduitContext } from "../../Context/ProduitContext/AddProduitContext/IdAddProduitContext";

export default function DashboardFournisseur() {
  const { toggleFournisseurForm } = useContext(AddProduitContext);
  console.log(toggleFournisseurForm);
  return (
    <div className={classes.DashboardSousCategorie}>
      {/* <p className={classes.pIntroDashboardSousCategorie}>
            Pour l'ajout de vos produits nous avons besoins d'abord
            de connaître le type du produit(télé, smatrphone, montre, assiette, ect..)
            auquel vous souhaitez ajouter.
        </p> */}
      <button
        className={classes.boutonAjoutSousCategorie}
        onClick={toggleFournisseurForm}
      >
        Ajouter un nouveau founisseur
      </button>
      <p className={classes.pOu}>Ou</p>
      <p className={classes.pPropositionList}>
        Selectionnez un founisseur déja existant
      </p>
      <div className={classes.cardsDashboardSousCategorie}>
        <div className={classes.cardDashboardSousCategorie}>
          <div className={classes.imageCardDashboardSousCategorie}>
            <p>
              Nom Fournisseur :<label> Jerry Entreprise</label>
            </p>
            <p>
              Pays d'origine :<label> France</label>
            </p>
          </div>
          <div className={classes.infoCardDashboardSousCategorie}>
            {/* <p>Titre sous catégorie</p> */}

            <div className={classes.boutonsCardDashboardSousCategorie}>
              <button className={classes.boutonSelectionner}>
                Selectionner
              </button>
              <button className={classes.boutonModifier}>Modifier</button>
              <button className={classes.boutonSupprimer}>Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
