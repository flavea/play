import styled from 'styled-components'

export const Container = styled.section`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  grid-template-areas: '. .';
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  width: 100%;
  height: 100vh;

  .upload-form {
    border: 1px solid #ccc;
    background: #fff;
  }

  input[type='file' i] {
    width: 100%;
    padding: 5px;
  }

  img {
    max-width: 100%;
  }
`
