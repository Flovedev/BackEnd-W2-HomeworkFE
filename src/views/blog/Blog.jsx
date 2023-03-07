import React, { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const { id } = params;
    const blog = posts.find((post) => post._id.toString() === id);

    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div class="py-5 blog-content">
            <p>
              We're thrilled to announce we're teaming up with{" "}
              <a href="https://getmimo.com/">Mimo</a> to launch our next Web
              Engineering program starting on February 1, 2021.
            </p>
            <p>
              Mimo is the most popular code-learning app, helping millions of
              learners make their first steps with programming.
            </p>
            <p>
              Since the first time we talked, we realised we have been in fact
              working in the very same direction: democratising access to become
              a software engineer.
            </p>
            <p>
              We're now teaming up to help those in their community that have
              realised they truly love programming and aspire to become
              professionals - able to work as software engineers and transform a
              hobby and passion in their profession.
            </p>
            <p>
              Democratising access to opportunity - either by making it simple
              to move the first steps and explore the world of programming as
              Mimo does, or by helping people go pro as we do at Epicode - is
              what makes both teams excited.
            </p>
            <ul>
              <li>
                Download Mimo for{" "}
                <a href="https://itunes.apple.com/us/app/mimo-learn-how-to-code-through/id1133960732?mt=8&amp;at=1000lpyT">
                  iOS
                </a>{" "}
                or{" "}
                <a href="https://play.google.com/store/apps/details?id=com.getmimo">
                  Android
                </a>{" "}
                here.
              </li>
              <li>
                <a href="https://strive.school/">Apply here</a> to our next Web
                Engineering cohort.
              </li>
            </ul>
          </div>
          <a href={`http://localhost:3001/blogPosts/download/${blog._id}/pdf`}>
            <Button variant="secondary">Download.pdf</Button>
          </a>
        </Container>
      </div>
    );
  }
};

export default Blog;
