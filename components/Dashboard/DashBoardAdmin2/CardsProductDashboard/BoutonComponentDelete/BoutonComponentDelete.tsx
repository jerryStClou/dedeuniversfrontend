import axios from "axios";
import classes from "./BoutonComponentDelete.module.css";
export default function BoutonComponentDelete({ productId }) {
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8084/api/produit/suppressions/${productId}`
      );
      console.log("Produit supprimé:", response.data);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };
  const handleDelete = () => {
    deleteProduct(productId);
  };

  return (
    <button onClick={handleDelete} className={classes.deleteStyleDasboard}>
      Supprimer le produit
    </button>
  );
}
