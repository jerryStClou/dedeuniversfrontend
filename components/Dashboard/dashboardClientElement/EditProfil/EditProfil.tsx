import classes from "./EditProfil.module.css";

interface PropsEditProfil {
    handleEditProfil: () => void;  
    // idProduct:number;
  }

export default function EditProfil(){
    return(
        <>
            <form className={classes.formEditProfil}>
                <div className={classes.imageProfil}>
                    <img src="https://i-mom.unimedias.fr/2020/09/16/dragon-ball-songohan.jpg?auto=format,compress&cs=tinysrgb&w=1200" alt="" />
                </div>

                <div className={classes.divInput}>
                    <label htmlFor="">Image du profil</label>
                    <input type="text" placeholder="" />
                </div>

                <div className={classes.divInput}>
                    <label htmlFor="">Nom du profil</label>
                    <input type="text" placeholder="" />
                </div>
                
                <div className={classes.divInput}>
                    <label htmlFor="">Prenom du profil</label>
                    <input type="text" placeholder="" />
                </div>

                <div className={classes.divInput}>
                    <label htmlFor="">Pseudo du profil</label>
                    <input type="text" placeholder="" />
                </div>

                <button className={classes.buttonEditProfil}>Modifier</button>
            </form>
        </>
    )
}