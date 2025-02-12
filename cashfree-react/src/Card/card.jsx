import { useRef } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import {themes} from './themeObject';
function Card({theme,customStyle, formOrder = "nameFirst"}) {
    let cashfree, cardComponent, cvvComponent, cardHolder, cardExpiry, save;
    let paymentBtn = useRef(null),
        paymentMessage = useRef(null);
    
    let payBtn = {
        border: customStyle?.payBtn?.border || themes[theme]?.payBtn?.border ||  "1px solid #2361d5", 
        color: customStyle?.payBtn?.color || themes[theme]?.payBtn?.color ||  "#2361d5",
        background: customStyle?.payBtn?.background || themes[theme]?.payBtn?.background ||  "none"
    }
    let isNameFirst = formOrder == "nameFirst";
    let cardlayoutBackground = customStyle?.cardlayoutBackground || themes[theme]?.cardlayoutBackground || "#f6f9fb";
    const renderCard = async () => {
        cashfree = await load({
            mode: "production",
        });

        let styleObject = {
            fonts: customStyle?.fonts ||  themes[theme]?.fonts || [{ cssSrc: "https://fonts.googleapis.com/css2?family=Lato"}],
            base: {
                fontSize: customStyle?.base?.fontSize || themes[theme]?.base?.fontSize ||  "16px", 
                fontFamily: customStyle?.base?.fontFamily || themes[theme]?.base?.fontFamily || "Lato",
                backgroundColor: customStyle?.base?.backgroundColor || themes[theme]?.base?.backgroundColor ||  "#FFFFFF",
                ":focus": {
                    border:  customStyle?.base?.focusedBorder || themes[theme]?.base?.focusedBorder || "1px solid #2361d5",
                },
                border:  customStyle?.base?.border || themes[theme]?.base?.border || "1px solid #e6e6e6",
                borderRadius: customStyle?.base?.borderRadius ||  themes[theme]?.base?.borderRadius ||  "5px",
                padding:  customStyle?.base?.padding || themes[theme]?.base?.padding || "16px",
                color:  customStyle?.base?.color || themes[theme]?.base?.color || "#000000",
            },
            invalid: {
                color: customStyle?.invalidColor || themes[theme]?.invalid?.color || "#df1b41",
            },
            backgroundColor:  customStyle?.backgroundColor || themes[theme]?.backgroundColor || "#f6f9fb",
        }

        let cardOptions = {
            values: {
                placeholder: "Enter Card Number",
            },
            style: styleObject,
        };
        cardComponent = cashfree.create("cardNumber", cardOptions);
        cardComponent.mount("#cardNumber");

        let cvvOptions = {
            style: styleObject,
        };
        cvvComponent = cashfree.create("cardCvv", cvvOptions);
        cvvComponent.mount("#cardCvv");

        let cardHolderOptions = {
            values: {
                placeholder: "Enter Card Holder Name",
            },
            style: styleObject,
        };
        cardHolder = cashfree.create("cardHolder", cardHolderOptions);
        cardHolder.mount("#cardHolder");

        let cardExpiryOptions = {
            style: styleObject,
        };
        cardExpiry = cashfree.create("cardExpiry", cardExpiryOptions);
        cardExpiry.mount("#cardExpiry");

        let saveOptions = {
            values: {
                label: "Save Card for later",
            },
            style: styleObject,
        };
        save = cashfree.create("savePaymentInstrument", saveOptions);
        save.mount("#save");

        cardExpiry.on("change", function (data) {
            toggleBtn();
        });
        cardHolder.on("change", function (data) {
            toggleBtn();
        });
        cardComponent.on("change", function (data) {
            cvvComponent.update({ cvvLength: data.value.cvvLength });
            toggleBtn();
        });
        cvvComponent.on("change", function (data) {
            toggleBtn();
        });
    };

    renderCard();

    const toggleBtn = () => {
        if (
            cardExpiry.isComplete() &&
            cardHolder.isComplete() &&
            cardComponent.isComplete() &&
            cvvComponent.isComplete()
        ) {
            paymentBtn.current.disabled = false;
        } else {
            paymentBtn.current.disabled = true;
        }
    };

    const doPayment = () => {
        paymentBtn.current.disabled = true;
        cashfree.pay({
            paymentMethod: cardComponent,
            paymentSessionId: "your-payment-session-id",
            savePaymentInstrument: save,
        })
        .then(function (data) {
            if (data != null && data.error) {
                paymentMessage.current.innerHTML = data.error.message;
            }
            paymentBtn.current.disabled = false;
        });
    };

    return (
        <div id="cardLayout" style={{ width: "400px", padding: "20px", background: cardlayoutBackground}}>
            {isNameFirst ?   
                <>
                    <div id="cardHolder" style={{ marginBottom: "10px" }}></div>
                    <div id="cardNumber" style={{ marginBottom: "10px" }}></div>
                </> : 
                <>
                    <div id="cardNumber" style={{ marginBottom: "10px" }}></div>
                    <div id="cardHolder" style={{ marginBottom: "10px" }}></div>
                </>}
            
            <div style={{ marginBottom: "10px", display: "flex" }}>
                <div id="cardExpiry" style={{ marginRight: "1rem" }}></div>
                <div id="cardCvv"></div>
            </div>
            <div id="save" style={{ marginBottom: "10px" }}></div>
            <button type="submit" id="payNow" ref={paymentBtn} onClick={doPayment}
                style={{width: "100%", height: "35px", cursor: "pointer",border: payBtn.border ,color: payBtn.color , background: payBtn.background, borderRadius: "8px"}}
            >
                Pay Now
            </button>
            <p id="paymentMessage" ref={paymentMessage} style={{ color: "#df1b41" }}></p>
        </div>
    );
}

export default Card;


