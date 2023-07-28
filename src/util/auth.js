import jwt_decode from "jwt-decode";

class Authorization {
  loggedIn(token) {
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    const decoded = jwt_decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  }
}

const Auth = new Authorization();
export default Auth;
