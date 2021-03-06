import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {PayPalButton} from 'react-paypal-button-v2';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen() {
    const params = useParams();
    const { id: orderId } = params;

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector( (state) => state.orderDetails);
    const {order, loading, error} = orderDetails;

    const orderPay = useSelector( (state) => state.orderPay);
    const {loading: loadingPay, error: errorPay, success: successPay} = orderPay;
    
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {loading: loadingDeliver, error: errorDeliver, success: successDeliver} = orderDeliver;

    const dispatch = useDispatch();

    useEffect( () =>{
        const addPayPalScript = async () => {
            const {data} = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () =>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        };
            if(!order || successPay || successDeliver || (order && order._id !== orderId)){
                dispatch({type: ORDER_PAY_RESET});
                dispatch({type: ORDER_DELIVER_RESET});
                dispatch(detailsOrder(orderId));
            }
            else{
                if(!order.isPaid)
                    if(!window.paypal){
                        addPayPalScript();
                    }
                    else{
                        setSdkReady(true);
                    }
            }
        

    }, [dispatch, orderId, order, sdkReady, successPay, successDeliver]);
    
    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(order, paymentResult))
    }

    const deliverHandler = () =>{
        dispatch(deliverOrder(order._id));
    }

    return loading? (<LoadingBox></LoadingBox>):
    error? (<MessageBox variant='danger'>{error}</MessageBox>)
    : 
    (
        <div>
            <h1>NARUD??BA</h1>
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
                                {order.isDelivered? (<MessageBox variant="success">
                                    Dostavljeno  {order.deliveredAt}</MessageBox>)
                                    : (<MessageBox variant="danger">Nije dostavljeno</MessageBox>)
                                } 
                            </div>
                        </li>

                        <li>
                            <div className='product product-body'>
                                <h3>Na??in pla??anja</h3>
                                <p>
                                    <strong>Pla??anje: </strong> {order.paymentMethod}
                                </p>
                                {order.isPaid? 
                                <MessageBox variant="success">Pla??eno  {order.paidAt}</MessageBox>
                                    : <MessageBox variant="danger">Nije pla??eno</MessageBox>
                                } 
                            </div>
                        </li>

                        <li>
                            <div className='product product-body'>
                                <h3>Naru??eni artikli</h3>
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
                                <h3>Narud??ba</h3>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Cijena</div>
                                    <div>{order.itemsPrice.toFixed(2)} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Uklju??uje PDV</div>
                                    <div>{order.pdvPrice} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Tro??kovi dostave</div>
                                    <div>{order.shippingPrice.toFixed(2)} KM</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong>Ukupno (sa PDV-om)</strong></div>
                                    <div><strong>{order.totalPrice.toFixed(2)} KM</strong></div>
                                </div>
                            </li>

                            {
                                !order.isPaid && (
                                    <li>
                                        {!sdkReady? (<LoadingBox></LoadingBox>
                                        ) : (
                                            <>
                                            {errorPay && (<MessageBox variant='danger'>{errorPay}</MessageBox>)}
                                            {loadingPay && <LoadingBox></LoadingBox>}
                                            <PayPalButton amount={order.totalPrice} 
                                            onSuccess={successPaymentHandler}></PayPalButton>
                                            </>
                                        )}
                                    </li>
                                )
                            } 

                            {userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                                <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (<MessageBox variant='danger'>{errorDeliver}</MessageBox>)}
                                    <button type='button' className='primary block' onClick={deliverHandler}>
                                        Narud??ba dostavljena
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
