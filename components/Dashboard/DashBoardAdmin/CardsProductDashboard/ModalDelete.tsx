
import { useEffect, useState } from "react";
import classes from "./CardsProductDashboard.module.css";
import axios from "axios";
import { Product } from "@/types/type";
interface Props {
    onClick: () => void;
    idProduct:number;
    deleteClick: () => void;
  }
export default function ModalDelete({onClick,idProduct,deleteClick}:Props){
    const [product,setProduct]=useState<Product>();
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/product/"+idProduct
        );
          setProduct(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Erreur dans la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);
return(
        <div className={classes.deleteModal}>
            <button className={classes.backButton} onClick={onClick}>retour</button>
              
              <div className={classes.deleteElementProduct}>
                <div className={classes.deleteModalProduct}>
                      <div className={classes.imageDeleteModal}>
                        {/* <img src={product? product.productImages[0].productImages:""} alt="" /> */}
                        
                      </div>
                </div>
                <div className={classes.alertMessage}>
                  <p>Voulez vous vraiment supprimer ce product</p>
                  <button onClick={deleteClick}>supprimer</button>
                </div>
              </div>
                
        </div>
)
}