import React, { Fragment, useState } from 'react'
import { css } from '@emotion/core'

export function SettingsPage () {
  const [currentSettings, setCurrentSettings] = useState(getAllSettings())

  function retrieveSetting (settingName) {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(settingName)
    }
  }

  function getAllSettings () {
    return {
      romanNumeralsActive: (retrieveSetting('romanNumeralsActive') === 'true'),
      romanNumeralsDecimal: (retrieveSetting('romanNumeralDecimal') === 'true')
    }
  }

  function setLocalSetting (settingName, value) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(settingName, value)
    }
  }

  const handleOnChange = event => {
    const target = event.target
    const value = target.checked
    const name = target.name
    const updatedSettings = { ...currentSettings, [name]: value }
    setCurrentSettings(updatedSettings)
    setLocalSetting(name, value)
  }

  return (
    <Fragment>
      <div css={romanCheckBoxStyle}>
        <label className='roman-label' htmlFor='romanNumeralsActive'> Display all values as Roman Numerals: </label>
        <input checked={currentSettings.romanNumeralsActive} id='romanNumeralsActive' name='romanNumeralsActive' onChange={handleOnChange} type='checkbox' />
      </div>
      <div css={romanCheckBoxStyle}>
        <label className='roman-decimal-label' htmlFor='romanNumeralsActive'>Parse decimals separately for Roman Numerals: </label>
        <input checked={currentSettings.romanNumeralsDecimal} id='romanNumeralsDecimal' name='romanNumeralsDecimal' onChange={handleOnChange} type='checkbox' />
      </div>
    </Fragment>
  )
}

const romanCheckBoxStyle = css`
    text-align: center;
    label {
        font-size: 25px;
        margin-right: 12px;
    }
`
