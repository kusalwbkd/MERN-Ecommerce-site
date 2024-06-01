import { Router } from "express";
import { authenticateUser, authorizePermissons } from "../middleware/authMiddleware.js";
import { getAllUsers, getSingleUser, showMe, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput, validateUserParams } from "../middleware/validationMiddleware.js";

const router=Router()


router.get('/',authorizePermissons,getAllUsers)
router.get('/showMe',showMe)
router.patch('/updateUser', validateUpdateUserInput, updateUser)
router.get('/:id',authorizePermissons,validateUserParams, getSingleUser)


export default router