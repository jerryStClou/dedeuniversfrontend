import { Product } from "@/types/types";
import classes from "./BasicCard.module.css";
import { useState } from "react";


type BasicCardProps = {
    product:Product;
    width:string;
  };
  

export default function BasicCard({product,width} : BasicCardProps){
    
    const [counter,setCounter]=useState<number>(0);

    function handleCount(){
        setCounter(0);
    }

    function handleCount1(){
        setCounter(1);
    }

    function handleCount2(){
        setCounter(2);
    }

    
    function handleCount3(){
        setCounter(3);
    }

    



    return(
        <>
       
       <div className={classes.basicCard} style={{width:width}}>
            <div className={classes.imageCardCarousel}>
                <div className={classes.allImageCard}>

                    <div className={counter == 1?
                        classes.move1:
                        counter == 2?
                        classes.move2:
                        counter == 3?
                        classes.move3:
                        classes.imageCard
                        }>
                        {/* <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" /> */}
                        <img src={product.productImages[0].productImages} alt="" />
                    </div>

                    
                    <div className={counter == 1?
                        classes.move1:
                        counter == 2?
                        classes.move2:
                        counter == 3?
                        classes.move3:
                        classes.imageCard
                        }>
                        {/* <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" /> */}
                        <img src={product.productImages[1].productImages} alt="" />
                    </div>

                    
                    <div className={counter == 1?
                        classes.move1:
                        counter == 2?
                        classes.move2:
                        counter == 3?
                        classes.move3:
                        classes.imageCard
                        }>
                        {/* <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" /> */}
                        <img src={product.productImages[2].productImages} alt="" />
                    </div>

                    
                    <div className={counter == 1?
                        classes.move1:
                        counter == 2?
                        classes.move2:
                        counter == 3?
                        classes.move3:
                        classes.imageCard
                        }>
                        {/* <img src="https://www.spiralfootball.fr/1908-thickbox_default/casque-football-americain-riddell-speed-icon.jpg" alt="" /> */}
                        <img src={product.productImages[3].productImages} alt="" />
                    </div>
                    
                </div>
            </div>
            <div className={classes.infoCard}>
                <div className={classes.allCardButtons}>
                    <button 
                        className={ counter == 0?
                            classes.activeCardButton:
                            classes.cardButton
                        } 
                        onClick={handleCount}
                    ></button>
                    <button 
                        className={ counter == 1?
                            classes.activeCardButton:
                            classes.cardButton
                        } 
                        onClick={handleCount1}
                    >
                    </button>
                    <button 
                        className={ counter == 2?
                            classes.activeCardButton:
                            classes.cardButton
                        } 
                        onClick={handleCount2}
                    >
                    </button>
                    <button 
                        className={ counter == 3?
                            classes.activeCardButton:
                            classes.cardButton
                        } 
                        onClick={handleCount3}
                    >
                    </button>
                </div>
                <p>{product.nameProduct}</p>
                <div className={classes.note}>
                    <img src="https://cdn-icons-png.freepik.com/512/60/60962.png" alt="" />
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126482.png" alt="" />
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126482.png" alt="" />
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126482.png" alt="" />
                    <img src="https://cdn-icons-png.flaticon.com/512/126/126482.png" alt="" />

                </div>
                <p>{product.stock} produit en stock</p>
                <p>{product.basePrice}€</p>
                <button className={classes.addCartButton}>Ajouter au panier</button>
            </div>
        </div>

        </>
    )
}