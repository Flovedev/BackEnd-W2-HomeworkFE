import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
const NewBlogPost = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState(null);

  const [blog, setBlog] = useState({
    category: "Category1",
    title: "",
    cover: "",
    readTime: {
      value: 1,
      unit: "minute",
    },
    author: {
      name: "Flo",
      avatar: "https://picsum.photos/800/400",
    },
    content:
      "<div class='py-5 blog-content'><p>We're thrilled to announce we're teaming up with <a href='https://getmimo.com/'>Mimo</a> to launch our next Web Engineering program starting on February 1, 2021.</p><p>Mimo is the most popular code-learning app, helping millions of learners make their first steps with programming.</p><p>Since the first time we talked, we realised we have been in fact working in the very same direction: democratising access to become a software engineer.</p><p>We're now teaming up to help those in their community that have realised they truly love programming and aspire to become professionals - able to work as software engineers and transform a hobby and passion in their profession.</p><p>Democratising access to opportunity - either by making it simple to move the first steps and explore the world of programming as Mimo does, or by helping people go pro as we do at Epicode - is what makes both teams excited.</p><ul><li>Download Mimo for <a href='https://itunes.apple.com/us/app/mimo-learn-how-to-code-through/id1133960732?mt=8&amp;at=1000lpyT'>iOS</a> or <a href='https://play.google.com/store/apps/details?id=com.getmimo'>Android</a> here.</li><li><a href='https://strive.school/'>Apply here</a> to our next Web Engineering cohort.</li></ul></div>",
  });

  const postBlog = async (e) => {
    let options = {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      let res = await fetch("http://localhost:3001/blogs", options);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setHTML(html);
  }, [editorState]);
  return (
    <Container className="new-blog-container">
      <Form className="mt-5">
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={blog.title}
            onChange={(e) =>
              setBlog({
                ...setBlog,
                title: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control size="lg" as="select">
            <option>Category1</option>
            <option>Category2</option>
            <option>Category3</option>
            <option>Category4</option>
            <option>Category5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
          />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
            onClick={() => {
              postBlog(blog);
            }}
          >
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
