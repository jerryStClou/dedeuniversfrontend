import { useEffect, useState } from "react";
import classes from "@/styles/LienStyle/LienStyle.module.css";
import axios from "axios";
import { useRouter } from 'next/router'; // Importer useRouter
import type { Category, SubCategory } from "@/types/types";


interface PropsCategorySubCategory {
    idCategory:number;
    idSubCategory:number;
    categorySubCategoryId:number;
    handleCategorySubCategory: () => void;  
  }


export default function EditCategorySubCategory({idCategory, idSubCategory,categorySubCategoryId,handleCategorySubCategory}:PropsCategorySubCategory){

    const fetchTokenCsrf = async () => {
        const response = await axios.get("http://localhost:9197/api/csrf-token", {
          withCredentials: true,
      });
        return response.data.csrfToken;
    };
    const router = useRouter();

    const [categories,setCategories] = useState<Category[]>([]);
    const [subCategories,setSubCategories] = useState<SubCategory[]>([]);
    
    const [categoryId, setCategoryId] = useState<number>(idCategory);
    const [subCategoryId, setSubCategoryId] = useState<number>(idSubCategory);

    
    const [categoryClicked, setCategoryClicked] = useState<boolean>(false);
    const [subCategoryClicked, setSubCategoryClicked] = useState<boolean>(false);

    
    useEffect(() => {
        const fetchCatgory = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:9197/api/category/all",
                    {
                      withCredentials: true,  // Ajout de cette option pour envoyer les cookies
                    }
                );
                // Assurez-vous que productImages est toujours un tableau
                
                setCategories(response.data);
            } catch (error) {
                console.error("Erreur dans la récupération des catégories:", error);
            }
        };
    
        fetchCatgory();
    }, []);
    
      
    useEffect(() => {
        const fetchpromotion = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9197/api/subCategory/all",
              {
                withCredentials: true,  // Ajout de cette option pour envoyer les cookies
              }
            );
            setSubCategories(response.data);
            // console.log(response.data);
          } catch (error) {
            console.error("Erreur dans la récupération des sous catégories:", error);
          }
        };
    
        fetchpromotion();
      }, []);
    

    function selectCategory(productId:number){
        setCategoryId(productId);
        setCategoryClicked(true);
    }
    
    function selectSubCategory(subCategoryId:number){
        setSubCategoryId(subCategoryId);
        setSubCategoryClicked(true);
    }

    async function updateCategorySubCategory(){
        try{
            const csrfToken = await fetchTokenCsrf();
            const response = await axios.put(
                `http://localhost:9197/api/category-subCategory/update/${categorySubCategoryId}/${categoryId}/${subCategoryId}`,
                {
                    withCredentials: true,  // Pour envoyer les cookies avec la requête
                    headers: {
                        'X-XSRF-TOKEN': csrfToken  // Ajouter le token CSRF dans l'en-tête
                    }
                }
              );
              console.log("le liens entre la categorie et la sous categorie à été ajouter avec succes", response.data.id);
              handleCategorySubCategory()
        }catch(error){
            console.error("Erreur lors de l'ajout du lien entre la categorie et la sous categorie:", error);
        }
    }

    
    return(
        <>
        <div className={classes.component}>

            <div className={classes.divAllElements}>
                    <div className={classes.divAllElement1}>
                        {subCategories.map((subCategory)=>{
                            return(
                                <>
                                    <div 
                                        className={
                                                subCategoryId === subCategory.id?
                                                classes.elementSelected:
                                                classes.element
                                            } 
                                        onClick={()=>{selectSubCategory(subCategory.id)}}
                                    >
                                        <img src={subCategory.imageSubCategory} alt="" />
                                        <p><span>Nom : </span>{subCategory.nameSubCategory} </p>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                    <div className={classes.divAllElement2}>
                            
                        {categories.map((category)=>{
                                return(
                                    <>
                                        <div 
                                            className={
                                                categoryId === category.id?
                                                classes.elementSelected:
                                                classes.element
                                            } 
                                            onClick={()=>{selectCategory(category.id)}}
                                        >
                                            <p><span>Description : </span>{category.nameCategory} </p>
                                        </div>
                                    </>
                                )
                        })}

                    </div>
                </div>

                <div className={classes.validationButton} >
                    <button className={classes.boutonAjoutSousCategorie} onClick={updateCategorySubCategory}>valider</button>
                </div>


        </div>
            
            
        </>
    )
}