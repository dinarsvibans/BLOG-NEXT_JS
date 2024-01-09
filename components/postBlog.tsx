'use client';
import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../node_modules/react-quill/dist/quill.snow.css';
import styles from './postBlog.module.css';
import secondStyle from '../src/app/page.module.css';

const PostBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [errorr, setErrorr] = useState('');

  const handleBlogPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !content || !author || !category) {
      setErrorr('All fields are required');
      return;
    }

    try {
      const responseBlog = await fetch('api/createBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author,
          category,
          image,
        }),
      });

      if (!responseBlog.ok) {
        throw new Error('Failed to post blog');
      }

      setAuthor('');
      setCategory('');
      setContent('');
      setTitle('');
      setImage('');
      setErrorr('');
    } catch (error) {
      console.error('Error posting blog:', error);
      setErrorr('Failed to post blog. Please try again.');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target?.result as string;
        setImage(dataURL);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Create your blog</h1>
      <form onSubmit={handleBlogPost}>
        <div className={styles.formDiv}>
          <label htmlFor="category">Select category of tour blog</label>
          <select
            className={styles.inputElement}
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fashion">Fashion</option>
            <option value="Finance">Finance</option>
            <option value="Health And Fitness">Health and Fitness</option>
            <option value="Book Reviews">Book Reviews</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Diy And Crafts">Diy and Crafts</option>
          </select>
          <label htmlFor="title">Title:</label>
          <input
            className={styles.inputElement}
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="author">Author:</label>
          <input
            className={styles.inputElement}
            type="text"
            id="author"
            placeholder="Author..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <label htmlFor="picture">Add main picture</label>
          <input
            className={styles.inputElement}
            id="picture"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleFileChange}
          />
      <ReactQuill
            className={`${styles.ReactQuill} ${styles.centeredText}`}
            value={content}
            onChange={(value) => setContent(value)}
            placeholder="Write your blog"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['blockquote', 'code-block'],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                ['link', 'image', 'video'],
                [{ color: [] }, { background: [] }],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold', 'italic', 'underline', 'strike',
              'list', 'bullet', 'blockquote', 'code-block',
              'script', 'indent', 'direction', 'size',
              'link', 'image', 'video',
              'color', 'background',
            ]}
          />

          <button className={styles.submit} type="submit">
            Submit
          </button>

          <div>{errorr}</div>
        </div>
      </form>
    </div>
  );
};

export default PostBlog;
