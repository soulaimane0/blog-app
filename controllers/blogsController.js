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
    console.log('destination: ', file);
    cb(null, imagesFilePath);
  },
  filename: (req, file, cb) => {
    console.log('file name: ', file);
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

    console.log('file: ', req.file.filename);
    logger.info('New Blog Article Created Successfully!');

    res.redirect(`/blogs/${blog.id}`);
  } catch (err) {
    logger.error(err);
    const { name } = req.user;
    res.render('blogs/newBlog', { name, blog });
  }
};

export const showNewBlog = (req, res) => {
  const { name } = req.user;

  res.render('blogs/newBlog', { name, blog: {} });
};

export const showBlogs = (req, res) => {
  const { name } = req.user;
  const blogs = getAllJsonData().blogs;
  const sortedBlogs = _.orderBy(blogs, ['createdAt'], ['desc']);

  res.render('blogs/blogs', {
    name,
    blogs: sortedBlogs,
    authenticatedUserId: req.user.id,
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

  res.render('blogs/editBlog', { name, blog });
};

export const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, description, markdown } = req.body;
  const data = getAllJsonData();
  const blog = data.blogs.find((b) => b.id === id);

  if (!blog) return res.redirect('/blogs');

  blog.title = title;
  blog.description = description;
  blog.markdown = markdown;
  blog.image = req.file.filename;

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
  res.render('blogs/blog', { name, blog, authenticatedUserId: req.user.id });
};
