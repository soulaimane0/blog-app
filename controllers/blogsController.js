import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { marked } from 'marked';
import moment from 'moment/moment.js';
import _ from 'lodash';
import logger from './logger.js';
import multer from 'multer';

const jsonFilePath = '../data.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, jsonFilePath);
const imagesFilePath = path.join(__dirname, '../public/images');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesFilePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload = multer({ storage: storage });

// Get all blogs
const getAllJsonData = () => {
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return data;
};

export const createBlog = (req, res) => {
  // Create new article
  try {
    const { title, description, markdown } = req.body;
    const id = Date.now().toString();
    const data = getAllJsonData();
    const blog = {
      id,
      title,
      createdAt: moment().format('LL'),
      description: description.trim(),
      markdown: markdown.trim(),
      image: req.file.filename,
      userId: req.user.id,
    };
    data.blogs.push(blog);

    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    logger.info('New Blog Article Created Successfully!');

    res.redirect(`/blogs/${blog.id}`);
  } catch (err) {
    logger.error(err);
    const { name } = req.user;
    res.render('blogs/newBlog', { name, blog, t: req.t });
  }
};

export const showNewBlog = (req, res) => {
  const { name } = req.user;

  res.render('blogs/newBlog', { name, blog: {}, t: req.t });
};

export const showBlogs = (req, res) => {
  const { name } = req.user;
  const blogs = getAllJsonData().blogs;
  const sortedBlogs = _.orderBy(blogs, ['createdAt'], ['desc']);

  const createdBy = (userId) => {
    const user = getAllJsonData().users.find((u) => u.id === userId);
    return user.name;
  };

  res.render('blogs/blogs', {
    name,
    blogs: sortedBlogs,
    createdBy,
    authenticatedUserId: req.user.id,
    t: req.t,
  });
};

export const deleteBlog = (req, res) => {
  const { id } = req.params;
  const data = getAllJsonData();
  const blogs = data.blogs.filter((b) => b.id !== id);
  data.blogs = blogs;

  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  logger.info('Blog Article Deleted Successfully!');

  res.redirect('/blogs');
};

export const showUpdateBlog = (req, res) => {
  const { name } = req.user;
  const blogs = getAllJsonData().blogs;
  const blog = blogs.find((b) => b.id === req.params.id);

  if (!blog) return res.redirect('/blogs');

  res.render('blogs/editBlog', { name, blog, t: req.t });
};

export const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, description, markdown } = req.body;
  const data = getAllJsonData();
  const blog = data.blogs.find((b) => b.id === id);

  if (!blog) return res.redirect('/blogs');

  if (req.file) {
    blog.image = req.file.filename;
  }

  blog.title = title;
  blog.description = description.trim();
  blog.markdown = markdown.trim();

  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

  logger.info('Blog Article Updated Successfully!');

  res.redirect(`/blogs/${blog.id}`);
};

export const showBlog = (req, res) => {
  const { name } = req.user;
  const blogs = getAllJsonData().blogs;
  const blog = blogs.find((b) => b.id === req.params.id);

  if (!blog) return res.redirect('/blogs');
  blog.markdown = marked.parse(blog.markdown);
  res.render('blogs/blog', {
    name,
    blog,
    authenticatedUserId: req.user.id,
    t: req.t,
  });
};
