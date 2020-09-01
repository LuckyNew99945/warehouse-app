import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar.component';
import EditProduct from './components/edit-product.component';
import ProductCreate from './components/product-create.component';
import ProductsList from './components/products-list.component';
import UserCreate from './components/user-create.component';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ProductsList} />
        <Route path="/edit/:id" exact component={EditProduct} />
        <Route path="/create" exact component={ProductCreate} />
        <Route path="/user" exact component={UserCreate} />
      </div>
    </Router>
  );
}

export default App;
