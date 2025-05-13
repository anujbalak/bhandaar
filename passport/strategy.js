import bcrypt from 'bcryptjs';
import pkg from 'passport-local'
import { getUser } from "../db/queries.js";

const LocalStrategy = pkg.Strategy;

const local = new LocalStrategy(
    {usernameField: 'email'}, 
    async (email, password, done) => {
        try {
            const user = await getUser({email});

            if (!user) {
                return done(null, false, {message: 'User does not exists'});
            }
            const hashedPassword = await bcrypt.compare(password, user.password)

            if (!hashedPassword) {
                return done(null, false, {message: 'Incorrect email or password'})
            }

            done(null, user);
        } catch (error) {
            return done(error);
        }
    }
)

export default local;