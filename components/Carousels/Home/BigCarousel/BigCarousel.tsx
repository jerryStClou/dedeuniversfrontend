import { useState, useEffect  } from "react";
import classes from "./BigCarousel.module.css";
import CardBigCarousel from "./CardBigCarousel";
import { ProductImages } from "@/types/types";

export default function BigCarousel(){
    const [compteur,setCompteur] = useState(0);
    const [cardBigCarousels,setCardBigCarousels] = useState<ProductImages[]>([]);
    const [productId,setProductId] = useState([]);

    
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       setCompteur(prevCompteur => {
    //         if (prevCompteur === 3) {
    //           return 0;
    //         } else {
    //           return prevCompteur + 1;
    //         }
    //       });
    //     }, 2000);
    
    //     // Nettoyage de l'intervalle lorsque le composant est démonté
    //     return () => clearInterval(interval);
    //   }, []);

    function handlePosition1(){
        setCompteur(0);
    }
    
    function handlePosition2(){
        setCompteur(1);
    }
    
    function handlePosition3(){
        setCompteur(2);
    }
    
    function handlePosition4(){
        setCompteur(3);
    }
    
    function handlePosition5(){
        setCompteur(4);
    }
    function handleMoveRight(){
        if(compteur <= 4){
            setCompteur(compteur+1);
        }else{
            setCompteur(0);
        }
    }
    function handleMoveLeft(){
        if(compteur>=0){
            setCompteur(compteur-1);
        }else{
            setCompteur(0);
        }
    }
    return(
        <>
            <div className={classes.bigCarousel}>
                <div className={classes.allCardsBigCarousel}>
                    <div className={ compteur === 1 ?
                        classes.move1:
                        compteur === 2 ? 
                        classes.move2:
                        compteur === 3 ?
                        classes.move3:
                        classes.cardBigCarousel
                        }>
                        <CardBigCarousel
                            subCategoryId={1}
                        />
                    </div>

                </div>
                <div className={classes.allButtonsBigCarousel}>
                    <button className={classes.buttonMoveCarousel} onClick={handleMoveLeft}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>

                    <div className={classes.allRoundButtons}>
                        <button
                            className={
                                compteur === 0 ? 
                                classes.activeRoundButton:
                                classes.roundButton
                            }
                            onClick={handlePosition1}
                        ></button>
                        <button
                            className={
                                compteur === 1 ? 
                                classes.activeRoundButton:
                                classes.roundButton
                            }
                            onClick={handlePosition2}
                        ></button>
                        <button
                            className={
                                compteur === 2 ? 
                                classes.activeRoundButton:
                                classes.roundButton
                            }
                            onClick={handlePosition3}
                        ></button>
                        <button
                            className={
                                compteur === 3 ? 
                                classes.activeRoundButton:
                                classes.roundButton
                            }
                            onClick={handlePosition4}
                        ></button>
                        <button
                            className={
                                compteur === 4 ? 
                                classes.activeRoundButton:
                                classes.roundButton
                            }
                            onClick={handlePosition5}
                        ></button>
                    </div>

                    <button className={classes.buttonMoveCarousel} onClick={handleMoveRight}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>
            </div>
        </>
    )
}