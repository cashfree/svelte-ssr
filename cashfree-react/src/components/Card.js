import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import CardNumber from "./CardNumber";
import CardHolder from "./CardHolder";
import CardExpiry from "./CardExpiry";
import CardCvv from "./CardCvv";
import Save from "./SaveCard";
import CardLayout from "./CardLayout";

import { isComplete } from "../redux/cardSlice";

const Card = () => {
  const dispatch = useDispatch();
  const {
    isCardNumberComplete,
    isCardHolderNameComplete,
    isCardExpiryComplete,
    isCardCvvComplete,
    save,
    cardNumber,
  } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(
      isComplete(
        isCardNumberComplete &&
          isCardHolderNameComplete &&
          isCardExpiryComplete &&
          isCardCvvComplete
      )
    );
  }, [
    isCardNumberComplete,
    isCardHolderNameComplete,
    isCardExpiryComplete,
    isCardCvvComplete,
    dispatch,
  ]);

  //format of customStyle  -
  // customStyle={{
  //   base: {
  //     fontSize: "16px",
  //     fontFamily: "Lato",
  //     backgroundColor: "#FFFFFF",
  //     foucsedBorder: "1px solid #2361d5",
  //     border: "1px solid #e6e6e6",
  //     borderRadius: "5px",
  //     padding: "16px",
  //     color: "#000000",
  //   },
  //   invalidColor: "#df1b41",
  //   cardlayoutBackground: "#f6f9fb",
  //   payBtn: {
  //     border: "1px solid #2361d5",
  //     color: "#2361d5",
  //     background: "none",
  //   },
  // }}

  return (
    <CardLayout theme="dark">
      <CardNumber customStyle={{invalidColor: "blue"}}/>
      <CardHolder />
      <div style={{ display: "flex" }}>
        <CardExpiry />
        <CardCvv />
      </div>
      <Save />
    </CardLayout>
  );
};

export default Card;
