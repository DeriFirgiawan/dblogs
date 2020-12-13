import React from 'react'

const HomePageComponent = (props) => {
  return (
    <div className="list-cont mt-3">
      <h2>{props.data.title}</h2>
      <div className="action">
        <button className="bg-btn-danger" onClick={() => {props.remove(props.data.id)}}>Delete</button>
        <button className="bg-btn-success" onClick={() => {props.update(props.data)}}>Update</button>
      </div>
      <p className="content-body mt-3">{props.data.body}</p>
    </div>
  )
}

export default HomePageComponent
