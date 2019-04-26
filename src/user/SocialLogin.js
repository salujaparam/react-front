import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { socialLogin, authenticate } from "../auth";

class SocialLogin extends Component {
  constructor() {
    super();
    this.state = {
      redirectToReferrer: false
    };
  }

  responseGoogle = response => {
    const { googleId, name, email, imageUrl } = response.profileObj;
    const user = {
      password: googleId,
      name: name,
      email: email,
      imageUrl: imageUrl
    };
    // console.log("user obj to social login: ", user);
    socialLogin(user).then(data => {
      if (data.error) {
        console.log("Error Login. Please try again..");
      } else {
        authenticate(data, () => {
          this.setState({ redirectToReferrer: true });
        });
      }
    });
  };

  render() {
    // redirect
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to="/" />;
    }

    return (
      <GoogleLogin
        clientId="795479988549-f4icrh2ikk1hj4us8qv75n626e27k78h.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

export default SocialLogin;
