import { useContext, useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import { SubCategory } from "@/types/types";
import axios from "axios";
import ProductForm1 from "@/components/forms/ProductForm/ProductForm1/ProductForm1";
import SubCategoryEditForm from "@/components/forms/SubCategoryForm/SubCategoryForm1/SubCategoryEditForm";
import SubCategoryForm1 from "@/components/forms/SubCategoryForm/SubCategoryForm1/SubCategoryForm1";
import DashboardProduct from "../DashboardProduct/DashboardProduct";

type PropsSubCategory = {
  idCategory: number;
  onClick: () => void;
};

export default function DashboardSubCategory({idCategory,onClick}:PropsSubCategory) {
  
  const [component,setComponent] = useState("dashboard sub category");
  const [subCategories,setSubCategories] = useState<SubCategory[]>([]);
  const [idSubCategory,setIdSubCategory] = useState(0);
  
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
    setIdSubCategory(idSubCategorie);
    setComponent("dashboard product");
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
          <p>{idCategory}</p>
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
                  <img
                    src="https://www.cdiscount.com/pdt2/5/4/3/1/700x700/xia6934177720543/rw/ecran-pc-gamer-incurve-xiaomi-mi-display-34-w.jpg"
                    alt=""
                  />
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
              <button onClick={onClick} className={classes.backButton}>retour</button>
            </div>
            )
          }))
        
        }

        </div>): component === "dashboard product"?
      (
        <>
          <DashboardProduct idSubCategory={idSubCategory} onClick={handleBackToSubCategory}/>
        </>
      ):component == "edit category form"?
      (
        <>
          <div className={classes.modalBackground} onClick={handleBackToSubCategory}></div>
          <SubCategoryEditForm onSubCategoryAdded={handleBackToSubCategory}   onClick={handleBackToSubCategory} subCategoryId={idCategory}/>
        </>
    ):component == "add sub category form"?
      (
        <>
          <div className={classes.modalBackground} onClick={handleBackToSubCategory}></div>
          <SubCategoryForm1 onSubCategoryAdded={handleBackToSubCategory} onClick={handleBackToSubCategory}/>
        </>
    ):
      (null)
    }
    </>
  );
}
