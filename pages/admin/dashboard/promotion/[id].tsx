import { useContext, useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import { Product, Promotion } from "@/types/types";
import axios from "axios";
import ProductForm1 from "@/components/forms/ProductForm/ProductForm1/ProductForm1";
import ProductEdit from "@/components/forms/ProductForm/ProductForm1/ProductEdit";
import { useRouter } from 'next/router'; // Importer useRouter


export default function DashboardProductPromotion(){
   
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de la sous-catégorie depuis l'URL
    const [component,setComponent] = useState("dashboard promotion");
    const [product,setProduct] = useState<Product>();
    const [promotions,setPromotions] = useState<Promotion[]>([]);

    
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             // Requête API pour récupérer le produit
    //             const response = await axios.get(
    //                 `http://localhost:9196/api/product/${id}`
    //             );
    //             setProduct(response.data);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error("Erreur lors de la récupération du produit:", error);
    //         }
    //     };

    //     fetchProduct();
    // }, [id]); // Déclenche la requête lorsque idSubCategory change
  
  

    
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
  

  async function handleSelectPromotion(idPromotion:number){

    try {
        const response = await axios.post(
          `http://localhost:9196/api/productPromotion/add/${id}/${idPromotion}`
        );
        console.log("le lien entre produit et promotion à été ajouter avec succès:", response.data.id);
        router.reload(); // Recharge la page
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de l'ajout du lien entre produit et la promotion:", error);
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

        <p>{id}</p>

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
                </div>
              </div>
            </div>
          </div>
          )
        }))
      
      }
            <button  className={classes.backButton}>retour</button>

      </div>
                ):
                (null)
            }
        </>
    )
}