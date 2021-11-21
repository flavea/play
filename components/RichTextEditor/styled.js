import styled from 'styled-components'

export const Container = styled.div`
  width: 90%;
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
    border: 1px solid #e5e5e5;
    height: 80vh;
    overflow: auto;
  }

  .image-delete-button {
    top: 10px;
    left: 10px;
  }
`
