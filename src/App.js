import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import BikeBlockList from "./components/BikeBlock";
import AddBike from "./components/BikeBlock/AddBike";
import Bike from "./components/BikeBlock/Bike";
import Cart from "./pages/Cart";
import {useSelector} from "react-redux";


function App() {
    const { items} = useSelector(state => state.cart)
    const totalCount = items.reduce((sum, item) => sum + item.count, 0)
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/bikes"} className="nav-link">
                            Bikes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Добавить
                        </Link>
                    </li>
                </div>
                <li>
                    <Link to={"/cart"} className="nav-link">
                        Корзина
                    </Link>
                    <strong className="text-white">{totalCount} шт</strong>
                </li>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route exact path='/bikes' element={<BikeBlockList />} />
                    <Route exact path="/add" element={<AddBike />} />
                    <Route path="/bikes/:id" element={<Bike />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
