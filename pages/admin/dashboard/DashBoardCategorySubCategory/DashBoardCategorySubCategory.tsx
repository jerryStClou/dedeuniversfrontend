import { useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { useRouter } from 'next/router'; // Importer useRouter
import { CategorySubCategory } from "@/types/types";
import ListCategorySubCategory from "@/components/List/ListCategorySubCategory/ListCategorySubCategory";
import EditCategorySubCategory from "@/components/List/ListCategorySubCategory/EditCategorySubCategory";

export default function DashBoardCategorySubCategory(){

  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};
    const [component,setComponent] = useState("dashboard category sub category");
    const [categoriesSubCategories,setCategoriesSubCategories] = useState<CategorySubCategory[]>([]);
    const [idCategorySubCategory,setIdCategorySubCategory] = useState(0);
    const [idCategory,setIdCategory] = useState(0);
    const [idSubCategory,setIdSubCategory] = useState(0);
    const router = useRouter();
  
    
    useEffect(() => {
      const fetchcategorySubCategory = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9197/api/category-subCategory/all",
            {
              withCredentials: true,  // Ajout de cette option pour envoyer les cookies
            }
          );
          setCategoriesSubCategories(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("Erreur dans la récupération des liens entre la catégorie et la sous catégorie:", error);
        }
      };
  
      fetchcategorySubCategory();
    }, []);
  
  
    function backToDashCategorySubCategory(){
      try {
      // Code qui gère le changement d'état dans le parent (par exemple, redirection ou mise à jour de l'interface)
      setComponent("dashboard category sub category");
      router.reload(); // Recharge la page ou effectue une autre action
    } catch (error) {
      console.error("Erreur dans handlePromotion:", error);
    }
    }
    
    function handleBackToCategorySubCategory(){
      setComponent("dashboard category sub category");
    }
  
    function backDashBoard(){
        setComponent("dashboard category sub category");
        router.reload();
    }
    
    function handleEditForm(categorySubCategoryId:number, categoryId:number, subCategoryId:number){
      setComponent("edit category sub category");
      setIdCategorySubCategory(categorySubCategoryId);
      setIdCategory(categoryId);
      setIdSubCategory(subCategoryId);
  
    }
    
    function handleAddForm(){
      setComponent("add category sub category");
    }
    
  
    async function handleRemoveProductPromotion(categorySubCategoryId:number){
      try {
        
        const csrfToken = await fetchTokenCsrf();
        const response = await axios.delete(
          "http://localhost:9197/api/category-subCategory/remove/"+categorySubCategoryId,
          {
              withCredentials: true,  // Pour envoyer les cookies avec la requête
              headers: {
                  'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
              }
          }
        );
        console.log("le lien entre la categorie et la sous categorie à été supprimer avec succès:", response.data.id);
        router.reload(); // Recharge la page
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression du lien entre la categorie et la sous categorie:", error);
      }
      }
  
  
      return(
          <>
  {
        component === "dashboard category sub category"?
        (
          <div className={classes.DashboardSousCategorie}>
            <p className={classes.pIntroDashboardSousCategorie}>
              Pour l'ajout de vos produits nous avons besoins d'abord de connaître le
              type du produit(télé, smatrphone, montre, assiette, ect..) auquel vous
              souhaitez ajouter.
            </p>
                <div className={classes.buttonsDashboard}>
                    <button
                        className={classes.boutonAjoutSousCategorie} onClick={handleAddForm}
                    >
                        Ajouter un nouveau lien entre un produit et une promotion
                    </button>
                    <button className={classes.backButton}>retour</button>
                </div>
  
            <p className={classes.pOu}>Ou</p>
            <p className={classes.pPropositionList}>
              Selectionnez un type déja existant
            </p>
            {
            
            categoriesSubCategories.length === 0 ? 
            (
              <p>Aucune lien entre un produit et une promotion trouver.</p>
            ):
            (categoriesSubCategories.map((categorySubCategory:CategorySubCategory)=>{
              return(
                <div className={classes.cardsDashboardSousCategorie} key={categorySubCategory.id}>
                <div className={classes.cardDashboardSousCategorie}>
                    <p>
                      Categorie: {categorySubCategory.category.nameCategory}
                      Sous categorie: {categorySubCategory.subCategory.nameSubCategory}
                    </p>
                  <div className={classes.infoCardDashboardSousCategorie}>
        
                    <div className={classes.boutonsCardDashboardSousCategorie}>
                      <button className={classes.boutonModifier} onClick={()=>handleEditForm(categorySubCategory.id,categorySubCategory.category.id,categorySubCategory.subCategory.id)}>Modifier</button>
                      <button className={classes.boutonSupprimer} onClick={()=>handleRemoveProductPromotion(categorySubCategory.id)}>Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
              )
            }))
          
          }
  
          </div>):component == "add category sub category"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToCategorySubCategory}></div>
            <ListCategorySubCategory handleCategorySubCategory={backDashBoard}/>
          </>
      ):component == "edit category sub category"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToCategorySubCategory}></div>
            {/* <EditProductPromotion productPromotionId={idProductPromotion} productId={idProduct} promotionId={idPromotion} /> */}
            <EditCategorySubCategory  handleCategorySubCategory={backDashBoard}  categorySubCategoryId={idCategorySubCategory} idCategory={idCategory} idSubCategory={idSubCategory} />
          </>
      ):
        (null)
      }
  
          </>
      )
  
}