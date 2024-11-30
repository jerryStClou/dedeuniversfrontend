import classes from "./DescriptionProduct.module.css";

type PropsDescriptionProduct = {
    description: string|undefined;
  };

export default function DescriptionProduct({description}:PropsDescriptionProduct) {
 
    return(
        <div>
            <h1  className={classes.titleDescription}>Description</h1>
            <p className={classes.theDescription}>
                {description}
            </p>
        </div>
       
    )

}