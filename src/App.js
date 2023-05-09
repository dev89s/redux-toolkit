import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (isLoading) {
    return (
      <main>
        {
          isOpen &&
          <Modal />
        }
        <Navbar />
        <div className="loading">
          <h2>Is Loading...</h2>
        </div>
      </main>
    );
  }

  return (
    <main>
      {
        isOpen &&
        <Modal />
      }
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
