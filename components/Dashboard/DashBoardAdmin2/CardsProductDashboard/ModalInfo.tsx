

import { useEffect, useState } from "react";
import classes from "./CardsProductDashboard.module.css";
import axios from "axios";
import { Product } from "@/types/type";

interface Props {
    onClick: () => void;
    // statisticClick: () => void;
    // buyClick: () => void;
    // likeClick: () => void;
    // dislikeClick: () => void;
    idProduct:number;
  }
export default function ModalInfo({
  onClick,idProduct,
  // statisticClick,buyClick,likeClick,dislikeClick
}:Props
){
    
    const [product,setProduct]=useState<Product>();
    
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/product/"+idProduct
        );
          setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur dans la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []);
  return(
    
    <div className={classes.infoModal}>
    <button className={classes.backButton} onClick={onClick}>retour</button>
    <div className={classes.elementInfoModal}>

        <div className={classes.modalProduct}>
          {/* <img src={product? product.productImages[0].productImages:"acune image trouver"}  alt="" /> */}
          <div className={classes.infoModalProduct}>
            <p>{product? product.nameProduct : "produit non disponible"}</p>
            {/* <p>Prix : 51,89€</p> */}
            <button 
            // onClick={statisticClick}
            >statistique</button>
            <button 
            // onClick={buyClick}
            >achat</button>
            <button 
            // onClick={likeClick}
            >like</button>
            <button 
            // onClick={dislikeClick}
            >dislike</button>
          </div>
        </div>

        <div className={classes.paragraphModal}>
          {/* <p>nombre de product vendu : 34</p>
          <p>nombre de product vendu : 45</p>
          <p>Liste des product à succès : 45</p>
          <p>Chiffre d'affaires: 3000€</p> */}
          <p>Nombre de commentaire: 51</p>
          <div className={classes.contentParagrapheModal}>

              <div className={classes.profilUser}>
                <div className={classes.imageProfil}>
                  <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" />
                </div>
                <div className={classes.infoProfilUser}>
                  <p>Nom de profil</p>
                  <p>Nombre de message</p>
                </div>
              </div>

              
              <div className={classes.profilUser}>
                <div className={classes.imageProfil}>
                  <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" />
                </div>
                <div className={classes.infoProfilUser}>
                  <p>Nom de profil</p>
                  <p>Nombre de message</p>
                </div>
              </div>

              
              <div className={classes.profilUser}>
                <div className={classes.imageProfil}>
                  <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" />
                </div>
                <div className={classes.infoProfilUser}>
                  <p>Nom de profil</p>
                  <p>Nombre de message</p>
                </div>
              </div>

              
              <div className={classes.profilUser}>
                <div className={classes.imageProfil}>
                  <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" />
                </div>
                <div className={classes.infoProfilUser}>
                  <p>Nom de profil</p>
                  <p>Nombre de message</p>
                </div>
              </div>

              
              <div className={classes.profilUser}>
                <div className={classes.imageProfil}>
                  <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" />
                </div>
                <div className={classes.infoProfilUser}>
                  <p>Nom de profil</p>
                  <p>Nombre de message</p>
                </div>
              </div>

              
              <div className={classes.profilUser}>
                <div className={classes.imageProfil}>
                  <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" />
                </div>
                <div className={classes.infoProfilUser}>
                  <p>Nom de profil</p>
                  <p>Nombre de message</p>
                </div>
              </div>

          </div>
       
         
        </div>

    </div>

  </div>
  )
    

}