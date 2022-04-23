/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { replaceSingleData } from 'store/genshin/single/action'
import { replaceMultiData } from 'store/genshin/multi/action'

import UIkit from 'uikit'
import { Button, Container } from './styled'

export const Setting = () => {
  const dispatch = useDispatch()
  const totalState = useSelector((state) => state)
  const [data, setData] = useState(null)

  const downloadSetting = () => {
    var element = document.createElement('a')
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(totalState)),
    )
    element.setAttribute(
      'download',
      `genshin_team_flavea_vercel_${Date.now()}.json`,
    )

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  const onFileChange = (evt) => {
    var file = evt.target.files[0]

    var reader = new FileReader()

    reader.onload = ((f) => {
      return function (e) {
        let read = JSON.parse(e.target.result)
        if (typeof read?.genshinsingle != 'undefined') {
          setData(read)
        } else {
          UIkit.modal.alert('Wrong file format!')
        }
      }
    })(file)

    reader.readAsText(file)
  }

  const updateData = () => {
    let flag = false
    if (!data) {
      UIkit.modal.alert('Wrong file or you have not chosen a file')
      return
    }

    if (data?.genshinsingle) {
      flag = true
      dispatch(replaceSingleData(data.genshinsingle))
    }

    if (data?.genshinmulti) {
      flag = true
      dispatch(replaceMultiData(data.genshinmulti))
    }

    if (flag) {
      UIkit.modal.alert('Data updated!')
    }
  }

  const clearData = () => {
    localStorage.clear()
    UIkit.modal.alert('Removing date done!')
  }

  return (
    <Container>
      <div className="uk-flex uk-flex-between uk-flex-middle">
        <div>
          <h3 className="uk-h3 uk-text-bold uk-margin-auto-bottom">
            Random Genshin Teams Generator
          </h3>
          <p className="uk-margin-remove-top uk-margin-small-bottom">
            Info and Settings
          </p>
        </div>
        <div>
          <Link href="/genshin">
            <a className="uk-button uk-button-default uk-margin-small-right uk-button-small">
              Singleplayer Mode
            </a>
          </Link>
          <Link href="/genshin/multi">
            <a className="uk-button uk-button-default uk-button-small">
              Multiplayer Mode
            </a>
          </Link>
        </div>
      </div>
      <hr></hr>
      <p>
        <b>Important:</b> All of this generator&apos;s data is stored in your
        browser, so if you clear your browser data, your generated data will
        also get removed.
      </p>
      <h4 className="uk-h5 uk-text-bold">Bugs Report and Suggestions</h4>
      <p className="uk-margin-remove-top">
        To report bugs or suggest new feature, please contact me on discord
        @onyourleft#5497
      </p>
      <p />
      <h4 className="uk-h5 uk-text-bold">Back Up</h4>
      Download the data file for back up
      <Button
        onClick={downloadSetting}
        className="uk-button-default uk-margin-small"
      >
        Download Back Up Data
      </Button>
      <p />
      <h4 className="uk-h5 uk-text-bold">Restore Data</h4>
      Upload the downloaded back up data to restore your data. Please note that
      all your current data will be replaced.
      <div className="uk-margin-small uk-flex">
        <div data-uk-form-custom="target: true">
          <input type="file" onChange={onFileChange} accept=".json" />
          <input
            className="uk-input uk-form-width-medium"
            type="text"
            placeholder="Select file"
            disabled
          />
        </div>
        <Button className="uk-button-default" onClick={updateData}>
          Submit
        </Button>
      </div>
      <p />
      <h4 className="uk-h5 uk-text-bold">Clear Data</h4>
      In case of any error, you can force clear data by clicking the following
      button
      <Button onClick={clearData} className="uk-button-default uk-margin-small">
        Clear Data
      </Button>
    </Container>
  )
}

export default Setting
