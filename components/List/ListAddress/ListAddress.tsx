import classes from "@/styles/ListStyle/ListStyle.module.css";
import { useEffect, useState } from "react";


type PropsProductDetail = {
  productId: number | undefined;
};


interface SubCategory {
  id: number;
  nameSubCategory: string;
  imageSubCategory:string;
}

interface ProductImages{
  id:number;
  productImages:string;
  typeProductImages:string;
  // product:null;
}



interface Product {
  id: number;
  nameProduct: string;
  description: string;
  stock: number;
  basePrice: number;
  baseWeight: number;
  subCategory: SubCategory;
 productImages:ProductImages[];
 comments:Comment[];
 colors:Color[];
 materials:Material[];
 //productSizes:ProductSize[];
  // ajouter d'autres propriétés nécessaires
}

interface Role{
  id:number;
  role:string;
}

interface User{
  id:number;
  lastname:string;
  firstname:string;
  pseudo:string;
  email:string;
  password:string;
  role: Role
}

interface Comment{
  id:number;
  comment:string;
  titleComment:string;
  note:number;
  imageComment:string;
 // user:User;
  //product:Product;
  createdAt: Date;  // Ajout du type Date pour createdAt
  updatedAt: Date;  // Ajout du type Date pour updatedAt
}



interface Color{
  id:number;
  color:string;

}


interface Material{
  id:number;
  material:string;
  influenceMaterialPrice:number;
  influenceMaterialWeight:number;

}


interface ProductSize{
  id:number;
  productSize:string;
  influenceProductSizePrice:number;
  influenceProductSizeWeight:number;

}


interface CartProduct extends Product {
quantity: number;
}


interface Address{
id:number;
city:string;
street:string;
postalCode:string;
}



interface PropsListAddress {
    //onClick: () => void;
    handleAddAddress: () => void;  
    handleEditAddress: () => void;  
    idUser:number;
  }
  
export default function ListAddress({ idUser,handleAddAddress,handleEditAddress}:PropsListAddress){
    
    const [addresses, setAddresses] = useState<Address[]>([
      {
        "id":1,
        "city":"Courneuve",
        "street":"Courneuve-Aubervillier gar rer b",
        "postalCode":"93120"
      },
      {
        "id":1,
        "city":"Courneuve",
        "street":"Courneuve-Aubervillier gar rer b",
        "postalCode":"93120"
      },
      {
        "id":1,
        "city":"Courneuve",
        "street":"Courneuve-Aubervillier gar rer b",
        "postalCode":"93120"
      },
      {
        "id":1,
        "city":"Courneuve",
        "street":"Courneuve-Aubervillier gar rer b",
        "postalCode":"93120"
      },
    ]);

    // useEffect(() => {
    //     const fetchAddress = async () => {
    //       try {
    //         const response = await axios.get(
    //           "http://localhost:9196/api/address/all/"+idUser
    //         );
    //         setAddresses(response.data);
    //         console.log(response.data);
    //       } catch (error) {
    //         console.error("Error fetching Address:", error);
    //       }
    //     };
    
    //     fetchAddress();
    //   }, []);

      
    async function handleRemove(id:number){
        // try {
        //   const response = await axios.delete(
        //     "http://localhost:9196/api/address/remove/"+id
        //   );
        //   console.log("address à été supprimer avec succès:", response.data.id);
        // // console.log("http://localhost:9196/api/category/update/"+categoryId);
        // } catch (error) {
        //   console.error("Erreur lors de la suppression de address:", error);
        // }
        console.log("yo");
        
        }

    return(
        <>
        <div className={classes.allList}>
          <button className={classes.addAddress} onClick={handleAddAddress}>ajouter une adresse</button>
            {
                addresses.map((address)=>{
                    return(
                        <>
                        <div className={classes.list}>
                            <div className={classes.child1}>
                                <p>rue : {address.city}</p>
                            </div>
                            <div className={classes.child2}>
                                <p>ville : {address.street}</p>
                            </div>
                            <div className={classes.child3}>
                                <p>code postal : {address.postalCode}</p>
                            </div>
                            <div className={classes.listButtons}>
                                <button className={classes.updateButton} onClick={handleEditAddress}>modifier</button>
                                <button className={classes.deleteButton} onClick={()=>handleRemove(address.id)}>supprimer</button>
                            </div>
                        </div>
                        </>
                    )
                })
            }
        </div>
 
        </>
    )
}