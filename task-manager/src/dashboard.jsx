import React, { useEffect, useState } from "react";
import AddNew from "./addnew";
import { FaEdit } from 'react-icons/fa';
import axios from "axios";



const EditStatus = () => {

    return (
        <>
            <div className="editstatus">


            </div>
        </>
    )
}

const DashBoard = (props) => {
    const [searchString, setSearchString] = useState('')
    const [newrecord, setNewRecord] = useState(false)
    const [editStatus, setEditStatus] = useState(false)
    const [enableDashBoard, setEnableDashBoard] = useState(true)

    const [dummyData, setDummyData] = useState([])
    const search = (event) => {
        setSearchString(event.target.value)
    }

    const gotoAddNew = () => {
        setNewRecord(true)
        setEnableDashBoard(false)
    }



    const gotologIn = () => {
        props.setDashBoard(false)
        props.setLogIn(true)
    }
    const gotoEditStatus = () => {
        props.setDashBoard(false)
        setEditStatus(true)
    }



    const dummydata = [
        {
            name: "Kite Runner ",
            category: "BooK",
            status: "pending"
        },
        {
            name: "Kite  ",
            category: "BooK 2",
            status: "completed"
        }
    ]



    const getTasks = async () => {

        try {
            const res = await axios.get('http://localhost:5000/api/v1/task');

            console.log('Here is your res: ', res);
            console.log('Here is your res.data: ', res.data);
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

        console.log(status, '---', id);
        try {
            const res = await axios.put(`http://localhost:5000/api/v1/task/${id}`, { status });
            getTasks();
        } catch (error) {
            console.log("Error while updating task: ", error);
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

                            {dummyData?.map((d) => (<tr>
                                <td>{d.name}</td>
                                <td>{d.category}</td>
                                <td>
                                    <select onChange={(e) => changeStatus(e, d._id)} className="selector" id="selectOptions" name="options" >
                                        <option value="Completed" selected={(d.status == "Completed") ? true : false}>Completed</option>
                                        <option value="In Progress" selected={(d.status == "In Progress") ? true : false}>In Progress</option>
                                        <option value="Pending" selected={(d.status == "Pending") ? true : false}>Pending</option>
                                    </select></td>

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

            {
                editStatus && <EditStatus />
            }


        </>
    )

}

export default DashBoard;