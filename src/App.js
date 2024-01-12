import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login/Login';
import Register from './pages/Login/Register/Register';
import ProductDetails from './component/ProductDetails/ProductDetails';
import Shop from './pages/Shop/Shop';
import Checkout from './pages/Cart/Checkout/Checkout';
import Collection from './pages/Collection/Collection';
import CategoryPage from './pages/Collection/CategoryPage';
import Cart from './pages/Cart/Cart';
import YourCart from './pages/Cart/YourCart/YourCart';
import Payment from './pages/Cart/Payment/Payment';
import Profile from './pages/Profile/Profile';
import ProfileDetail from './pages/Profile/component/ProfileDetail';
import Order from './pages/Profile/component/Order';
import OrderDetail from './pages/Profile/component/OrderDetail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path='sign-in' element={<Login />} />
          <Route path='sign-up' element={<Register />} />
          <Route path='collection/:id' element={<Collection />} />
          <Route path='category/:id' element={<CategoryPage />} />
          <Route path='shop' element={<Shop />} />
          <Route path='cart' element={<Cart />}>
            <Route path='your-cart' element={<YourCart />} />
            <Route path='check-out' element={<Checkout />} />
            <Route path='payment' element={<Payment />} />
          </Route>
          <Route path='product-details/:id' element={<ProductDetails />} />
          <Route path='user' element={<Profile />}>
            <Route path='profile' element={<ProfileDetail />} />
            <Route path='order' element={<Order />} />
            <Route path='order/:id' element={<OrderDetail/>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
