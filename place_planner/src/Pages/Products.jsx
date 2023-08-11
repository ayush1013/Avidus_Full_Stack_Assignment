import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import ProductsList from "../Components/ProductsList";
import { useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Products = () => {
  const { currentPage, totalPages } = useSelector(
    (store) => store.productReducer.products
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = searchParams.get("page");

  const [page, setPage] = useState(initialPage || 1);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Box>
      <Navbar />
      <ProductsList page={page} />
    </Box>
  );
};

export default Products;
