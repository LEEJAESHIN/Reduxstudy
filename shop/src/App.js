/* eslint-disable */

import "./App.css";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import data from "./component/data";
import Detail from "./component/Detail";
import axios from "axios";
import Cart from "./Cart.js";

let 재고context = React.createContext();

function App() {
  const [shoes, setShoes] = useState(data);
  const [Quantity, setQuantity] = useState([10, 11, 12]);
  const handleQuantity = () => {
    let newQuantity = [...Quantity][0] - 1;
    setQuantity([newQuantity]);
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">ZARA</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/detail">
                    Detail
                  </Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="Jumbotron">
            <h4>20% Season Off</h4>
            <p>어쩌구샬라</p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </div>
          <div className="container">
            <div className="row">
              {data.map((el, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <img src={el.img} width="100%" />
                    <h4>{el.title}</h4>
                    <p>
                      {el.content} & {el.price}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="container">
              <재고context.Provider value={Quantity}>
                <div className="row">
                  {shoes.map((el, index) => {
                    return (
                      <Card shoes={shoes[index]} index={index} key={index} />
                    );
                  })}
                </div>
              </재고context.Provider>
              <button
                className="btn btn-primary"
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((result) => {
                      setShoes([...shoes, ...result.data]);
                    })
                    .catch(() => {
                      console.log("실패했따아");
                    });
                }}
              >
                더보기
              </button>
            </div>
          </div>
        </Route>

        <Route path="/cart" exact>
          <Cart></Cart>
        </Route>

        <Route path="/detail/:id" exact>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">ZARA</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/detail">
                    Detail
                  </Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Detail
            shoes={shoes}
            Quantity={Quantity}
            handleQuantity={handleQuantity}
          ></Detail>
        </Route>
        <Route path="/:id" exact>
          <div>아무거나 적었을때 이거 보여주셈</div>
        </Route>
      </Switch>
    </div>
  );
}
function Card({ shoes }) {
  let 재고 = useContext(재고context);
  return (
    <div className="col-md-4">
      <img src={shoes.img} width="100%" />
      <h4>{shoes.title}</h4>
      <p>
        {shoes.content}
        {shoes.price}
      </p>
      {재고}
    </div>
  );
}

export default App;
