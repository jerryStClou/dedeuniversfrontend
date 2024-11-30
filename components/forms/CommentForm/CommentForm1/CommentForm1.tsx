import classes from "../../CategoryForm/CategoryForm1/CategoryForm1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Comment } from "@/types/type";


interface PropsCommentForm {
    userId:number;
    productId:number;
  }
  
  export default function CommentForm1({userId, productId}:PropsCommentForm){   
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

      async function addCommentSubmit(data:Comment) {
        try {
          const response = await axios.post(
            "http://localhost:9196/api/comment/add/"+userId+"/"+productId,
            data
          );
          console.log(response);
          console.log("le commentaire à été ajouter avec succès:", response.data.id);
          // console.log(data);
        } catch (error) {
          console.error("Erreur lors de l'ajout  du commentaire:", error);
        }
      }
    
    return(
        <>
        <form
          className={classes.formulaireContact}
          onSubmit={handleSubmit(addCommentSubmit)}
        >
          
          <div className={classes.inputDivStyle}>
            <label htmlFor="comment">Ajouter un commentaire</label>
            <textarea
              type="text"
              placeholder="Ecrivez votre commentaire"
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
            <label htmlFor="titleComment">Ecrivez le titre de votre commentaire</label>
            <input
              type="text"
              placeholder="Ecrivez le titre de votre commentaire"
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
            <label htmlFor="note">mettez une note</label>
            <input
              type="text"
              placeholder="mettez une note"
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
            <label htmlFor="imageComment">Ajouter une image a votre commentaire</label>
            <input
              type="text"
              placeholder="Ajouter une image a votre commentaire"
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
            Ajouter le commentaire
          </button>
        </form>

        </>
    )
  }