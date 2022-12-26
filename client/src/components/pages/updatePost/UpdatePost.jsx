import React from "react";
import { useParams } from "react-router-dom";
import { getPostDetails, updatePostDetails } from "../../../service/PostsService";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const UpdatePost = () => {
  const [post, setPost] = useState();
  const [formInputs, setFormInputs] = useState({
    category: "",
    date: "",
    title: "",
    image: "",
    subject: "",
  });
  let id = useParams().id;

  console.log(id);

  useEffect(() => {
    getPostDetails(id).then((res) => {
      setFormInputs({
        category: res.post.category,
        date: res.post.date,
        title: res.post.title,
        image: res.post.image,
        subject: res.post.description,
      });
      setPost(res.post);
    });
  }, []);

  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const formHandel = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    console.log(formInputs);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError(validateForm(formInputs));
    setIsSubmit(true);
    updatePostDetails(formInputs,id).then((res)=>console.log(res))
  };
  const validateForm = (value) => {
    const eror = {};
    if (!value.category) {
      eror.category = "category required";
    }

    if (!value.image) {
      eror.image = "image required";
    }
    if (!value.subject) {
      eror.subject = "subject required";
    }
    if (!value.title) {
      eror.title = "title required";
    }
  
    return eror;
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      setTimeout(() => {
        navigate("/posts");
      }, 2000);
      console.log(error);
    }
  }, [error]);

  return (
    <div className=" update p-5" style={{background:"rgba(71,63,88,255)"}}>
      <span className="newpostTitile">
        {" "}
        <h2 className="p-3" style={{color:"rgba(59,177,153,255)"}}>
          Update your post <TfiWrite color="rgba(59,177,153,255)" size={80} />
        </h2>{" "}
      </span>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Category</Form.Label>
          <Form.Control
            className="input"
            type="text"
            name="category"
            placeholder="java scrip ,css or HTML"
            onChange={(e) => formHandel(e)}
            value={formInputs.category}
          />
        </Form.Group>
        <span className="text-danger">{error.category}</span>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>title</Form.Label>
          <Form.Control
            className="input"
            type="text"
            name="title"
            placeholder="title of the post"
            onChange={(e) => formHandel(e)}
            value={formInputs.title}
          />
        </Form.Group>
        <span className="text-danger">{error.title}</span>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>image url</Form.Label>
          <Form.Control
            className="input"
            type="text"
            name="image"
            placeholder="subject image"
            onChange={(e) => formHandel(e)}
            value={formInputs.image}
          />
        </Form.Group>
        <span className="text-danger">{error.image}</span>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Subject </Form.Label>
          <Form.Control
            as="textarea"
            name="subject"
            onChange={(e) => formHandel(e)}
            rows={3}
            value={formInputs.subject}
          />
        </Form.Group>
        <span className="text-danger">{error.subject}</span>

        <Button className="rounded-5 w-100" style={{background:"rgba(59,177,153,255)"}} onClick={(e) => submitForm(e)}>
          update post
        </Button>
      </Form>
      <div className="d-flex justify-content-center">
        {Object.keys(error).length == 0 && isSubmit ? (
          <img
            className="w-25"
            src="https://windrosegdansk.pl/common/images/web5Busy.gif"
            alt=""
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
