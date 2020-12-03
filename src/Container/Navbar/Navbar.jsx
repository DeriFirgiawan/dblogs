// Library
import React, { Fragment } from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

// Component
import HomePage from '../Pages/HomePage/HomePage'
import CreatePostPage from '../Pages/CreatePostPage/CreatePostPage'

// Style
import './Navbar.css'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      onNavbar: false
    }
  }

  // Handle Navbar on/off
  handleNavbar = () => {
    this.setState({ onNavbar: true })
    if (this.state.onNavbar) {
      this.setState({ onNavbar: false })
    }
  }
  render() {
    let sidebar
    if (this.state.onNavbar) {
      sidebar = (
        <div className="sidebar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create-post" className="nav-link bg-btn-success">Create Post</Link>
        </div>
      )
    }
    return (
      <Router>
        <Fragment>
          <nav className="navbar">
            <div className="container justi-ween">
              <div className="logo-nav bg-btn-black">
                <Link to="/" >D'Blogs</Link>
              </div>
              <div className="nav-ul justi-ween">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/create-post" className="nav-link bg-btn-success">Create Post</Link>
              </div>
              <div className="toggle">
                <button onClick={() => {this.handleNavbar()}}>
                  <i className='bx bx-menu-alt-right'></i>
                </button>
              </div>
            </div>
          </nav>
          {sidebar}
        </Fragment>
        <Route path="/" exact component={HomePage} />
        <Route path="/create-post" component={CreatePostPage} />
      </Router>
    )
  }
}

export default Navbar
