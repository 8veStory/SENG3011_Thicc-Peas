import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

/**
 * The login and register from. Only one is visible at a time and can be
 * switched between by clicking a button.
 * 
 * We use React 'refs'. This is a [good guide](https://reactjs.org/docs/refs-and-the-dom.html#:~:text=Refs%20provide%20a%20way%20to,created%20in%20the%20render%20method.&text=The%20child%20to%20be%20modified,React%20provides%20an%20escape%20hatch.) if you don't know how it works.
 */
export default function LoginRegisterForm({ logIn }) {
    const [isLogInActive, setIsLogInActive] = useState(logIn);

    const currentInactive = isLogInActive ? "Register" : "Login";
    const currentActive = isLogInActive ? "Login" : "Register";

    let toggleFormButton;
    const changeForm = () => {
        setIsLogInActive(!isLogInActive);
    }

    /**
     * Explanation: 'useEffect' is executed whenever React re-renders the
     * screen. Re-rendering occurs every single time a state variable is
     * changed.
     */
    useEffect(() => {
        if (!isLogInActive) {
            toggleFormButton.classList.remove("right");
            toggleFormButton.classList.add("left");
        } else {
            toggleFormButton.classList.remove("left");
            toggleFormButton.classList.add("right");
        }
    })

    return (
        <div className="login-register-form">
            <div className="container">
                <div className="form-container">
                    {isLogInActive && <LoginForm />}
                    {!isLogInActive && <RegisterForm />}
                </div>
                <ToggleFormButton containerRef={ref => toggleFormButton = ref} onClick={changeForm.bind(this)} textContent={currentInactive}></ToggleFormButton>
            </div>
        </div>
    )
}

function ToggleFormButton({ containerRef, onClick, textContent }) {
    return (
        <div className="toggle-form-button" ref={containerRef} onClick={onClick}>
            <div className="inner-container">
                <div className="text">{textContent}</div>
            </div>
        </div>
    )
}