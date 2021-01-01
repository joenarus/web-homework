import React from 'react'
import { Button } from 'react-bootstrap'
import { PropTypes } from 'prop-types'

GetView.propTypes = {
  onEdit: PropTypes.function.isRequired
}

GetEdit.propTypes = {
  onCancel: PropTypes.function.isRequired
}

ActionsCell.propTypes = {
  columnProps: PropTypes.object.isRequired,
  index: PropTypes.integer.isRequired
}

export function GetView (props) {
  return (
    <Button bsSize='xs' bsStyle='link' onClick={props.onEdit}>
      Edit
    </Button>
  )
}

export function GetEdit (props) {
  return (
    <React.Fragment>
      <Button bsSize='xs' bsStyle='link' type='submit'>
        Save
      </Button>

      <Button bsSize='xs' bsStyle='link' onClick={props.onCancel}>
        Cancel
      </Button>
    </React.Fragment>
  )
}

const editModes = {
  view: GetView(),
  edit: GetEdit()
}

export default function ActionsCell (props) {
  const {
    mode,
    actions: { onEdit, onCancel }
  } = props.columnProps.rest
  const Buttons = editModes[mode]
  return <Buttons onCancel={onCancel} onEdit={() => onEdit(props.index)} />
}
