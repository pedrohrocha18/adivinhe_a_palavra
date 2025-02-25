import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
  background-color: #dbdb00;
  border: 2px solid #008cff;
  border-radius: 10px;
  color: #014696;
  cursor: pointer;
  font-weight: bold;
  height: 45px;
  width: 150px;

  &:hover {
    background-color: #cfcf02;
    transition: 0.4s;
  }
`;

const Button = ({ description, onClick }) => {
  return <ButtonComponent onClick={onClick}>{description}</ButtonComponent>;
};

export default Button;
