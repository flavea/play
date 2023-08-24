import styled from 'styled-components'

export const StarRailNormal = styled.section`
  .starrail-chat {
    background: url(https://images2.imgbox.com/d4/57/mfGoR4uy_o.png) no-repeat
      #d6d8da;
    width: 500px;
    max-width: 100%;
    margin: 25px auto;
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #121212;
    position: relative;
    z-index: 1;
  }

  .starrail-chat::before {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 8px;
    left: -8px;
    border: 1px solid #c8c8ca;
    z-index: 0;
  }

  .starrail-chat .starrail-chat-bold {
    font-weight: 600;
  }

  .starrail-chat .starrail-chat-gray {
    color: #686868;
  }

  .starrail-chat .starrail-chat-header {
    padding: 25px;
    border-bottom: 1px solid #ababab;
    position: relative;
    z-index: 1;
  }

  .starrail-chat .starrail-chat-header .starrail-receiver-name {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .starrail-chat .starrail-chat-body {
    position: relative;
    z-index: 1;
    padding: 0 15px;
  }

  .starrail-chat .starrail-chat-body .starrail-chat-content {
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .starrail-chat .starrail-chat-body .starrrail-chat-content-scrollable {
    max-height: 500px;
    overflow: auto;
  }

  .starrail-chat .starrail-chat-body .starrail-chat-content hr {
    height: 1px;
    width: 100%;
    border: none;
    background: #ababab;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-notif {
    display: flex;
    gap: 4px;
    align-items: center;
    justify-content: center;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line {
    display: flex;
    gap: 8px;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-chat-icon {
    width: 60px !important;
    height: 60px !important;
    border-radius: 50%;
    object-cover: cover !important;
    position: relative;
    flex-shrink: 0;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-chat-img {
    width: 100%;
    max-width: 200px;
    border: 3px solid #e7e7e7;
    margin-top: 5px;
    box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-receiver-msg {
    background: #e7e7e7;
    padding: 10px;
    border-radius: 0 8px 8px 8px;
    margin-top: 5px;
    box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-sender {
    flex-direction: row-reverse !important;
    text-align: right;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-sender
    .starrail-chat-img {
    width: 100%;
    max-width: 200px;
    border: 3px solid #d2bc95;
    margin-top: 5px;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-sender-msg {
    background: #d2bc95;
    padding: 10px;
    border-radius: 8px 0px 8px 8px;
    margin-top: 5px;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  }
`

export const StarRailAO3 = styled.section`
  .starrail-chat {
    background-image: url(https://images2.imgbox.com/d4/57/mfGoR4uy_o.png);
    background-color: #d6d8da;
    background-repeat: no-repeat;
    width: 500px;
    max-width: 100%;
    margin: 25px auto;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #121212;
    position: relative;
    z-index: 1;
  }

  .starrail-chat p {
    margin: 0px;
  }

  .starrail-chat::before {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 8px;
    left: -8px;
    border: 1px solid #c8c8ca;
    z-index: 0;
  }

  .starrail-chat .starrail-chat-bold {
    font-weight: 600;
  }

  .starrail-chat .starrail-chat-gray {
    color: #686868;
  }

  .starrail-chat .starrail-chat-header {
    padding: 25px;
    border-bottom: 1px solid #ababab;
    position: relative;
    z-index: 1;
  }

  .starrail-chat .starrail-chat-header .starrail-receiver-name {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .starrail-chat .starrail-chat-body {
    position: relative;
    z-index: 1;
    padding: 0 15px;
  }

  .starrail-chat .starrail-chat-body .starrail-chat-content {
    padding: 16px 10px;
  }

  .starrail-chat .starrail-chat-body .starrrail-chat-content-scrollable {
    max-height: 500px;
    overflow: auto;
  }

  .starrail-chat .starrail-chat-body .starrail-chat-content hr {
    height: 1px;
    width: 100%;
    border: none;
    background: #ababab;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-notif {
    text-align: center;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-notif
    img {
    width: 16px;
    display: inline;
    margin-right: 4px;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line {
    margin: 16px 0;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line::after {
    content: '';
    clear: both;
    display: table;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-chat-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    float: left;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-chat-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    float: left;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-chat-line-content {
    margin-left: 70px;
    display: auto;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-chat-img {
    width: 100%;
    max-width: 200px;
    border: 3px solid #e7e7e7;
    margin-top: 5px;
    box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-receiver-msg {
    background: #e7e7e7;
    padding: 10px;
    border-radius: 0 8px 8px 8px;
    margin-top: 5px;
    box-shadow: -2px 2px 0px 0px rgba(0, 0, 0, 0.25);
    width: fit-content;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-sender {
    text-align: right;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-sender
    .starrail-chat-img {
    width: 100%;
    max-width: 200px;
    border: 3px solid #d2bc95;
    margin-top: 5px;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line
    .starrail-sender-msg {
    background: #d2bc95;
    padding: 10px;
    border-radius: 8px 0px 8px 8px;
    margin-top: 5px;
    box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.25);
    width: fit-content;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line.starrail-chat-sender
    .starrail-chat-line-content {
    margin-left: 0;
    margin-right: 10px;
    float: right;
    max-width: 100%;
  }

  .starrail-chat
    .starrail-chat-body
    .starrail-chat-content
    .starrail-chat-line.starrail-chat-sender
    .starrail-chat-icon {
    float: right;
  }
`

export const Container = styled.section`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 0.75fr 1.25fr;
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
