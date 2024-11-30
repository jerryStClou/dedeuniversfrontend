import {useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { Color } from "@/types/types";
import ColorForm1 from "@/components/forms/ColorForm/ColorForm1/ColorForm1";
import ColorEdit from "@/components/forms/ColorForm/ColorForm1/ColorEdit";
import DashboardMaterial from "../DashboardMaterial/DashboardMaterial";
interface PropsColor {
    productId:number;
    onClick: () => void;
  }

export default function DashboardColor({productId,onClick}:PropsColor){
    const [component,setComponent] = useState("color");
    const [colors, setColors] = useState<Color[]>([]);
    const [idColor, setIdColor] = useState(0);
    useEffect(() => {
      const fetchColor = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9196/api/color/all/"+productId
          );
          setColors(response.data);
          console.log(response.data);
          console.log("hello world");
        } catch (error) {
          console.error("Error fetching Color:", error);
        }
      };
  
      fetchColor();
    }, []);
  
    function handleColorForm(){
      setComponent("color form");
    }
  
    function backDashColor(){
      setComponent("color");
    }
  
    function handlebackDashColor() { setComponent("color"); }
    
    function handleEditForm(ColorId:number){
      setComponent("edit color form");
      setIdColor(ColorId);
    }

    function handleNextDashBoard(){
      setComponent("dashboard material");
    }
  
    async function handleRemoveColor(ColorId:number){
      try {
        const response = await axios.delete(
          "http://localhost:9196/api/color/remove/"+ColorId
        );
        console.log("color à été supprimer avec succès:", response.data.id);
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression de color:", error);
      }
      }
  
    return(
        <>
        {
          component === "color"?
          (
            <div className={classes.DashboardImageProduit}>
            <button
              className={classes.boutonAjoutSousCategorie}
              onClick={handleColorForm}
            >
              Ajouter une nouvelle couleur
            </button>
            <p>{productId}</p>
            {
            colors.length === 0 ? 
            (
                <p>Aucune couleur disponible.</p>
            ):
            (colors.map((color:Color) => {
              return (
                <div className={classes.cardsImage} key={color.id}>
                  <div className={classes.cardImage}>
                    {/* <img src={color.color} alt="" /> */}
                    <p>{color.color}</p>
                    <button className={classes.boutonModifier} onClick={()=>handleEditForm(color.id)}>Modifier</button>
                    <button className={classes.boutonSupprimer} onClick={()=>handleRemoveColor(color.id)}>Supprimer</button>
                  </div>
                </div>
              );
            }))
          
          }
            <button className={classes.boutonValiderImageProduit} onClick={handleNextDashBoard}>
              Valider les couleurs
            </button>
            <button onClick={onClick} className={classes.backButton}>retour</button>
          </div>
          ):component === "color form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashColor}></div>
            <ColorForm1 onColorAdded={handlebackDashColor} onClick={backDashColor} idProduct={productId}/>
            </>
          ):component === "edit color form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashColor}></div>
            <ColorEdit onColorAdded={handlebackDashColor}  onClick={backDashColor} colorId={idColor}/>
          </>
        ): component === "dashboard material"?
        (
            <DashboardMaterial productId={productId} onClick={backDashColor} />
        ):
        (null)
        }
    
        </>
    )
}