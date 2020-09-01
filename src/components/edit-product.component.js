import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeProductname = this.onChangeProductname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeWidth = this.onChangeWidth.bind(this);
    this.onChangeLength = this.onChangeLength.bind(this);
    this.onChangeThickness = this.onChangeThickness.bind(this);
    this.onChangeExpired = this.onChangeExpired.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      productname: '',
      description: '',
      width: 0,
      length: 0,
      thickness: 0,
      expired: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/products/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({
          username: res.data.username,
          productname: res.data.productname,
          description: res.data.description,
          width: res.data.width,
          length: res.data.length,
          thickness: res.data.thickness,
          expired: new Date(res.data.expired),
        });
      })
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:5000/users/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeProductname(e) {
    this.setState({
      productname: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeWidth(e) {
    this.setState({
      width: e.target.value,
    });
  }

  onChangeLength(e) {
    this.setState({
      length: e.target.value,
    });
  }

  onChangeThickness(e) {
    this.setState({
      thickness: e.target.value,
    });
  }

  onChangeExpired(expired) {
    this.setState({
      expired: expired,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      username: this.state.username,
      productname: this.state.productname,
      description: this.state.description,
      width: this.state.width,
      length: this.state.length,
      thickness: this.state.thickness,
      expired: this.state.expired,
    };

    console.log(product);

    axios
      .post(
        `http://localhost:5000/products/update/${this.props.match.params.id}`,
        product
      )
      .then((res) => console.log(res.data));

    window.location = '/';
  }
  render() {
    return (
      <div>
        <h3>Edit Product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username :</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Productname :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.productname}
              onChange={this.onChangeProductname}
            />
          </div>
          <div className="form-group">
            <label>Description :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Width (in cm) :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.width}
              onChange={this.onChangeWidth}
            />
          </div>
          <div className="form-group">
            <label>Length (in cm) :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.length}
              onChange={this.onChangeLength}
            />
          </div>
          <div className="form-group">
            <label>Thickness (in cm) :</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.thickness}
              onChange={this.onChangeThickness}
            />
          </div>
          <div className="form-group">
            <label>Expired Date :</label>
            <DatePicker
              selected={this.state.expired}
              onChange={this.onChangeExpired}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Edit Product"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
