import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen() {
    const params = useParams();
    const { id: orderId } = params;

    const orderDetails = useSelector( (state) => state.orderDetails);
    const {order, loading, error} = orderDetails;

    const dispatch = useDispatch();

    useEffect( () =>{
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

    return loading? (<LoadingBox></LoadingBox>):
    error? (<MessageBox variant='danger'>{error}</MessageBox>)
    : 
    (
        <div>
            <h1>Narudžba </h1>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='product product-body'>
                                <h3>Dostava</h3>
                                <p>
                                    <strong>Ime: </strong> {order.shippingAddress.fullName}<br />
                                    <strong>Adresa: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>
                                {order.isDelivered? 
                                <MessageBox variant="success">Dostavljeno u {order.deliveredAt}</MessageBox>
                                    : <MessageBox variant="danger">Nije dostavljeno</MessageBox>
                                } 
                            </div>
                        </li>

                        <li>
                            <div className='product product-body'>
                                <h3>Način plaćanja</h3>
                                <p>
                                    <strong>Plaćanje: </strong> {order.paymentMethod}
                                </p>
                                {order.isPaid? 
                                <MessageBox variant="success">Plaćeno u {order.paidAt}</MessageBox>
                                    : <MessageBox variant="danger">Nije plaćeno</MessageBox>
                                } 
                            </div>
                        </li>

                        <li>
                            <div className='product product-body'>
                                <h3>Naručeni artikli</h3>
                                <ul>
                                    {order.orderItems.map((item) =>(
                                        <li key={item.product}>
                                            <div className='row'>
                                                <div>
                                                    <img src={item.image} alt= {item.name} className='small'></img>
                                                </div>
                                                <div className='min-30'>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>{item.qty} x {item.price} KM = {item.qty * item.price} KM</div>
                                            </div>
                                        </li>
                                    )
                                    )}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className='col-1'>
                    <div className='product product-body'>
                        <ul>
                            <li>
                                <h3>Narudžba</h3>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Cijena</div>
                                    <div>{order.itemsPrice.toFixed(2)} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Uključuje PDV</div>
                                    <div>{order.pdvPrice} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Troškovi dostave</div>
                                    <div>{order.shippingPrice.toFixed(2)} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Ukupno (sa PDV-om)</strong></div>
                                    <div><strong>{order.totalPrice.toFixed(2)} KM</strong></div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            
        </div>
    )
}
