import { body, validationResult } from 'express-validator'
import { addUser, getUser } from '../db/queries.js'

const nameValidationChain = () =>
    body('name').trim()
    .notEmpty().withMessage('Enter a valid name')

const emailValidationChain = () =>
    body('email').trim()
    .notEmpty().withMessage('Enter an email here')
    .isEmail().withMessage('Enter an valid email')
    .custom( async (value) => {
        const user = await getUser({email: value})
        if (user) {
            throw new Error('E-mail already in use');
        }
    })

const passwordValidationChain = () => 
    body('password').trim()
    .notEmpty().withMessage('Enter a password')
    .isLength({max: 30, min: 8}).withMessage('Password must be between 8 to 30 characters')

const confirmPWValidationChain = () => 
    body('confirmPassword').trim()
    .custom((value, {req}) => {
        return value === req.body.password
    }).withMessage('Password is not matching')


export const getSignup = (req, res) => {
    try {
        res.render('pages/sign-up');
    } catch (error) {
        console.error(error);
    }
}

export const postSignup = [
    nameValidationChain(),
    emailValidationChain(),
    passwordValidationChain(),
    confirmPWValidationChain(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            const { name, email, password } = req.body;
            if (!result.isEmpty()) {
                return res.render('pages/sign-up', {
                    name: name,
                    email: email,
                    errors: result.array()
                })
            }
            await addUser(name, email, password)
            res.redirect('/login')
        } catch (error) {
            console.error(error)
        }
    }
]