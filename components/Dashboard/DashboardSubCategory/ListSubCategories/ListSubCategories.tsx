export default function ListSubCategories() {
    return (
      <div className={classes.sousCategorieList}>
        <div className={classes.cardSousCateforieList}>
          <div className={classses.imageSousCategorieList}>
            <img src="" alt="" />
          </div>
          <div className={classes.infoSousCategorieList}>
            <p>Titre SousCategorieList</p>
            <div className={classes.boutonsSousCategorieList}>
              <button className={classes.selectionBouton}>Selectionner</button>
              <button className={classes.modifierBouton}>modifier</button>
              <button className={classes.supprimerBouton}>supprimer</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  