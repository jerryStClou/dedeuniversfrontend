import { useEffect, useState } from "react";
import classes from "../../CategoryForm/CategoryForm1/CategoryForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Comment } from "@/types/type";

interface PropsCommentEditForm {
    commentId:number;
  }
  
export default function CommentEdit({commentId}:PropsCommentEditForm){
       
    const [opinion,setOpinion] = useState<Comment>();

    const CommentSchema = z.object({
        comment: z.string().min(2,{message:"minimum 2 caractère"}),
        titleComment: z.string().min(2,{message:"minimum 2 caractère"}),
        note: z.string().min(2,{message:"minimum 2 caractère"}),
        imageComment: z.string().min(2,{message:"minimum 2 caractère"}),
      });

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Comment>({
        resolver: zodResolver(CommentSchema),
      });

      useEffect(() => {
        const fetchComment = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9196/api/comment/"+commentId
            );
            setOpinion(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
        };
    
        fetchComment();
      }, []);
    
    
    

      async function editCommentSubmit(data:Comment) {
        try {
          const response = await axios.put(
            "http://localhost:9196/api/comment/update/"+commentId,
            data
          );
          console.log(response);
          console.log("le commentaire à été modifier avec succès:", response.data.id);
          // console.log(data);
        } catch (error) {
          console.error("Erreur lors de la modification du commentaire:", error);
        }
      }
    return(
        <>

<form
          className={classes.formulaireContact}
          onSubmit={handleSubmit(editCommentSubmit)}
        >
          
          <div className={classes.inputDivStyle}>
            <label htmlFor="comment">Modifier le commentaire</label>
            <textarea
              type="text"
              placeholder={opinion?.comment}
              {...register("comment")}
              id="comment"
              className={
                errors.comment ? classes.inputError : classes.inputStyle
              }
            >

            </textarea>
            <p className={classes.errorStyle}>
              {errors.comment?.message}
            </p>
          </div>

          <div className={classes.inputDivStyle}>
            <label htmlFor="titleComment">Modifier le titre de votre commentaire</label>
            <input
              type="text"
              placeholder={opinion?.titleComment}
              {...register("titleComment")}
              id="titleComment"
              className={
                errors.titleComment ? classes.inputError : classes.inputStyle
              }
            />
            <p className={classes.errorStyle}>
              {errors.titleComment?.message}
            </p>
          </div>

          
          <div className={classes.inputDivStyle}>
            <label htmlFor="note">Modifier la note</label>
            <input
              type="text"
              placeholder={opinion?.note}
              {...register("note")}
              id="note"
              className={
                errors.note ? classes.inputError : classes.inputStyle
              }
            />
            <p className={classes.errorStyle}>
              {errors.note?.message}
            </p>
          </div>



          <div className={classes.inputDivStyle}>
            <label htmlFor="imageComment">Modifier l'image a votre commentaire</label>
            <input
              type="text"
              placeholder={opinion?.imageComment}
              {...register("imageComment")}
              id="imageComment"
              className={
                errors.imageComment ? classes.inputError : classes.inputStyle
              }
            />
            <p className={classes.errorStyle}>
              {errors.imageComment?.message}
            </p>
          </div>

    
          <button className={classes.buttonStyleContact}>
            Modifier le commentaire
          </button>
        </form>
        </>
    )
}