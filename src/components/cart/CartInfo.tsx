import { useEffect, useState } from "react";
import { useGetMusicQuery } from "../../store/slices/api/musicApi";

import styles from "./Cart.module.css";

interface IProps {
  values: Record<string, boolean>;
}
interface IElementProps {
  songId: string;
  summary: (price: number) => void;
}

const CartInfo: React.FC<IProps> = ({ values }) => {
  let selected: string[] = [];
  const [summary, setSummary] = useState(0);

  for (let key in values) {
    if (values[key] === true) selected.push(key);
  }
  const summaryHandler = (price: number) => {
    setSummary((prev) => (prev += price));
  };
  return (
    <div>
      Total:
      <hr />
      <div className={styles.cart__totalList}>
        {selected.map((songId) => (
          <CartInfoElement songId={songId} summary={summaryHandler} />
        ))}
      </div>
      <hr />
      <div className={styles.cart__total}>{`${summary}$`}</div>
    </div>
  );
};
const CartInfoElement: React.FC<IElementProps> = ({ songId, summary }) => {
  const { data } = useGetMusicQuery(songId);

  useEffect(() => {
    if (!data) return;
    summary(data.price);

    return () => {
      summary(-data.price);
    };
  }, [summary, data]);

  return <div>{`+ ${data?.price}$`}</div>;
};

export default CartInfo;
