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
    { name: 'admin', permissions: ['manage_owened_documents', 'manage_users'] },
    { name: 'user', permissions: ['manage_owened_documents'] },
  ];

  for (const role of roles) {
    const exists = await RoleModel.findOne({ name: role.name });
    if (!exists) {
      await new RoleModel(role).save();
    }
  }
};
