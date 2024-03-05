import StudentModel from '../model/Student.model.js'

/** POST: http://localhost:8080/api/registerstudent 
* @param : {
	"stdName":"Vivek Kumar", 
	"fatherName": "Sahil Kumar", 
	"motherName": "Sharddha Kapoor", 
	"stdAge": 12, 
	"homeAddress":{
		"address_line_1": "675-E Type-2",
		"address_line_2": "RCF",
		"landmark": "Near Temple",
		"city": "Kapurthala",
		"state": "Punjab",
		"country": "India",
		"zip": 144602
	}, 
	"regDate": "2005-11-11" //"<YYYY-mm-dd>"
}
*/
export async function registerstudent(req, res) {
	try {
		const {
			stdName,
			fatherName,
			motherName,
			stdAge,
			homeAddress,
			regDate,
		} = req.body

		if (
			!stdName ||
			!fatherName ||
			!motherName ||
			!stdAge ||
			!homeAddress ||
			!regDate
		) {
			return res
				.status(500)
				.send({ succss: false, msg: 'Missing information!' })
		}

		const user = new StudentModel({
			stdName,
			fatherName,
			motherName,
			stdAge,
			homeAddress,
			regDate,
		})

		// return save result as a response
		user.save()
			.then((result) =>
				res.status(201).send({
					msg: 'Shudent Registerd Successfully',
				})
			)
			.catch((error) => res.status(500).send({ error }))
	} catch (error) {
		return res.status(500).send(error)
	}
}

export async function getstudent(req, res) {}

/** PUT: http://localhost:8080/api/updatestudent 
body: {
	"id":"65e5b47daea5584a0a1d22f3",
	"stdData":{
		"stdName":"Vivek Kumar", 
		"fatherName": "Sahil Kumar", 
		"motherName": "Sharddha Kapoor", 
		"stdAge": 12, 
		"homeAddress":{
			"address_line_1": "675-E Type-2",
			"address_line_2": "RCF",
			"landmark": "Near Temple",
			"city": "Kapurthala",
			"state": "Punjab",
			"country": "India",
			"zip": 144602
		}, 
		"regDate": "2005-11-11"
	}
}
*/
export async function updatestudent(req, res) {
	try {
		const { id, stdData } = req.body
		if (!id) return res.status(401).send({ error: 'User Not Found...!' })

		const updateUser = new Promise((resolve, reject) => {
			// update the data
			StudentModel.updateOne({ _id: id }, stdData)
				.exec()
				.then(() => {
					resolve()
				})
				.catch((error) => {
					throw error
				})
		})

		Promise.all([updateUser])
			.then(() => {
				return res.status(201).send({ msg: 'Record Updated' })
			})
			.catch((error) => {
				return res.status(500).send({ error: error.message })
			})
	} catch (error) {
		return res.status(401).send({ error })
	}
}

/** DELETE: http://localhost:8080/api/deletestudent 
body: {
	"id":"65e5b47daea5584a0a1d22f3"
}
*/
export async function deletestudent(req, res) {
	try {
		const { id } = req.body
		if (!id) return res.status(401).send({ error: 'User Not Found...!' })

		StudentModel.updateOne({ _id: id }, {delete:true})
			.exec()
			.then(() => {
				return StudentModel.find({delete: false}).exec()
			})
			.then((data) => {
				return res.status(200).send({ msg: 'Student Deleted', data })
			})
			.catch((error) => {
				return res.status(500).send({ error: error.message })
			})
	} catch (error) {
		return res.status(401).send({ error })
	}
}

/** GET: http://localhost:8080/api/students  */
/** GET: http://localhost:8080/api/students?regDate=2001-10-01&stdName=Anurag%20Shukla&homeCity=Kapurthala  */
export async function getStudent(req, res) {
    try {
        let query = { delete: false };

        // Check if registration date filter is provided
        if (req.query.regDate) {
            query.regDate = req.query.regDate;
        }

        // Check if student name filter is provided
        if (req.query.stdName) {
            query.stdName = { $regex: req.query.stdName, $options: 'i' };
        }

        // Check if home city filter is provided
        if (req.query.homeCity) {
            query['homeAddress.city'] = { $regex: req.query.homeCity, $options: 'i' };
        }

        const data = await StudentModel.find(query);
        return res.status(200).send({ success: true, data });
    } catch (error) {
        return res.status(401).send({ error });
    }
}
