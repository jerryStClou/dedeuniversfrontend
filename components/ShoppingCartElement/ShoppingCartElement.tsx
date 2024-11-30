import { useEffect, useState } from "react";
import classes from "@/styles/ShoppingCartElement/ShoppingCartElement.module.css";
import { CartProduct, Product } from "@/types/types";

export default function ShoppingCartElement() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  // Récupérer le panier du localStorage
  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    const cartItems = cartString ? JSON.parse(cartString) : [];
    setCart(cartItems);
  }, []);

  const updateCartInLocalStorage = (updatedCart: CartProduct[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cart.map(product => {
      if (product.id === productId) {
        if (product.quantity < product.stock) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          alert("Stock maximum atteint pour ce produit.");
        }
      }
      return product;
    });
    updateCartInLocalStorage(updatedCart);
  };

  const decreaseQuantity = (productId: number) => {
    const updatedCart = cart.map(product => {
      if (product.id === productId && product.quantity > 0) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    }).filter(product => product.quantity > 0);
    updateCartInLocalStorage(updatedCart);
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter(product => product.id !== productId);
    updateCartInLocalStorage(updatedCart);
  };

  // Calculer le nombre de produits différents et le prix total
  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, product) => total + product.basePrice * product.quantity, 0);

  // Calculer la quantité totale de produits
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <h1 className={classes.titrePanierPStyle}>Panier</h1>
      <button onClick={clearCart}>Vider le panier</button>
      <div className={classes.ensemble}>
        <div className={classes.lePanier}>
          {cart.length === 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            cart.map(product => (
              <div className={classes.leProduit} key={product.id}>
                <div className={classes.imageProduit}>
                  <img src={product.productImages[0].productImages} alt="" />
                </div>
                <div className={classes.infoProduit}>
                  <p className={classes.infoStyle}>
                    <span className={classes.spanNomPanier}>
                      Nom du produit: {product.nameProduct}
                    </span>
                  </p>
                  <p className={classes.infoStyle}>
                    <span className={classes.spanNomPanier}>
                      Prix du produit: {product.basePrice}€
                    </span>
                  </p>
                  <button onClick={() => increaseQuantity(product.id)}>+</button>
                  <button onClick={() => decreaseQuantity(product.id)}>-</button>
                  <p>Quantité: {product.quantity}</p>
                  <button onClick={() => removeFromCart(product.id)}>Supprimer</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={classes.recapitulatif}>
          <p className={classes.titreStyle}>Récapitulatif de votre panier</p>
          <div className={classes.recapDiv}>
            <p className={classes.pStyle}>Total produit:</p>
            <p className={classes.pStyle}>{totalQuantity}</p>
          </div>

          <div className={classes.recapDiv}>
            <p className={classes.pStyle}>Nombre de produits différents: </p>
            <p className={classes.pStyle}>{totalItems}</p>
          </div>

          <div className={classes.recapDiv}>
            <p className={classes.pStyle}>Total TTC:</p>
            <p className={classes.pStyle}>{totalPrice.toFixed(2)}€</p>
          </div>
          <form action="" className={classes.valideCommande}>
            <button type="submit" className={classes.commandeStyle}>
              Valider ma commande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


