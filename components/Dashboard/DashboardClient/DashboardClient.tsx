import { useState } from "react";
import classes from "./DashboardClient.module.css";
export default function DashboardClient(){
    const [modale,setModale]=useState(false);
    const [modalElement,setModalElement]=useState("");

    function handleOrder(){
        setModale(!modale);
        setModalElement("order");
    }
    function handleOrderDetail(){
        setModalElement("order detail");
    }

    function handleOrderModal(){
        setModalElement("order");
    }
   
    return(
        <>
            <div className={classes.dashboardClient}>

                <div className={classes.menuClient} onClick={handleOrder}>
                    <div className={classes.imageMenuClient}>
                        <img src="https://cdn.pixabay.com/photo/2016/09/23/11/37/cardboard-1689424_640.png" alt="" />
                    </div>
                    <p>Vos commande</p>
                </div>

                
                <div className={classes.menuClient}>
                    <div className={classes.imageMenuClient}>
                        <img src="https://media.cdnws.com/_i/287037/RAW-842/2613/45/programme-fidelite.png" alt="" />
                    </div>
                    <p>Point de fidélité</p>
                </div>

                
                <div className={classes.menuClient}>
                    <div className={classes.imageMenuClient}>
                        <img src="https://www.podcastscience.fm/wp-content/uploads/2019/12/bank-3487033_1920-590x393.png" alt="" />
                    </div>
                    <p>Vos paiement</p>
                </div>

                
                <div className={classes.menuClient}>
                    <div className={classes.imageMenuClient}>
                        <img src="https://media.istockphoto.com/id/1226587113/fr/vectoriel/verrouiller-lic%C3%B4ne-ouverte-et-verrouiller-ferm%C3%A9e-symbole-de-cadenas-symbole-de.jpg?s=612x612&w=0&k=20&c=JBOngcEsOmR1Dk1Cj5N_sC03HMbm3fWLp_Fn8pJWmDs=" alt="" />
                    </div>
                    <p>Vos paiement</p>
                </div>

                
                <div className={classes.menuClient}>
                    <div className={classes.imageMenuClient}>
                        <img src="https://www.decopositive.com/wp-content/uploads/2023/10/Capture-decran-2023-10-15-a-11.04.09.png" alt="" />
                    </div>
                    <p>messagerie</p>
                </div>

                
                <div className={classes.menuClient}>
                    <div className={classes.imageMenuClient}>
                        <img src="https://img.freepik.com/vecteurs-premium/etoile-jaune-couleur-doree-conception-3d-realiste-dans-style-dessin-anime-plastique_178888-1497.jpg" alt="" />
                    </div>
                    <p>Etoile</p>
                </div>


                <div className={modale?classes.modal:classes.invisible}  onClick={handleOrder}>
                </div>
                <div className={modale?classes.modalElement:classes.invisible}>
                    <div className={classes.modalOrder}>
                        <button className={modalElement != "order detail" ? classes.backButton:classes.invisible} onClick={handleOrder}>retour</button>
                        <button className={modalElement === "order detail" ? classes.backButton:classes.invisible} onClick={handleOrderModal}>retour</button>
                        <p className={classes.titleModalOrder}>Vos commande</p>
                        <div className={modalElement === "order" ? classes.allCards:classes.invisible}>

                            <div className={classes.cardModalOrder} onClick={handleOrderDetail}>
                                <div className={classes.imageCardModalOrder}>
                                    <img src="https://www.spiralfootball.fr/1905-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" />
                                </div>
                                <p>Casque de hokey</p>
                            </div>

                            <div className={classes.cardModalOrder}>
                                <div className={classes.imageCardModalOrder}>
                                    <img src="https://www.kmj-sports.fr/images/Image/2722-1-3.jpg" alt="" />
                                </div>
                                <p>Casque de hokey</p>
                            </div>

                            <div className={classes.cardModalOrder}>
                                <div className={classes.imageCardModalOrder}>
                                    <img src="https://www.molinel.com/13279-large_default/veste-de-service-homme-youn-z.jpg" alt="" />
                                </div>
                                <p>Casque de hokey</p>
                            </div>
                        
                            <div className={classes.cardModalOrder}>
                                <div className={classes.imageCardModalOrder}>
                                    <img src="https://www.mistercanne.fr/pub/media/catalog/product/cache/e666a64ddfefc3cad2c3c715f50cefe0/p/a/parapluie-foxumbrella_1.png" alt="" />
                                </div>
                                <p>Casque de hokey</p>
                            </div>
                        
                            <div className={classes.cardModalOrder}>
                                <div className={classes.imageCardModalOrder}>
                                    <img src="https://m.media-amazon.com/images/I/61CS3uP1hxL.jpg" alt="" />
                                </div>
                                <p>Casque de hokey</p>
                            </div>

                            <div className={classes.cardModalOrder}>
                                <div className={classes.imageCardModalOrder}>
                                    <img src="https://mania-toys-collector.fr/24592-large_default/batman-statuette-masque-batman-the-dark-night-cowl-20-cm.jpg" alt="" />
                                </div>
                                <p>Casque de hokey</p>
                            </div>

                        </div>

                        <div className={modalElement === "order detail" ? classes.cardDetail:classes.invisible}>
                            <div className={classes.cardComplete}>
                                <div className={classes.cardOrderDetail}>
                                    <div className={classes.cardImageOrderDetail}>
                                        <img src="https://ae01.alicdn.com/kf/Sc0da70f770614a6eaaa9ba901d7222374/Masques-Batman-demi-visage-en-latex-pour-adultes-figurine-d-anime-masque-cancers-Halloween-f-te.jpg" alt="" />
                                    </div>
                                    <p>Casque hokey</p>
                                </div>
                                <div className={classes.infoOrderDetail}>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                        Velit maxime saepe dicta harum architecto cum rerum expedita 
                                        ullam ea voluptatum, ducimus cupiditate placeat mollitia voluptas 
                                        magni id ratione tempora autem.
                                    </p>
                                </div>
                            </div>


                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}