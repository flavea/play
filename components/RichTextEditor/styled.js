import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;

  .uk-dropdown {
    padding: 0px !important;

    .uk-button-default {
      border: none;
    }
  }

  .uk-button {
    padding: 0 10px !important;
    margin-right: 10px;
  }

  .uk-button-default {
    &:hover {
      background: #f5f5f5;
    }
  }

  .editor {
    height: 70vh;
    overflow: auto;
    padding-right: 10px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
  }

  .toolbar {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
    width: 100%;
  }

  .image-delete-button {
    top: 10px;
    left: 10px;
  }
`
