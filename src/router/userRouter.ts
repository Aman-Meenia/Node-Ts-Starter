import { Router } from 'express';
import { userSchema } from '../schema/userSchema.js';
import { createUser, getUsers } from '../controller/userController.js';
import { schemaValidate } from '../middleware/schemaValidate.js';

const route = Router();

route.post('/', schemaValidate(userSchema), createUser);
route.get('/', getUsers);

export default route;
