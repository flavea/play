/* eslint-disable jsx-a11y/anchor-is-valid */

import { Loader } from './styled'

export const PageLoader = () => {
  return (
    <Loader className="uk-flex uk-flex-center uk-flex-middle uk-position-fixed uk-width-1-1 uk-height-1-1 uk-position-top-left">
      <div className="loader">
        <div className="loader-inner">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Loader>
  )
}

export default PageLoader
