import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import { connect } from "react-redux";

let Box = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function Detail({ shoes, Quantity, dispatch }) {
  const [alert, setAlert] = useState(true);
  const [input, setInput] = useState("");

  const handleAlert = () => {
    setAlert(false);
  };

  useEffect(() => {
    let 타이머 = setTimeout(() => {
      handleAlert();
    }, 2000);
    console.log("안녕");
    return () => {
      clearTimeout(타이머);
    };
  }, [alert]);
  let history = useHistory();

  let { id } = useParams();
  let Item = shoes.find((el) => {
    return el.id == id;
  });

  return (
    <div>
      <div className="container">
        <Box>
          <제목 className="red">대단하다!</제목>
        </Box>
        {input}
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        {alert == true ? (
          <div className="my-alert2">
            <p>재고가 얼마안남았다능</p>
          </div>
        ) : null}

        <div className="row">
          <div className="col-md-6">
            <img src={Item.img} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{Item.title}</h4>
            <p>{Item.content}</p>
            <p>{Item.price}</p>
            <Info Quantity={Quantity}></Info>
            <button
              className="btn btn-danger"
              onClick={() => {
                dispatch({
                  type: "항목추가",
                  payload: { id: 2, name: "새로운상품", quan: 1 },
                });
                history.push("/cart");
              }}
            >
              주문하기
            </button>

            <button
              className="btn btn-danger"
              onClick={() => {
                history.goBack();
              }}
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function Info({ Quantity }) {
  return <p>재고 : {Quantity[0]}</p>;
}
function 함수명(state) {
  return {
    state: state.reducer,
    alert: state.reducer2,
  };
}

export default connect(함수명)(Detail);
