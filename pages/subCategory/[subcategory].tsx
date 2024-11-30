import { useRouter } from 'next/router';
import CategoryElement from '@/components/CategoryElement/CategoryElement';
import { CartProduct, Product } from '@/types/types';
import { useEffect, useState } from 'react';

const SubCategoryPage = () => {
    const router = useRouter();
    const { subcategory } = router.query;
    const [cart, setCart] = useState<CartProduct[]>([]);
  
    useEffect(() => {
      const cartString = localStorage.getItem('cart');
      const cartItems = cartString ? JSON.parse(cartString) : [];
      setCart(cartItems);
    }, []);
  
    const updateCartInLocalStorage = (updatedCart: CartProduct[]) => {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    };
  
    // Fonction pour ajouter un produit au panier en tenant compte du stock
    const handleAddToCart = (product: Product) => {
      const existingCartProduct = cart.find(item => item.id === product.id);
      const productQuantityInCart = existingCartProduct ? existingCartProduct.quantity : 0;
  
      if (productQuantityInCart < product.stock) {
        const updatedCart = cart.map(item => {
          if (item.id === product.id) {
            return { ...item, quantity: (item.quantity || 1) + 1 };
          }
          return item;
        });
  
        if (!existingCartProduct) {
          updatedCart.push({ ...product, quantity: 1 });
        }
  
        updateCartInLocalStorage(updatedCart);
      } else {
        alert("Vous avez atteint la quantité maximale disponible pour ce produit.");
      }
    };
  
    return (
      <div>
        <h1>Produits dans la sous-catégorie : {subcategory}</h1>
        <CategoryElement 
          onAddToCart={handleAddToCart} 
          nameSubCategory={subcategory} 
        />
      </div>
    );
  };
  
  export default SubCategoryPage;
  
  