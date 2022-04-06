import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

let 기본state = [
  { id: 0, name: "New balance", quan: 2 },
  { id: 1, name: "NIKE", quan: 4 },
];

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === "닫기") {
    return false;
  } else {
    return state;
  }
}

const reducer = (state = 기본state, 액션) => {
  if (액션.type === "항목추가") {
    let copy = [...state];
    copy.push(액션.payload);
    return copy;
  } else if (액션.type === "수량증가") {
    let copy = [...state];
    copy[0].quan++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copyminus = [...state];
    if (0 < copyminus[0].quan) {
      copyminus[0].quan--;
    }

    return copyminus;
  } else {
    return state;
  }
};

let store = createStore(combineReducers({ reducer, reducer2 }));
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
