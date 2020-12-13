// Library
import React from 'react'
import axios from 'axios'

// Component
import HomePageComponent from './HomePageComponent'
import Container from '../../../Components/Container/Container'
import Jumbotron from '../../../Components/Jumbotron/Jumbotron'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      post: [],
      showModal: false,
      formBlogPost: {
        id: 1,
        title: '',
        body: '',
        userId: 1
      },
    }
  }

  
  getDataApi = () => {
    axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
    .then(result => {
      if (window.location.pathname === '/') {
        this.setState({ post: result.data })
      }
    })
  }
  componentDidMount() {
    return this.getDataApi()
  }
  shouldComponentUpdate() {
    return true
  }

  handleRemoveContent = (data) => {
    axios.delete(`http://localhost:3004/posts/${data}`)
      .then(result => {
      this.getDataApi()
    })
  }

  handleUpdateContent = (data) => {
    this.setState({
      showModal: true,
      formBlogPost: data
    })
  }

  handleButtonUpdate = () => {
    axios.put(`http://localhost:3004/posts/${this.state.formBlogPost.id}`, this.state.formBlogPost)
      .then(result => {
      this.getDataApi()
      this.setState({
        showModal:false
      })
    })
  }

  handleInputForm = (event) => {
    let formBlogPostNew = { ...this.state.formBlogPost }
    formBlogPostNew[event.target.name] = event.target.value
    this.setState({
      formBlogPost: formBlogPostNew
    })
  }

  handleModalButtonClose = () => {
    this.setState({
      showModal: false
    })
  }
  
  render() {
    let modalComponent
    if (this.state.showModal) {
      modalComponent = (
        <div className="modal">
          <div className="modal-inner">
            <div className="modal-introduction">
              <button className="modal-close-btn" onClick={this.handleModalButtonClose}>X</button>
              <div className="form-control">
              <label htmlFor="Title">Title</label>
              <input type="text" name="title" value={this.state.formBlogPost.title} id="title" onChange={(event) => {this.handleInputForm(event)}}/>
            </div>
            <div className="form-control">
              <label htmlFor="body">body</label>
                <textarea name="body" value={this.state.formBlogPost.body} id="body" cols="30" rows="10" onChange={(event) => {this.handleInputForm(event)}}></textarea>
            </div>
            </div>
            <button className="bg-btn-success" onClick={this.handleButtonUpdate}>Update</button>
          </div>
        </div>
      )
    }
    return (
      <Container>
        <Jumbotron>
          {
            this.state.post.map(results => {
              return (
                <HomePageComponent key={results.id} data={results} remove={this.handleRemoveContent} update={this.handleUpdateContent}/>
              )
            })
          }
          {modalComponent}
        </Jumbotron>
      </Container>
    )
  }
}

export default HomePage
