import { useEffect, useState } from "react";
import classes from "./Comments.module.css";
import { Comment } from "@/types/types";
import Image from 'next/image';
import etoileNoire from '@/public/images/etoile.png';
import etoileGrise from '@/public/images/etoile2.png';
import axios from "axios";

export default function Comments()
{
    
    const [comments, setComments] = useState<Comment[]>([]);

      useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(`http://localhost:9196/api/comment/all/product/1`);
        setComments(response.data);
        
      } catch (error) {
        console.error('Error fetching comment:', error);
      }
    };

    fetchComment();
  }, []);


const formatDate = (date: any): string => {
    if (!date) {
        return "Date non disponible"; // Ou une chaîne vide ou un message par défaut
    }

    // Vérifiez si 'date' est une instance de Date, sinon essayez de la convertir
    const parsedDate = (date instanceof Date) ? date : new Date(date);
    
    // Vérifiez que la conversion est réussie
    if (isNaN(parsedDate.getTime())) {
        return "Date non valide";
    }
    
    return parsedDate.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

    return(
        <div className={classes.Comments}>

            {
                comments.length === 0 ?
                (
                    <p>Aucun commentaire pour le moment</p>
                ):
                (
                    comments.map((comment)=>{
                        return(
                            <>
                            <div className={classes.theComment} key={comment.id}>
                                <div className={classes.infoProfil}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg> */}
                                    <div className={classes.imageProfil}>
                                        <img src={comment.user.imageProfil} alt="" />
                                    </div>
                                    <div className={classes.nameDate}>
                                        <p className={classes.nameProfil}>Perez Perez</p>
                                        <p className={classes.titleComment}>{formatDate(comment.createdAt)}</p>
                                    </div>
                                    <div className={classes.noteTitleCommment}>
                                        {comment.note ? (
                                            // Affiche les étoiles si le produit a des notes
                                            [...Array(5)].map((_, index) => (
                                            <Image
                                                key={index}
                                                src={index < comment.note ? etoileNoire : etoileGrise}
                                                alt="Étoile"
                                                width={20} // Ajustez selon vos besoins
                                                height={20} // Ajustez selon vos besoins
                                            />
                                            ))
                                        ) : (
                                            // Affiche un message si le produit n'a aucune note
                                            <p>Aucune note pour le moment</p>
                                        )}
                                        <p className={classes.titleComment}>{comment.titleComment}</p>
                                    </div>
                                    {/* <p>Note {comment.note} /5</p> */}
                                                
                                </div>
                                <div className={classes.reviewProduct}>
                                    <img src={comment.imageComment} alt="" className={classes.imageComment}/>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                            </>
                        )
                    })
                )
            }
 
                
            </div>
    )
}