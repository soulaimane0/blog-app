import bcrypt from 'bcrypt';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { validationResult } from 'express-validator';
import passport from 'passport';
import logger from './logger.js';

const jsonFilePath = '../data.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, jsonFilePath);

const getJsonData = () => {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return data;
};

const addNewUser = (user) => {
  try {
    // Read the existing data
    const data = getJsonData();
    // add the user data to the users array
    data.users.push(user);

    // Update the json file with the new user added
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    logger.info('User Added successfully!');
  } catch (err) {
    logger.error('Error while adding user: ', err);
  }
};

export const renderRegisterPage = (req, res) => {
  res.render('auth/register', { showError: false, t: req.t });
};

export const registerNewUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.render('auth/register', {
      showError: true,
      errorMessage: 'The password must be at least 8 characters long!',
      t: req.t,
    });
  }

  let id = Date.now().toString();
  const { name, email } = req.body;
  const password = encodedHTML(req.body.password);
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id,
    name: encodedHTML(name),
    email: encodedHTML(email),
    password: hashedPassword,
  };

  addNewUser(newUser);
  logger.info('User Registered successfully!');
  res.redirect('/auth/login');
};

export const renderLoginPage = (req, res) => {
  res.render('auth/login', { t: req.t });
};

export const loginUser = passport.authenticate('local', {
  successRedirect: '/blogs',
  failureRedirect: '/auth/login',
  failureFlash: true,
});

export const logOutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    logger.info('User logged out successfully!');
    res.redirect('/auth/login');
  });
};

function encodedHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
