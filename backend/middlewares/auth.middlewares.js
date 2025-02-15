import jwt  from 'jsonwebtoken';
import {user}  from '../models/User.models.js' ;
import { ApiError } from '../utils/ApiError.utils.js';

const auth = async (req, res, next) => {

  console.log("inside auth middleware")
  const token = req.query.token || req.header('Authorization').replace('Bearer ', '');
  // const token = req.cookies.access_token || req.header('Authorization').replace('Bearer ', '');
  console.log(token);
  if (!token) {
    return res.status(401).json(new ApiError(404,'No token, authorization denied') );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(decoded.user.id).select('-password');
    console.log("User: is successfully added ")
console.log(req.user);
    next();

  } catch (err) {
    res.status(401).json(new ApiError('Token is not valid'));
  }
};

export {auth}
