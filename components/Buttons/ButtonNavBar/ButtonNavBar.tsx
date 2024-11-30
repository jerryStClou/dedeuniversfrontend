import classes from "./ButtonNavBar.module.css";
interface PropsButtonNavBar {
    onClick: () => void;
  }

export default function ButtonNavBar({onClick}:PropsButtonNavBar){
    return(
        <>
            <button onClick={onClick} className={classes.buttonNavBar}>NavBar</button>
        </>
    )
}