'use client';
import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import styles from './page.module.css';
import React, { useEffect, useState } from 'react';
import RealtiveTime from '../../../../components/relativeTime';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';


interface SinglePostProps {
  params: {
    id: string;
  };
}

const getSingleTopic = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    const { blogContent } = await res.json();
    return blogContent;
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch data' };
  }
};

const SinglePost: React.FC<SinglePostProps> = ({ params }) => {
 
  const router = useRouter()

  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [error, setErrorr] = useState('');

  const [blogState, setBlogState] = useState<any>(null);

  const [commentState, setCommentState] = useState<any[]>([]);
  const [editState, setEditState] = useState(false);

  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editPicture, setEditPicture] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');

  console.log('editTitle', editTitle);
  console.log('editAuthor', editAuthor);
  console.log('editPicture', editPicture);
  console.log('editContent', editContent);
  console.log('editCategory', editCategory);

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/commentId/${id}`);

        if (!res.ok) {
          throw new Error('Failed to fetch comments');
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch comments. Status: ${res.status}`);
        }
        const { comments } = await res.json();

        setCommentState(comments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const blogContent = await getSingleTopic(id);
      setBlogState(blogContent);
    };
    fetchData();
  }, [id]);

  if (!blogState) {
    return <div>Loading...</div>;
  }

  const handleBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText || !commentAuthor || !blogState._id) {
      setErrorr('All fields are required');
      return;
    }

    try {
      const responseComment = await fetch('http://localhost:3000/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: commentText,
          author: commentAuthor,
          blog: blogState._id,
        }),
      });

      if (!responseComment.ok) {
        throw new Error('Failed to post comment');
      }
      setCommentState((prev) => [
        ...prev,
        {
          author: commentAuthor,
          text: commentText,
        },
      ]);
      setCommentText('');
      setCommentAuthor('');
    } catch (error) {
      console.error('Error posting comment:', error);
      setErrorr('Failed to post comment. Please try again.');
    }
  };

  const { title, author, content, category, createdAt, image } = blogState;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target?.result as string;
        setEditPicture(dataURL);
      };

      reader.readAsDataURL(file);
    }
  };


  const handlePostEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          author: editAuthor,
          image: editPicture,
          content: editContent,
          category: editCategory,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }

      const updatedBlogContent = await getSingleTopic(id);
      setBlogState(updatedBlogContent);
      setEditState(false);
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog post');
      }

      router.push('/');
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  
  return (
    <div className="container">
      <div className={styles.singlePostImg}>
        <img src={image} alt={title} />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <h2>Writne by: {author}</h2>
      <p dangerouslySetInnerHTML={{ __html: content }} />
<hr />
      <button
      className={styles.editButton}
        onClick={() => {
          setEditState(true);
          setEditTitle(title);
          setEditAuthor(author);
          setEditPicture(image);
          setEditContent(content);
        }}
      >
        Edit blog Post
      </button>

      {editState && (
        <div>
          <form className={styles.blogEditForm} onSubmit={handlePostEdit}>
            <label htmlFor="title">Title:</label>
            <input
              onChange={(e) => setEditTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Title"
              value={editTitle}
            />
            <label htmlFor="author">Author:</label>
            <input
              onChange={(e) => setEditAuthor(e.target.value)}
              type="text"
              id="author"
              placeholder="Author..."
              value={editAuthor}
            />
            <select
              id="category"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Fashion">Fashion</option>
              <option value="Finance">Finance</option>
              <option value="Health And Fitness">Health and Fitness</option>
              <option value="Book Reviews">Book Reviews</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Diy And Crafts">Diy and Crafts</option>
            </select>
            <label htmlFor="picture">Existing Picture</label>
            <input
              onChange={handleFileChange}
              id="picture"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
            />
            <img
              id="existingPicture"
              src={editPicture}
              alt="Existing Picture"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />

            <ReactQuill
              value={editContent}
              onChange={(value) => setEditContent(value)}
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
                'bold',
                'italic',
                'underline',
                'strike',
                'list',
                'bullet',
                'blockquote',
                'code-block',
                'script',
                'indent',
                'direction',
                'size',
                'link',
                'image',
                'video',
                'color',
                'background',
              ]}
            />
            <div className={styles.buttonFlex}>
            <button className={styles.buttonFlex_button} type="submit">submit</button>
            <button className={styles.buttonFlex_button} onClick={() => setEditState(false)}>cancel</button>
            <button className={styles.buttonFlex_button} onClick={handleDelete }>Delete Post</button>
            </div>
          </form>
       
        </div>
      )}

      <div className={styles.commentContainer}>
        <form className={styles.form} onSubmit={handleBlogPost}>
          <h3>Comment section</h3>
          <hr />
          <div className={styles.inputFlex}>
            <div className={styles.authorSndSubmitWrapper}>
              <input
                className={styles.inputAuthor}
                type="text"
                placeholder="Comment author"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
              />
              <button className={styles.submitButton} type="submit">
                Submit
              </button>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Leave your comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
        </form>
        <div>{error}</div>

        <div className="commentSection">
          {commentState.map((comment, index) => (
            <div className={styles.singleComment} key={index}>
              <div>
                <span className={styles.author}>{comment.author}: </span>
                <span>
                  {comment.createdAt
                    ? `${RealtiveTime(new Date(comment.createdAt))}`
                    : ''}
                </span>
              </div>
              <span className={styles.commentText}>{comment.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
