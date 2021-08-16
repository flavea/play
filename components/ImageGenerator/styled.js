import styled from 'styled-components'

export const Container = styled.section`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 0.5fr 1.5fr;
  grid-template-rows: 1fr;
  grid-template-areas: '. .';
  width: 100%;
  height: 100%;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 0.75fr 1.25fr;
  }
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
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  img {
    max-width: 100%;
    display: block;
  }

  .border {
    display: flex;

    @media only screen and (max-width: 1024px) {
      display: block;
    }
  }

  .small-input {
    width: 90px;
  }
`
