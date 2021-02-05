import React from "react";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: { name: "", email: ""} };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/users/show/${id}`;

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

  render() {
    const { user } = this.state;

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {user.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <h5 className="mb-2">Name</h5>
              {user.name}
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Email</h5>
              {user.email}
            </div>
            <div className="col-sm-12 col-lg-2">
              <Link to={`/users/edit/${user.id}`} className="btn btn-danger">
                Edit User
              </Link>
            </div>
          </div>
          <Link to="/users" className="btn btn-link">
            Back to users
          </Link>
        </div>
      </div>
    );
  }
}

export default User;