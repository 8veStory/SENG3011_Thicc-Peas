import React, { useState, useEffect } from "react";
import PhoneForm from "./PhoneForm";
import EmailForm from "./EmailForm";
import { usePrevious} from "../../utils/Helper";
import "./EmailPhoneForm.css";

/**
 * The login and register from. Only one is visible at a time and can be
 * switched between by clicking a button.
 * 
 * We use React 'refs'. This is a [good guide](https://reactjs.org/docs/refs-and-the-dom.html#:~:text=Refs%20provide%20a%20way%20to,created%20in%20the%20render%20method.&text=The%20child%20to%20be%20modified,React%20provides%20an%20escape%20hatch.) if you don't know how it works.
 */
export default function EmailPhoneForm(props) {
    // State variable passed from <Link> tags in NavBar.
    let fromLogIn;
    let cameFromLink;
    if (props.location.state) {
        fromLogIn = props.location.state.fromLogIn;
        cameFromLink = props.location.state.cameFromLink;
    }

    // React state
    const [isLogInActive, setIsLogInActive] = useState(false);

    // if ((fromLogIn != null || fromLogIn != undefined)) {
    //     setIsLogInActive(fromLogIn);
    // }

    if (fromLogIn !== undefined && cameFromLink && isLogInActive !== fromLogIn) {
        // If we click 'Log In' or 'Sign Up' on the the register page, make the
        // form update.
        setIsLogInActive(fromLogIn);
    }

    const currentInactive = isLogInActive ? "Email" : "Phone";
    const currentActive = isLogInActive ? "Phone" : "Email";
    let toggleFormButton;

    const changeForm = () => {
        if (props.location.state) {
            props.location.state.cameFromLink = false;
        }
        setIsLogInActive(!isLogInActive);
    }

    /**
     * Explanation: 'useEffect' is executed whenever React re-renders the
     * screen. Re-rendering occurs every single time a state variable is
     * changed.
     * 
     * Here, we change the position of the toggle button every single time it's
     * clicked.
     */
    useEffect(() => {
        if (!isLogInActive) {
            toggleFormButton.classList.remove("right");
            toggleFormButton.classList.add("left");
        } else {
            toggleFormButton.classList.remove("left");
            toggleFormButton.classList.add("right");
        }
    }, [isLogInActive]);

    return (
        <div className="login-register-form">
            <div className="form-container">
                <div className="input-container">
                    {isLogInActive && <PhoneForm set_login_status={props.set_login_status} clinicInfo={props.clinicInfo}/>}
                    {!isLogInActive && <EmailForm set_login_status={props.set_login_status} clinicInfo={props.clinicInfo}/>}
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
