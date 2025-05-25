import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IRole } from './role.model';

export interface IUser extends Document {
    username: string;
    password: string;
    role: mongoose.Types.ObjectId | IRole;
    invitationToken?: string | null;
    invitationTokenExpiry?: Date | null;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    password: {
        type: String,
        minlength: 6,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    invitationToken: {
        type: String,
        default: null,
    },
    invitationTokenExpiry: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<IUser>('User', UserSchema);

export const getAllUsers = async (): Promise<IUser[] | null> => {
    const users: IUser[] = await UserModel.find().populate('role').exec();
    return users;
}

export const createUser = async (username: string, password: string, roleId: mongoose.Types.ObjectId): Promise<IUser> => {
    const user = new UserModel({ username, password, role: roleId });
    return await user.save();
};

export const createInvitedUser = async (
    username: string,
    roleId: mongoose.Types.ObjectId,
    token: string,
    expiry: Date
): Promise<IUser> => {
    const user = new UserModel({
        username,
        role: roleId,
        invitationToken: token,
        invitationTokenExpiry: expiry,
    });
    return await user.save();
};


export const deleteUserById = async (id: string): Promise<IUser | null> => {
    return UserModel.findByIdAndDelete(id).exec();
};

export const findUserByUsername = (username: string): Promise<IUser | null> => {
    return UserModel.findOne({ username }).populate('role').exec();
};
