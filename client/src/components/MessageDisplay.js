import React from 'react'

// if error exists, error should be prop
// else message should be prop
export default function MessageDisplay(props) {
  const { message, error } = props
  return (
    <div className={`w-100 ${ error ? "bg-danger" : "bg-success" } mt-2 mb-4`}>
      <p className="text-center text-white p-1">
        { error ? error : message }
      </p>
    </div>
  )
}