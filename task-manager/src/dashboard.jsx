import React, { useEffect, useState } from "react";
import AddNew from "./addnew";
import axios from "axios";





const DashBoard = (props) => {
    const [newrecord, setNewRecord] = useState(false)
    const [enableDashBoard, setEnableDashBoard] = useState(true)

    const [dummyData, setDummyData] = useState([])


    const gotoAddNew = () => {
        setNewRecord(true)
        setEnableDashBoard(false)
    }



    const gotologIn = () => {
        props.setDashBoard(false)
        props.setLogIn(true)
    }








    const getTasks = async () => {

        try {
            const res = await axios.get('https://schedule-my-task.vercel.app/api/v1/task');

            setDummyData(res.data.tasks)

        } catch (error) {
            console.log("Error while fetching tasks: ", error);
        }
    }

    useEffect(() => {
        getTasks();
    }, [])


    const changeStatus = async (e, id) => {
        let status = e.target.value;

        try {
            const res = await axios.put(`https://schedule-my-task.vercel.app/api/v1/task/${id}`, { status });
            getTasks();
        } catch (error) {
            console.log("Error while updating task: ", error);
        }


    }

    const deleteTask = async (id) => {
        console.log(id)
        try {
            const res = await axios.delete(`https://schedule-my-task.vercel.app/api/v1/task/${id}`);
            getTasks();
        } catch (error) {
            console.log("Error while deleting task: ", error);
        }
    }

    return (
        <>{enableDashBoard &&
            <div className="dashboard">
                <header>

                    <button onClick={gotologIn} className="logout">Log Out</button>
                    <button className="addnewbutton" onClick={gotoAddNew}>Add New</button>

                </header>

                <div className="table">
                    <table >
                        <thead>

                            <tr >
                                <th> Name </th>
                                <th>Category </th>
                                <th>Status </th>
                            </tr>

                        </thead>
                        <tbody>

                            {dummyData?.map((d, index) => (
                                <tr key={index}>
                                    <td>{d.name}</td>
                                    <td>{d.category}</td>
                                    <td className="editTab">
                                        <select onChange={(e) => changeStatus(e, d._id)} className="selector" id="selectOptions" name="options" >
                                            <option value="Completed" selected={(d.status == "Completed") ? true : false}>Completed</option>
                                            <option value="In Progress" selected={(d.status == "In Progress") ? true : false}>In Progress</option>
                                            <option value="Pending" selected={(d.status == "Pending") ? true : false}>Pending</option>
                                        </select>
                                        <button onClick={(d_id)=>deleteTask(d_id)} type="button" className="editButton">X</button>
                                    </td>


                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        }
            {
                newrecord &&
                <AddNew showDashBoard={setEnableDashBoard} setAddNew={setNewRecord} getTasks={getTasks} />

            }




        </>
    )

}

export default DashBoard;