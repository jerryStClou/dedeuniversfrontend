import BasicCarousel from "@/components/Carousels/Home/BasicCarousel/BasicCarousel";
import BigCarousel from "@/components/Carousels/Home/BigCarousel/BigCarousel";
import DashboardAdmin from "@/components/Dashboard/DashboardAdmin/DashboardAdmin";
import DashboardClientElement from "@/components/Dashboard/dashboardClientElement/DashboardClientElement";
// import DashboardAdmin from "@/components/Dashboard/DashBoardAdmin/DashBoardAdmin";
import Footer1 from "@/components/Footer/Footer1/Footer1";
import PromotionForm from "@/components/forms/PromotionForm/PromotionForm";
import RegisterForm1 from "@/components/forms/RegisterForm/RegisterForm1/RegisterForm1";
import AddProductPromotion from "@/components/Modal/ProductPromotionModal/AddProductPromotion";
import EditProductPromotion from "@/components/Modal/ProductPromotionModal/EditProductPromotion";
import NavBar1 from "@/components/NavBar/NavBar1/NavBar1";
import ProductDetail from "@/components/ProductDetail/ProductDetail";
import ShoppingCartElement from "@/components/ShoppingCartElement/ShoppingCartElement";
import CheckoutForm from "@/components/stripe/CheckoutForm";
import PaymentPage from "@/components/stripe/PaymentPage";
import { Product, ProductImages } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function index(){
    
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //       try {
    //         const response = await axios.get(
    //           "http://localhost:9196/api/product/images/"+1
    //         );
    //         console.log(response.data);
    //       } catch (error) {
    //         console.error("Erreur dans la récupération des produits:", error);
    //       }
    //     };
    
    //     fetchProducts();
    //   }, []);

      
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //       try {
    //         const response = await axios.get(
    //           "http://localhost:9196/api/productImage/big-carousel"
    //         );
    //         console.log(response.data);
    //       } catch (error) {
    //         console.error("Erreur dans la récupération des produits:", error);
    //       }
    //     };
    
    //     fetchProducts();
    //   }, []);


    const [products, setProducts] = useState<Product[]>([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //       try {
    //         const response = await axios.get(
    //           `http://localhost:9196/api/product/subcategory/${1}/card-images`
    //         );
    //         // Filtrer les productImages pour chaque produit pour ne garder que celles de type "card"
    //         const filteredProducts = response.data.map((product: Product) => ({
    //           ...product,
    //           productImages: product.productImages.filter(
    //             (image: ProductImages) => image.typeProductImages === "card"
    //           ),
    //         }));
    
    //         console.log(filteredProducts); // Affiche les produits avec uniquement les images de type "card"
    //         setProducts(filteredProducts); // Met à jour l'état avec les produits filtrés
    //       } catch (error) {
    //         console.error("Erreur dans la récupération des produits:", error);
    //       }
    //     };
    
    //     fetchProducts();
    //   }, []); 



  //   useEffect(() => {
  //     const fetchCart = async () => {
  //       try {
  //         const response = await axios.post(
  //           `http://localhost:9196/api/panier/valider?utilisateurId=1`
  //         );
  //         console.log(response.data); 
  //       } catch (error: any) {
  //         if (error.response) {
  //           // La réponse du serveur est hors de la plage de 2xx
  //           console.error("Erreur dans la récupération de la commande:", error.response.data);
  //         } else if (error.request) {
  //           // La requête a été faite mais aucune réponse n'a été reçue
  //           console.error("Aucune réponse reçue:", error.request);
  //         } else {
  //           // Quelque chose est arrivé lors de la configuration de la requête qui a déclenché une erreur
  //           console.error("Erreur:", error.message);
  //         }
  //       }
  //     };
  
  //     fetchCart();
  // }, []);
  
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.post(
//           `http://localhost:9196/api/panier/valider?utilisateurId=1`
//         );
//         console.log(response.data); 
//       } catch (error: any) {
//         if (error.response) {
//           // La réponse du serveur est hors de la plage de 2xx
//           console.error("Erreur dans la récupération de la commande:", error.response.data);
//           console.error("Statut de la réponse:", error.response.status);
//         } else if (error.request) {
//           // La requête a été faite mais aucune réponse n'a été reçue
//           console.error("Aucune réponse reçue:", error.request);
//         } else {
//           // Quelque chose est arrivé lors de la configuration de la requête qui a déclenché une erreur
//           console.error("Erreur:", error.message);
//         }
//       }
//     };

//     fetchCart();
// }, []);

// useEffect(() => {
//   const fetchCart = async () => {
//     try {
//       const response = await axios.post(
//         `http://localhost:9196/api/panier/valider?utilisateurId=1`,
//         {}, // Corps de la requête vide si nécessaire
//         { headers: { 'Content-Type': 'application/json' } } // En-tête Content-Type
//       );
//       console.log(response.data); 
//     } catch (error: any) {
//       if (error.response) {
//         // La réponse du serveur est hors de la plage de 2xx
//         console.error("Erreur dans la récupération de la commande:", error.response.data);
//         console.error("Statut de la réponse:", error.response.status);
//       } else if (error.request) {
//         // La requête a été faite mais aucune réponse n'a été reçue
//         console.error("Aucune réponse reçue:", error.request);
//       } else {
//         // Quelque chose est arrivé lors de la configuration de la requête qui a déclenché une erreur
//         console.error("Erreur:", error.message);
//       }
//     }
//   };

//   fetchCart();
// }, []);



//     useEffect(() => {
//       const fetchCart = async () => {
//         try {
//           const response = await axios.post(
//             `http://localhost:9196/api/cart/all`
//           );
//           console.log(response.data); 
//         } catch (error: any) {
//            console.log(error);
//         }
//       };
  
//       fetchCart();
//   }, []);


// useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await axios.post(
//           `http://localhost:9196/api/order/add/${1}`
//         );
//         console.log(response.data); 
//       } catch (error: any) {
//          console.log(error);
//       }
//     };

//     fetchCart();
// }, []);

    return(
        <>
            <NavBar1/>
            <BigCarousel/>
            <BasicCarousel subCategoryId={1}/>
            {/* <ProductDetail productId={1}/> */}
            {/* <DashboardAdmin/> */}
            <Footer1/>
            {/* <DashboardAdmin/> */}
            {/* <h1>Home</h1><br /> */}
            {/* <h2>Promotion</h2> */}
            {/* <br /> */}
            {/* <PromotionForm/> */}
            {/* <ShoppingCartElement/> */}
            {/* <AddProductPromotion/> */}
        </>
    )
}