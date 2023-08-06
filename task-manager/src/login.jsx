import React, { useState } from "react"
import SignUp from "./signup"
import DashBoard from "./dashboard"
import axios from "axios"






const LogIn = () => {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [signup, setSignUp] = useState(false)
    const [logIn, setLogIn] = useState(true)
    const [dashBoard, setDashBoard] = useState(false)

    // const checkUser = () => {
    //     const url = "mongodb+srv://my_tasks:Ta$kMana9er@task-manager.frnyqhb.mongodb.net/?retryWrites=true&w=majority"
    //     MongoClient.connect(url, function (err, client) {
    //         if (err) {
    //             console.error('Failed to connect to the database:', err);
    //             return;
    //         }

    //         console.log('Connected successfully to the database');

    //         // Your database interactions go here

    //         client.close(); // Close the connection when finished
    //     });

    // }




    const saveMail = (event) => {
        setMail(event.target.value)
    }

    const savePassword = (event) => {
        setPassword(event.target.value)
    }

    const gotosignup = () => {
        setSignUp(true)
        setLogIn(false)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/v1/login', { email: mail, password });

            console.log('Here is your res: ', res);
            console.log('Here is your res.data: ', res.data);

            localStorage.setItem("token", JSON.stringify(res.data.token))

            gotoDashBoard();
        } catch (error) {
            console.log("Error while login: ", error);
        }
    }
    const gotoDashBoard = () => {
        setSignUp(false)
        setLogIn(false)
        setDashBoard(true)
    }

    return (
        <>


            {logIn &&
                <div className="loginbox box">
                    <form action="" className="loginform" onSubmit={handleSubmit}>
                        <section>
                            <label>Email</label>
                            <input type="email" value={mail} onChange={saveMail} />

                        </section>
                        <section>
                            <label>Password</label>
                            <input type="password" value={password} onChange={savePassword} />
                        </section>
                        <button className="submit" type="submit"> logIn</button>
                        <p>New User <a onClick={gotosignup}>Click here</a> to Register</p>
                    </form>
                </div>}
            {
                signup && <SignUp forlogIn={setLogIn} forSignUp={setSignUp} />
            }
            {
                dashBoard && <DashBoard setLogIn={setLogIn} setSignUp={setSignUp} setDashBoard={setDashBoard} dashBoard={dashBoard} />
            }
        </>
    )
}


export default LogIn;