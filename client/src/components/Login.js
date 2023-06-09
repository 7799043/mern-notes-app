import React from 'react'


export default function Login() {

    return (
        <section className="login-page">
            <div className="login create-note">
                <h2>Login</h2>
                <form>
                    <input type="email" name="email" id="login-email"
                        placeholder="Email" />

                    <input type="password" name="password" id="login-password"
                        placeholder="Password" autoComplete="true" />

                    <button type="submit">Login</button>
                    <p>You don't have an account?
                        <span> Register Now</span>
                    </p>
                    <h3></h3>
                </form>
            </div>
        </section>
    )
}