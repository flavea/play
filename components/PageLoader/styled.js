import styled from 'styled-components'

export const Loader = styled.section`
  background: rgba(255, 255, 255, 0.8);
  @keyframes loader-inner-o {
    0% {
      opacity: 1;
      transform: translate(0 0);
    }
    49.99% {
      opacity: 1;
      transform: translate(120px, 0);
    }
    50% {
      opacity: 0;
      transform: translate(120px, 0);
    }
    100% {
      opacity: 0;
      transform: translate(0, 0);
    }
  }
  @keyframes loader-inner {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(120px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  .loader-inner div {
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    top: 90px;
    left: 30px;
  }
  .loader-inner div:nth-child(1) {
    background: #1d3f72;
    animation: loader-inner 1s linear infinite;
    animation-delay: -0.5s;
  }
  .loader-inner div:nth-child(2) {
    background: #5699d2;
    animation: loader-inner 1s linear infinite;
    animation-delay: 0s;
  }
  .loader-inner div:nth-child(3) {
    background: #1d3f72;
    animation: loader-inner-o 1s linear infinite;
    animation-delay: -0.5s;
  }
  .loader {
    width: 300px;
    height: 300px;
    display: inline-block;
    overflow: hidden;
  }
  .loader-inner {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */
  }
  .loader-inner div {
    box-sizing: content-box;
  }
`
