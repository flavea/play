import styled from 'styled-components'

export const CustomModal = styled.div`
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;

  #modal {
    width: 80%;
    height: 80%;
    background: #fff;
    overflow: auto;
  }
`
