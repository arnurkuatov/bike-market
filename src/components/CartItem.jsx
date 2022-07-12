import React from 'react';
import {useDispatch} from "react-redux";
import {removeProduct} from "../redux/slices/cartSlice";

const CartItem = ({ id, name, price, size }) => {
    const dispatch = useDispatch();
    return (
        <div className="card">
            <div className="text-info">{name}</div>
            <div className="text-body">Цена:{price}тг</div>
            <p className="text-primary">Размер:{size}</p>
            <div>
                <button onClick={() => dispatch(removeProduct({id}))} className="btn btn-danger">Удалить</button>
            </div>
        </div>
    );
};

export default CartItem;