import { Product } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import ProductImageDetail from "./ProductImageDetail";
import DescriptionProduct from "./DescriptionProduct/DescriptionProduct";
import SimilarProduct from "./SimilarProduct/SimilarProduct";
import CommentProduct from "./CommentProduct/CommentProduct";
import { Comment } from "../../types/types";
import Image from 'next/image';
import etoileNoire from '@/public/images/etoile.png';
import etoileGrise from '@/public/images/etoile2.png';
type PropsProductDetail = {
    productId: number | undefined;
  };
  
  
export default function ProductDetail({productId}:PropsProductDetail){
    
     const [product, setProduct] = useState<Product>();
     
    const [buttonActive,setButtonActive] = useState(false);
    const [contentMenu,setContentMenu] = useState("");
    const [numeroImage,setNumeroImage]= useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9196/api/product/productProjection/${productId}`);
        setProduct(response.data);
        
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

    
  // Fonction pour calculer la moyenne des notes d'un produit
  const calculateAverageNote = (comments: Comment[]): number => {
    if (comments.length === 0) return 0;
    const totalNotes = comments.reduce((sum, comment) => sum + comment.note, 0);
    return Math.round(totalNotes / comments.length);
  };

  
  function activeDescription()
  {
      setButtonActive(!buttonActive);
      setContentMenu("description");
  }

  function backtoMenu()
  {
      setButtonActive(!buttonActive);
  }

  function activeSimilarProduct()
  {
      setButtonActive(!buttonActive);
      setContentMenu("produit similaire");
  }

  function activeComment()
  {
      setButtonActive(!buttonActive);
      setContentMenu("commentaire");
  }

  function handleImage1(){
      setNumeroImage(1);
      console.log(numeroImage);
  }
  
  function handleImage2(){
      setNumeroImage(2);
      console.log(numeroImage);
  }
  
  function handleImage3(){
      setNumeroImage(3);
      console.log(numeroImage);
  }
  
  function handleImage4(){
      setNumeroImage(4);
      console.log(numeroImage);
  }
  
  function handleImage5(){
      setNumeroImage(5);
      console.log(numeroImage);
  }
  
  function handleImage6(){
      setNumeroImage(6);
      console.log(numeroImage);
  }

  
  function handleImage7(){
      setNumeroImage(7);
      console.log(numeroImage);
  }

  
  const handleMouseEnter = (index: number) => {
    console.log(`Mouse enter ${index + 1}`);
  };

  // Crée un tableau de fonctions de gestion des événements
  //const mouseEnterHandlers = Array(7).fill(null).map((_, index) => () => handleMouseEnter(index));

  if (!product) {
    return <p>Chargement du produit...</p>;
  }


  const averageNote = calculateAverageNote(product.comments);
  const hasNotes = product.comments.length > 0;

    return(
        <>

<div className={classes.productDetail}>
            <div className={classes.showProduct}>

            <ProductImageDetail 
                    productId={productId} 
                    numeroImage={numeroImage} 
                    mouseEnter1={handleImage1} 
                    mouseEnter2={handleImage2} 
                    mouseEnter3={handleImage3} 
                    mouseEnter4={handleImage4} 
                    mouseEnter5={handleImage5} 
                    mouseEnter6={handleImage6} 
                    mouseEnter7={handleImage7}
            />



                <div className={classes.menuProduct}>
                    <p className={classes.nomProduitStyle}>{product?.nameProduct}</p>
                    <p className={classes.pStyle}>{product?.basePrice}€</p>
                    <p className={classes.pStyle}>{product?.stock}</p>
                    <div className={classes.noteProduct}>
                        <p className={classes.pStyle}>Note: </p>

                        {hasNotes ? (
                // Affiche les étoiles si le produit a des notes
                [...Array(5)].map((_, index) => (
                  <Image
                    key={index}
                    src={index < averageNote ? etoileNoire : etoileGrise}
                    alt="Étoile"
                    width={20} // Ajustez selon vos besoins
                    height={20} // Ajustez selon vos besoins
                  />
                ))
              ) : (
                // Affiche un message si le produit n'a aucune note
                <p>Aucune note pour le moment</p>
              )}
                    </div>
                    <p className={classes.pStyle}>Nombre de commentaires : {product?.comments?.length}</p>
                    
                    <button className={classes.panierStyleLiens}>Ajouter aux panier</button>
                    <button className={classes.favorisStyleLiens}>Ajouter aux favoris</button>
                    <button className={classes.boutonDescriptionStyle} onClick={activeDescription}>Description</button>
                    <button className={classes.boutonStyleProduitSimi} onClick={activeSimilarProduct}>Produit similaire</button>
                    <button className={classes.boutonStyleComm} onClick={activeComment}>Commentaire</button>


                </div>
            </div>

            <div 
                className={buttonActive  ? classes.detailMenuOpen:classes.invisible}
                onClick={backtoMenu}
            >
                
            </div>
            <div className={buttonActive  ? classes.detailMenuContent:classes.invisible}>
                    <button className={classes.retourButtonStyle} onClick={backtoMenu}>Retour</button>
                    {
                        contentMenu == "description" ? <DescriptionProduct description={product?.description}/> 
                        : contentMenu == "produit similaire" ? <SimilarProduct SubCategoryId={product?.subCategory?.id}/>:
                        contentMenu == "commentaire" ?  <CommentProduct/> : <></>
                    }
            </div>
            
        </div>
        </>
    )
}