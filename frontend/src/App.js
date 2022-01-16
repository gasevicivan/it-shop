import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;
  return (
    <BrowserRouter>
    <div className="grid">
            <header className="row">
                <div>
                    <Link className="eName" to="/">IT Shop</Link>
                </div>
                <div>
                    <Link to="/signin">Prijava</Link>
                    <Link to="/cart/:id">
                      Korpa
                      {cartItems.length > 0 && (
                        <span className='badge'>{cartItems.length}</span>
                      )}
                    </Link>
                </div>
            </header>
            <main>
              <Routes>
                <Route exact path="/" element={<HomeScreen />}></Route>
                <Route path="/product/:id" element={<ProductScreen />}></Route>
                <Route path="/cart/:id" element={<CartScreen />}></Route>
              </Routes>
            </main>
            <footer className="row center">
                Sva autorska prava zadržava IT Shop
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
