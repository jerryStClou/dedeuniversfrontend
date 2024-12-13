import {useEffect, useState } from "react";
import classes from "@/styles/DashboardStyle/Dashboard.module.css";
import axios from "axios";
import { ProductSize } from "@/types/types";
import SizeForm1 from "@/components/forms/SizeForm/SizeForm1/SizeForm1";
import SizeEdit from "@/components/forms/SizeForm/SizeForm1/SizeEdit";
import { useRouter } from 'next/router'; // Importer useRouter

export default function DashboardSize(){
  
  const fetchTokenCsrf = async () => {
    const response = await axios.get("http://localhost:9197/api/csrf-token", {
      withCredentials: true,
  });
    return response.data.csrfToken;
};
    const router = useRouter();
    const { id } = router.query; // Récupérer l'ID de la sous-catégorie depuis l'<URL></URL>
    
    // Vérification si id existe et le convertir en nombre
    const productId = (id && !Array.isArray(id)) ? parseInt(id as string, 10) : NaN;

    const [component,setComponent] = useState("productSize");
    const [productSizes, setProductSizes] = useState<ProductSize[]>([]);
    const [idProductSize, setIdProductSize] = useState(0);

    // useEffect(() => {
    //   const fetchProductSize = async () => {
    //     try {
    //       const response = await axios.get(
    //         "http://localhost:9197/api/productSize/all/"+productId
    //       );
    //       setProductSizes(response.data);
    //       console.log(response.data);
    //       console.log("hello world");
    //     } catch (error) {
    //       console.error("Error fetching productSize:", error);
    //     }
    //   };
  
    //   fetchProductSize();
    // }, []);



    
    useEffect(() => {
        //setIdSubCategory(subCategId);
      
        if (isNaN(productId)) {
            console.error("L'ID du produit est invalide.");
            return; // Si l'ID est invalide, on arrête l'exécution de la requête
        }

        const fetchProductSize = async () => {
            try {
                // Requête API pour récupérer les produits par sous-catégorie
                const response = await axios.get(
                    `http://localhost:9197/api/productSize/all/${productId}`,
                    {
                      withCredentials: true,  // Ajout de cette option pour envoyer les cookies
                    }
                );
                setProductSizes(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des tailles du produit:", error);
            }
        };

        fetchProductSize();
    }, [productId]); // Déclenche la requête lorsque idSubCategory change
  
  
    function handleProductSizeForm(){
      setComponent("productSize form");
    }
  
    function backDashProductSize(){
      setComponent("productSize");
    }
  
    function handlebackDashProductSize() { 
        setComponent("productSize"); 
        router.reload(); // Recharge la page
    }
    
    function handleEditForm(productSizeId:number){
      setComponent("edit productSize form");
      setIdProductSize(productSizeId);
    }

    
    function handleNextDashBoard(){
      router.push(`/admin/dashboard/promotion/promotion`);
    }
  
    async function handleRemoveProductSize(productSizeId:number){
      try {
        const csrfToken = await fetchTokenCsrf();
        const response = await axios.delete(
          "http://localhost:9197/api/productSize/remove/"+productSizeId,
          {
              withCredentials: true,  // Pour envoyer les cookies avec la requête
              headers: {
                  'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
              }
          }
        );
        console.log("productSize à été supprimer avec succès:", response.data.id);
        router.reload(); // Recharge la page
      // console.log("http://localhost:9196/api/category/update/"+categoryId);
      } catch (error) {
        console.error("Erreur lors de la suppression de productSize:", error);
      }
      }
  
    return(
        <>
        {
          component === "productSize"?
          (
            <div className={classes.DashboardImageProduit}>
              <div className={classes.buttonsDashboard}>
                  <button
                    className={classes.boutonAjoutSousCategorie} onClick={handleProductSizeForm}
                  >
                    Ajouter une nouvelle taille
                  </button>
                  <button className={classes.backButton}>retour</button>
              </div>
            <p>{productId}</p>
            {
            productSizes.length === 0 ? 
            (
                <p>Aucune taille disponible.</p>
            ):
            (productSizes.map((productSize:ProductSize) => {
              return (
                <div className={classes.cardsImage} key={productSize.id}>
                  <div className={classes.cardImage}>
                    {/* <img src={productSize.productSize} alt="" /> */}
                    <p>{productSize.productSize}</p>
                    <button className={classes.boutonModifier} onClick={()=>handleEditForm(productSize.id)}>Modifier</button>
                    <button className={classes.boutonSupprimer} onClick={()=>handleRemoveProductSize(productSize.id)}>Supprimer</button>
                  </div>
                </div>
              );
            }))
            
            }
            <button className={classes.boutonValiderImageProduit} onClick={handleNextDashBoard}>
              Valider les tailles
            </button>
            
          </div>
          ):component === "productSize form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashProductSize}></div>
            <SizeForm1 onProductSizeAdded={handlebackDashProductSize} onClick={backDashProductSize} idProduct={productId}/>
            </>
          ):component === "edit productSize form"?
          (
            <>
            <div className={classes.modalBackground} onClick={backDashProductSize}></div>
            <SizeEdit onProductSizeAdded={handlebackDashProductSize}  onClick={backDashProductSize} productSizeId={idProductSize}/>
          </>
        ):
          (null)
        }
    
        </>
    )
}