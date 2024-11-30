import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Promotion } from "@/types/types";
import axios from "axios";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import PromotionEdit from "@/components/forms/PromotionForm/PromotionEdit";
import PromotionForm from "@/components/forms/PromotionForm/PromotionForm";


export default function Promotion(){
    
  const [component,setComponent] = useState("dashboard promotion");
  const [promotions,setPromotions] = useState<Promotion[]>([]);
  const [idPromotion,setIdPromotion] = useState(0);
  const router = useRouter();

  
  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/promotions/all"
        );
        setPromotions(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Erreur dans la récupération des promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  
  function handleSelectPromotion(idPromotion:number){
    // setIdPromotion(idPromotion);
    // console.log("dashboard product");
    router.push(`/dashboardProduct/${idPromotion}`);
  }

  function backToDashPromotion(){try {
    // Code qui gère le changement d'état dans le parent (par exemple, redirection ou mise à jour de l'interface)
    setComponent("dashboard promotion");
    router.reload(); // Recharge la page ou effectue une autre action
  } catch (error) {
    console.error("Erreur dans handlePromotion:", error);
  }
  }
  
  function handleBackToPromotion(){
    setComponent("dashboard promotion");
  }
  
  function handleEditForm(promotionId:number){
    setComponent("edit promotion");
    setIdPromotion(promotionId);
  }
  
  function handleAddForm(){
    setComponent("add promotion");
  }
  

  async function handleRemoveSubCateg(promotionId:number){
    try {
      const response = await axios.delete(
        "http://localhost:9196/api/promotions/remove/"+promotionId
      );
      console.log("la promotion à été supprimer avec succès:", response.data.id);
      router.reload(); // Recharge la page
    // console.log("http://localhost:9196/api/category/update/"+categoryId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la promotion:", error);
    }
    }




    return(
        <>
{
      component === "dashboard promotion"?
      (
        <div className={classes.DashboardSousCategorie}>
          <p className={classes.pIntroDashboardSousCategorie}>
            Pour l'ajout de vos produits nous avons besoins d'abord de connaître le
            type du produit(télé, smatrphone, montre, assiette, ect..) auquel vous
            souhaitez ajouter.
          </p>
          <button
            className={classes.boutonAjoutSousCategorie} onClick={handleAddForm}
          >
            Ajouter un nouveau type
          </button>
          <p className={classes.pOu}>Ou</p>
          <p className={classes.pPropositionList}>
            Selectionnez un type déja existant
          </p>
          {
          
          promotions.length === 0 ? 
          (
            <p>Aucune sous categorie disponible.</p>
          ):
          (promotions.map((promotion)=>{
            return(
              <div className={classes.cardsDashboardSousCategorie} key={promotion.id}>
              <div className={classes.cardDashboardSousCategorie}>
                {/* <div className={classes.imageCardDashboardSousCategorie}>
                  {
                    promotion.description !== undefined?
                    (
                      <img
                      src={`/images/${subCategory.imageSubCategory}`}
                      src={subCategory.imageSubCategory}
                      alt=""
                      />
                    ):
                    (null)
                  }

                </div> */}
                <div className={classes.infoCardDashboardSousCategorie}>
                  <p>{promotion.description}</p>
                  <p>{promotion.type}</p>
                  <p>{promotion.discountPercentage}</p>
      
                  <div className={classes.boutonsCardDashboardSousCategorie}>
                    <button className={classes.boutonSelectionner}  onClick={()=>handleSelectPromotion(promotion.id)}>
                      Selectionner
                    </button>
                    <button className={classes.boutonModifier} onClick={()=>handleEditForm(promotion.id)}>Modifier</button>
                    <button className={classes.boutonSupprimer} onClick={()=>handleRemoveSubCateg(promotion.id)}>Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
            )
          }))
        
        }
              <button  className={classes.backButton}>retour</button>

        </div>):component == "edit promotion"?
      (
        <>
          <div className={classes.modalBackground} onClick={handleBackToPromotion}></div>
          <PromotionEdit handlePromotion={backToDashPromotion}   onClick={handleBackToPromotion} promotionId={idPromotion}/>
        </>
    ):component == "add promotion"?
      (
        <>
          <div className={classes.modalBackground} onClick={handleBackToPromotion}></div>
          <PromotionForm handlePromotion={backToDashPromotion} onClick={handleBackToPromotion}/>
        </>
    ):
      (null)
    }

        </>
    )
}