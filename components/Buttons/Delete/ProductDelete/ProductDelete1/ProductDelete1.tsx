import classes from "./ProductDelete1.module.css";
interface Props {
    onclick: () => void;
  }
export default function ProductDelete1({onclick}:Props){
    return(
        <>
            <button className={classes.productDelete} onClick={onclick}>Supprimer</button>
        </>
    )
}