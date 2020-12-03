// Library
import React from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

// Component
import Jumbotron from '../../../Components/Jumbotron/Jumbotron'
import Container from '../../../Components/Container/Container'

class CreatePostPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formBlogPost: {
        id: 1,
        title: '',
        body: '',
        userId: 1
      },
      buttonClick: false
    }
  }

  // GET RestAPI
  getDataApi = () => {
    axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
    .then(result => {
      this.setState({post: result.data})
    })
  }

  // Handle Input and update state
  handleInputForm = (event) => {
    let formBlogPostNew = { ...this.state.formBlogPost }
    let idTime = event.timeStamp
    formBlogPostNew['id'] = idTime
    formBlogPostNew[event.target.name] = event.target.value
    this.setState({
      formBlogPost: formBlogPostNew
    })
  }

  componentWillUnmount() {
    this.getDataApi()
  }
  // POST data state to RestAPI
  postToApi = () => {
    axios.post('http://localhost:3004/posts', this.state.formBlogPost)
      .then(result => {
        this.getDataApi()
        this.setState({
          formBlogPost: {
            id: 1,
            title: '',
            body: '',
            userId: 1
          }
        })
      })
      .catch(err => console.error(err))
  }

  // Handle Button Post Click
  handleButtonPost = () => {
    this.postToApi()
    this.setState({
      buttonClick: true
    })
  }
  render() {
    if(this.state.buttonClick) {
      return <Redirect to="/" />
    }
    return (
      <Container>
        <Jumbotron>
          <div className="create-post">
            <div className="form-control">
              <label htmlFor="Title">Title</label>
              <input type="text" name="title" id="title" onChange={(event) => {this.handleInputForm(event)}}/>
            </div>
            <div className="form-control">
              <label htmlFor="body">body</label>
              <textarea name="body"  id="body" cols="30" rows="10" onChange={(event) => {this.handleInputForm(event)}}></textarea>
            </div>
            <div className="submit-btn">
              <button className="bg-btn-success" onClick={this.handleButtonPost}>Post</button>
            </div>
          </div>
        </Jumbotron>
      </Container>
    )
  }
}

export default CreatePostPage
