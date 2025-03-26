import mongoose, { Document, Schema } from 'mongoose';

export interface IRole extends Document {
  name: 'admin' | 'user';
  permissions: string[];
}

const RoleSchema: Schema = new Schema<IRole>({
  name: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
});

export const RoleModel = mongoose.model<IRole>('Role', RoleSchema);

export const seedRoles = async () => {
  const roles = [
    { name: 'admin', permissions: ['create_post', 'edit_post', 'delete_post', 'manage_users'] },
    { name: 'user', permissions: ['create_post', 'edit_own_post', 'delete_own_post'] },
  ];

  for (const role of roles) {
    const exists = await RoleModel.findOne({ name: role.name });
    if (!exists) {
      await new RoleModel(role).save();
    }
  }
};
