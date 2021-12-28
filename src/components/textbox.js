import React from 'react'
export default function Textbox({ ...rest }) {

  return (
    <div className="form-group mt-3">
      <input className="form-control" {...rest} />
    </div>
  )
}
