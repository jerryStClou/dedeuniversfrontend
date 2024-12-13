import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";

// Schéma Zod pour la validation
const messagingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type MessagingFormData = z.infer<typeof messagingSchema>;

const MessagingForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<MessagingFormData>({
    resolver: zodResolver(messagingSchema),
  });

  const onSubmit = async (data: MessagingFormData) => {
    try {
      const response = await axios.post("http://localhost:3001/api/messaging/add", data);
      alert("Message sent successfully");
    } catch (error) {
      alert("Error sending message");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label>Content</label>
        <textarea {...register("content")} />
        {errors.content && <p>{errors.content.message}</p>}
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
};

export default MessagingForm;
