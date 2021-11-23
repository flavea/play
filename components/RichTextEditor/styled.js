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
    flex-shrink: 0;
  }

  .uk-button-default {
    &:hover {
      background: #f5f5f5;
    }
  }

  .editor {
    margin-top: 86px;
    padding-right: 10px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 20px;
  }

  .toolbar {
    border-bottom: 1px solid #e5e5e5;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 1;

    > div {
      height: 66px;
      padding: 20px;
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
    }
  }

  .image-delete-button {
    top: 10px;
    left: 10px;
  }
`
