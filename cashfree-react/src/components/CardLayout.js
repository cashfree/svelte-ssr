import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/cardSlice";
import { themes } from "../constants/theme";
function CardLayout({ theme, customStyle = {}, children }) {
  let cardlayoutBackground =
    customStyle?.cardlayoutBackground ||
    themes[theme]?.cardlayoutBackground ||
    "#f6f9fb";
  const dispatch = useDispatch();
  useEffect(() => {
    if (theme) {
      dispatch(setTheme(theme));
    }
  }, [theme, dispatch]);

  return (
    <div
      id="cardLayout"
      style={{
        width: "400px",
        padding: "20px",
        background: cardlayoutBackground,
      }}
    >
      {children}{" "}
    </div>
  );
}

export default CardLayout;
