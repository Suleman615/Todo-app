import axios from "axios";
import React, { useState } from "react";


const AddNew = (props) => {

    const [name, setName] = useState("")
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('Completed')

    const saveName = (event) => {
        setName(event.target.value)
    }
    const saveCategory = (event) => {
        setCategory(event.target.value)
    }
    const saveStatus = (event) => {
        setStatus(event.target.value)
    }
    const addData = () => {
        props.setAddNew(false)
        props.showDashBoard(true)
        props.getTasks()
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://todo-app-blue-nu-33.vercel.app/api/v1/task', { name, category, status });

            console.log('Here is your res: ', res);
            console.log('Here is your res.data: ', res.data);

            addData()
        } catch (error) {
            console.log("Error while login: ", error);
        }
    }

    return (
        <>
            <div className="addnew">

                <form onSubmit={handleSubmit}>

                    <section>
                        <label>Name</label>
                        <input type="text" placeholder="To Do..." value={name} onChange={saveName} />
                    </section>
                    <section>
                        <label>Category</label>
                        <input type="text" placeholder="ex. Book, Movie..." value={category} onChange={saveCategory} />
                    </section>
                    <section>
                        <label>Select Status :</label>
                        <select onChange={(e) => setStatus(e.target.value)} className="selector" id="selectOptions" name="options" >
                            <option value="Completed"  >Completed</option>
                            <option value="In Progress" >In Progress</option>
                            <option value="Pending" >Pending</option>
                        </select>
                    </section>
                    <button type="submit">add</button>

                </form >
            </div>
        </>
    )
}
export default AddNew;