import { useEffect, useState } from "react";
import classes from "@/styles/LienStyle/LienStyle.module.css";
import axios from "axios";
import { useRouter } from 'next/router'; // Importer useRouter
import type { Product, Promotion } from "@/types/types";


interface PropsEditProductPromotion {
    productId:number;
    promotionId:number;
    productPromotionId:number;
    handleProductPromotion: () => void;  
  }


export default function ListEditProductPromotion({productId, promotionId,productPromotionId,handleProductPromotion}:PropsEditProductPromotion){
    
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};
    const router = useRouter();

    const [products,setProducts] = useState<Product[]>([]);
    const [promotions,setPromotions] = useState<Promotion[]>([]);
    
    const [productClicked, setProductClicked] = useState<boolean>(false);
    const [promotionClicked, setPromotionClicked] = useState<boolean>(false);

    const [idPromotion,setIdPromotion] = useState(promotionId);
    const [idProduct,setIdProduct] = useState(productId);


    
    useEffect(() => {
        const fetchproduct = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:9197/api/product/all",
                    {
                      withCredentials: true,  // Ajout de cette option pour envoyer les cookies
                    }
                );
                // Assurez-vous que productImages est toujours un tableau
                const productsWithImages = response.data.map((product: Product) => ({
                    ...product,
                    productImages: product.productImages || [], // Initialise en tant que tableau vide si undefined ou null
                }));
                setProducts(productsWithImages);
            } catch (error) {
                console.error("Erreur dans la récupération des produits:", error);
            }
        };
    
        fetchproduct();
    }, []);
    
      
    useEffect(() => {
        const fetchpromotion = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9197/api/promotions/all",
              {
                withCredentials: true,  // Ajout de cette option pour envoyer les cookies
              }
            );
            setPromotions(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error("Erreur dans la récupération des promotions:", error);
          }
        };
    
        fetchpromotion();
      }, []);
    

    function selectProduct(productId:number){
        setProductClicked(true);
        setIdProduct(productId);
    }
    
    function selectPromotion(promotionId:number){
        setPromotionClicked(true);
        setIdPromotion(promotionId);
    }

    async function updateProductPromotion(){
        try {
            const csrfToken = await fetchTokenCsrf();
            const response = await axios.put(
              `http://localhost:9197/api/productPromotion/update/${productPromotionId}/${idProduct}/${idPromotion}`,
              {
                  withCredentials: true,  // Pour envoyer les cookies avec la requête
                  headers: {
                      'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
                  }
              }
            );
            console.log("le lien entre le produit et la promotion à été modifier avec succès:", response.data.id);
            handleProductPromotion();
            //console.log(`http://localhost:9196/api/productPromotion/update/${productPromotionId}/${idProduct}/${idPromotion}`);
          } catch (error) {
            console.error("Erreur lors de la modification du lien entre le produit et la promotion:", error);
          }
      } 
    

    
    return(
        
        <>
        <div className={classes.component}>

            <div className={classes.divAllElements}>
                    <div className={classes.divAllElement1}>
                        {products.map((product)=>{
                            return(
                                <>
                                    <div 
                                        className={
                                                idProduct === product.id?
                                                classes.elementSelected:
                                                classes.element
                                            } 
                                        onClick={()=>{selectProduct(product.id)}}
                                    >
                                        <img src={product.productImages.length > 0 ? product.productImages[0].productImages : 'default-image.jpg'} alt="" />
                                        <p><span>Nom : </span>{product.nameProduct} </p>
                                        <p><span>Prix : </span> {product.basePrice} </p>
                                        <p><span>Poids : </span> {product.baseWeight} </p>
                                        <p><span>stock : </span> {product.stock} </p>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    <div className={classes.divAllElement2}>
                            
                        {promotions.map((promotion)=>{
                                return(
                                    <>
                                        <div 
                                            className={
                                                idPromotion === promotion.id?
                                                classes.elementSelected:
                                                classes.element
                                            } 
                                            onClick={()=>{selectPromotion(promotion.id)}}
                                        >
                                            <p><span>Description : </span>{promotion.description} </p>
                                            <p><span>Pourcentage de remise : </span> {promotion.discountPercentage} </p>
                                            <p><span>Type : </span> {promotion.type} </p>
                                            <p><span>valeur de remise : </span> {promotion.discountValue} </p>
                                            <p><span>Points de fidélité requis : </span> {promotion.requiredLoyaltyPoints} </p>
                                            <p><span>date de début : </span>{new Date(promotion.startDate).toLocaleDateString()} </p>
                                            <p><span>date de fin : </span> {new Date(promotion.endDate).toLocaleDateString()}  </p>
                                            <p><span>Nombre d'utilisations : </span> {promotion.usageCount} </p>
                                            {/* <p><span>Limite d'utilisation : </span> {promotion.usageLimit} </p> */}
                                        </div>
                                    </>
                                )
                        })}

                    </div>
                </div>
                <div className={classes.validationButton} >
                    <button className={classes.boutonAjoutSousCategorie} onClick={updateProductPromotion}>valider</button>
                </div>

        </div>
            
            
        </>
    )
}