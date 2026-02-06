import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => (props.danger ? "firebrick" : "mediumpurple")};
  color: white;
  padding: 8px 16px;
  font-size: 1.5rem;
  border: 1px solid #666666;
  border-radius: 3px;
  width: 110px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c23232" : "#a380e8")};
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default Button;
