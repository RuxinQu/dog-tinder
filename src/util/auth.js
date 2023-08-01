import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

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
  logOut() {
    try {
      Cookies.remove("UserId");
      Cookies.remove("AuthToken");
      window.location.assign("/");
    } catch (err) {
      console.log(err);
    }
  }
}

const Auth = new Authorization();
export default Auth;
