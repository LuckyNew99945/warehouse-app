import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = (props) => (
  <tr>
    <td>{props.product.username}</td>
    <td>{props.product.productname}</td>
    <td>{props.product.description}</td>
    <td>{props.product.width}</td>
    <td>{props.product.length}</td>
    <td>{props.product.thickness}</td>
    <td>{props.product.expired.substring(0, 10)}</td>
    <Link to={`edit/${props.product._id}`}>edit</Link> | {``}
    <a
      href="#"
      onClick={() => {
        props.deletedProduct(props.product._id);
      }}
    >
      delete
    </a>
  </tr>
);
export default class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.deletedProduct = this.deletedProduct.bind(this);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/products')
      .then((res) => {
        this.setState({
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deletedProduct(id) {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then((res) => console.log(res.data));
    this.setState({
      products: this.state.products.filter((el) => el._id !== id),
    });
  }

  productList() {
    return this.state.products.map((currentproduct) => {
      return (
        <Product
          product={currentproduct}
          deletedProduct={this.deletedProduct}
          key={currentproduct._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3>Logged Products</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Productname</th>
              <th>Description</th>
              <th>Width</th>
              <th>Length</th>
              <th>Thickness</th>
              <th>Expired</th>
            </tr>
          </thead>
          <tbody>{this.productList()}</tbody>
        </table>
      </div>
    );
  }
}
