import styled from 'styled-components'

export const Container = styled.section`
  margin: 20px;

  h4 {
    margin: 10px 0;
  }
`

export const Grid = styled.section`
  @media only screen and (min-width: 1024px) {
    &.yes-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
      grid-column-gap: 20px;
      grid-row-gap: 0px;
    }
  }
`

export const CharacterListCard = styled.section.attrs({
  className: 'uk-border-rounded',
})`
  background-color: #f2f2f2;
  padding: 10px;
  overflow: auto;

  .uk-button {
    text-transform: capitalize !important;
    line-height: 32px;
  }

  .uk-button-default {
    background-color: #fff;
  }

  .uk-button-primary {
    background-color: #5b558b;
  }

  .filter {
    display: flex;
    margin: 5px 0;
    align-items: center;

    .filter-name {
      margin-right: 20px;
    }
  }

  .Electro {
    background-color: #5b558b;
    color: #fff;
  }
  .Pyro {
    background-color: #d13c3c;
    color: #fff;
  }
  .Cryo {
    background-color: #7ceff9;
    color: #000;
  }
  .Hydro {
    background-color: #308fdd;
    color: #fff;
  }
  .Anemo {
    background-color: #42edc5;
    color: #000;
  }
  .Geo {
    background-color: #aa6f33;
    color: #fff;
  }
  .Dendro {
    background-color: #5d992c;
    color: #fff;
  }
`

export const Character = styled.button`
  width: 100px;
  margin: auto;
  display: inline-block;
  border: none;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  margin: 5px;
  position: relative;

  & > div {
    display: block !important;
  }

  &.excluded {
    opacity: 0.5;
  }

  @media only screen and (min-width: 1024px) {
    &.big {
      width: 150px;
      &&::after {
        top: 120px;
      }
    }
  }

  img {
    display: block;
    margin: 0;
  }

  &&::after {
    background-color: #fff;
    background-size: 80%;
    background-position: center;
    content: '';
    position: absolute;
    top: 70px;
    right: 5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-image: url('/genshin_thumbs/${(props) =>
      props.weapon.toLowerCase()}.png');
  }
`

export const CharacterName = styled.div`
  font-weight: bold;
  background-color: #ea7284;
  padding: 3px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

  &.gold {
    background-color: #f1f17d;
    color: #333;
  }

  &.purple {
    background-color: #b283c2;
    color: #fff;
  }
`
