import React from "react";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import Button from "../Button";
import CartItem from "./CartItem";
import { closeCart } from "../../state/actions";
import { cartClosed } from "../../state/cartActive/cartActiveSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const cartActive = useSelector((state) => state.cartActive);
  const dispatch = useDispatch();

  // const sumTotal = () => {
  //   return cart
  //     ?.reduce(
  //       (total, cartItem) => total + cartItem.price * cartItem.quantity,
  //       0
  //     )
  //     .toFixed(2);
  // };

  const cartItems = [];
  cart.map((cartItem) => (
    <CartItem
      key={uuidv4()}
      id={cartItem.id}
      title={cartItem.title}
      price={cartItem.price}
      image={cartItem.image}
      quantity={cartItem.quantity}
    ></CartItem>
  ));

  return (
    <>
      <CartWrapper isOpen={cartActive}>
        <Title>Your shopping cart</Title>
        <Products>{cartItems}</Products>
        <Total>Total: ${}</Total>
        <Button
          content="Checkout"
          size="wide"
          color="primary"
          animation="color"
        />
        <Button
          // onClick={() => cartClosed()}
          onClick={() => dispatch(cartClosed())}
          content="Close"
          size="wide"
          color="red"
          animation="color"
        />
      </CartWrapper>
      <Overlay onClick={() => dispatch(cartClosed())} isOpen={cartActive} />
    </>
  );
};

const CartWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: -110%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  width: 59rem;
  height: 100%;
  padding: 6rem;
  background-color: #fff;
  font-size: 3rem;
  transition: right 0.85s ease-in-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      right: 0;
    `}
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 4rem;
  font-weight: bold;
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  overflow: auto;
`;

const Total = styled.div`
  font-weight: bold;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.6;
  transition: left 0.85s ease-in-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      left: 0;
    `}
`;

export default Cart;
