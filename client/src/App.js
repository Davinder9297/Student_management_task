import { useEffect, useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { MdModeEditOutline } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import TableRows from './Tablerows'
import Spinner from './Spinner'
import { BASE_URL } from './Confidential'
function App() {
	const [norecord, setnorecord] = useState('')
	// usestae
	const [rowsData, setrowsData] = useState([])
	const [save, setsave] = useState('cursor-not-allowed opacity-50')
	const [show, setshow] = useState(false)
	const [disable, setdisable] = useState(true)
	const [getEdit, setEdit] = useState([])
	useEffect(() => {
		async function Fetchdata() {
			let url = BASE_URL + 'students'
			const data = await fetch(url)
			const response = await data.json()
			// console.log(response);
			setrowsData(response.data)
		}
		Fetchdata()
	}, [])

	const addTableRows = () => {
		setnorecord('hidden')
		setdisable(false)
		setsave('cursor-pointer')
		const rowsInput = {
			stdName: '',
			fatherName: '',
			motherName: '',
			stdAge: null,
			homeAddress: {
				city: '',
			},
			regDate: '',
		}
		setrowsData([...rowsData, rowsInput])
		handleEdit(rowsData.length + 1)
	}
	const deleteTableRows = (index) => {
		let url = BASE_URL + 'deletestudent'
		let data = {
			id: rowsData[index]._id,
		}

		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then((data) => {
				setrowsData(data.data)
			})
			.catch((error) => {
				console.error(
					'There was a problem with your fetch operation:',
					error
				)
			})

		setdisable(false)
		setsave('cursor-pointer')
		const rows = [...rowsData]
		rows.splice(index, 1)
		setrowsData(rows)
		// console.log(rowsData.length);
		if (rowsData.length == 1) {
			setnorecord('')
		}
	}

	const handleChange = async (index, evnt) => {
		setdisable(false)
		setsave('cursor-pointer')
		const rowsInput = [...rowsData]
		const { name, value } = evnt.target
		if (name== 'homeAddress') {
			rowsInput[index][name].city = value
		} else{
			rowsInput[index][name] = value
		}
		setrowsData(rowsInput)
	}
	function Save() {
		console.log(rowsData)
	}

	function handleEdit(index) {
		if (getEdit.findIndex((data) => data == index) == -1) {
			let temp = [...getEdit]
			temp.push(index)
			setEdit(temp)
		} else {
			let temp = [...getEdit]
			let ind = temp.findIndex((it) => it == index)
			temp.splice(ind, 1)
			setEdit(temp)
			//
			let url = BASE_URL + 'updatestudent'
			if (rowsData[index - 1]._id) {
				let data = {
					id: rowsData[index - 1]._id,
					stdData: rowsData[index - 1],
				}

				fetch(url, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok')
						}
						return response.json()
					})
					.then((data) => {
						console.log('Data updated Sucessfully')
					})
					.catch((error) => {
						console.error(
							'There was a problem with your fetch operation:',
							error
						)
					})
			} else {
				let url = BASE_URL + 'registerstudent'
				console.log(rowsData[index - 1]);
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(rowsData[index - 1]),
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error('Network response was not ok')
						}
						return response.json()
					})
					.then((data) => {
						console.log('Data updated successfully:', data)
					})
					.catch((error) => {
						console.error(
							'There was a problem with your fetch operation:',
							error
						)
					})
			}
		}
	}

	async function handleSearch(regDate, stdName, homeCity) {
		let url =
			BASE_URL +
			`students?regDate=${regDate}&stdName=${stdName}&homeCity=${homeCity}`
		const data = await fetch(url)
		const response = await data.json()
		// console.log(response);
		setrowsData(response.data)
	}

	async function clearFilers() {
		let url = BASE_URL + 'students'
		const data = await fetch(url)
		const response = await data.json()
		// console.log(response);
		setrowsData(response.data)
	}

	return (
		<>
			<div className="w-full min-h-screen flex justify-center items-center font-mons ">
				<div
					name=""
					className="w-[90%] min-h-[30vh] max-h-[90vh] overflow-y-auto tablepstd"
				>
					<div className="flex justify-end w-full mb-4">
						<div className="relative">
							<IoSearch className="absolute h-5 w-5 top-2 left-2" />
							<input
								placeholder="Search data by any parameter.."
								className="outline-none py-1 w-80 border border-[#945a28] rounded pl-8 focus:shadow-inner bg-[#ece7e2]"
							/>
						</div>
					</div>
					<div className="flex justify-between items-center">
						<div className="relative">
							<IoSearch className="absolute h-5 w-5 top-2 left-2" />
							<input
								onChange={(evnt) =>
									// handleSearch(regDate, stdName, homeCity)
									handleSearch('', evnt.target.value, '')
								}
								placeholder="Filter by student name.."
								className="outline-none py-1 w-60 border border-[#945a28] rounded pl-8 focus:shadow-inner bg-[#ece7e2]"
							/>
						</div>
						<div className="relative">
							<IoSearch className="absolute h-5 w-5 top-2 left-2" />
							<input
								onChange={(evnt) =>
									// handleSearch(regDate, stdName, homeCity)
									handleSearch('', '', evnt.target.value)
								}
								placeholder="Filter by home address.."
								className="outline-none py-1 w-60 border border-[#945a28] rounded pl-8 focus:shadow-inner bg-[#ece7e2]"
							/>
						</div>
						<div className="relative">
							<IoSearch className="absolute h-5 w-5 top-2 left-2" />
							<input
								onChange={(evnt) =>
									// handleSearch(regDate, stdName, homeCity)
									handleSearch(evnt.target.value, '', '')
								}
								type="date"
								placeholder="Filter by date.."
								className="outline-none py-1 w-60 border border-[#945a28] rounded pl-8 focus:shadow-inner bg-[#ece7e2]"
							/>
						</div>

						<div className="flex justify-end space-x-2 text-white ">
							<button
								onClick={clearFilers}
								className="bg-amber-800 p-2 rounded"
							>
								Clear
							</button>
							<button
								disabled={disable}
								className={`bg-yellow-400 p-2 rounded ${save}`}
								onClick={Save}
							>
								Save Changes
							</button>
							<button
								onClick={addTableRows}
								className="bg-amber-800 p-2 rounded"
							>
								+Add Record
							</button>
						</div>
					</div>

					<table width="100%" className="mt-2 font-mons ">
						<thead>
							<tr>
								<th align="left">S.No.</th>
								<th align="left">Student Name</th>
								<th align="left">Father's Name</th>
								<th align="left">Mother's Name</th>
								<th align="left">stdAge</th>
								<th align="left">Home Address</th>
								<th align="left">Registration Date</th>
								<th align="center">Actions</th>
							</tr>
						</thead>
						<tbody className="border ">
							{rowsData.length == 0 ? (
								<tr className="">
									<td
										colSpan="10"
										className="text-center font-mons text-gray-400 font-semibold"
									>
										No record found
									</td>
								</tr>
							) : (
								<TableRows
									handleEdit={handleEdit}
									getEdit={getEdit}
									rowsData={rowsData}
									deleteTableRows={deleteTableRows}
									handleChange={handleChange}
								/>
							)}
						</tbody>
					</table>
				</div>
				{show ? (
					<div className="w-full h-screen fixed top-0 left-0 bg-[#b4cca1] opacity-80">
						<Spinner className="" />
					</div>
				) : (
					''
				)}
			</div>
		</>
	)
}

export default App
