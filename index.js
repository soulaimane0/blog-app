import express from 'express';
import dotenv from 'dotenv';
import { userRouter, initializePassport } from './routes/auth.js';
import { blogRouter } from './routes/blogs.js';
import passport from 'passport';
import session from 'express-session';
import flash from 'express-flash';
import methodOverride from 'method-override';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4001;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.set('view engine', 'ejs');
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

initializePassport(passport);

app.get('/', (req, res) => {
  res.render('home', {
    isAuthenticated: req.isAuthenticated(),
    name: req.user?.name,
  });
});

app.use('/auth', userRouter);
app.use('/blogs', blogRouter);

app.listen(PORT, () => {
  console.log(`It's live on http://localhost:${PORT}/`);
});
