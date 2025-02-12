import React from "react";
import "./App.css";
import Card from "./Card/card";

function App() {
  //theme types - light,dark,pink,purple,gray,paste
  //displayFields - standard (first name , then card) , cardNumber

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
  
  //formOrder - nameFirst, cardFirst
  return (
    <div className="App">
      <header className="App-header">
        <Card
          theme="dark"
          formOrder="cardFirst"
          customStyle={{
            invalidColor: "#df1b41",
            payBtn: {
              border: "1px solid #2361d5",
              color: "#2361d5",
              background: "none",
            },
          }}
          displayFields="standard"
        ></Card>
      </header>
    </div>
  );
}

export default App;

