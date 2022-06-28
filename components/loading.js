import React from "react";
import styled from "styled-components";
import Navbar from "./navbar";

const Screen = styled.div`
  position: relative;
  height: 50vh;
  width: 100%;
  opacity: 0;
  animation: fade 0.4s ease-in forwards;
  background: #efefef;

  @keyframes fade {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Balls = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .balls {
    width: 4em;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
  }

  .balls div {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background: #ff455a;
  }

  .balls div:nth-of-type(1) {
    transform: translateX(-100%);
    animation: left-swing 0.5s ease-in alternate infinite;
  }

  .balls div:nth-of-type(3) {
    transform: translateX(-95%);
    animation: right-swing 0.5s ease-out alternate infinite;
  }

  @keyframes left-swing {
    50%,
    100% {
      transform: translateX(95%);
    }
  }

  @keyframes right-swing {
    50% {
      transform: translateX(-95%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const Loading = () => {
  return (
    <>
      <Navbar />
      <Screen>
        <Balls>
          <div className="balls">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Balls>
      </Screen>
    </>
  );
};

export default Loading;
