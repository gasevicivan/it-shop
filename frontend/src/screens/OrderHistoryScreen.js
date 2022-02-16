import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen() {
    const orderMineList = useSelector( (state) => state.orderMineList);
    const {loading, error, orders} = orderMineList;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(listOrderMine());
    }, [dispatch]);

    return (
        <div>
            <center><h1>ISTORIJA NARUDŽBI</h1></center>
            {loading? (<LoadingBox></LoadingBox>):
            error? (<MessageBox variant='danger'>{error}</MessageBox>)
            : 
            (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATUM</th>
                            <th>UKUPNO</th>
                            <th>PLAĆENO</th>
                            <th>DOSTAVLJENO</th>
                            <th>OPCIJE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid? order.paidAt.substring(0, 10): 'Ne'}</td>
                                <td>{order.isDelivered? order.isDelivered.substring(0, 10) : 'Ne'}</td>
                                <td>
                                    <button type='button' className='small' onClick={() =>{
                                        navigate(`/order/${order._id}`);}}>
                                            Detalji
                                    </button>
                                </td>
                            </tr>
                                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
