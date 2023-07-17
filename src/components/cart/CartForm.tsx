import { Formik, Form } from "formik";
import { useState } from "react";

import { useGetMeQuery } from "../../store/slices/api/authApi";
import { useGetSessionMutation } from "../../store/slices/api/userApi";

import styles from "./Cart.module.css";

import CartSong from "./CartSong";
import CartPaymentForm from "./CartPaymentForm";
import CartInfo from "./CartInfo";

import LoadingElement from "../ui/LoadingElement";
import FormObserver from "../../utils/FormObserver";
import { IGetSession } from "../../types/api.types";

const CartForm = () => {
  const { data } = useGetMeQuery(null);
  const [getSession, session] = useGetSessionMutation();
  const [payment, setPayment] = useState<IGetSession>({
    data: "",
    signature: "",
  });
  const [values, setValues] = useState<Record<string, boolean>>({});

  let initialValues: Record<string, boolean> = {};

  if (!data) return <LoadingElement />;
  if (
    session.data &&
    session.data.data !== payment.data &&
    session.data.signature !== payment.signature
  ) {
    setPayment({ data: session.data.data, signature: session.data.signature });
  }

  for (let song of data.cart) {
    initialValues[song] = true;
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cart__list}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            const cart: string[] = [];
            for (let key in values) {
              if (values[key] === true) cart.push(key);
            }
            if (cart.length === 0) return;
            getSession(cart);
          }}
        >
          <Form id="cart_form">
            {data.cart.map((song) => (
              <CartSong songId={song} key={song} />
            ))}
            <FormObserver cb={setValues} />
          </Form>
        </Formik>
      </div>
      <div className={styles.cart__info}>
        <CartInfo values={values} />
        <CartPaymentForm
          data={payment.data}
          signature={payment.signature}
          isFetching={session.isSuccess}
        />
      </div>
    </div>
  );
};

export default CartForm;
