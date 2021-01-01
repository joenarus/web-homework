import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { settings, updateSettings } from './settings'

SettingsPage.propTypes = {
}

export function SettingsPage () {
  const handleOnChange = event => {
    const target = event.target
    const value = target.checked
    const name = target.name
    const updatedSettings = { ...settings, [name]: value }
    updateSettings(updatedSettings)
  }

  return (
    <Fragment>
      <div css={romanCheckBoxStyle}>
        <label className='roman-label' htmlFor='romanNumeralsActive'> Display all values as Roman Numerals: </label>
        <input id='romanNumeralsActive' name='romanNumeralsActive' onChange={handleOnChange} type='checkbox' value={settings.romanNumeralsActive} />
      </div>
    </Fragment>
  )
}

const romanCheckBoxStyle = css`
    text-align: center;
    .roman-label {
        font-size: 25px;
        margin-right: 12px;
    }
`
