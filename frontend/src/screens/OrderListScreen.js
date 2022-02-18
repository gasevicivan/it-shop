import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen() {
    const orderList = useSelector((state) => state.orderList);
    const {loading, error, orders} = orderList;

    const orderDelete = useSelector((state) => state.orderDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = orderDelete;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( () =>{
        dispatch({type: ORDER_DELETE_RESET});

        dispatch(listOrders());
    }, [dispatch, successDelete]);

    const deleteHandler = (order) =>{
        if(window.confirm('Da li ste sigurni da želite izbrisati odabranu narudžbu?')){
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <div>
            <center><h1>NARUDŽBE</h1></center>

            {loadingDelete && (<LoadingBox></LoadingBox>)}
            {errorDelete && (<MessageBox variant='danger'>{errorDelete}</MessageBox>)}

            {loading? (<LoadingBox></LoadingBox>)
            : error? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>KORISNIK</th>
                        <th>DATUM</th>
                        <th>UKUPNO</th>
                        <th>PLAĆENO</th>
                        <th>DOSTAVLJENO</th>
                        <th>OPCIJE</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) =>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid? order.paidAt.substring(0, 10) : 'Ne'}</td>
                        <td>{order.isDelivered? order.deliveredAt.substring(0, 10) : 'Ne'}</td>
                        <td>
                            <button type="button" className="small" onClick={() => {navigate(`/order/${order._id}`);}}>
                                Detalji
                            </button>
                            <button type="button" className="small"
                               onClick={() => deleteHandler(order)}>
                                Izbriši
                            </button>
                        </td>
                    </tr>
                     ))}
                </tbody>
            </table>
        )}
        </div>
  )
}
