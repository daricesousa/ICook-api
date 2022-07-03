import { Request } from 'express';

interface UserReq{
  id: number;
}

interface MyReq extends Request {
  user: UserReq;
}

export { MyReq }