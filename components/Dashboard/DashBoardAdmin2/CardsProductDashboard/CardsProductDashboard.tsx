import { useEffect, useState } from "react";
import Link from 'next/link';
import classes from "./CardsProductDashboard.module.css";
import axios from "axios";
import BoutonComponentDelete from "./BoutonComponentDelete/BoutonComponentDelete";
import image from "../../../../assets/card/19.png";
import ModalDelete from "./ModalDelete";
import ModalInfo from "./ModalInfo";
import ModalEdit from "./ModalEdit";
import { Product } from "@/types/types";

export default function CardsProductDashboard() {

  const [modale,setModale]=useState(false);
  const [modalElement,setModalElement]=useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [idProduct,setIdProduct] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9196/api/product/all"
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  function handleInfo(){
    setModale(!modale);
    setModalElement("info");
  }

  function handleDelete(productId: number){
    setIdProduct(productId);
    setModale(!modale);
    setModalElement("delete");
  }

  
  function handleEdit(){
    setModale(!modale);
    setModalElement("edit");
  }

  
  async function deleteProduct(productId: number){
    try {
      await axios.delete(`http://localhost:9196/api/product/remove/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      console.log("Le produit a été supprimé avec succès.");
      setModale(!modale);
      // console.log(`http://localhost:9196/api/product/remove/${productId}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  }


  return (
    <>
    <div className={classes.CardsProductDashboard}>
      {
      products.length === 0 ? 
      (
        <p>Aucun produit disponible.</p>
      ):
      (
      products.map((product:Product) => {
        return (
          <div className={classes.cardProductDashboard} key={product.id}>
            <div className={classes.cardImageDashboard}>
              {/* <img src={product.productImages[0].productImages} alt="" /> */}
            </div>
            <div className={classes.cardInfoDashboard}>
              <p className={classes.titleStyleCardDasboard}>
                {product.nameProduct}
              </p>
              <button className={classes.infoButton} onClick={handleInfo}>info</button>
              <button className={classes.editButton} onClick={handleEdit}>modifier</button>
              <button className={classes.deleteButton} onClick={() => handleDelete(product.id)}>supprimer</button>
            </div>
          </div>
        );
      })
    )
      } 
    </div>
      <div className={modale?classes.modal:classes.invisible} onClick={handleInfo}>
      </div>
      <div className={modale?classes.modalElement:classes.invisible}>

          {/* <div className={modalElement === "info"?classes.infoModal:classes.invisible}>
            <button className={classes.backButton} onClick={handleInfo}>retour</button>
            <div className={classes.elementInfoModal}>

                <div className={classes.modalProduct}>
                  <img src="https://m.media-amazon.com/images/I/71yCzdV8QhL._AC_SX679_.jpg" alt="" />
                  <div className={classes.infoModalProduct}>
                    <p>Midea Air Fryer Airfryer</p>
                    <p>Prix : 51,89€</p>
                    <button>statistique</button>
                    <button>achat</button>
                    <button>like</button>
                    <button>dislike</button>
                  </div>
                </div>

                <div className={classes.paragraphModal}>
                  <p>nombre de product vendu : 34</p>
                  <p>nombre de product vendu : 45</p>
                  <p>Liste des product à succès : 45</p>
                  <p>Chiffre d'affaires: 3000€</p>
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
 
          </div> */}

          {
            modalElement === "info"?
            (<ModalInfo onClick={handleInfo} idProduct={idProduct} />):
            (null)
          }

          {/* <div className={modalElement === "delete"?classes.deleteModal:classes.invisible}>
            <button className={classes.backButton} onClick={handleInfo}>retour</button>
              
              <div className={classes.deleteElementProduct}>
                <div className={classes.deleteModalProduct}>
                      <div className={classes.imageDeleteModal}>
                        <img src="https://m.media-amazon.com/images/I/51sCBCAvnFL._AC_SX679_.jpg" alt="" />
                      </div>
                      <p>Amosfun 1 Pc Casque de</p>
                </div>
                <div className={classes.alertMessage}>
                  <p>Voulez vous vraiment supprimer ce product</p>
                  <button>supprimer</button>
                </div>
              </div>
                
          </div> */}

          {
            modalElement === "delete"?
            (
              <ModalDelete onClick={handleInfo} idProduct={idProduct} deleteClick={()=>deleteProduct(idProduct)}/>
            ):
            (null)
          }

          {
            modalElement === "edit"?
            (<ModalEdit onClick={handleInfo} idProduct={idProduct} />):
            (null)
          }
          {/* <div className={modalElement === "edit"?classes.editModal:classes.invisible}>
              <button className={classes.backButton} onClick={handleInfo}>retour</button>
              <form className={classes.editForm}>
                    <input type="text" name="" id="" placeholder="nom product"/>
                    <input type="text" name="" id="" placeholder="prix"/>
                    <textarea name="" id="" placeholder="description"></textarea>
                    <button>valider</button>
              </form>
          </div> */}

      </div>
    </>

  );
}
