/* eslint-disable jsx-a11y/no-onchange */
const BlendList = ({ label, onChange, value }) => (
  <div className="uk-margin-small uk-flex uk-flex-middle">
    <div className="uk-form-span uk-text-bold uk-width-1-2">{label}</div>
    <select
      className="uk-select"
      onChange={onChange}
      value={value}
      defaultValue="normal"
    >
      <option>normal</option>
      <option>multiply</option>
      <option>screen</option>
      <option>overlay</option>
      <option>darken</option>
      <option>lighten</option>
      <option>color-dodge</option>
      <option>color-burn</option>
      <option>hard-light</option>
      <option>soft-light</option>
      <option>difference</option>
      <option>exclusion</option>
      <option>hue</option>
      <option>saturation</option>
      <option>color</option>
      <option>luminosity</option>
    </select>
  </div>
)

export default BlendList
