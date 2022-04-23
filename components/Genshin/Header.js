/* eslint-disable jsx-a11y/anchor-is-valid */
import IF from 'components/If'

export const Header = ({ title, desc, children }) => {
  return (
    <div className="uk-flex uk-flex-between">
      <IF condition={title || desc}>
        <div className="uk-margin-small-right">
          <IF condition={title}>
            <h3 className="uk-h3 uk-text-bold uk-margin-auto-bottom">
              {title}
            </h3>
          </IF>

          <IF condition={desc}>
            <p className="uk-margin-remove-top uk-margin-small-bottom">
              {desc}
            </p>
          </IF>
        </div>
      </IF>
      <div className="uk-text-right menu">{children}</div>
    </div>
  )
}

export default Header
