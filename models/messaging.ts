import mongoose, { Schema, Document, model } from 'mongoose';

export interface IMessaging extends Document {
  firstname: string;
  name: string;
  email: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessagingSchema = new Schema<IMessaging>(
  {
    firstname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Messaging = mongoose.models.Messaging || model<IMessaging>('Messaging', MessagingSchema);

export default Messaging;
