const baseUrl = "http//localhost:3000";
class Api {
  static fetchImageUrl = (input) => fetch(`${baseUrl}/imageurl`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({input})
  })

  static fetchImage = (id) => fetch(`${baseUrl}/image`, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id })
  })

  static fetchRegister = ({email, password, name}) => fetch(`${baseUrl}/register`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password, name})
  })

  static fetchSignIn = ({signInEmail, signInPassword}) => fetch(`${baseUrl}/signin`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ signInEmail, signInPassword })
  })

}

export default Api;