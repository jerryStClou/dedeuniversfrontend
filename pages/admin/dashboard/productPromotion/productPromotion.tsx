import { ProductPromotion } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import AddProductPromotion from "@/components/Modal/ProductPromotionModal/AddProductPromotion";
import EditProductPromotion from "@/components/Modal/ProductPromotionModal/EditProductPromotion";

export default function productPromotion(){

    const [component,setComponent] = useState("dashboard product promotion");
    const [productPromotions,setproductPromotions] = useState<ProductPromotion[]>([]);
    const [idProductPromotion,setIdProductPromotion] = useState(0);
    const [idProduct,setIdProduct] = useState(0);
    const [idPromotion,setIdPromotion] = useState(0);
    const router = useRouter();
  
    
    useEffect(() => {
      const fetchproductPromotion = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9196/api/productPromotion/all"
          );
          setproductPromotions(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("Erreur dans la récupération des productPromotion:", error);
        }
      };
  
      fetchproductPromotion();
    }, []);
  
    
  
    function backToDashProductPromotion(){try {
      // Code qui gère le changement d'état dans le parent (par exemple, redirection ou mise à jour de l'interface)
      setComponent("dashboard product promotion");
      router.reload(); // Recharge la page ou effectue une autre action
    } catch (error) {
      console.error("Erreur dans handlePromotion:", error);
    }
    }
    
    function handleBackToPromotion(){
      setComponent("dashboard product promotion");
    }
    
    function handleEditForm(productPromotionId:number, productId:number, promotionId:number){
      setComponent("edit product promotion");
      setIdProductPromotion(productPromotionId);
      setIdProduct(productId);
      setIdPromotion(promotionId);

    }
    
    function handleAddForm(){
      setComponent("add product promotion");
    }
    
  
    async function handleRemoveProductPromotion(promotionId:number){
      try {
        const response = await axios.delete(
          "http://localhost:9196/api/productPromotion/remove/"+promotionId
        );
        console.log("le lien entre product et promotion à été supprimer avec succès:", response.data.id);
        router.reload(); // Recharge la page
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression du lien entre product et promotion:", error);
      }
      }
  
  
  
  
      return(
          <>
  {
        component === "dashboard product promotion"?
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
            
            productPromotions.length === 0 ? 
            (
              <p>Aucune lien entre un produit et une promotion trouver.</p>
            ):
            (productPromotions.map((productPromotion:ProductPromotion)=>{
              return(
                <div className={classes.cardsDashboardSousCategorie} key={productPromotion.id}>
                <div className={classes.cardDashboardSousCategorie}>
                    <p>
                      Produit: {productPromotion.product.nameProduct}
                      Promotion: {productPromotion.promotion.description}
                    </p>
                  <div className={classes.infoCardDashboardSousCategorie}>
        
                    <div className={classes.boutonsCardDashboardSousCategorie}>
                      <button className={classes.boutonModifier} onClick={()=>handleEditForm(productPromotion.id,productPromotion.product.id,productPromotion.promotion.id)}>Modifier</button>
                      <button className={classes.boutonSupprimer} onClick={()=>handleRemoveProductPromotion(productPromotion.id)}>Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
              )
            }))
          
          }
                <button  className={classes.backButton}>retour</button>
  
          </div>):component == "edit product promotion"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToPromotion}></div>
            <AddProductPromotion/>
          </>
      ):component == "add product promotion"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToPromotion}></div>
            <EditProductPromotion productPromotionId={idProductPromotion} productId={idProduct} promotionId={idPromotion} />
          </>
      ):
        (null)
      }
  
          </>
      )
  }