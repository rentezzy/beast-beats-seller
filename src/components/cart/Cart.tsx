const Cart = () => {
  return (
    <div className="container">
      <form
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        accept-charset="utf-8"
      >
        <input
          type="hidden"
          name="data"
          value="eyJ2ZXJzaW9uIjozLCJwdWJsaWNfa2V5Ijoic2FuZGJveF9pMjAwMDE3NzIzMCIsImFjdGlvbiI6InBheSIsImFtb3VudCI6NSwiY3VycmVuY3kiOiJVU0QiLCJkZXNjcmlwdGlvbiI6IkZvciBiZWF0cyIsInByb2R1Y3RfZGVzY3JpcHRpb24iOiJIZWxsbyIsIm9yZGVyX2lkIjoiYXNsZGFzZCIsInJyb19pbmZvIjp7Iml0ZW1zIjpbeyJhbW91bnQiOjEsInByaWNlIjoyMDIsImNvc3QiOjIwMiwiaWQiOjEyMzQ1Nn1dfSwicHJvZHVjdF9uYW1lIjoiQkVBVCJ9"
        />
        <input
          type="hidden"
          name="signature"
          value="ElmJ0c4oBmfIYTkcxj/xx5ft1Dw="
        />
        <input
          type="image"
          src="//static.liqpay.ua/buttons/p1ru.radius.png"
          alt=""
        />
      </form>
    </div>
  );
};

export default Cart;
