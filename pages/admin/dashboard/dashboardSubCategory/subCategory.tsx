import { useContext, useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import { SubCategory } from "@/types/type";
import SubCategoryEditForm from "@/components/forms/SubCategoryForm/SubCategoryForm1/SubCategoryEditForm";
import SubCategoryForm1 from "@/components/forms/SubCategoryForm/SubCategoryForm1/SubCategoryForm1";
import axios from "axios";
import { useRouter } from 'next/router';

export default function subCategory(){
    
  const [component,setComponent] = useState("dashboard sub category");
  const [subCategories,setSubCategories] = useState<SubCategory[]>([
    {
      "id":1,
      "imageSubCategory":"https://static.fnac-static.com/multimedia/Images/FR/MDM/2d/77/fd/16611117/1505-1/tsp20240922023812/Ecran-PC-Huawei-AD80HW-23-8-Full-HD-Noir.jpg",
      "nameSubCategory":"Ecran gamer"
    }

  ]);
  const [idSubCategory,setIdSubCategory] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0); // Ajouter un état de clé de rafraîchissement
  const router = useRouter();

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/subCategory/all"
        );
        setSubCategories(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Erreur dans la récupération des sous categories:", error);
      }
    };

    fetchProducts();
  }, []);


  function handleSelecSubCateg(idSubCategorie:number){
    // setIdSubCategory(idSubCategorie);
    // console.log("dashboard product");
    router.push(`/dashboardProduct/${idSubCategorie}`);
  }

  function backToDashSubCateg(){
    setComponent("dashboard sub category");
    router.reload(); // Recharge la page
  }
  
  function handleBackToSubCategory(){
    setComponent("dashboard sub category");
  }
  
  function handleEditForm(subCategoryId:number){
    setComponent("edit sub category form");
    setIdSubCategory(subCategoryId);
  }
  
  function handleAddForm(){
    setComponent("add sub category form");
  }
  

  async function handleRemoveSubCateg(categoryId:number){
    try {
      const response = await axios.delete(
        "http://localhost:9196/api/subCategory/remove/"+categoryId
      );
      console.log("la sous categorie à été supprimer avec succès:", response.data.id);
      router.reload(); // Recharge la page
    // console.log("http://localhost:9196/api/category/update/"+categoryId);
    } catch (error) {
      console.error("Erreur lors de la suppression de la sous categorie:", error);
    }
    }


  return (
    <>
    {
      component === "dashboard sub category"?
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
          
          subCategories.length === 0 ? 
          (
            <p>Aucune sous categorie disponible.</p>
          ):
          (subCategories.map((subCategory)=>{
            return(
              <div className={classes.cardsDashboardSousCategorie} key={subCategory.id}>
              <div className={classes.cardDashboardSousCategorie}>
                <div className={classes.imageCardDashboardSousCategorie}>
                  {
                    subCategory.imageSubCategory !== undefined?
                    (
                      <img
                      //src={`/images/${subCategory.imageSubCategory}`}
                      src={subCategory.imageSubCategory}
                      alt=""
                      />
                    ):
                    (null)
                  }

                </div>
                <div className={classes.infoCardDashboardSousCategorie}>
                  <p>{subCategory.nameSubCategory}</p>
      
                  <div className={classes.boutonsCardDashboardSousCategorie}>
                    <button className={classes.boutonSelectionner}  onClick={()=>handleSelecSubCateg(subCategory.id)}>
                      Selectionner
                    </button>
                    <button className={classes.boutonModifier} onClick={()=>handleEditForm(subCategory.id)}>Modifier</button>
                    <button className={classes.boutonSupprimer} onClick={()=>handleRemoveSubCateg(subCategory.id)}>Supprimer</button>
                  </div>
                </div>
              </div>
            </div>
            )
          }))
        
        }
              <button  className={classes.backButton}>retour</button>

        </div>):component == "edit sub category form"?
      (
        <>
          <div className={classes.modalBackground} onClick={handleBackToSubCategory}></div>
          <SubCategoryEditForm onSubCategoryAdded={backToDashSubCateg}   onClick={handleBackToSubCategory} subCategoryId={idSubCategory}/>
        </>
    ):component == "add sub category form"?
      (
        <>
          <div className={classes.modalBackground} onClick={handleBackToSubCategory}></div>
          <SubCategoryForm1 onSubCategoryAdded={backToDashSubCateg} onClick={handleBackToSubCategory}/>
        </>
    ):
      (null)
    }
    </>
  );
}
