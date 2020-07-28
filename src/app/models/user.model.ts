import { AuditModel } from './audit.model';

export class UserModel extends AuditModel {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile: string;
}
