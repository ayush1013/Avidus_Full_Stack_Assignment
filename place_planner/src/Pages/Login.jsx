import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import { admiLogin } from "../Redux/action";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useSelector((store)=> store.isAuth)
  const isLoading = useSelector((store)=> store.isLoading)
  const navigate = useNavigate()

  console.log(isAuth);
  const dispatch = useDispatch();

  const handleLogin = (e)=>{
    e.preventDefault();
    if (email) {
        const payload = {
            email: email,
            password: password
        }
        // dispatch(admiLogin(payload));
    }
  }

  useEffect(()=>{
    if(isAuth === "QpwL5tke4Pnpja7X4"){
        navigate("/dashboard")
    }else if(isAuth === true){
        navigate("/movies")
    }else{
        // alert("Please enter a valid auth")
    }
  },[isAuth])

  if(isLoading){
    return <Box> Loading... </Box>
  }

  return (
    <Box
      w="400px"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      p="20px"
      m="auto"
      mt="50px"
    >
      <Heading textAlign={"center"} mb="20px">
        Login
      </Heading>
      <form onSubmit={handleLogin} >
        <Input
          type="email"
          placeholder="Email"
          mb="20px"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          mb="20px"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;