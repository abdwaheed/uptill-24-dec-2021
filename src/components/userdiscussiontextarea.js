import React from 'react'

export default function UserDiscussionTextarea({ placeholder }) {
  return (
    <>
      <textarea class="form-control py-3 ps-3"

        rows='6' type="textarea"
        placeholder={placeholder} aria-label="Search" />
    </>
  )
}
