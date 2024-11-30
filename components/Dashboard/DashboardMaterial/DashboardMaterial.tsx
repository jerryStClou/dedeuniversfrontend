import {useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { Material } from "@/types/types";
import MaterialEdit from "@/components/forms/MaterialForm/MaterialForm1/MaterialEdit";
import MaterialForm1 from "@/components/forms/MaterialForm/MaterialForm1/MaterialForm1";
import DashboardSize from "../DashboardSize/DashboardSize";
interface PropsMaterial {
    productId:number;
    onClick: () => void;
  }


  export default function DashboardMaterial({productId,onClick}:PropsMaterial){
    const [component,setComponent] = useState("material");
    const [materials, setMaterials] = useState<Material[]>([]);
    const [idMaterial, setIdMaterial] = useState(0);
    useEffect(() => {
      const fetchMaterial = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9196/api/material/all/"+productId
          );
          setMaterials(response.data);
          console.log(response.data);
          console.log("hello world");
        } catch (error) {
          console.error("Error fetching Material:", error);
        }
      };
  
      fetchMaterial();
    }, []);
  
    function handleMaterialForm(){
      setComponent("material form");
    }
  
    function backDashMaterial(){
      setComponent("material");
    }
  
    function handlebackDashMaterial() { setComponent("material"); }
    
    function handleEditForm(materialId:number){
      setComponent("edit color form");
      setIdMaterial(materialId);
    }
  
    function handleNextDashBoard(){
      setComponent("dashboard material");
    }

    async function handleRemoveMaterial(materialId:number){
      try {
        const response = await axios.delete(
          "http://localhost:9196/api/material/remove/"+materialId
        );
        console.log("material à été supprimer avec succès:", response.data.id);
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression de material:", error);
      }
      }
  
    return(
        <>
        {
          component === "material"?
          (
            <div className={classes.DashboardImageProduit}>
            <button
              className={classes.boutonAjoutSousCategorie}
              onClick={handleMaterialForm}
            >
              Ajouter une nouveau materiaux
            </button>
            <p>{productId}</p>
            {
            materials.length === 0 ? 
            (
                <p>Aucune couleur disponible.</p>
            ):
            (materials.map((material:Material) => {
              return (
                <div className={classes.cardsImage} key={material.id}>
                  <div className={classes.cardImage}>
                    {/* <img src={material.material} alt="" /> */}
                    <p>{material.material}</p>
                    <button className={classes.boutonModifier} onClick={()=>handleEditForm(material.id)}>Modifier</button>
                    <button className={classes.boutonSupprimer} onClick={()=>handleRemoveMaterial(material.id)}>Supprimer</button>
                  </div>
                </div>
              );
            }))
            
            }
            <button className={classes.boutonValiderImageProduit} onClick={handleNextDashBoard}>
              Valider les materiaux
            </button>
            <button onClick={onClick} className={classes.backButton}>retour</button>
          </div>
          ):component === "material form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashMaterial}></div>
            <MaterialForm1 onMaterialAdded={handlebackDashMaterial} onClick={backDashMaterial} idProduct={productId}/>
            </>
          ):component === "edit material form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashMaterial}></div>
            <MaterialEdit onMaterialAdded={handlebackDashMaterial}  onClick={backDashMaterial} materialId={idMaterial}/>
          </>
        ): component === "dashboard size"?
        (
            <DashboardSize productId={productId} onClick={backDashMaterial} />
        ):
        (null)
        }
    
        </>
    )
}