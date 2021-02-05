import React from "react";
import { Link } from "react-router-dom";

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/users/create";
    const { name, email } = this.state;

    if (name.length == 0 || email.length == 0)
      return;

    const body = {
      name,
      email
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/users/show/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new user to our awesome user collection.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="userName">User name</label>
                <input
                  type="text"
                  name="name"
                  id="userName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userEmail">User email</label>
                <input
                  type="text"
                  name="email"
                  id="userEmail"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create User
              </button>
              <Link to="/users" className="btn btn-link mt-3">
                Back to users
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewUser;