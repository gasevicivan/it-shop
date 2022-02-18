import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen() {
    const userList = useSelector((state) => state.userList);
    const {loading, error, users} = userList;
    
    const userDelete = useSelector((state) => state.userDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(listUsers());
        dispatch({type: USER_DETAILS_RESET});
    }, [dispatch, successDelete])

    const deleteHandler = (user) =>{
        if(window.confirm('Da li ste sigurni da želite izbrisati odabranog korisnika?')){
            dispatch(deleteUser(user._id));
        }
    }

    return (
        <div>
            <center><h1>KORISNICI</h1></center>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant='danger'>{errorDelete}</MessageBox>}
            {successDelete && (<MessageBox variant='success'>Korisnik uspješno obrisan</MessageBox>)}

            {loading? (<LoadingBox></LoadingBox>)
                : error? (<MessageBox variant='danger'>{error}</MessageBox>)
                : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>OPCIJE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin? 'DA' : 'NE'}</td>
                                    <td>
                                        <button type='button' className='small'
                                            onClick={() => navigate(`/user/${user._id}/edit`)}>
                                            Izmijeni
                                        </button>
                                        <button type='button' className='small' 
                                            onClick={() => deleteHandler(user)}>
                                                Izbriši
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )
            }
        </div>
    )
}
