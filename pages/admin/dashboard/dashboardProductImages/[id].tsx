
import { useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { useRouter } from 'next/router'; // Importer useRouter
import { ProductImages } from "@/types/type";
import ProductImageForm1 from "@/components/forms/ProductImageForm/ProductImageForm1/ProductImageForm1";
import ProductImageEdit from "@/components/forms/ProductImageForm/ProductImageForm1/ProductImageEdit";
export default function DashboardProductImages(){
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de la sous-catégorie depuis l'URL
    
    // Vérification si id existe et le convertir en nombre
    const idProduct = (id && !Array.isArray(id)) ? parseInt(id as string, 10) : NaN;

    const [component,setComponent] = useState("product images");
    const [productImages,setProductImages] = useState<ProductImages[]>([]);
    const [idProductImages, setIdProductImages] = useState(0);
    
    useEffect(() => {
        //setIdSubCategory(subCategId);
      
        if (isNaN(idProduct)) {
            console.error("L'ID du produit est invalide.");
            return; // Si l'ID est invalide, on arrête l'exécution de la requête
        }

        const fetchProductImages = async () => {
            try {
                // Requête API pour récupérer les produits par sous-catégorie
                const response = await axios.get(
                    `http://localhost:9196/api/productImage/all/${idProduct}`
                );
                setProductImages(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits images:", error);
            }
        };

        fetchProductImages();
    }, [idProduct]); // Déclenche la requête lorsque idSubCategory change
  

    function handleProductImageForm(){
        setComponent("Product images form");
      }
    
      function backDashProImg(){
        setComponent("product images");
      }

      function backDashBoardProductImages(){
        setComponent("product images");
        router.reload(); // Recharge la page
      }
    
      function handlebackDashProImg() { setComponent("product images"); }
      
      function handleEditForm(productImagesId:number){
        setIdProductImages(productImagesId);
        setComponent("edit product images form");
      }
    
      function handleDashBoardColor(){
        setComponent("dashboard color");
      }
    
      async function handleRemoveProductImg(productImagesId:number){
        try {
          const response = await axios.delete(
            "http://localhost:9196/api/productImage/remove/"+productImagesId
          );
          console.log("l'image du produit à été supprimer avec succès:", response.data.id);
          router.reload(); // Recharge la page
        // console.log("http://localhost:9196/api/category/update/"+categoryId);
        } catch (error) {
          console.error("Erreur lors de la suppression de l'image du produit:", error);
        }
        }
    


    return(
       
    <>
    {
      component === "product images"?
      (
        <div className={classes.DashboardImageProduit}>
        <button
          className={classes.boutonAjoutSousCategorie}
          onClick={handleProductImageForm}
        >
          Ajouter une nouvelle image
        </button>
        {
        
        productImages.length === 0 ? 
        (
          <p>Aucune image du produit disponible.</p>
        ):
        (productImages.map((productImage:ProductImages) => {
          return (
            <div className={classes.cardsImage} key={productImage.id}>
              <div className={classes.cardImage}>
                <p>{productImage.id}</p>
                <img src={productImage.productImages} alt="" />
                <button className={classes.boutonModifier} onClick={()=>handleEditForm(productImage.id)}>Modifier</button>
                <button className={classes.boutonSupprimer} onClick={()=>handleRemoveProductImg(productImage.id)}>Supprimer</button>
              </div>
            </div>
          );
        }))
        
        }
        <button className={classes.boutonValiderImageProduit} onClick={handleDashBoardColor}>
          Valider les images produits
        </button>
        <button className={classes.backButton}>retour</button>
      </div>
      ):component === "Product images form"?
      (
        <>
        <div className={classes.modalBackground} onClick={backDashProImg}></div>
        <ProductImageForm1 dashProImg={backDashBoardProductImages} onClick={backDashProImg} idProduct={idProduct}/>
        </>
      ):component === "edit product images form"?
      (
        <>
        <div className={classes.modalBackground} onClick={backDashProImg}></div>
        <ProductImageEdit dashProImg={backDashBoardProductImages}  onClick={backDashProImg} productImagesId={idProductImages}/>
      </>
    ):
    (null)
    }

    </>
    )
}