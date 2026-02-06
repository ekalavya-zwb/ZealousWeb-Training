import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: lightgreen;
  width: ${(props) =>
    props.large ? "200px" : props.small ? "100px" : "150px"};
  height: ${(props) =>
    props.large ? "200px" : props.small ? "100px" : "150px"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: 1px solid #666666;
`;

export default Container;
