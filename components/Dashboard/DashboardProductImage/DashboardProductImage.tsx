import { useContext, useEffect, useState } from "react";
// import classes from "./DashboardProductImage.module.css";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { ProductImages } from "@/types/types";
import ProductImageForm1 from "@/components/forms/ProductImageForm/ProductImageForm1/ProductImageForm1";
import ProductImageEdit from "@/components/forms/ProductImageForm/ProductImageForm1/ProductImageEdit";
import DashboardColor from "../DashboardColor/DashboardColor";
interface PropsProductImages {
    productId:number;
    onClick: () => void;
  }

export default function DashboardProductImage({productId,onClick}:PropsProductImages) {
  const [component,setComponent] = useState("product images");
  const [productImages, setProductImages] = useState<ProductImages[]>([]);
  const [idProductImages, setIdProductImages] = useState(0);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/productImage/all/"+productId
        );
        setProductImages(response.data);
        console.log(response.data);
        console.log("hello world");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  function handleProductImageForm(){
    setComponent("Product images form");
  }

  function backDashProImg(){
    setComponent("product images");
  }

  function handlebackDashProImg() { setComponent("product images"); }
  
  function handleEditForm(productImagesId:number){
    setComponent("edit product images form");
    setIdProductImages(productImagesId);
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
    // console.log("http://localhost:9196/api/category/update/"+categoryId);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'image du produit:", error);
    }
    }

  return (
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
        <button onClick={onClick} className={classes.backButton}>retour</button>
      </div>
      ):component === "Product images form"?
      (
        <>
        <div className={classes.modalBackground} onClick={backDashProImg}></div>
        <ProductImageForm1 dashProImg={handlebackDashProImg} onClick={backDashProImg} idProduct={productId}/>
        </>
      ):component === "edit product images form"?
      (
        <>
        <div className={classes.modalBackground} onClick={backDashProImg}></div>
        <ProductImageEdit dashProImg={handlebackDashProImg}  onClick={backDashProImg} productImagesId={idProductImages}/>
      </>
    ): component === "dashboard color"?
    (
        <DashboardColor productId={productId} onClick={backDashProImg} />
    ):
    (null)
    }

    </>
  );
}
