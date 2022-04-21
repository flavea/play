import styled from 'styled-components'

export const Container = styled.section.attrs({
  className: 'uk-padding uk-container',
})`
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
  className: 'uk-border-rounded uk-background-muted uk-padding-small',
})`
  overflow: auto;

  .uk-button {
    text-transform: capitalize !important;
    line-height: 32px;

    &.uk-button-default {
      background-color: #fff;
    }
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
    background-color: #b03bef !important;
    color: #fff !important;
  }
  .Pyro {
    background-color: #d13c3c !important;
    color: #fff !important;
  }
  .Cryo {
    background-color: #7ceff9 !important;
    color: #000 !important;
  }
  .Hydro {
    background-color: #308fdd !important;
    color: #fff !important;
  }
  .Anemo {
    background-color: #42edc5 !important;
    color: #000 !important;
  }
  .Geo {
    background-color: #aa6f33 !important;
    color: #fff !important;
  }
  .Dendro {
    background-color: #5d992c !important;
    color: #fff !important;
  }
`

export const Character = styled.button.attrs({
  className:
    'uk-inline-block uk-padding-remove uk-position-relative uk-overflow-hidden',
})`
  width: 100px;
  border: none;
  cursor: pointer;
  margin: 5px;

  & > * {
    display: block !important;
  }

  &.excluded {
    opacity: 0.5;
  }

  @media only screen and (min-width: 1024px) {
    &.big {
      width: 130px;
      &&::after {
        top: 100px;
      }
    }
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

export const CharacterName = styled.div.attrs({
  className: 'uk-text-bold uk-text-center',
})`
  background-color: #ea7284;
  padding: 5px;
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
