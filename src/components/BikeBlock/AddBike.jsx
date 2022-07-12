import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {createBike} from "../../redux/slices/bikeSlice";

const AddBike = () => {
    const navigate = useNavigate();
    const initialBikeState = {
        id: null,
        name: "",
        price: "",
        size: ""
    };
    const [bike, setBike] = useState(initialBikeState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBike({ ...bike, [name]: value });
    };

    const saveBike = () => {
        const { name, price, size } = bike;

        dispatch(createBike({ name, price, size }))
            .unwrap()
            .then(data => {
                setBike({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    size: data.size
                });
                setSubmitted(true);
                navigate('/bikes')
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newBike = () => {
        setBike(initialBikeState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Вы успешно добавили!</h4>
                    <button className="btn btn-success" onClick={newBike}>
                        Добавить
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Название</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={bike.name || ''}
                            onChange={event => handleInputChange(event)}
                            name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Цена</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            required
                            value={bike.price || ''}
                            onChange={event => handleInputChange(event)}
                            name="price"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Размер</label>
                        <input
                            type="text"
                            className="form-control"
                            id="size"
                            required
                            value={bike.size || ''}
                            onChange={event => handleInputChange(event)}
                            name="size"
                        />
                    </div>

                    <button onClick={saveBike} className="btn btn-success">
                        Отправить
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddBike;
