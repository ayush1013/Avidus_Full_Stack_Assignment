import { Box, Flex, Image, Select, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSize = searchParams.get("size");
  const [size, setSize] = useState(initialSize || "");

  const initialLocation = searchParams.get("location");
  const [location, setLocation] = useState(initialLocation || "");

  const initialPrice = searchParams.get("maxPrice");
  const [price, setPrice] = useState(initialPrice || "");

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSearch = () => {
    let params = {};
    size && (params.size = size);
    location && (params.location = location);
    price && (params.maxPrice = price);
    setSearchParams(params);
    console.log("searchParams :", searchParams);
  };

  console.log("location :", location, price, size);

  return (
    <Flex
      w="100%"
      h="80px"
      alignItems={"center"}
      p="10px 50px"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <Image src="placeplannerlogo.jpeg" w="80px" />

      <Flex
        border="1px solid #56453D"
        borderRadius={"25px"}
        m="auto"
        w="450px"
        h="50px"
        fontSize={"18px"}
        fontWeight={"500"}
        color="#56453D"
        justifyContent={"space-around"}
        textAlign={"center"}
        alignItems={"center"}
        pr="10px"
      >
        <Select
          p="10px"
          border="0px"
          focusBorderColor="white"
          w="150px"
          value={location}
          onChange={handleLocation}
        >
          <option value="">AnyWhere</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="Europe">Europe</option>
          <option value="China">China</option>
          <option value="Russia">Russia</option>
          <option value="Japan">Japan</option>
          <option value="Singapore">Singapore</option>
          <option value="Dubai">Dubai</option>
        </Select>
        <Select
          border={"0px solid grey"}
          borderRight={"1px solid grey"}
          borderLeft={"1px solid grey"}
          borderRadius={"0px"}
          focusBorderColor="white"
          w="80px"
          value={price}
          onChange={handlePrice}
        >
          <option value="">All</option>
          <option value="100">Under $100 </option>
          <option value="200">Under $200</option>
          <option value="300">Under $300</option>
          <option value="400">Under $400</option>
          <option value="500">Under $500</option>
          <option value="1000">Under $1000 </option>
        </Select>
        <Select
          p="10px"
          w="150px"
          border="0px"
          focusBorderColor="white"
          value={size}
          onChange={handleSize}
        >
          <option value="">All Sizes</option>
          <option value="200">Up to 200m </option>
          <option value="300">Up to 300m</option>
          <option value="400">Up to 400m</option>
          <option value="500">Up to 500m</option>
          <option value="1000">Up to 1000m</option>
        </Select>
        <Image
          src="https://img.icons8.com/?size=512&id=132&format=png"
          w="30px"
          cursor={"pointer"}
          onClick={handleSearch}
        />
      </Flex>

      <Image
        src="https://img.icons8.com/?size=512&id=98957&format=png"
        w="50px"
      />
      <Flex gap="5px">
        <Link to="/login">
          <Text>Login</Text>
        </Link>
        <Text>/</Text>
        <Link to="/signup" >
          <Text>Signup</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
