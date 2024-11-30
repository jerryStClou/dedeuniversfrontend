
import classes from "@/styles/FormStyle/FormStyle1.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Promotion } from "@/types/types";
import { log } from "console";


interface PropsPromotionForm {
  onClick: () => void;
  handlePromotion: () => void;  
}

export default function PromotionForm({onClick, handlePromotion}:PropsPromotionForm){
    
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

  async function addPromotion(data: Promotion) {
    try{

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
    
    const response = await axios.post(
      "http://localhost:9196/api/promotions/add",
      promotionData
    );
    console.log("La promotion a été ajoutée avec succès:", response.data.id);
    handlePromotion();
    }catch (error) {
      console.error("Erreur lors de l'ajout de la promotion:", error);
    }

  }

  return(
    <>
    <div className={classes.categoryForm}>
      <button  onClick={onClick}  className={classes.buttonBack}>retour</button>
    <form onSubmit={handleSubmit(addPromotion)} className={classes.formulaireContact}>
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
          placeholder="Description de la promotion"
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
          placeholder="Pourcentage"
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
          placeholder="Valeur de la remise"
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
          placeholder="Limite d'utilisation"
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
          placeholder="Nombre d'utilisations"
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
          placeholder="Points de fidélité"
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
        Ajouter la promotion
      </button>
    </form>

    </div>

    </>
)
}