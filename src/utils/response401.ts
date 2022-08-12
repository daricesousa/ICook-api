import { MyReq } from '../interfaces/myReq';
import { auth } from './auth';
import { Response } from 'express';
import { User } from '../models/modelUser';
import { getRepository, Repository } from 'typeorm';

function userResponse401 (req: MyReq, res: Response, next) {
  auth().authenticate(async (error, user, _) => {
    if (error || !user) {
      return res.status(401).json({
        message: 'usuário não autorizado'
      });
    }
    
    const repository = getRepository(User)
    const findUser = await repository.findOne({id: user.id})
    req.user = findUser;
    return next();
  })(req, res, next);
};

function adminResponse401 (req: MyReq, res: Response, next) {
  auth().authenticate(async (error, user, _) => {
    if (error || !user) {
      return res.status(401).json({
        message: 'usuário não autorizado'
      });
    }
    const repository = getRepository(User)
    const findUser = await repository.findOne({id: user.id})
    
    if (findUser.rule === 'user') {
      return res.status(401).json({
        message: 'usuário não autorizado'
      });
    }
    req.user = findUser;
    return next();
  })(req, res, next);
};

export { userResponse401, adminResponse401 }