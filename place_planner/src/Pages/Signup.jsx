import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { userSignup } from "../Redux/UserReducer/action";

const data = {
  name: "",
  age: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [userData, setUserData] = useState(data);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  console.log(userData);

  const handleSignup = (e) => {
    e.preventDefault();
    if (userData.email && userData.name && userData.password && userData.age) {
      userSignup(userData).then((res)=>navigate("/login"));
    } else {
      alert("Please fill all the required fields");
    }
  };

  return (
    <Box
      w="400px"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      p="20px"
      m="auto"
      mt="50px"
    >
      <Heading textAlign={"center"} mb="20px">
        Signup
      </Heading>
      <form onSubmit={handleSignup}>
        <Input
          name="name"
          type="text"
          placeholder="Name"
          mb="20px"
          value={userData.name}
          onChange={handleChange}
        />
        <Input
          name="age"
          type="Number"
          placeholder="Age"
          mb="20px"
          value={userData.age}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          mb="20px"
          value={userData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          mb="20px"
          value={userData.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          m="auto"
          display={"block"}
          bgGradient="linear(to-l, #0000F7, #6363F7, #0000F7)"
          w="75%"
          h={{ base: "25px", md: "40px", lg: "40px" }}
          mt="5px"
          _hover={{ opacity: 0.7 }}
          _focus={{ outline: "none" }}
          borderRadius={{ base: "5px", md: "10px", lg: "10px" }}
          // borderBottomRadius={{base:"none",md:"none",lg:"none"}}
          color="white"
          fontSize={{ base: "13px", md: "16px", lg: "18px" }}
        >
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
