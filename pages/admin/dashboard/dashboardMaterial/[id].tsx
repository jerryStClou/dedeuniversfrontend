import {useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { Material } from "@/types/types";
import MaterialEdit from "@/components/forms/MaterialForm/MaterialForm1/MaterialEdit";
import MaterialForm1 from "@/components/forms/MaterialForm/MaterialForm1/MaterialForm1";
import { useRouter } from 'next/router'; // Importer useRouter
// import DashboardSize from "../DashboardSize/DashboardSize";


  export default function DashboardMaterial(){
    
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

    const [component,setComponent] = useState("material");
    const [materials, setMaterials] = useState<Material[]>([]);
    const [idMaterial, setIdMaterial] = useState(0);

    // useEffect(() => {
    //   const fetchMaterial = async () => {
    //     try {
    //       const response = await axios.get(
    //         "http://localhost:9197/api/material/all/"+productId
    //       );
    //       setMaterials(response.data);
    //       console.log(response.data);
    //       console.log("hello world");
    //     } catch (error) {
    //       console.error("Error fetching Material:", error);
    //     }
    //   };
  
    //   fetchMaterial();
    // }, []);
  





    
    useEffect(() => {
        //setIdSubCategory(subCategId);
      
        if (isNaN(productId)) {
            console.error("L'ID du produit est invalide.");
            return; // Si l'ID est invalide, on arrête l'exécution de la requête
        }

        const fetchMaterial = async () => {
            try {
                // Requête API pour récupérer les produits par sous-catégorie
                const response = await axios.get(
                    `http://localhost:9197/api/material/all/${productId}`,
                    {
                      withCredentials: true,  // Ajout de cette option pour envoyer les cookies
                    }
                );
                setMaterials(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des matériaux du produit:", error);
            }
        };

        fetchMaterial();
    }, [productId]); // Déclenche la requête lorsque idSubCategory change
  
        function handleMaterialForm(){
      setComponent("material form");
    }
  
    function backDashMaterial(){
      setComponent("material");
    }
  
    function handlebackDashMaterial() { 
        setComponent("material"); 
        router.reload(); // Recharge la page
    }
    
    function handleEditForm(materialId:number){
      setComponent("edit material form");
      setIdMaterial(materialId);
    }
  
    function handleNextDashBoard(){
      setComponent("dashboard material");
      router.push(`/admin/dashboard/dashboardSize/${productId}`);
    }

    async function handleRemoveMaterial(materialId:number){
      try {
        const csrfToken = await fetchTokenCsrf();
        const response = await axios.delete(
          "http://localhost:9197/api/material/remove/"+materialId,
          {
              withCredentials: true,  // Pour envoyer les cookies avec la requête
              headers: {
                  'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
              }
          }
        );
        console.log("material à été supprimer avec succès:", response.data.id);
        router.reload(); // Recharge la page
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
                <div className={classes.buttonsDashboard}>
                  <button
                    className={classes.boutonAjoutSousCategorie} onClick={handleMaterialForm}
                  >
                    Ajouter une nouveau materiaux
                  </button>
                  <button className={classes.backButton}>retour</button>
              </div>

                <p>{productId}</p>
                {
                materials.length === 0 ? 
                (
                    <p>Aucun matériaux disponible.</p>
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
        ):(null)
        }
    
        </>
    )
}