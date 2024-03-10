import { useContext, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Title from "../components/Shared/Title";
import Form from "react-bootstrap/Form";
import { Button, Link, toast } from "../imports";
import { getError } from "../utils";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { USER_SIGNIN } from "../actions";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate(); 
  const {state, dispatch: ctxDispatch } = useContext(Store);
  const{search} = useLocation();
  const redirectUrl= new URLSearchParams(search);
  const redirectValue=redirectUrl.get("redirect");
  const redirect =redirectValue ? redirectValue : "/";

  

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password== confirmedPassword){
    try {
      const { data } = await axios.post("/api/v1/users/signup", {
        email: email,
        password: password,
        name: name
      });
      ctxDispatch({ type: USER_SIGNIN, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error));
    }}else{
      toast.error("Passwords must match!", {
        autoClose: 1200
    });
    
    }
  };
  return (
    <Container className="small-container">
      <Title title="SignUp Page" />
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
          <Form.Label>name:</Form.Label>
          <Form.Control
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmedPassword(e.target.value)}
            placeholder="Enter Password"
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
        
      </Form>
    </Container>
  );
};

export default SignUp;
