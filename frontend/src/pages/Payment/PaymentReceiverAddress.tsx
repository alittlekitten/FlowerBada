import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IPaymentRecoil, paymentRecoil } from '@recoil/paymentRecoil';
import { createTheme, Grid, MenuItem, ThemeProvider } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';

const PaymentReceiverAddress = () => {
  const [paymentState, setPaymentState] =
    useRecoilState<IPaymentRecoil>(paymentRecoil);
  const [receiverName, setReceiverName] = useState<string>('');
  const [receiverPhone, setReceiverPhone] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState<string>('');

  const navigate = useNavigate();

  const onChangeReceiverName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverName(e.target.value);
  };

  const onChangeReceiverPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverPhone(e.target.value);
  };

  const onChangeReceiverAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(e.target.value);
  };

  const onClickNext = () => {
    setPaymentState((prev: IPaymentRecoil) => {
      const data = { ...prev };
      data.receiver = receiverName;
      data.receiverPhone = receiverPhone;
      data.receiverAddress = receiverAddress;
      return data;
    });
    navigate(`/payment/address/sender`);
  };

  const goBack = () => {
    useResetRecoilState(paymentRecoil);
    const url = localStorage.getItem('url');
    navigate(`/rolling/${url}`);
  };

  useEffect(() => {
    setReceiverName(paymentState.receiver);
    setReceiverPhone(paymentState.receiverPhone);
    setReceiverAddress(paymentState.receiverAddress);
  }, []);

  return (
    <div css={InputCSS}>
      <div className="receiver-name">
        <p>받는 사람</p>
        <input onChange={onChangeReceiverName} value={receiverName} />
      </div>
      <div className="receiver-phone">
        <p>연락처</p>
        <input onChange={onChangeReceiverPhone} value={receiverPhone} />
      </div>
      <div className="receiver-address">
        <p>배송 주소</p>
        <input onChange={onChangeReceiverAddress} value={receiverAddress} />
      </div>
      <div css={ButtonBox}>
        <div className="option-buttons">
          <ThemeProvider theme={btnTheme}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={onClickNext}
              css={Font}
            >
              보내는 분 정보 입력하러 가기
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={btnTheme}>
            <Button
              variant="contained"
              color="neutral"
              size="small"
              onClick={goBack}
              css={Font}
            >
              롤링페이퍼로 돌아가기
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

const InputCSS = css`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  .receiver-name,
  .receiver-phone,
  .receiver-address {
    width: calc(100vw - 4rem);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const btnTheme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#16453E',
    },
    neutral: {
      main: '#B1BDBB',
    },
  },
});

const Font = css`
  font-family: 'SeoulNamsanM';
  padding: 16px;
  width: 90%;
  margin: 6px;
`;

const ButtonBox = css`
  position: fixed;
  bottom: 5vh;
  width: 100%;
  /* height: 20%; */
`;

export default PaymentReceiverAddress;
