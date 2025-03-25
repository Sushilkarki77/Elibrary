import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<IUser>('User', UserSchema);

export const getUsers = (): Promise<IUser[]> => UserModel.find().exec();

export const getUserByUsername = (username: string): Promise<IUser | null> =>
  UserModel.findOne({ username }).exec();

export const createUser = (values: Partial<IUser>): Promise<IUser> =>
  new UserModel(values).save().then((user) => user.toObject() as IUser);

export const updateUserByUsername = (username: string, values: Partial<IUser>): Promise<IUser | null> =>
  UserModel.findOneAndUpdate({ username }, values, { new: true }).exec();

export const deleteUserByUsername = (username: string): Promise<IUser | null> =>
  UserModel.findOneAndDelete({ username }).exec();
