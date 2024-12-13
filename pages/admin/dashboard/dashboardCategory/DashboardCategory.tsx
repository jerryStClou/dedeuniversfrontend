import { useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import { Category } from "@/types/types";
import SubCategoryEditForm from "@/components/forms/SubCategoryForm/SubCategoryForm1/SubCategoryEditForm";
import axios from "axios";
import { useRouter } from 'next/router';
import CategoryForm1 from "@/components/forms/CategoryForm/CategoryForm1/CategoryForm1";
import CategoryEditForm from "@/components/forms/CategoryForm/CategoryForm1/CategoryEditForm/CategoryEditForm";

export default function DashboardCategory(){

  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};

    const [component,setComponent] = useState("dashboard category");
    const [categories,setCategories] = useState<Category[]>([
  
      // {
      //   "id":1,
      //   "imageSubCategory":"https://static.fnac-static.com/multimedia/Images/FR/MDM/2d/77/fd/16611117/1505-1/tsp20240922023812/Ecran-PC-Huawei-AD80HW-23-8-Full-HD-Noir.jpg",
      //   "nameSubCategory":"Ecran gamer"
      // }
  
    ]);
    const [idCategory,setIdCategory] = useState(0);
    const router = useRouter();
    
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9197/api/category/all",
            {
              withCredentials: true,  // Ajout de cette option pour envoyer les cookies
            }
          );
          setCategories(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("Erreur dans la récupération des categories:", error);
        }
      };
  
      fetchCategories();
    }, []);
  
  
    function handleSelecSubCateg(idSubCategorie:number){
      // setIdSubCategory(idSubCategorie);
      // console.log("dashboard product");
      router.push(`/admin/dashboard/dashboardSubCategory/subCategory`);
    }
  
    function backToDashSubCateg(){
      setComponent("dashboard category");
      router.reload(); // Recharge la page
    }
    
    function handleBackToSubCategory(){
      setComponent("dashboard category");
    }
    
    function handleEditForm(subCategoryId:number){
      setComponent("edit category form");
      setIdCategory(subCategoryId);
    }
    
    function handleAddForm(){
      setComponent("add category form");
    }
    
  
    async function handleRemoveCateg(categoryId:number){
      try {
        const csrfToken = await fetchTokenCsrf();
        const response = await axios.delete(
          "http://localhost:9197/api/category/remove/"+categoryId,
          {
              withCredentials: true,  // Pour envoyer les cookies avec la requête
              headers: {
                  'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
              }
          }
        );
        console.log("la categorie à été supprimer avec succès:", response.data.id);
        router.reload(); // Recharge la page
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression de la categorie:", error);
      }
      }
  
  
    return (
      <>
      {
        component === "dashboard category"?
        (
          <div className={classes.DashboardSousCategorie}>
           
            <div className={classes.buttonsDashboard}>
                <button
                  className={classes.boutonAjoutSousCategorie} onClick={handleAddForm}
                >
                  Ajouter une nouvelle categorie 
                </button>
                <button className={classes.backButton}>retour</button>
            </div>
            <p className={classes.pOu}>Ou</p>
            <p className={classes.pPropositionList}>
              Selectionnez une categorie déja existant
            </p>
            {
            
            categories.length === 0 ? 
            (
              <p>Aucune sous categorie disponible.</p>
            ):
            (categories.map((category)=>{
              return(
                <div className={classes.cardsDashboardSousCategorie} key={category.id}>
                <div className={classes.cardDashboardSousCategorie}>
                  <div className={classes.imageCardDashboardSousCategorie}>
                      {/* <img src={`/images/${subCategory.imageSubCategory}`}/> */}
  
                  </div>
                  <div className={classes.infoCardDashboardSousCategorie}>
                    <p>{category.nameCategory}</p>
        
                    <div className={classes.boutonsCardDashboardSousCategorie}>
                      <button className={classes.boutonSelectionner}  onClick={()=>handleSelecSubCateg(category.id)}>
                        Selectionner
                      </button>
                      <button className={classes.boutonModifier} onClick={()=>handleEditForm(category.id)}>Modifier</button>
                      <button className={classes.boutonSupprimer} onClick={()=>handleRemoveCateg(category.id)}>Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
              )
            }))
          
          }
          </div>):component == "edit category form"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToSubCategory}></div>
            <CategoryEditForm onCategoryAdded={backToDashSubCateg}   onClick={handleBackToSubCategory} categoryId={idCategory}/>
          </>
      ):component == "add category form"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToSubCategory}></div>
            <CategoryForm1 onCategoryAdded={backToDashSubCateg} onClick={handleBackToSubCategory}/>
          </>
      ):
        (null)
      }
      </>
    );
}