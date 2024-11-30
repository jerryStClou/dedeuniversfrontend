import {useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { ProductSize } from "@/types/types";
import SizeForm1 from "@/components/forms/SizeForm/SizeForm1/SizeForm1";
import SizeEdit from "@/components/forms/SizeForm/SizeForm1/SizeEdit";
interface PropsProductSize {
    productId:number;
    onClick: () => void;
  }

export default function DashboardSize({productId,onClick}:PropsProductSize){
    const [component,setComponent] = useState("productSize");
    const [productSizes, setProductSizes] = useState<ProductSize[]>([]);
    const [idProductSize, setIdProductSize] = useState(0);
    useEffect(() => {
      const fetchProductSize = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9196/api/productSize/all/"+productId
          );
          setProductSizes(response.data);
          console.log(response.data);
          console.log("hello world");
        } catch (error) {
          console.error("Error fetching productSize:", error);
        }
      };
  
      fetchProductSize();
    }, []);
  
    function handleProductSizeForm(){
      setComponent("productSize form");
    }
  
    function backDashProductSize(){
      setComponent("productSize");
    }
  
    function handlebackDashProductSize() { setComponent("productSize"); }
    
    function handleEditForm(productSizeId:number){
      setComponent("edit productSize form");
      setIdProductSize(productSizeId);
    }
  
    async function handleRemoveProductSize(productSizeId:number){
      try {
        const response = await axios.delete(
          "http://localhost:9196/api/productSize/remove/"+productSizeId
        );
        console.log("productSize à été supprimer avec succès:", response.data.id);
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression de productSize:", error);
      }
      }
  
    return(
        <>
        {
          component === "productSize"?
          (
            <div className={classes.DashboardImageProduit}>
            <button
              className={classes.boutonAjoutSousCategorie}
              onClick={handleProductSizeForm}
            >
              Ajouter une nouvelle couleur
            </button>
            <p>{productId}</p>
            {
            productSizes.length === 0 ? 
            (
                <p>Aucune couleur disponible.</p>
            ):
            (productSizes.map((productSize:ProductSize) => {
              return (
                <div className={classes.cardsImage} key={productSize.id}>
                  <div className={classes.cardImage}>
                    <img src={productSize.productSize} alt="" />
                    <button className={classes.boutonModifier} onClick={()=>handleEditForm(productSize.id)}>Modifier</button>
                    <button className={classes.boutonSupprimer} onClick={()=>handleRemoveProductSize(productSize.id)}>Supprimer</button>
                  </div>
                </div>
              );
            }))
            
            }
            <button className={classes.boutonValiderImageProduit}>
              Valider les couleurs
            </button>
            <button onClick={onClick} className={classes.backButton}>retour</button>
          </div>
          ):component === "productSize form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashProductSize}></div>
            <SizeForm1 onProductSizeAdded={handlebackDashProductSize} onClick={backDashProductSize} idProduct={productId}/>
            </>
          ):component === "edit productSize form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashProductSize}></div>
            <SizeEdit onProductSizeAdded={handlebackDashProductSize}  onClick={backDashProductSize} productSizeId={idProductSize}/>
          </>
        ):
          (null)
        }
    
        </>
    )
}