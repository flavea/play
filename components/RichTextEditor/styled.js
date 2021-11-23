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
    height: calc(100vh - 206px);
    overflow: auto;
    padding-right: 10px;
  }

  .toolbar {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
    display: flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    height: 66px;
  }

  .image-delete-button {
    top: 10px;
    left: 10px;
  }
`
