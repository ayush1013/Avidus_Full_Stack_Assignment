import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../Redux/ProductsReducer/action";
import { Link, useLocation } from "react-router-dom";

const ProductsList = ({ page }) => {
  const data = useSelector((store) => store.productReducer.products.items);
  const dispatch = useDispatch();

  const location = useLocation();
  console.log("Data is", data);

  console.log("search", location.search);

  useEffect(() => {
    if (location || data.length === 0) {
      dispatch(getData(location.search));
    }
  }, [location.search]);

  return (
    <Grid
      m="auto"
      mt={{ base: "20px", md: "30px", lg: "40px" }}
      // ml={{ md: "30px", lg: "40px" }}
      gridTemplateColumns={{
        base: "repeat(2,1fr)",
        md: "repeat(3,1fr)",
        lg: "repeat(4,1fr)",
      }}
      w={{ base: "100%", md: "100%", lg: "100%" }}
      // border="1px solid black"
      gap={{ base: "20px", md: "25px", lg: "30" }}
      bgColor={"white"}
      p="20px"
    >
      {data?.map((elem) => {
        return (
          <Box
            key={elem._id}
            // border="1px solid black"
            p="5px"
          >
            <Link to={`/product/${elem._id}`}>
              <Image
                src={elem.image}
                h={{ base: "150px", md: "200px", lg: "200px" }}
                m="auto"
              />
            </Link>
            <Box
              mt={"5px"}
              // border={"1px solid black"}
              // h={{ md: "", lg: "100px" }}
              textAlign={"left"}
            >
              <Link to={`/product/${elem._id}`}>
              <Text
                fontSize={{ base: "16px", md: "18px", lg: "18px" }}
                fontWeight={{ base: "500", md: "bold", lg: "bold" }}
                h={{base:"23px",md:"30px",lg:"30px"}}
                overflow={"hidden"}
              >
                {elem.title}
              </Text>
              </Link>
              <Text color="#A1A4A7" fontSize="14px" h="20px" overflow={"hidden"} >{elem.description}</Text>
              <Text
                fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                fontWeight={{ base: "500", md: "500", lg: "500" }}
              >
                <span style={{color:"blue"}} > Location : </span> {elem.location}
              </Text>
              <Text
                fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                fontWeight={{ base: "500", md: "500", lg: "500" }}
              >
                <span style={{color:"blue"}} > Size : </span> {elem.size}m
              </Text>
              <Text
                fontSize={{ base: "14px", md: "16px", lg: "16px" }}
                color={"green"}
                fontWeight={{ base: "500", md: "bold", lg: "bold" }}
              >
                ${elem.price_perNight}
              </Text>
            </Box>
            <Button
              m="auto"
              display={"block"}
              bgGradient="linear(to-l, #0000F7, #6363F7, #0000F7)"
              w="75%"
              h={{base:"25px", md:"40px",lg:"40px" }}
              mt="5px"
              _hover={{ opacity: 0.7 }}
              _focus={{ outline: "none" }}
              borderRadius={{base:"5px",md:"10px",lg:"10px"}}
              // borderBottomRadius={{base:"none",md:"none",lg:"none"}}
              color="white"
              fontSize={{ base: "13px", md: "16px", lg: "18px" }}
            >
              Book Now
            </Button>
          </Box>
        );
      })}
    </Grid>
  );
};

export default ProductsList;
