const baseUrl = 'http://localhost:3000';
class Api {
  static fetchImageUrl = input =>
    fetch(`${baseUrl}/imageurl`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ input })
    });

  static fetchImage = id =>
    fetch(`${baseUrl}/image`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ id })
    });

  static fetchRegister = ({ email, password, name }) =>
    fetch(`${baseUrl}/register`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

  static fetchSignIn = ({
    signInEmail: email = '',
    signInPassword: password = '',
    token = ''
  }) =>
    fetch(`${baseUrl}/signin`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ email, password })
    });

  static updateProfile = ({ id, ...formInput }) =>
    fetch(`${baseUrl}/profile/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({ formInput })
    });

  static fetchProfile = ({ id, token }) =>
    fetch(`${baseUrl}/profile/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
}

export default Api;
