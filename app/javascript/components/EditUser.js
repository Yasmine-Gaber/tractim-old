import React from "react";
import { Link } from "react-router-dom";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: "", email: ""} };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/users/edit/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ user: response }))
      .catch(() => this.props.history.push("/users"));
  }

  onChange(event) {
    this.setState(prevState => ({
      user:{
        ...prevState.user,
        [event.target.name]: event.target.value
      }
    }));
  }

  onSubmit(event) {
    event.preventDefault();

    const { user } = this.state;
    const url = `/api/v1/users/update/${user.id}`;
    console.log('user', user);
    console.log('url', url);
    if (user['name'].length == 0 || user['email'].length == 0)
      return;

    const body = {
      name: `${user.name}`,
      email: `${user.email}`
    };
    console.log('body', body);
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
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
    const { user } = this.state
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
                  value={user.name}
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
                  value={user.email}
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

export default EditUser;