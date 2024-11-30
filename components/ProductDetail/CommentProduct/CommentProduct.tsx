
import classes from "./CommentProduct.module.css";
import { useState } from "react";
import Comments from "./Comments/Comments";
import CommentForm1 from "@/components/forms/CommentForm/CommentForm1/CommentForm1";

export default function CommentProduct() {
    const [addButtonComment,setAddButtonComment] = useState(false);

    function addComment()
    {
        setAddButtonComment(true);
    }

    function closeComment()
    {
        setAddButtonComment(false);
    }
    return(
        <div className={classes.commentProduct}>
            <div className={classes.menuComment}>
                <button 
                    className={addButtonComment? classes.linkCommentStyle2 : classes.linkCommentStyle} 
                    onClick={closeComment}
                >
                    Les commentaires
                </button>

                <button 
                    className={addButtonComment? classes.linkCommentStyle: classes.linkCommentStyle2} 
                    onClick={addComment}
                >
                    Ecrire un commentaires
                </button>

            </div>

            {addButtonComment === false ? <Comments/>:<CommentForm1 userId={1} productId={1}/>}
            
        </div>
    )
}