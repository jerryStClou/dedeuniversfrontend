import { useContext, useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import { Product } from "@/types/types";
import axios from "axios";
import ProductForm1 from "@/components/forms/ProductForm/ProductForm1/ProductForm1";
import ProductEdit from "@/components/forms/ProductForm/ProductForm1/ProductEdit";
import { useRouter } from 'next/router'; // Importer useRouter

export default function DashboardProduct(){
   
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de la sous-catégorie depuis l'URL
    const [component,setComponent] = useState("dashboard product");
    const [products,setProducts] = useState<Product[]>([]);
    const [idProduct,setIdProduct] = useState(0);
   // const [idSubCategory,setIdSubCategory] = useState(0);
    // Vous pouvez utiliser l'ID de la sous-catégorie pour envoyer à ProductForm1
    //const subCategId = id ? parseInt(id as string) : 0; // Conversion de l'ID en nombre

    
    // Vérification si id existe et le convertir en nombre
    const idSubCategory = (id && !Array.isArray(id)) ? parseInt(id as string, 10) : NaN;
    
    useEffect(() => {
        //setIdSubCategory(subCategId);
      
        if (isNaN(idSubCategory)) {
            console.error("L'ID de la sous-catégorie est invalide.");
            return; // Si l'ID est invalide, on arrête l'exécution de la requête
        }

        const fetchProducts = async () => {
            try {
                // Requête API pour récupérer les produits par sous-catégorie
                const response = await axios.get(
                    `http://localhost:9197/api/product/all/${idSubCategory}`
                );
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
            }
        };

        fetchProducts();
    }, [idSubCategory]); // Déclenche la requête lorsque idSubCategory change
  
  
    function handleSelecProduct(productId:number){
      router.push(`/dashboardProductImages/${productId}`);
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

    function backToDashProduct(){
      setComponent("dashboard product");
      router.reload(); // Recharge la page
    }
    
  
    async function handleRemoveProduct(productId:number){
      try {
        const response = await axios.delete(
          "http://localhost:9196/api/product/remove/"+productId
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
                  {
                      product.productImages && product.productImages.length > 0 && product.productImages[0].productImages ? (
                      <img
                        src={product.productImages[0].productImages}
                        alt="Product Image"
                        // autres attributs
                      />
                      ) : (
                        <p>No images available</p>  // Message ou fallback si aucune image n'est présente
                      )
                  }
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
                <button className={classes.backButton}>retour</button>
  
          </div>): component === "add product form"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToProduct}></div>
            <ProductForm1 onClick={handleBackToProduct} onProductAdded={backToDashProduct} idSubCategory={idSubCategory} />
          </>
        ):component == "edit product form"?
        (
          <>
            <div className={classes.modalBackground} onClick={handleBackToProduct}></div>
            <ProductEdit onProductAdded={backToDashProduct} onClick={handleBackToProduct} productId={idProduct}/>

          </>
      ):
        (null)
      }
      </>
    );
}