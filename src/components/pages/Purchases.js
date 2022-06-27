import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../../redux/actions';
import '../../styles/purchases.css'

const Purchases = () => {
    const purchases = useSelector(state => state.purchases)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [dispatch]);
    
    const formatDate = (date) => {
        let dateFormat = new Date(date);

        let month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
        let day = dateFormat.getDate().toString().padStart(2, '0');
        let year = dateFormat.getFullYear();

        switch(month){
            case '01': month='January'; break;
            case '02': month='February'; break;
            case '03': month='March'; break;
            case '04': month='April'; break;
            case '05': month='May'; break;
            case '06': month='Jun'; break;
            case '07': month='July'; break;
            case '08': month='August'; break;
            case '09': month='September'; break;
            case '10': month='October'; break;
            case '11': month='November'; break;
            case '12': month='December'; break;
            default: break;
        }

        return [month, day].join(' ')+['',year].join(', ');
    }
    return (
        <div className = 'purchases'>
            <span className = 'path '>
                <div className = 'flex-container-path'>
                    <Link to = {"/"} >
                        <p>Home</p>
                    </Link>
                    <div className = 'dot'></div>
                    <p className = 'product-title'>
                        <strong>purchases</strong>
                    </p>
                </div>
            </span>
            <h1 className = 'title'>
                <strong>My Purchases</strong>
            </h1>
                {
                    purchases.map(purchase => (
                        <div className = 'container-purchase' key = {purchase.id}>
                            <div className = 'container-date'>
                                <h2 className = 'date'>
                                    {`${formatDate(purchase.createdAt)}`}
                                </h2>
                                <i class = "fa-solid fa-arrow-right date"></i>
                                <h2 className = 'date'>
                                    {`${formatDate(purchase.updatedAt)}`}
                                </h2>
                            </div>
                            <hr />
                            <main className = 'main'>
                                {
                                    purchase?.cart?.products?.map(product => (
                                        <div className = 'container-product' key = {product.id}>
                                            <h3 className = 'title-product'>{product.title}</h3>
                                            <div className = "frame">
                                                <h4>
                                                    {product.productsInCart.quantity}
                                                </h4>
                                            </div>
                                            <h4>$
                                                {product.price}
                                            </h4>
                                        </div>
                                    ))
                                }
                            </main>
                        </div>
                    ))
                }
        </div>
    );
};

export default Purchases;