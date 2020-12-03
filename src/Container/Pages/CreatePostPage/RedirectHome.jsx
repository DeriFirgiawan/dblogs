import { useHistory } from "react-router-dom"

function RedirectHome() {
  let history = useHistory()

  history.push('/')
}

export default RedirectHome
