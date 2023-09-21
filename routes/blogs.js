import express from 'express';
import { checkAuthenticated } from './auth.js';
import {
  createBlog,
  deleteBlog,
  showBlog,
  showBlogs,
  showNewBlog,
  showUpdateBlog,
  updateBlog,
  upload,
} from '../controllers/blogsController.js';

const router = express.Router();

router.get('/new', checkAuthenticated, showNewBlog);

router.post('/new', checkAuthenticated, upload.single('image'), createBlog);

router.get('/', checkAuthenticated, showBlogs);

router.delete('/delete/:id', checkAuthenticated, deleteBlog);

router.get('/edit/:id', checkAuthenticated, showUpdateBlog);

router.put('/edit/:id', checkAuthenticated, upload.single('image'), updateBlog);

router.get('/:id', checkAuthenticated, showBlog);

const blogRouter = router;
export { blogRouter };
