import { useContext, useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import { Product } from "@/types/types";
import axios from "axios";
import ProductForm1 from "@/components/forms/ProductForm/ProductForm1/ProductForm1";
import ProductEdit from "@/components/forms/ProductForm/ProductForm1/ProductEdit";
import DashboardProductImage from "../DashboardProductImage/DashboardProductImage";

type PropsProduct = {
  idSubCategory: number;
  onClick: () => void;
};

export default function DashboardProduct({idSubCategory,onClick}:PropsProduct) {
  
    const [component,setComponent] = useState("dashboard product");
    const [products,setProducts] = useState<Product[]>([]);
    const [idProduct,setIdProduct] = useState(0);
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9196/api/product/all"
          );
          setProducts(response.data);
          // console.log(response.data);
        } catch (error) {
          console.error("Erreur dans la récupération des sous categories:", error);
        }
      };
  
      fetchProducts();
    }, []);
  
  
    function handleSelecProduct(productId:number){
      setIdProduct(productId);
      setComponent("dashboard product images");
    }
  
    
    function handleBackToProduct(){
      setComponent("dashboard product");
    }
    
    function handleEditForm(productId:number){
      setComponent("edit product form");
      setIdProduct(productId);
    }
    
    function handleAddForm(){
      setComponent("add product form");
    }
    
  
    async function handleRemoveProduct(productId:number){
      try {
        const response = await axios.delete(
          "http://localhost:9196/api/product/remove/"+productId
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
        component === "dashboard product"?
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
              Ajouter un nouveau produit
            </button>
            <p className={classes.pOu}>Ou</p>
            <p className={classes.pPropositionList}>
              Selectionnez un produit déja existant
            </p>
            {
            
            products.length === 0 ? 
            (
              <p>Aucune produit disponible.</p>
            ):
            (products.map((product)=>{
              return(
                <div className={classes.cardsDashboardSousCategorie} key={product.id}>
                <div className={classes.cardDashboardSousCategorie}>
                  <div className={classes.imageCardDashboardSousCategorie}>
                    <img
                      src="https://www.cdiscount.com/pdt2/5/4/3/1/700x700/xia6934177720543/rw/ecran-pc-gamer-incurve-xiaomi-mi-display-34-w.jpg"
                      alt=""
                    />
                  </div>
                  <div className={classes.infoCardDashboardSousCategorie}>
                    <p>{product.nameProduct}</p>
        
                    <div className={classes.boutonsCardDashboardSousCategorie}>
                      <button className={classes.boutonSelectionner}  onClick={()=>handleSelecProduct(product.id)}>
                        Selectionner
                      </button>
                      <button className={classes.boutonModifier} onClick={()=>handleEditForm(product.id)}>Modifier</button>
                      <button className={classes.boutonSupprimer} onClick={()=>handleRemoveProduct(product.id)}>Supprimer</button>
                    </div>
                  </div>
                </div>
              </div>
              )
            }))
          
          }
                <button onClick={onClick} className={classes.backButton}>retour</button>
  
          </div>): component === "add product form"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToProduct}></div>
            <ProductForm1 onClick={handleBackToProduct} onProductAdded={handleBackToProduct} idSubCategory={idSubCategory} />
          </>
        ):component == "edit product form"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToProduct}></div>
            <ProductEdit onProductAdded={handleBackToProduct} onClick={handleBackToProduct} productId={idProduct}/>

          </>
      ): component === "dashboard product images"?
        (
            <DashboardProductImage productId={idProduct} onClick={handleBackToProduct} />
        ):
        (null)
      }
      </>
    );
  }
  