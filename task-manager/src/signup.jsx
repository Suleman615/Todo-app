import React, { useState } from "react"
import { api } from "./util/api"
import axios from "axios"



const SignUp = (props) => {
    const [firstname, setfirstName] = useState('')
    const [lastname, setlastNmae] = useState('')
    const [username, setUserName] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [passCheck, setCheckPass] = useState('')


    const savefirstName = (event) => {
        setfirstName(event.target.value)

    }
    const savelastName = (event) => {
        setlastNmae(event.target.value)
    }
    const saveuserName = (event) => {
        setUserName(event.target.value)
    }
    const saveMail = (event) => {
        setMail(event.target.value)
    }

    const savePassword = (event) => {
        setPassword(event.target.value)
    }
    const checkPassword = (event) => {
        setCheckPass(event.target.value)
    }

    const gotoLogIn = () => {
        props.forlogIn(true)
        props.forSignUp(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passCheck) {
            alert('Password Must be matched')
            return;
        }


        const data = {
            firstName: firstname,
            lastName: lastname,
            username,
            email: mail,
            password
        }

        try {
            const res = await axios.post('https://todo-app-blue-nu-33.vercel.app/api/v1/register', data);

            gotoLogIn()

        } catch (error) {
            console.log('Error while creating user!');
            console.log("error: ", error);
        }
    }

    return (
        <>
            <div className="signupbox box">
                <form className="signupform" onSubmit={handleSubmit}>
                    <section>
                        <label>First Name</label>
                        <input type="string" value={firstname} onChange={savefirstName} />
                    </section>
                    <section>
                        <label>Last Name</label>
                        <input type="string" value={lastname} onChange={savelastName} />
                    </section>
                    <section>
                        <label>Email</label>
                        <input type="email" value={mail} onChange={saveMail} />
                    </section>
                    <section>
                        <label>User Name</label>
                        <input type="string" value={username} onChange={saveuserName} />
                    </section>
                    <section>
                        <label>Password</label>
                        <input type="password" value={password} onChange={savePassword} />
                    </section>
                    <section>
                        <label>Recheck Password</label>
                        <input type="password" value={passCheck} onChange={checkPassword} />
                    </section>
                    <button className="submit" type="submit">Sign Up</button>
                    <p>Go to <a onClick={gotoLogIn}>Log In</a>  Page </p>
                </form>

            </div>
        </>
    )
}


export default SignUp;