import React, { useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/Products/ProductCard";
import { setProducts } from "../state/actions/products";
import { productsReducer } from "../state/reducers/products";
import { useGetProductsQuery } from "../state/apiSlice/apiSlice";

const Products = () => {
  const { data: products, isFetching, isSuccess } = useGetProductsQuery();
  console.log("porddd", products);
  // const products = useSelector((state) => state.products);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (products) {
      filterProducts(products);
    }
    // loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProducts = async () => {
    // dispatch(productsReducer(filterProducts(await fetchProducts())));
  };

  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    return data;
  };

  const filterProducts = (products) => {
    return products.filter(
      (product) =>
        product.category === `men's clothing` ||
        product.category === `women's clothing`
    );
  };

  const productCards = products
    ? products.map((product) => (
        <ProductCard
          key={uuidv4()}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))
    : null;

  return <ProductsWrapper>{productCards}</ProductsWrapper>;
};

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(28rem, 36rem));
    justify-content: center;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 36rem);
  }

  animation: fadeIn ease 2s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default Products;
