import { Protect } from "../../utils/Protect";
import styles from "./Cart.module.css";
import CartForm from "./cartForms/CartForm";

const Cart = () => {
  return (
    <div className="container">
      <Protect />
      <h1 className={styles.cart__title}>cart</h1>
      <CartForm />
    </div>
  );
};

export default Cart;
