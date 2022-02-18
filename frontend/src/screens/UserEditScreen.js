import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen() {
    const navigate = useNavigate();
    const {id} = useParams();
    const userId = id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    const userDetails = useSelector((state) => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate;

    const dispatch = useDispatch();
    useEffect( () =>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET});
            navigate('/userlist');
        }
        if(!user){
            dispatch(detailsUser(userId));
        }
        else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, successUpdate, navigate, user, userId]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateUser({_id: userId, name, email, isAdmin}));
    }
    
    return (
    <div>
        <form className='form' onSubmit={submitHandler}>
            <div>
                <center><h1>IZMIJENI KORISNIKA: {name}</h1></center>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox>}
            </div>

            {
                loading? (<LoadingBox></LoadingBox>)
                : error? (<MessageBox variant='danger'>{error}</MessageBox>)
                :(
                <>
                    <div>
                        <label htmlFor='name'>Ime</label>
                        <input id='name' type='text' placeholder='Unesite ime' 
                            value={name} onChange={(e) => setName(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input id='email' type='text' placeholder='Unesite email'
                            value={email} onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>

                    <div>
                        <label htmlFor='isAdmin'>Administrator?</label>
                        <input id='isAdmin' type='checkbox' checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}>
                        </input>
                    </div>

                    <div>
                        <label/>
                        <button className='primary' type='submit'>
                            Ažurirajte podatke
                        </button>
                    </div>
                </>
        )}
        </form>
    </div>
  )
}
