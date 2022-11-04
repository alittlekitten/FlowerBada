import paymentAPI from '@src/api/paymentAPI';

const KakaoPaymentTest = () => {
  const payment = async () => {
    const res = await paymentAPI.requestPayment();
    window.location.href = res.data.response;
  };

  return (
    <div onClick={payment}>
      <button>결제하기</button>
    </div>
  );
};

export default KakaoPaymentTest;
