import {useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { Color } from "@/types/types";
import ColorForm1 from "@/components/forms/ColorForm/ColorForm1/ColorForm1";
import ColorEdit from "@/components/forms/ColorForm/ColorForm1/ColorEdit";
import { useRouter } from 'next/router'; // Importer useRouter
// import DashboardMaterial from "../DashboardMaterial/DashboardMaterial";

export default function DashboardColor(){
  
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};

    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de la sous-catégorie depuis l'<URL></URL>
    
    // Vérification si id existe et le convertir en nombre
    const productId = (id && !Array.isArray(id)) ? parseInt(id as string, 10) : NaN;

    const [component,setComponent] = useState("color");
    const [colors, setColors] = useState<Color[]>([]);
    const [idColor, setIdColor] = useState(0);

    useEffect(() => {
      const fetchColor = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9197/api/color/all/"+productId
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


    
    useEffect(() => {
        //setIdSubCategory(subCategId);
      
        if (isNaN(productId)) {
            console.error("L'ID du produit est invalide.");
            return; // Si l'ID est invalide, on arrête l'exécution de la requête
        }

        const fetchColor = async () => {
            try {
                // Requête API pour récupérer les produits par sous-catégorie
                const response = await axios.get(
                    `http://localhost:9197/api/color/all/${productId}`,
                    {
                      withCredentials: true,  // Ajout de cette option pour envoyer les cookies
                    }
                );
                setColors(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des couleurs du produit:", error);
            }
        };

        fetchColor();
    }, [productId]); // Déclenche la requête lorsque idSubCategory change
  
  
    function handleColorForm(){
      setComponent("color form");
    }
  
    function backDashColor(){
      setComponent("color");
    }

    function backToDashBoardColor(){
        setComponent("color");
        router.reload(); // Recharge la page
    }
  
    function handleEditForm(ColorId:number){
      setComponent("edit color form");
      setIdColor(ColorId);
    }

    function handleNextDashBoard(){
      setComponent("dashboard material");
      router.push(`/admin/dashboard/dashboardMaterial/${productId}`);
    }
  
    async function handleRemoveColor(ColorId:number){
      try {
        const csrfToken = await fetchTokenCsrf();
        const response = await axios.delete(
          "http://localhost:9197/api/color/remove/"+ColorId,
          {
              withCredentials: true,  // Pour envoyer les cookies avec la requête
              headers: {
                  'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
              }
          }
        );
        console.log("color à été supprimer avec succès:", response.data.id);
        router.reload(); // Recharge la page
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
                <div className={classes.buttonsDashboard}>
                  <button
                    className={classes.boutonAjoutSousCategorie} onClick={handleColorForm}
                  >
                    Ajouter une nouvelle couleur
                  </button>
                  <button className={classes.backButton}>retour</button>
              </div>

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
            <button className={classes.backButton}>retour</button>
          </div>
          ):component === "color form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashColor}></div>
            <ColorForm1 onColorAdded={backToDashBoardColor} onClick={backDashColor} idProduct={productId}/>
            </>
          ):component === "edit color form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashColor}></div>
            <ColorEdit onColorAdded={backToDashBoardColor}  onClick={backDashColor} colorId={idColor}/>
          </>
        ):
        (null)
        }
    
        </>
    )
}