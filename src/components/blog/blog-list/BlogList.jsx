import { React, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import posts from "../../../data/posts.json";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [datas, setDatas] = useState();

  const fetchFromApi = async () => {
    try {
      const baseUrl = process.env.REACT_APP_BE_URL;
      let res = await fetch(baseUrl + "/blogPosts");
      let data = await res.json();
      setDatas(data);
      console.log(data);
      console.log(baseUrl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFromApi();
  }, []);

  return datas ? (
    <Row>
      {datas.map((post, i) => (
        <Col
          md={4}
          style={{
            marginBottom: 50,
          }}
          key={i}
        >
          <BlogItem {...post} />
        </Col>
      ))}
    </Row>
  ) : (
    ""
  );
};

export default BlogList;
