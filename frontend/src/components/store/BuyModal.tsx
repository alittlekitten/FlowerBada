import { css } from '@emotion/react';
import storeAPI from '@api/storeAPI';
import userAPI from '@api/userAPI';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import { useRecoilState } from 'recoil';

export default function Modal(props: any) {
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);

  function closeModal() {
    props.closeModal();
  }

  const buyFunction = async () => {
    try {
      if (props.isFlower) {
        const data: any = {
          flowerId: props.itemId,
        };
        await storeAPI.putFlower(loginUser.jwt, data);
      } else {
        const data: any = {
          rollingId: props.itemId,
        };
        await storeAPI.putRolling(loginUser.jwt, data);
      }
      const res = await userAPI.getPoint(loginUser.jwt);
      const points: number = res.data.response.points;
      setLoginUser((prev: IuserRecoil) => {
        const variable = { ...prev };
        variable.points = points;
        return variable;
      });
      alert('결제 완료!');
      window.location.href = '/store';
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div css={ModalCss}>
      <div className="Modal" onClick={closeModal}>
        <div className="modalBody" onClick={(e) => e.stopPropagation()}>
          <button id="modalCloseBtn" onClick={closeModal}>
            ✖
          </button>
          {props.children}
          {loginUser.points >= props.price ? (
            <button onClick={buyFunction}>구매</button>
          ) : (
            <div>
              <strong>포인트가 부족합니다!</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ModalCss = css`
  /* modal창 외부화면 */
  .Modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* modal창 */
  .modalBody {
    position: absolute;
    width: 300px;
    height: 400px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    z-index: 1;
  }

  #modalCloseBtn {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    color: rgba(0, 0, 0, 0.7);
    background-color: transparent;
    font-size: 20px;
  }

  #modalCloseBtn:hover {
    cursor: pointer;
  }
`;
