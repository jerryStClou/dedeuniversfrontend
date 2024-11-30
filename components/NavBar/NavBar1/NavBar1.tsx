
import { useState } from "react";
import classes from "./NavBar1.module.css";
import NavBarVertical from "../NavBarVertical/NavBarVertical";
import SearchName from "../../forms/subCategory/SearchName";
import ButtonNavBar from "../../Buttons/ButtonNavBar/ButtonNavBar";

export default function NavBar1(){

    const [activeButton,setActiveButton] = useState("all buttons active");
    const [count,setCount]=useState(0);
    // const [disappearanceBarNav,setDisappearanceBarNav]=useState(false);
    const [activeVerticalBarNav,setActiveVerticalBarNav]=useState(false);
    const [countNavBarVertical,setCountNavBarVertical]=useState(0);
    const [countDefaultLanguage,setCountDefaultLanguage]=useState(0);
    const [theme,setTheme] = useState("light");
    
    const [isHeaderVisible, setIsHeaderVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleDisparitionClick = () => {
        setIsAnimating(true); // Déclenche l'animation pour faire disparaître
        setIsHeaderVisible(false); // Cache la NavBar
        setTimeout(() => setIsAnimating(false), 500); 
    };

    const handleApparitionClick = () => {
        setIsAnimating(true); // Déclenche l'animation
        setIsHeaderVisible(true); // Rendre la NavBar visible
        setTimeout(() => setIsAnimating(false), 500); // Durée de l'animation
    };




// Fonctions de recherche
const searchActive = ()=>{
    setCount(count+1);
    if(count % 2 == 0 )
    {
        setActiveButton("all buttons active");
    }else{
        setActiveButton("search button enabled");
    }
}

const searchByName = ()=>{
    setCount(count+1);
    if(count % 2 == 0 )
    {
        setActiveButton("search button enabled");
    }else{
        setActiveButton("search by name sub category");
    }
}


const accountActive = ()=>{
    setCount(count+1);
    if(count % 2 == 0 )
    {
        setActiveButton("all buttons active");
    }else{
        setActiveButton("account button enabled");
    }
}


const shoppingCartActive = ()=>{
    setCount(count+1);
    if(count % 2 == 0 )
    {
        setActiveButton("all buttons active");

    }else{
        setActiveButton("shopping cart button enabled");
    }
}


const toolsActive = ()=>{
    setCount(count+1);
    if(count % 2 == 0 )
    {
        setActiveButton("all buttons active");
    }else{
        setActiveButton("tools button enabled");
    }
}



const themeActive = ()=>{
    setCount(count+1);
    if(count % 2 == 0 )
    {
        setActiveButton("theme button enabled");

    }else{
        setActiveButton("tools button enabled");
    }
}



const langugageActive = ()=>{
        setCount(count+1);
    if(count % 2 == 0 )
    {
        setActiveButton("language button enabled");
    }else{
        setActiveButton("tools button enabled");
    }
}

const verticalBarNavApparance = ()=>{
    setCountNavBarVertical(countNavBarVertical+1);
    setActiveVerticalBarNav(!activeVerticalBarNav);
}

const activeDefaultLanguage = ()=>{
    setCountDefaultLanguage(countDefaultLanguage+1);

}

const themeLight = ()=>{
    setTheme("light");
}

const themeDark = ()=>{
    setTheme("dark");
}


// const handleDisparitionClick = ()=>{
//     setDisappearanceBarNav(true);
// }



    return(
        <>
            <div className={classes.menuBurger} onClick={verticalBarNavApparance}>
                <div className={classes.line}></div>
                <div className={classes.line}></div>
                <div className={classes.line}></div>
            </div>
              {!isHeaderVisible && !isAnimating && (
                    <ButtonNavBar onClick={handleApparitionClick} />
            )}
        {
            isHeaderVisible &&
                (
                <div 
                    className={`${classes.header} ${isAnimating ? classes.animating : ""}`}
                    //style={{ display: isAnimating ? "block" : "none" }}
                >
        
                    <div className={classes.navbar1}>


                        <div className={
                            activeButton == 'all buttons active' ||
                            activeButton =='tools button enabled' ?
                            classes.navbarLinks:classes.navbarLinks
                        }
                        >
                            <div className={classes.logo}>
                                {/* <img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" alt="">  */}
                                {/* <img src="https://marketplace.canva.com/EAFvDRwEHHg/1/0/1600w/canva-colorful-abstract-online-shop-free-logo-cpI8ixEpis8.jpg" alt=""/> */}
                                <p style={{fontSize:"1.3em",fontWeight:"bold"}}>Logo</p>
                            </div>
                
                        {/* <!------------------------------------------------beginning button search --------------------------------------------------------------------->   */}
                            {
                                activeButton == 'all buttons active' || activeButton == 'search button enabled'?
                                (
                                    <button onClick={searchActive} className={classes.navBarLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                    </button>
                                ):(null)
                            }
                            {
                            activeButton == 'search button enabled'?
                            (
                                    // <form>
                                    //     <input type="text" placeholder="nom de la categorie"/>
                                    //     <button>Valider</button>
                                    // </form>
                                    <>
                                        <button className={classes.searchButton}  onClick={searchByName}>nom subcategory</button>
                                        <button className={classes.searchButton} onClick={searchByName}>nom produit</button>
                                        <button className={classes.searchButton} onClick={searchByName}>prix</button>
                                        <button className={classes.searchButton} onClick={searchByName}>matériaux</button>

                                        {/* <SearchName /> */}
                                    </>
                            ):activeButton == 'search by name sub category' && count % 2 == 0 ?
                            (
                                <>
                                    <button className={classes.searchButton} onClick={searchByName}>nom subcategory</button>
                                    <SearchName/>
                                </>
                            ):
                            (null)
                            }

                        {/* <!-------------------------------------------------end button search ------------------------------------------------------------------------->   */}
                            {
                                activeButton == 'all buttons active'?
                                (
                                    <>
                                    <button onClick={accountActive} className={classes.navBarLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                                    </button>
                                    </>
                                ):activeButton == 'account button enabled'?
                                (
                                    <>
                                    <button onClick={accountActive} className={classes.navBarLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                                    </button>
                                    <button className={classes.accountButton}>Login</button>
                                    <button className={classes.accountButton}>register</button>
                                    </>
                                ):
                                (null)
                            }
                            
                            {
                                activeButton == 'all buttons active'?
                                (
                                    <button onClick={shoppingCartActive} className={classes.navBarLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                                    </button>   
                                ):activeButton == 'shopping cart button enabled'?
                                (
                                    <>
                                    <button onClick={shoppingCartActive} className={classes.navBarLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                                    </button>   

                                    <p className={classes.pCartStyle}>Nombre de produit au panier : 2</p>
                                    <p className={classes.pCartStyle}>Coût totale : 180€</p>
                                    <button className={classes.buttonCart}>Voir le panier</button>

                                    </>
                                ):(null)
                            }
                            

                            {/* <!---------------------------------------------------------beginning button tools ---------------------------------------------------------------> */}
                            {
                                activeButton == 'all buttons active' || activeButton == 'tools button enabled'
                                || activeButton =='theme button enabled' || activeButton =='language button enabled'?
                                (
                                    <button onClick={toolsActive} className={classes.navBarLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={classes.tools}>
                                            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
                                        </svg>
                                    </button>
                                ):(null)
                            }
                        
                            {
                                activeButton =='tools button enabled' || 
                                activeButton =='theme button enabled' ?
                                (
                                    <button onClick={themeActive} className={classes.navBarLink}>
                                        Theme
                                    </button>
                                ):(null)
                            }
                            {
                                activeButton =='tools button enabled' ||
                                activeButton == 'language button enabled'?
                                (
                                    <button onClick={langugageActive} className={classes.navBarLink}>Langage</button>
                                ):(null)
                            }
                            
                            <div 
                                className={activeButton == 'language button enabled'?classes.defaultLanguage:classes.invisible} 
                                onClick={activeDefaultLanguage}
                            >
                                <p>Fr :</p>
                                <img src="https://logodownload.org/wp-content/uploads/2023/06/bandeira-france-flag-0.png" alt=""/>
                            </div>

                            <div 

                                className={
                                    countDefaultLanguage == 0 ?classes.invisible:
                                    countDefaultLanguage > 0 && countDefaultLanguage % 2 == 1 && activeButton == 'language button enabled'?
                                    classes.allLanguages:
                                    classes.allLanguages2
                                }

                            >

                                <div className={classes.language}>
                                    <p>Fr</p>
                                    <img src="https://logodownload.org/wp-content/uploads/2023/06/bandeira-france-flag-0.png" alt=""/>
                                </div>

                                <div className={classes.language}>
                                    <p>USA</p>
                                    <img src="https://media.istockphoto.com/id/961747352/fr/vectoriel/le-drapeau-des-%C3%A9tats-unis-dam%C3%A9rique-illustration-vectorielle.jpg?s=612x612&w=0&k=20&c=_wsPrPWq50fYc1sVpBoFLgcRPNqD-V-cPOtJfirRdys=" alt=""/>
                                </div>

                                
                                <div className={classes.language}>
                                    <p>Esp</p>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/270px-Flag_of_Spain.svg.png" alt=""/>
                                </div>

                            </div>
                            {
                                activeButton =='theme button enabled' ?
                                (
                                    <>
                                    <button style={{
                                        background: theme === "light"?"white":"black",
                                        color: theme === "light"? "black":"white",
                                        width:"11%"}}
                                        onClick={themeLight}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                                    </button>
                                    <button style={{
                                        background: theme === "dark"?"white":"black",
                                        color: theme === "dark"? "black":"white",
                                        width:"11%"}}
                                        onClick={themeDark}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                                    </button>
                                </> 
                                
                                ):(null)
                            }
                            
                            {/* <!-----------------------------------------------------------end button tools -------------------------------------------------------------------> */}

                        </div>
                    </div>

                    <div className={classes.navbar2}>
                
                        <button className={classes.categoryLink} onClick={handleDisparitionClick}>
                            <p>navbar</p>
                        </button>

                        <button className={classes.categoryLink}>
                            <p>SousCategorie1</p>
                        </button>
                        
                        <button className={classes.categoryLink}>
                            <p>SousCategorie1</p>
                        </button>
                        
                        <button className={classes.categoryLink}>
                            <p>SousCategorie1</p>
                        </button>
                        
                        <button className={classes.categoryLink}>
                            <p>SousCategorie1</p>
                        </button>
                    </div>
                </div>
                )
        }
 
    
    {countNavBarVertical>0 && countNavBarVertical%2==1?(
        <div className={classes.verticalNavBarVisibility}>
            <NavBarVertical/>
        </div>
    ):
    (
        <div className={classes.verticalNavBarVisibilityInverted}>
            <NavBarVertical/>
        </div>
    )
    }
    
        </>
    )
}