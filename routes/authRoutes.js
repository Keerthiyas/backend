
const express = require('express');
const router = express.Router();
const {register,login} = require('../controllers/authController');
const {body} = require('express-validator');
const {authMiddleware} = require('../middleware/authMiddleware');
const {createTask, updateTask, getTasks} = require('../controllers/taskController');
const {authorizeRoles} = require('../middleware/roleMiddleware');
const {getAllUsers} = require('../controllers/authController');



router.post('/register',
    [body('name').notEmpty().withMessage('Name is required'),
     body('email').isEmail().withMessage('Valid email is required'),
     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],
     register
);
router.post('/login',[body('email').isEmail().withMessage('Valid Email is required'), 
    body('password').notEmpty().withMessage('Password is required')],login);


    router.post('/logout',authMiddleware,(req,res)=>{
    res.status(200).json({message:"Logout successful"});
});

router.post('/create',authMiddleware,[body('title').notEmpty().withMessage("title is required"),
    body('description').notEmpty().withMessage("Description is required")],createTask);

    router.put('/update/:id',authMiddleware,
    [body('title').notEmpty().withMessage("Title is required"),
        body('description').notEmpty().withMessage("Description is required")],updateTask
    
)

router.get('/get',authMiddleware,authorizeRoles('admin'),getAllUsers);
router.get('/tasks',authMiddleware,getTasks);


module.exports = router;