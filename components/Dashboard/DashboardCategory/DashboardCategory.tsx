import { useContext, useEffect, useState } from "react";
import classes from "./DashboardCategory.module.css";
import DashboardSubCategory from "../DashboardSubCategory/DashboardSubCategory";
import axios from "axios";
import { Category } from "@/types/types";
import CategoryForm1 from "@/components/forms/CategoryForm/CategoryForm1/CategoryForm1";
import CategoryEditForm from "@/components/forms/CategoryForm/CategoryForm1/CategoryEditForm/CategoryEditForm";

export default function DashboardCategory(){
    const [categories,setCategories] = useState<Category[]>([]);
    const [component,setComponent] = useState("dashboard category");
    const [idCategory,setIdCategory] = useState(0);
    
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9196/api/category/all"
            );
            setCategories(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error("Erreur dans la récupération des produits:", error);
          }
        };
    
        fetchProducts();
      }, []);

      function handleSelecCateg(idCategorie:number){
        setIdCategory(idCategorie);
        setComponent("dasboard sub category");

      }

      function handleCategoryAdded() { setComponent("dashboard category"); }

      function handleBackToCategory(){
        setComponent("dashboard category");
      }

      function handleAddCategory(){
        setComponent("category form")
      }

      function backCategoryDashboard(){
        setComponent("dashboard category");
      }

      function handleEditForm(categoryId:number){
        setComponent("edit category form");
        setIdCategory(categoryId);
        console.log(component);
      }

     async function handleRemoveCateg(categoryId:number){
      try {
        const response = await axios.delete(
          "http://localhost:9196/api/category/remove/"+categoryId
        );
        console.log("categorie supprimer avec succès:", response.data.id);
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression de la categorie:", error);
      }
      }

    return(
        <>
 {    component=="dashboard category"?
 
        (<div className={classes.DashboardSousCategorie}>
            <p className={classes.pIntroDashboardSousCategorie}>
                Nous avons besoins maintenant de connaitre de quelle
                catégorie sera le produit que vous souhaitez ajouter.
            </p>
            <button className={classes.boutonAjoutSousCategorie} onClick={handleAddCategory}>Ajouter une nouvelle catégorie</button>
            <p className={classes.pOu}>Ou</p>
            <p className={classes.pPropositionList}>Selectionnez une catégorie déja existant</p>
            <div className={classes.cardsDashboardSousCategorie}>  
                {
                categories.length === 0 ? 
                (
                  <p>Aucune categorie disponible.</p>
                ):
                (categories.map((category:Category)=>{
                    return(
                        <>
                <div className={classes.cardDashboardSousCategorie} key={category.id}>
                    <div className={classes.imageCardDashboardSousCategorie}>
                        {/* <img src="https://a2edepannage.fr/wp-content/uploads/2022/12/1200-L-bosch-fond-sur-llectronique-automobile.jpg" alt="" /> */}
                    </div>
                    <div className={classes.infoCardDashboardSousCategorie}>
                        
                        <p>{category.nameCategory}</p>

                        <div className={classes.boutonsCardDashboardSousCategorie}>
                            <button className={classes.boutonSelectionner} onClick={()=>handleSelecCateg(category.id)}>Selectionner</button>
                            <button className={classes.boutonModifier} onClick={()=>handleEditForm(category.id)}>Modifier</button>
                            <button className={classes.boutonSupprimer} onClick={()=>handleRemoveCateg(category.id)}>Supprimer</button>
                        </div>

                    </div>
                </div>
                        
                        </>
                    )
                })
              )
                
                
                }
            </div>
        </div>):component=="dasboard sub category"?
        (
            <>
                <DashboardSubCategory idCategory={idCategory} onClick={handleBackToCategory}/>
                {/* <button onClick={handleBackToCategory} className={classes.backButton}>Retour</button> */}
            </>
        ): component == "category form"?
        (
          <>
          <div className={classes.modalBackground} onClick={backCategoryDashboard}></div>
          <CategoryForm1 onClick={backCategoryDashboard} onCategoryAdded={handleCategoryAdded}/>
          </>
        ):component == "edit category form"?
        (
          <>
            <div className={classes.modalBackground} onClick={backCategoryDashboard}></div>
            <CategoryEditForm onCategoryAdded={handleCategoryAdded} onClick={backCategoryDashboard} categoryId={idCategory}/>
          </>
      ):
        (null)
        }
        </>

    )
}