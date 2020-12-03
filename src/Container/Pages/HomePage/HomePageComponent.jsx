import React from 'react'

const HomePageComponent = (props) => {
  return (
    <div className="list-cont mt-3">
      <h2>{props.title}</h2>
      <p className="content-body mt-3">{props.body}</p>
    </div>
  )
}

export default HomePageComponent
