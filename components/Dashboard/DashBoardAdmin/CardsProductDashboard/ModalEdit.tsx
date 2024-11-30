
import { useEffect, useState } from "react";
import classes from "./CardsProductDashboard.module.css";
import axios from "axios";
import { Product } from "@/types/types";
interface Props {
    onClick: () => void;
    idProduct:number;
  }
  
export default function ModalEdit({onClick,idProduct}:Props){
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
        <div className={classes.editModal}>
        <button className={classes.backButton} onClick={onClick}>retour</button>
        <form className={classes.editForm}>
              <input type="text" name="" id="" placeholder={product?.nameProduct} />
              <input type="number" name="" id="" placeholder="prix"/>
              <textarea name="" id="" placeholder={product?.description}></textarea>
              <button>valider</button>
        </form>
    </div>
    )
}