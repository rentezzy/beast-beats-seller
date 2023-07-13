import styles from "./Cart.module.css";
import CartForm from "./CartForm";

const Cart = () => {
  return (
    <div className="container">
      <h1 className={styles.cart__title}>cart</h1>
      <CartForm />
    </div>
  );
};

export default Cart;
