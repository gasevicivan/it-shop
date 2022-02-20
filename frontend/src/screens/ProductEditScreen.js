import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen() {
    const {id} = useParams();
    const productId = id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate;

    const dispatch = useDispatch();

    useEffect( () =>{
        if(successUpdate){
            navigate('/productlist');
        }
        if(!product || product._id !==productId || successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET});
            dispatch(detailsProduct(productId));
        }
        else{
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [dispatch, product, productId, navigate, successUpdate]);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    };

    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try{
            const {data} = await Axios.post('/api/uploads', bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}`},
            });
            setImage(data);
            setLoadingUpload(false);
        } 
        catch (error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
  };

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <center><h1>DODAJ/IZMIJENI PROIZVOD</h1></center>
                </div>
                {loadingUpdate && (<LoadingBox></LoadingBox>)}
                {errorUpdate && (<MessageBox variant='danger'>{errorUpdate}</MessageBox>)}
                {loading? (<LoadingBox></LoadingBox>)
                : error? (<MessageBox variant='danger'>{error}</MessageBox>)
                : (
                    <>
                        <div>
                            <label htmlFor='name'>Naziv</label>
                            <input id='name' type='text' placeholder='Unesite naziv proizvoda'
                                value={name} onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <label htmlFor='price'>Cijena</label>
                            <input id='price' type='text' placeholder='Unesite cijenu proizvoda'
                                value={price} onChange={(e) => setPrice(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <label htmlFor='image'>Slika</label>
                            <input id='image' type='text' placeholder='Unesite lokaciju slike'
                                value={image} onChange={(e) => setImage(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <label htmlFor='imageFile'>Slika (fajl)</label>
                            <input type='file' id='imageFile' label='Odaberite sliku'
                                onChange={uploadFileHandler}>
                            </input>
                            {loadingUpload && <LoadingBox></LoadingBox>}
                            {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
                        </div>

                        <div>
                            <label htmlFor='category'>Kategorija</label>
                            <input id='category' type='text' placeholder='Unesite kategoriju'
                                value={category} onChange={(e) => setCategory(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <label htmlFor='brand'>Proizvođač</label>
                            <input id='brand' type='text' placeholder='Unesite naziv proizvođača'
                                value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <label htmlFor='countInStock'>Na stanju</label>
                            <input id='countInStock' type='text' placeholder='Unesite broj proizvoda na stanju'
                                value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </input>
                        </div>

                        <div>
                            <label htmlFor='description'>Opis</label>
                            <textarea id='description' rows='9' type='text' placeholder='Unesite opis proizvoda'
                                value={description} onChange={(e) => setDescription(e.target.value)}>
                            </textarea>
                        </div>

                        <div>
                            <label></label>
                            <button className='primary' type='submit'>
                                Ažuriraj proizvod
                            </button>
                        </div>
                    </>
                )
                }
            </form>
        </div>
    );
}
