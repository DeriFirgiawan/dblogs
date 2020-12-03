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
      post: []
    }
  }

  
  getDataPostApi = () => {
    axios.get('http://localhost:3004/posts?_sort=id&_order=desc')
    .then(result => {
      this.setState({post: result.data})
    })
  }
  componentDidMount() {
    this.getDataPostApi()
  }
  
  render() {
    return (
      <Container>
        <Jumbotron>
          {
            this.state.post.map(result => {
              return (
                <HomePageComponent key={result.id} title={result.title} body={result.body}/>
              )
            })
          }
        </Jumbotron>
      </Container>
    )
  }
}

export default HomePage
