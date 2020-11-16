import React, {useEffect, useState, useRef} from 'react';
import Axios from 'axios';
import './App.css';
import {
    TableCell,
    TableBody,
    Table,
    Button,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Select
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

function App() {
    const checkIn = useRef();
    const checkOut = useRef();
    const taskName = useRef();
    const companyName = useRef();

    const [entries, setEntries] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);

    const [request, setRequest] = useState([]);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    let api = `http://localhost:8081/entries`;
    let userApi = `http://localhost:8081/users`;
    let taskApi = `http://localhost:8081/tasks`;
    let companyApi = `http://localhost:8081/companies`;


    useEffect(() => {
        Axios.get(api)
            .then(res => {
                setEntries(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    const onEntryDelete = id => {
        if (window.confirm("Are you sure you want to delete this?")) {
            Axios.delete(`${api}/${id}`)
                .then(res => {
                    setEntries(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const onEntryEdit = entry => {
        setRequest({
            path: `${api}/${entry.id}`,
            type: "PUT",
            checkIn: entry.checkIn,
            checkOut: entry.checkOut,
            taskName: entry.taskName,
            companyName: entry.companyName
        });
        setOpen1(true);
    }

    const onEntryAdd = () => {
        setRequest({
            path: `${api}`,
            type: "POST",
            checkIn: null,
            checkOut: null,
            taskName: null,
            companyName: null
        });
        setOpen1(true);
    }

    const onTaskDelete = id => {
        if (window.confirm("Are you sure you want to delete this?")) {
            Axios.delete(`${taskApi}/${id}`)
                .then(res => {
                    setTasks(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const onTaskEdit = task => {
        setRequest({
            path: `${taskApi}/${task.id}`,
            type: "PUT",
            taskName: task.taskName,
        });
        setOpen2(true);
    }

    const onTaskAdd = () => {
        setRequest({
            path: `${taskApi}`,
            type: "POST",
            taskName: null,
        });
        setOpen2(true);
    }

    const onCompanyDelete = id => {
        if (window.confirm("Are you sure you want to delete this?")) {
            Axios.delete(`${companyApi}/${id}`)
                .then(res => {
                    setCompanies(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const onCompanyEdit = company => {
        setRequest({
            path: `${companyApi}/${company.id}`,
            type: "PUT",
            companyName: company.taskName,
        });
        setOpen3(true);
    }

    const onCompanyAdd = () => {
        setRequest({
            path: `${companyApi}`,
            type: "POST",
            companyName: null,
        });
        setOpen3(true);
    }

    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleClose3 = () => {
        setOpen3(false);
    };

    const handleEntrySubmit = (event) => {
        event.preventDefault();
        Axios({
            method: request.type,
            url: request.path,
            data: {
                checkIn: checkIn.current.value,
                checkOut: checkOut.current.value,
                taskName: taskName.current.value,
                companyName: companyName.current.value
            }
        }).then(res => {
            setEntries(res.data)
        })
            .catch(err => {
                console.log(err)
            });
        handleClose1();
    }

    const handleTaskSubmit = (event) => {
        event.preventDefault();
        Axios({
            method: request.type,
            url: request.path,
            data: {
                taskName: taskName.current.value,
            }
        }).then(res => {
            setTasks(res.data)
        })
            .catch(err => {
                console.log(err)
            });
        handleClose2();
    }

    const handleCompanySubmit = (event) => {
        event.preventDefault();
        Axios({
            method: request.type,
            url: request.path,
            data: {
                companyName: companyName.current.value,
            }
        }).then(res => {
            setCompanies(res.data)
        })
            .catch(err => {
                console.log(err)
            });
        handleClose3();
    }

    return (
        <div className="App">
            <Button
                color="primary"
                onClick={() => onEntryAdd()}>
                Create new Entry
            </Button>
            <Dialog open={open1} onClose={handleClose1} aria-labelledby="newEntryDialog">
                <DialogTitle id="newEntryDialog">Edit/Add Entry</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleEntrySubmit}>
                        <TextField
                            name="checkIn"
                            autoFocus
                            margin="dense"
                            id="entryCheckIn"
                            label="CheckIn"
                            type="LocalDateTime"
                            fullWidth
                            defaultValue={request.checkIn}
                            inputRef={checkIn}
                        />
                        <TextField
                            name="checkOut"
                            margin="dense"
                            id="entryCheckIn"
                            label="CheckOut"
                            type="LocalDateTime"
                            fullWidth
                            defaultValue={request.checkOut}
                            inputRef={checkOut}
                        />
                        <TextField
                            name="tasks"
                            margin="dense"
                            id="entryTask"
                            label="Task"
                            type="String"
                            fullWidth
                            defaultValue={request.taskName}
                            inputRef={taskName}
                        />
                        <TextField
                            name="company"
                            margin="dense"
                            id="entryCompany"
                            label="Company"
                            type="String"
                            fullWidth
                            defaultValue={request.companyName}
                            inputRef={companyName}
                        />
                        <div>
                            <Button onClick={handleClose1}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" label="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Button
                color="primary"
                onClick={() => onTaskAdd()}>
                Add new Task
            </Button>
            <Dialog open={open2} onClose={handleClose2} aria-labelledby="newTaskDialog">
                <DialogTitle id="Tasks">Edit/Add Task</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleTaskSubmit}>
                        <TextField
                            name="text"
                            autoFocus
                            margin="dense"
                            id="task"
                            label="Task"
                            fullWidth
                            inputRef={taskName}
                        />
                        <div>
                            <Button onClick={handleClose2}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" label="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Button
                color="primary"
                onClick={() => onCompanyAdd()}>
                Add new Company
            </Button>
            <Dialog open={open3} onClose={handleClose3} aria-labelledby="New Company">
                <DialogTitle id="newCompany">Edit/Add Company</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleCompanySubmit}>
                        <TextField
                            name="company"
                            autoFocus
                            margin="dense"
                            id="company"
                            label="Company"
                            fullWidth
                            inputRef={companyName}
                        />
                        <div>
                            <Button onClick={handleClose3}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" label="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>CheckIn</TableCell>
                            <TableCell>CheckOut</TableCell>
                            <TableCell>Task</TableCell>
                            <TableCell>Company</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entries.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell component="th" scope="row">
                                    {entry.id}
                                </TableCell>
                                <TableCell>{entry.checkOut}</TableCell>
                                <TableCell>{entry.checkIn}</TableCell>
                                <TableCell>{entry.taskName}</TableCell>
                                <TableCell>{entry.companyName}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained"
                                            color="primary"
                                            onEntryClick={() => onEntryEdit(entry)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained"
                                            color="secondary"
                                            onClick={() => onEntryDelete(entry.id)}
                                            startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Task</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell component="th" scope="row">
                                    {task.id}
                                </TableCell>
                                <TableCell>{task.taskName}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained"
                                            color="primary"
                                            onClick={() => onTaskEdit(task)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained"
                                            color="secondary"
                                            onClick={() => onTaskDelete(task.id)}
                                            startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Company</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell component="th" scope="row">
                                    {company.id}
                                </TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained"
                                            color="primary"
                                            onClick ={() => onCompanyEdit(company)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained"
                                            color="secondary"
                                            onClick={() => onCompanyDelete(company.id)}
                                            startIcon={<DeleteIcon/>}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default App;