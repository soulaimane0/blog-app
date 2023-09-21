import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { body } from 'express-validator';
import { Strategy as LocalStrategy } from 'passport-local';
import {
  logOutUser,
  loginUser,
  registerNewUser,
  renderLoginPage,
  renderRegisterPage,
} from '../controllers/authController.js';

const jsonFilePath = '../data.json';
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, jsonFilePath);

const getJsonData = () => {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return data;
};

const getUserByEmail = (email) => {
  const users = getJsonData().users;
  return users.find((u) => u.email === email);
};

const getUserById = (id) => {
  const users = getJsonData().users;
  return users.find((u) => u.id === id);
};

const initializePassport = (passport) => {
  const authUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (!user) {
      return done(null, false, { message: 'No user with that email!' });
    }

    try {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) return done(null, user);
      else {
        return done(null, false, { message: 'Password incorrect!' });
      }
    } catch (err) {
      done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};

router.get('/register', checkNotAuthenticated, renderRegisterPage);

router.post(
  '/register',
  [body('password').isLength({ min: 8 })],
  registerNewUser
);

router.get('/login', checkNotAuthenticated, renderLoginPage);

router.post('/login', checkNotAuthenticated, loginUser);

router.get('/logout', logOutUser);

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/blogs');
  }

  next();
}

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/auth/login');
}

const userRouter = router;
export {
  userRouter,
  initializePassport,
  checkNotAuthenticated,
  checkAuthenticated,
};
