import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar';
import data from './List.json';


const Main = () => {
	const [Employee, setEmployee] = useState({
		id: "", employee: "", gender: "", age: "", designation: "", department: "", date: "", avalaible: ""
	})
	const [Item, setItem] = useState(data);
	const [Id, setId] = useState("");
	const [checked, setChecked] = useState(
		new Array(Item.length)
	);

	const [availEmployee, setavailEmployee] = useState(0)

	const OnChangeHandler = (e) => {
		setEmployee({
			...Employee,                                // spreading the unchanged values
			[e.target.name]: e.target.value,

		})
	}


	const AddItems = (e) => {
		e.preventDefault()
		const newItem = {
			employee: Employee.employee,
			gender: Employee.gender, age: Employee.age, designation: Employee.designation, department: Employee.department, date: Date.now(), available: true
		}
		const newItems = [...Item, newItem,];
		setItem(newItems);
		const dis = document.getElementById("addEmployeeModal");
		alert("New Employee Saved");
		console.log(newItem)
		setEmployee({
			id: "", employee: "", gender: "", age: "", designation: "", department: "", date: "", avalaible: true
		})
	}

	// Deleting the Item from row
	const handleDelete = (index, e) => {
		setItem(Item.filter((v, i) => i !== index));

	}

	// Editing Employee List
	const editing = (index, e) => {
		setId(index)
	}
	const editingItems = () => {
		alert("Edited")
	}
	const editItems = async (i, e) => {
		const newItem = {
			employee: Employee.employee,
			gender: Employee.gender, age: Employee.age, designation: Employee.designation, department: Employee.department, date: Date.now()
		}
		await (Item.find((v, i) => i === Id).age = newItem.age)
		Item.find((v, i) => i === Id).gender = newItem.gender;
		Item.find((v, i) => i === Id).employee = newItem.employee;
		Item.find((v, i) => i === Id).department = newItem.department;
		Item.find((v, i) => i === Id).designation = newItem.designation;
		Item.find((v, i) => i === Id).date = newItem.date;

	}

	useEffect(() => {
		editItems()
	}, [editingItems])

	//Handling Availbality
	// const handleChecked = (e) => {
	// 	setChecked(!checked)
	// }


	const handleChecked = (elm, ind) => {
		console.log("Checked")
	}

	//Searching
	const [searchValue, setsearchValue] = useState("")
	const Searchfun = (e) => {
		setsearchValue(e.target.value);
	}

	const onkeyFun = () => {
		let value = searchValue;
		let fil = value.toUpperCase();

		const searchItem = Item.filter((v, i) => v.employee.toUpperCase().includes(fil));
		if (Item.length < 1) {
			alert("No Person Found");
			window.location.reload(false);
		} else {
			setItem(searchItem);
		}

	}

	//Avilability

	const Availablity = () => {

	}
	useEffect(() => {
		onkeyFun();
	}, [])

	useEffect(() => {
		var count = 0;
		for (let i = 0; i < Item.length; i++) {
			if (Item[i].available === true) {
				count = count + 1
			}
			setavailEmployee(count);
		}
	}, [handleDelete])


	useEffect(() => {
		for (let i = 0; i < checked.length; i++) {
			console.log("checked");
			checked[i] = Item[i].available
		}
	}, [])


	return (
		<>
			<Navbar />
			<div className="wrap">
				<div className="search">
					<input type="text" id='myInput' className="searchTerm" placeholder="What are you looking for?" value={searchValue} onChange={Searchfun} onKeyUp={onkeyFun} />
					<button type="submit" className="searchButton">
						<i className="fa fa-search"></i>
					</button>
				</div>
			</div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="question-dashboard">
							<div className="card mt-4 mb-3 mb-md-4">
								<div className="card-body p-3">
									<h5 className="text-secondary mb-2">Available: <span
										className="font-weight-bold ml-1 text-dark">{availEmployee}</span></h5>
									<h5 className="text-secondary">Total: <span className="font-weight-bold ml-1 text-dark">{Item.length}</span>
									</h5>

									<button className="btn btn-primary mt-4" data-toggle="modal" data-target="#addEmployeeModal">
										<i className="fa fa-plus"></i>&nbsp; Add Employee</button>
								</div>
							</div>

							<div className="table-responsive mt-3 mt-md-4 mb-2">
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Name</th>
											<th>Department</th>
											<th>Available</th>
											<th>View Details</th>
										</tr>
									</thead>
									<tbody>
										{Item.map((elm, ind) => {
											// console.log(ind.toString());
											// console.log(elm.id)
											return (
												<tr key={ind.toString()}>
													<td>{elm.employee} </td>
													<td>{elm.department}</td>
													<td>
														<div className="custom-control custom-checkbox">

															<input type="checkbox" checked={checked[ind]} name="Availability" value="yes" className='checkbox' id="" onChange={(e) => { handleChecked(elm, ind) }} />
														</div>
													</td>
													<td>
														<button type="button" className="btn btn-outline-info btn-sm" data-toggle="modal" onClick={e => editing(ind, elm)}
															data-target="#addEmployeeModal">
															<i className="fa fa-edit"></i>&nbsp; Edit
														</button>
														<button type="button" className="btn btn-outline-danger btn-sm" onClick={e => handleDelete(ind, elm)}>
															<i className="fa fa-trash"></i>&nbsp; Delete
														</button>
													</td>
												</tr>
											)

										})}

									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				{/* <!-- row --> */}
			</div>

			<div className="modal fade" id="addEmployeeModal" tabIndex="-1" role="dialog" aria-labelledby="addEmployeeModal"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header pt-3 pb-2">
							<h5 className="modal-title" id="exampleModalCenterTitle">Add Employee</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form onSubmit={AddItems}>
								<div className="form-row ">
									<div className="form-group col-md-6">
										<label htmlFor="" className="mb-1">Name</label>
										<input type="text" className="form-control" name="employee" value={Employee.employee} onChange={OnChangeHandler} placeholder="Enter Employee Name" required
										/>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="" className="mb-1">Gender</label>
										<select className="form-control" id="exampleFormControlSelect1" name="gender" value={Employee.gender} onChange={OnChangeHandler} required>
											<option>Select</option>
											<option>Male</option>
											<option>Female</option>
										</select>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="" className="mb-1">Age</label>
										<input type="number" className="form-control" name='age' value={Employee.age} onChange={OnChangeHandler} placeholder="Enter" required />
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="" className="mb-1">Designation</label>
										<input type="text" className="form-control" id="" name='designation' value={Employee.designation} onChange={OnChangeHandler} placeholder="Enter" required />
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="" className="mb-1">Department</label>
										<input type="text" className="form-control" name='department' value={Employee.department} onChange={OnChangeHandler} id="" placeholder="Enter" required />
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="" className="mb-1">Joining Date</label>
										<input type="date" className="form-control" name='date' value={Employee.date} onChange={OnChangeHandler} id="" placeholder="" required />
									</div>
									{/* <input type="submit" className="btn btn-success btn-sm" data-dismiss="modal" value="Submit" /> */}
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-outline-danger btn-sm" data-dismiss="modal" >Cancel</button>
							<button type="button" className="btn btn-success btn-sm" onClick={AddItems} data-dismiss="modal">Save</button>
							<button type="button" className="btn btn-success btn-sm" data-dismiss="modal" onClick={editingItems}>Edit</button>
						</div>
					</div>
				</div>
			</div>


		</>
	)
}


export default Main;