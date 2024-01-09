import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import connectMongoDb from '../lib/mongodb';
import Blog from '../models/blogs';
import RealtiveTime from './relativeTime';

interface Blog {
  title: string;
  author: string;
  content: string;
  category: string[];
  createdAt: string;
  image: string;
  _id: string;
}

const AllBlogsRender = () => {
  const [originalBlogs, setOriginalBlogs] = useState<Blog[]>([]); // Keep the original list
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  console.log('originalBlogs', originalBlogs);
  console.log('blogs', blogs);
  console.log('selectedCategory', selectedCategory);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/createBlog', {
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('failed to fetch blogs');
        }

        const data = await res.json();
        setOriginalBlogs(data.blogs);
        setBlogs(data.blogs);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  const sortedBlogsLatest = [...blogs].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateA - dateB;
  });

  const categoryStyles: { [key: string]: string } = {
    Technology: 'Technology',
    Travel: 'Travel',
    Food: 'Food',
    Lifestyle: 'Lifestyle',
    Fashion: 'Fashion',
    Finance: 'Finance',
    'Health And Fitness': 'HealthAndFitness',
    'Book Reviews': 'BookReviews',
    Entertainment: 'Entertainment',
    'Diy And Crafts': 'DiyAndCrafts',
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedCategory = e.target.value;
    if (newSelectedCategory === '') {
      setBlogs(originalBlogs);
    } else {
      const filtered = originalBlogs.filter((blog) =>
        blog.category.includes(newSelectedCategory)
      );
      setBlogs(filtered);
    }
    setSelectedCategory(newSelectedCategory);
  };

  const handleTagChange = (tag: string[]) => {
    const filtered = originalBlogs.filter((blog) =>
      blog.category.includes(tag[0])
    );
    setBlogs(filtered);
    setSelectedCategory(tag[0]);

  };

  return (
    <div className="container">
      <h1 className="blogTitle">Explore the World Through My Lens</h1>
      <div className='sorting'>
      <select className='sorting_sortingButtons' value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">all</option>
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
      <button className='sorting_sortingButtons' onClick={() => setBlogs(sortedBlogs)}>Newest posts</button>
      <button className='sorting_sortingButtons' onClick={() => setBlogs(sortedBlogsLatest)}>Latest posts</button>
      </div>
      <div className="blogContainer">
        {blogs.map((blog: Blog) => (
          <div className="singleBlog" key={blog._id}>
            <div className="image-part">
              <img src={blog.image} alt={blog.title} />
            </div>
            <div className="text-part">
              <h4>{blog.title}</h4>
              <h6>Author: {blog.author}</h6>
              <div
                onClick={() => handleTagChange(blog.category)}
                className={`category ${categoryStyles[blog.category[0]]}`}

              >
                {blog.category}
              </div>

              <div className="Singlelink">
                <Link href={`/singlePost/${blog._id}`}>
                  <button className="readMoreButton">Read more</button>
                </Link>
              </div>
              <p>Posted {RealtiveTime(new Date(blog.createdAt))}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogsRender;
