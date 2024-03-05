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
	const [duringSearchdata, setduringSearchdata] = useState([])
	const [duringSearchdata1, setduringSearchdata1] = useState([])
	const [duringSearchdata2, setduringSearchdata2] = useState([])
	const [Data, setData] = useState([])
	useEffect(() => {
		async function Fetchdata() {
			setshow(true)
			let url = BASE_URL + 'students'
			const data = await fetch(url)
			const response = await data.json()
			setshow(false)
			setrowsData(response.data)
			setData(response.data)
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
		try {
			setshow(true)
		
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
			setshow(false)
		
		setdisable(false)
		setsave('cursor-pointer')
		const rows = [...rowsData]
		rows.splice(index, 1)
		setrowsData(rows)
		// console.log(rowsData.length);
		if (rowsData.length == 1) {
			setnorecord('')
		}
	} catch (error) {
		console.log(error);
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


	function handleEdit(index) {
		try {
			setshow(true)
		
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
				// console.log(rowsData[index - 1]);
				

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
		setshow(false)
	} catch (error) {
			console.log(error);
	}
	}

	async function handleSearchcity(homeCity) {
		if(homeCity==''){
			setduringSearchdata1([])
			setrowsData(Data)
		}
		else{
			setshow(true)

		let url =
			BASE_URL +
			`students?homeCity=${homeCity}`
		const data = await fetch(url)
		const response = await data.json()
		// console.log(response);
		setshow(false)

		setduringSearchdata1(response.data)
		setrowsData(response.data)
		}
		// let query=e.target.value;
        // console.log(query);
        
	}
	
	function Searchbystdname(e){
		let query=e.target.value;
        // console.log(query);
        if(query==''){
            setduringSearchdata([])
			// console.log("query:",Data);
			setrowsData(Data)
        }
       setduringSearchdata(rowsData.filter((item)=>{
            const searchitem=query.toLowerCase()
              const stdName=item.stdName.toLowerCase()

              return searchitem && (stdName.includes(searchitem));
        }))
	}
	function Searchbydate(e){
		let query=e.target.value;
        // console.log(query);
        if(query==''){
            setduringSearchdata2([])
			// console.log("query:",Data);
			setrowsData(Data)
        }
       setduringSearchdata2(rowsData.filter((item)=>{
            const searchitem=query.toLowerCase()
              const regDate=item.regDate.toLowerCase()

              return searchitem && (regDate.includes(searchitem));
        }))
	}


	async function clearFilers() {
		setshow(true)
		let url = BASE_URL + 'students'
		const data = await fetch(url)
		const response = await data.json()
		setshow(false)
		// console.log(response);
		setrowsData(response.data)
	}

	function SetDataInTable(item){
		// console.log(item);
		setduringSearchdata([])
		setduringSearchdata1([])
		setduringSearchdata2([])
		setrowsData([item])
	}
	return (
		<>
			<div className="w-full min-h-screen flex justify-center items-center font-mons ">
				<div
					name=""
					className="w-[90%] min-h-[30vh] max-h-[90vh] overflow-y-auto tabledata"
				>
					<div className="flex justify-between items-center">
						<div className="relative">
							<IoSearch className="absolute h-5 w-5 top-2 left-2" />
							<input
							type='text'
								onChange={Searchbystdname}
								placeholder="Filter by student name.."
								className="outline-none py-1 w-60 border border-[#945a28] rounded pl-8 focus:shadow-inner bg-[#ece7e2]"
							/>
							<div className='h-auto min-h-0 w-60 flex flex-col z-20 absolute bg-[#ece7e2] '>
								{
									duringSearchdata.map((item,ind)=>{
									
										return(<>
								<div key={ind} onClick={()=>{SetDataInTable(item)}} className='cursor-pointer text-center py-1 px-1 h-auto border border-gray-400 '>{item.stdName}</div>

										</>)
									})
								}

							</div>
						</div>
						<div className="relative">
							<IoSearch className="absolute h-5 w-5 top-2 left-2" />
							<input
							type='text'
								onChange={(e)=>handleSearchcity(e.target.value)}
								placeholder="Filter by home city.."
								className="outline-none py-1 w-60 border border-[#945a28] rounded pl-8 focus:shadow-inner bg-[#ece7e2]"
							/>
							<div className='h-auto min-h-0 w-60 flex flex-col z-20 absolute bg-[#ece7e2] '>
								{
									duringSearchdata1.map((item,ind)=>{
										
										return(<>
								<div key={ind} onClick={()=>{SetDataInTable(item)}} className='cursor-pointer text-center py-1 px-1 h-auto border border-gray-400 '>{item.stdName}</div>

										</>)
									})
								}
								</div>
						</div>
						<div className="relative">
							<IoSearch className="absolute h-5 w-5 top-2 left-2" />
							<input
								onChange={Searchbydate}
								type="date"
								placeholder="Filter by date.."
								className="outline-none py-1 w-60 border border-[#945a28] rounded pl-8 focus:shadow-inner bg-[#ece7e2]"
							/>
							<div className='h-auto min-h-0 w-60 flex flex-col z-20 absolute bg-[#ece7e2] '>
								{
									duringSearchdata2.map((item,ind)=>{
										
										return(<>
								<div key={ind} onClick={()=>{SetDataInTable(item)}} className='cursor-pointer text-center py-1 px-1 h-auto border border-gray-400 '>{item.stdName}</div>

										</>)
									})
								}
								</div>
						</div>

						<div className="flex justify-end space-x-2 text-white ">
							<button
								onClick={clearFilers}
								className="bg-amber-800 p-2 rounded"
							>
								Clear Searched Data
							</button>
							<button
								onClick={addTableRows}
								className="bg-amber-800 p-2 rounded"
							>
								+Add New Record
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
