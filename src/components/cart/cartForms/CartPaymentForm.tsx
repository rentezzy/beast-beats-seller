import { useRef, useEffect, useCallback } from "react";

import styles from "../Cart.module.css";
import arrows from "../../../assests/arrows.svg";

interface IProps {
  data: string;
  signature: string;
  isFetching: boolean;
}

const CartPaymentForm: React.FC<IProps> = ({ data, signature, isFetching }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = useCallback(() => {
    if (!formRef.current) return;
    if (data === "" || signature === "") return;
    formRef.current.submit();
  }, [data, signature]);

  useEffect(() => {
    if (isFetching) submitForm();
  }, [isFetching, submitForm]);

  return (
    <div>
      <form
        method="POST"
        acceptCharset="utf-8"
        target="_blank"
        action="https://www.liqpay.ua/api/3/checkout"
        ref={formRef}
      >
        <input type="hidden" name="data" value={data} />
        <input type="hidden" name="signature" value={signature} />
      </form>
      <button className={styles.cart__paymentBtn} form="cart_form">
        <img src={arrows} alt="" />
        <span>Purchase</span>
      </button>
    </div>
  );
};

export default CartPaymentForm;
