import { Request } from 'express';
import { User } from '../models/modelUser';



interface MyReq extends Request {
  user: User;
}

export { MyReq }