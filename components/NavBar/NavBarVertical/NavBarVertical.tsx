import { useState } from "react";
import classes from "./NavBarVertical.module.css";

export default function NavBarVertical(){
    const [activeButton, setActiveButton] = useState('all buttons active');
    const [count, setCount] = useState(0);
    const [theme,setTheme] = useState("light");
  
const themeLight = ()=>{
    setTheme("light");
}

const themeDark = ()=>{
    setTheme("dark");
}

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



const langugageActive = ()=>{
    setCount(count+1);
if(count % 2 == 0 )
{
    setActiveButton("language button enabled");
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
  
    return (
        <>
      
    <div className={classes.verticalNavBar}>
        
        <div className={classes.verticalNavbarLinks}>
            {/* <!------------------------------------------------beginning button search --------------------------------------------------------------------->   */}
            {
                    activeButton == 'all buttons active'?
                    (
                        <button onClick={searchActive} className={classes.verticalLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </button>
                    ): activeButton == 'search button enabled'?
                    (
                        <>
                            <button onClick={searchActive} className={classes.verticalLink}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </button>
                            <button className={classes.verticalLink}  onClick={searchByName}>nom subcategory</button>
                            <button className={classes.verticalLink} onClick={searchByName}>nom produit</button>
                            <button className={classes.verticalLink} onClick={searchByName}>prix</button>
                            <button className={classes.verticalLink} onClick={searchByName}>matériaux</button>
                        </>
                    ):
                    (null)
            }
          {/* <!-------------------------------------------------end button search ------------------------------------------------------------------------->   */}
          {
                    activeButton == 'all buttons active'?
                    (
                        <button onClick={accountActive} className={classes.verticalLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                        </button>
                    ): activeButton == 'account button enabled'?
                    (
                        <>
                            
                        <button onClick={accountActive} className={classes.verticalLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                        </button>
                        <button className={classes.verticalLink}>Login</button>
                        <button className={classes.verticalLink}>register</button>
                        </>      
                    ):
                    (null)
           }

                {
                    activeButton == 'all buttons active'?
                    (
                        <button onClick={shoppingCartActive}className={classes.verticalLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        </button>   
                    ): activeButton == 'shopping cart button enabled'?
                    (
                        <>
                        <button onClick={shoppingCartActive}className={classes.verticalLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        </button>  
                        
                        <p className={classes.pCartStyle}>nbr de produit : 2</p>
                        <p className={classes.pCartStyle}>Coût totale : 180€</p>
                        <button className={classes.verticalLink}>Voir le panier</button>
                        </>
                    ):
                    (null)
                }
             {/* <!---------------------------------------------------------beginning button tools ---------------------------------------------------------------> */}
             {
                    activeButton == 'all buttons active' || activeButton == 'tools button enabled'
                    || activeButton =='theme button enabled' || activeButton =='language button enabled'?
                    (
                        <button onClick={toolsActive} className={classes.verticalLink}>
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
                        <button onClick={themeActive} className={classes.verticalLink}>
                            Theme
                        </button>
                    ):(null)
                }
                  {
                    activeButton =='tools button enabled' ?
                    (
                        <button onClick={langugageActive} className={classes.verticalLink}>Langage</button>
                    ):activeButton == 'language button enabled'?
                    (
                        <>
                            <button onClick={langugageActive} className={classes.verticalLink}>Langage</button>
                            <button className={classes.langagesStyle}>
                                <p>Fr :</p>
                                <img src="https://logodownload.org/wp-content/uploads/2023/06/bandeira-france-flag-0.png" alt=""/>
                            </button>
                        </>
                    ):
                    (null)
                  }
                 
                 {
                    activeButton =='theme button enabled' ?
                    (
                        <>
                        <button className={classes.verticalLink} style={{
                            background: theme === "light"?"white":"black",
                            color: theme === "light"? "black":"white",
                            }}
                            onClick={themeLight}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                        </button>
                        <button className={classes.verticalLink} style={{
                            background: theme === "dark"?"white":"black",
                            color: theme === "dark"? "black":"white",
                            }}
                            onClick={themeDark}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                        </button>
                    </> 
                     
                    ):(null)
                 }
            
            
            
            <button  className={classes.verticalLink}>
                <p>Sous categorie1</p>
            </button>

            
            <button  className={classes.verticalLink}>
                <p>Sous categorie 2 </p>
            </button>

        </div>

    </div>
      </>
    );
}