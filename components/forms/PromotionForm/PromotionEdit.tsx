import { Promotion } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "@/styles/FormStyle/FormStyle1.module.css";

interface PropsPromotionEdit{
    onClick: () => void;
    handlePromotion: () => void;  
    promotionId:number;
  }

export default function PromotionEdit({onClick, handlePromotion, promotionId}:PropsPromotionEdit){
    
    const [promotion, setPromotion] = useState<Promotion>();

    useEffect(() => {
        const fetchPromotion = async () => {
          try {
            const response = await axios.get(
              "http://localhost:9196/api/promotions/"+promotionId
            );
            setPromotion(response.data);
            console.log(response.data);
            console.log("hello world");
          } catch (error) {
            console.error("Error fetching promotion:", error);
          }
        };
    
        fetchPromotion();
      }, []);
      
  const promotionSchema = z.object({
    code: z.string().min(1),
    description: z.string().min(1),
    discountPercentage: z.string().min(1).transform((val) => Number(val)), // Transformation en nombre
    discountValue: z.string().min(1).transform((val) => Number(val)), // Transformation en nombre
    usageLimit: z.string().min(1).transform((val) => Number(val)), // Transformation en nombre
    usageCount: z.string().min(1).transform((val) => Number(val)), // Transformation en nombre
    isFirstPurchaseOnly: z.boolean(),
    type: z.enum(['PERCENTAGE', 'CASHBACK', 'FIXED_VALUE', 'FIRST_PURCHASE', 'LOYALTY']),
    requiredLoyaltyPoints: z.string().nullable().transform((val) => val !== null ? Number(val) : null),
    startDate: z.string().min(1).transform((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date;
    }),
    endDate: z.string().min(1).transform((val) => {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
      }
      return date;
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Promotion>({
    resolver: zodResolver(promotionSchema),
  });

  
  const convertToISOFormat = (date: Date): string => {
    return date.toISOString(); // Retourne une date au format ISO 8601 avec "Z" pour UTC
};


  async function updatePromotion(data:Promotion) {
    try {
      
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
   

    const isoStartDate = convertToISOFormat(startDate);
    const isoEndDate = convertToISOFormat(endDate); 

    const promotionData = {
      ...data,
      startDate: isoStartDate,  
      endDate: isoEndDate,      
    };

    console.log(promotionData);
      const response = await axios.put(
        "http://localhost:9196/api/promotions/update/"+promotionId,
        promotionData
      );
      console.log("La promotion à été modifier avec succès:", response.data.id);
      handlePromotion();
    } catch (error) {
      console.error("Erreur lors de la modification de la promotion:", error);
    }
  }



    return(
        <>

<div className={classes.categoryForm}>
      <button onClick={onClick} className={classes.buttonBack}>retour</button>
    <form onSubmit={handleSubmit(updatePromotion)} className={classes.formulaireContact}>
      <div className={classes.inputDivStyle}>
        <label htmlFor="code">Code</label>
        <input
          type="text"
          placeholder="Code de la promotion"
          {...register("code")}
          id="code"
          className={errors.code ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.code?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder={promotion?.description}
          {...register("description")}
          id="description"
          className={errors.description ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.description?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="discountPercentage">Pourcentage de réduction</label>
        <input
          type="number"
          placeholder={promotion?.discountPercentage?.toString()}
          {...register("discountPercentage")}
          id="discountPercentage"
          className={errors.discountPercentage ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.discountPercentage?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="discountValue">Valeur de réduction</label>
        <input
          type="number"
          placeholder={promotion?.discountValue?.toString()}
          {...register("discountValue")}
          id="discountValue"
          className={errors.discountValue ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.discountValue?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="usageLimit">Limite d'utilisation</label>
        <input
          type="number"
          placeholder={promotion?.usageLimit?.toString()}
          {...register("usageLimit")}
          id="usageLimit"
          className={errors.usageLimit ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.usageLimit?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="usageCount">Nombre d'utilisations</label>
        <input
          type="number"
          placeholder={promotion?.usageCount?.toString()}
          {...register("usageCount")}
          id="usageCount"
          className={errors.usageCount ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.usageCount?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="isFirstPurchaseOnly">Réservée au premier achat</label>
        <input
          type="checkbox"
          {...register("isFirstPurchaseOnly")}
          id="isFirstPurchaseOnly"
          className={errors.isFirstPurchaseOnly ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.isFirstPurchaseOnly?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="type">Type de promotion</label>
        <select
          {...register("type")}
          id="type"
          className={errors.type ? classes.inputError : classes.inputStyle}
        >
          <option value="PERCENTAGE">Pourcentage</option>
          <option value="CASHBACK">Remboursement</option>
          <option value="FIXED_VALUE">Valeur fixe</option>
          <option value="FIRST_PURCHASE">Premier achat</option>
          <option value="LOYALTY">Fidélité</option>
        </select>
        <p className={classes.errorStyle}>{errors.type?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="requiredLoyaltyPoints">Points de fidélité requis</label>
        <input
          type="number"
          placeholder={promotion?.requiredLoyaltyPoints?.toString()}
          {...register("requiredLoyaltyPoints")}
          id="requiredLoyaltyPoints"
          className={errors.requiredLoyaltyPoints ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.requiredLoyaltyPoints?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="startDate">Date de début</label>
        <input
          type="date"
          {...register("startDate")}
          id="startDate"
          className={errors.startDate ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.startDate?.message}</p>
      </div>

      <div className={classes.inputDivStyle}>
        <label htmlFor="endDate">Date de fin</label>
        <input
          type="date"
          {...register("endDate")}
          id="endDate"
          className={errors.endDate ? classes.inputError : classes.inputStyle}
        />
        <p className={classes.errorStyle}>{errors.endDate?.message}</p>
      </div>

      <button type="submit"  className={classes.buttonStyleContact}>
        modifier la promotion
      </button>
    </form>

    </div>

        </>
    )
}