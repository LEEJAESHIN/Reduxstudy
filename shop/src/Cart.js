import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart({ alert }) {
  let state = useSelector((state) => state); //redux에 있던 모든 state
  //콘솔찍으면 오브젝트 안에 리듀서 가 들어있음 리듀서 ===상태를변경하는 함수
  console.log(state.reducer);
  let dispatch = useDispatch(); //props.dispatch를 더쉽게쓰는 문법
  return (
    <div>
      <table class="table caption-top">
        <caption>List of users</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">상품명</th>
            <th scope="col">수량</th>
            <th scope="col">변경</th>
          </tr>
        </thead>
        <tbody>
          {state.reducer.map((el, i) => {
            return (
              <tr key={i}>
                <th scope="row">{el.id}</th>
                <td>{el.name}</td>
                <td>{el.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량증가", payload: { name: "kim" } }); //액션 파라미터
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "수량감소" });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {alert === true ? (
        <div className="my-alert2">
          <p>지금 구매하시면 신규할인 20%</p>
          <button
            onClick={() => {
              dispatch({ type: "닫기" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
    </div>
  );
}

// function 함수명(state) {
//   return {
//     state: state.reducer,
//     alert: state.reducer2,
//   };
// }

// export default connect(함수명)(Cart);
export default Cart;
