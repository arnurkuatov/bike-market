import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {createBike} from "../../redux/slices/bikeSlice";

const AddBike = () => {
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
        const { name, price } = bike;

        dispatch(createBike({ name, price }))
            .unwrap()
            .then(data => {
                console.log(data);
                setBike({
                    id: data.id,
                    name: data.name,
                    price: data.price,
                    size: data.size
                });
                setSubmitted(true);
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
                    <h4>Вы успешно отправили!</h4>
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
                            id="title"
                            required
                            value={bike.name || ''}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Цена</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={bike.price || ''}
                            onChange={handleInputChange}
                            name="description"
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
