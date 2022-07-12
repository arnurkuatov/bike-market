import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearProducts} from "../redux/slices/cartSlice";
import CartItem from "../components/CartItem";

const Cart = () => {
    const dispatch = useDispatch()
    const { totalPrice, items} = useSelector(state => state.cart)
    const totalCount = items.reduce((sum, item) => sum + item.count, 0)

    const onClickClearItems = () => {
        if (window.confirm('Are you sure, bro, you are clearing cart')) {
            dispatch(clearProducts())
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <button onClick={onClickClearItems} className="btn btn-danger">
                        <span>Очистить корзину</span>
                    </button>
                </div>
                <div className="card-body">
                    {
                        items.map(item => (
                            <CartItem key={item.id} {...item}/>
                        ))
                    }
                </div>
                <div>
                    <div className="card-footer">
                        <span> Всего велосипедовв: <b>{totalCount} шт.</b> </span>
                        <span> Сумма заказа: <b>{totalPrice}</b> </span>
                    </div>
                    <div className="card-group">
                        <Link to="/bikes" className="button button--outline button--add go-back-btn">
                            <span>Вернуться назад</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;