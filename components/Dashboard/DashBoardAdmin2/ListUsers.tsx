import image from "../../../assets/card/19.png";
import classes from "./ListUsers.module.css";
export default function ListUsers(){
    return(
        <>
            <div className={classes.listUser}>

                <div className={classes.profilUser}>
                    <div className={classes.imageProfil}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Facebook_head.png" alt="" />
                    </div>
                    <div className={classes.infoProfil}>
                        <p>nom du profil</p>
                        <p>Nombre de message</p>
                    </div>
                </div>

                
                <div className={classes.profilUser}>
                    <div className={classes.imageProfil}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Facebook_head.png" alt="" />
                    </div>
                    <div className={classes.infoProfil}>
                        <p>nom du profil</p>
                        <p>Nombre de message</p>
                    </div>
                </div>

                   
                <div className={classes.profilUser}>
                    <div className={classes.imageProfil}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Facebook_head.png" alt="" />
                    </div>
                    <div className={classes.infoProfil}>
                        <p>nom du profil</p>
                        <p>Nombre de message</p>
                    </div>
                </div>

            </div>
        </>
    )
}