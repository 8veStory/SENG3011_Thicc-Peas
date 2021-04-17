import { useState } from 'react';

export default function LoginPage() {
    const [login_email, login_setEmail] = useState('');
    const [login_pwd, login_setPwd] = useState('');
    return (
        <div class="container">
            <h1>Login</h1>
            <p>Please enter details to login</p>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" value={login_email} onChange={a => login_setEmail(a.target.value)} required></input>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" value={login_pwd} onChange={a => login_setPwd(a.target.value)} required></input>

            <div class="clearfix">
                <button href="/" class="cancelbtn">Cancel</button>
                <button type="submit" class="loginbtn">Login</button>
            </div>
        </div>
    )
}