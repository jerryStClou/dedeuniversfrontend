import { CartProduct, Product } from "@/types/types";
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
    
     const [product, setProduct] = useState<Product>({
      "id":1,
      "nameProduct":"Podcast Microphone",
      "description":"Podcast Microphone",
      "basePrice":78,
      "baseWeight":89,
      "stock":45,
      "subCategory":{
        "id":1,
        "nameSubCategory":"micro",
        "imageSubCategory":"aaa"
      },
      "productOptions":[{
        "id":1,
        "color":{
          "id":1,
          "color":"black",
        },
        "material":{
          "id":1,
          "material":"plastique",
          "influenceMaterialPrice":45,
          "influenceMaterialWeight":56
        }
        ,"size":{
          "id":1,
          "productSize":"normal",
          "influenceProductSizePrice":45,
          "influenceProductSizeWeight":56
        },
        "product":null
      }
        
    ],
      "comments":[{
        "id":1,
        "comment":"produit cool",
        "note":5,
        "titleComment":"produit ouf",
        "updatedAt": new Date(2024, 0, 1),
        "createdAt":new Date(2024, 0, 1),
        "imageComment":"image",
        "product":null,
        "user":{
          "imageProfil":"https://www.metanoiada.com/wp-content/uploads/2019/08/9-e%CC%81tapes-pour-devenir-une-meilleure-personne-1440x1080.jpg",
      },
      }],
      "productImages":[
        {
          "id":1,
          "productImages":"https://m.media-amazon.com/images/S/aplus-media/sota/4c4969cf-a744-4a0e-96c1-a6a530a5c80c.__CR0,0,650,350_PT0_SX650_V1___.jpg",
          "typeProductImages":"card",
          "product":null
        }
      ],
     });
     
    const [buttonActive,setButtonActive] = useState(false);
    const [contentMenu,setContentMenu] = useState("");
    const [numeroImage,setNumeroImage]= useState(1);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:9196/api/product/productProjection/${productId}`);
  //       setProduct(response.data);
        
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     }
  //   };

  //   fetchProduct();
  // }, [productId]);

  
  const [cart, setCart] = useState<CartProduct[]>([]);
  
  useEffect(() => {
    const cartString = localStorage.getItem('cart');
    const cartItems = cartString ? JSON.parse(cartString) : [];
    setCart(cartItems);
  }, []);

  const updateCartInLocalStorage = (updatedCart: CartProduct[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Fonction pour ajouter un produit au panier en tenant compte du stock
  const handleAddToCart = (product: Product) => {
    const existingCartProduct = cart.find(item => item.id === product.id);
    const productQuantityInCart = existingCartProduct ? existingCartProduct.quantity : 0;

    if (productQuantityInCart < product.stock) {
      const updatedCart = cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });

      if (!existingCartProduct) {
        updatedCart.push({ ...product, quantity: 1 });
      }

      updateCartInLocalStorage(updatedCart);
    } else {
      alert("Vous avez atteint la quantité maximale disponible pour ce produit.");
    }
  };



    
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

                    
                    <div className={classes.colors}>
                        <p>colors : </p>
                        {
                          product.productOptions.map((productOption)=>{
                            return(
                              <>
                                <div className={classes.color} style={{borderColor:productOption.color.color,backgroundColor:productOption.color.color}}></div>
                              </>
                            )
                          })
                        }
                    </div>

                    <div className={classes.materiaux}>
                      <p>materiaux :</p>
                      {
                        product.productOptions.map((productOption)=>{
                          return(
                            <>
                                <div className={classes.theMateriaux}>
                                    <p>{productOption.material.material}</p>
                                </div>
                            </>
                          )
                        })
                      }
                    </div>

                    <p className={classes.pStyle}>Nombre de commentaires : {product?.comments?.length}</p>
                    
                    <div className={classes.allButtonsProductDetails}>
                      <div className={classes.buttonProductDetail}>
                          <button onClick={()=>handleAddToCart(product)}>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> */}
                            <img src="https://cdn-icons-png.flaticon.com/512/126/126083.png" alt="" />
                          </button>
                          <p>Panier</p>
                      </div>
                      <div className={classes.buttonProductDetail}>
                        <button>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg> */}
                          <img src="https://cdn.icon-icons.com/icons2/1425/PNG/512/heart_98495.png" alt="" />
                        </button>
                        <p>Favoris</p>
                      </div>
                      <div className={classes.buttonProductDetail} onClick={activeSimilarProduct}>
                        <button>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"/><path d="m7.5 4.27 9 5.15"/></svg> */}
                          <img src="https://cdn-icons-png.flaticon.com/512/102/102348.png" alt="" />
                        </button>
                        <p>Produit similaire</p>
                      </div>
                      <div className={classes.buttonProductDetail} onClick={activeComment}>
                        <button>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/></svg> */}
                          <img src="https://cdn-icons-png.flaticon.com/512/1789/1789313.png" alt="" />
                        </button>
                        <p>Commentaires</p>
                      </div>
                      <div className={classes.buttonProductDetail}  onClick={activeDescription}>
                        <button>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg> */}
                          <img src="https://cdn-icons-png.flaticon.com/512/60/60494.png" alt="" />
                        </button>
                        <p>Description</p>
                      </div>

                    </div>


                </div>
            </div>

            <div 
                className={buttonActive  ? classes.detailMenuOpen:classes.invisible}
                onClick={backtoMenu}
            >
                
            </div>
            <div className={buttonActive  ? classes.detailMenuContent:classes.invisible}>
                    <button className={classes.retourButtonStyle} onClick={backtoMenu}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
                    </button>
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