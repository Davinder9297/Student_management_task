import {RiDeleteBin5Line} from "react-icons/ri"
import { MdModeEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
function TableRows({rowsData, deleteTableRows, handleChange , handleEdit, getEdit}) {
    return(  
        
        rowsData.map((data, index)=>{
            const {stdName,stdAge,regDate,fatherName,motherName ,homeAddress,_id}= data;
            
            // const [ind, setind] = useState(0)
            return(<>
                <tr key={index}>
                    <td><strong>{index+1}.</strong></td>
                <td className="border-2  border-slate-300  ">
                    {/* {console.log(index, getEdit)} */}
               <input disabled={!getEdit.find((data)=> data==index+1)} type="text" value={stdName}  onChange={(evnt)=>(handleChange(index, evnt))} name="stdName" className="w-[100%] focus:border-[2px] border outline-none rounded py-1 form-control"/>
                </td>
                <td className="border-2  border-slate-300">
               <input disabled={!getEdit.find((data)=> data==index+1)} value={fatherName} onChange={(evnt)=>(handleChange(index, evnt))} name="fatherName" className=" w-[100%] form-control focus:border-[2px] border outline-none rounded py-1"/>
                </td>
                <td className="border-2  border-slate-300">
                <input disabled={!getEdit.find((data)=> data==index+1)} value={motherName} onChange={(evnt)=>(handleChange(index, evnt))} name="motherName" className=" w-[100%] form-control focus:border-[2px] border outline-none rounded py-1"/>

                </td>
                <td className="border-2  border-slate-300">
                <input disabled={!getEdit.find((data)=> data==index+1)}type="number" value={stdAge} onChange={(evnt)=>(handleChange(index, evnt))} name="stdAge" className=" w-[100%] form-control focus:border-[2px] border outline-none rounded py-1 text-center"/>
                </td>
                <td className="border-2  border-slate-300">
                <input disabled={!getEdit.find((data)=> data==index+1)} value={homeAddress.city} onChange={(evnt)=>(handleChange(index, evnt))} name="homeAddress" className=" w-[100%] form-control focus:border-[2px] border outline-none rounded py-1"/>

                 </td>   
                <td className="border-2  border-slate-300">
                <input disabled={!getEdit.find((data)=> data==index+1)}type="date" value={regDate.slice(0,10)} onChange={(evnt)=>(handleChange(index, evnt))} name="regDate" className=" w-[100%] form-control focus:border-[2px] border outline-none rounded py-1"/>

                 </td>   
                <td className="border-2  border-slate-300 flex space-x-1">{getEdit.find((data)=> data==index+1)?<button  className="text-black" onClick={(e)=>(handleEdit(index+1))} ><FaSave className="text-3xl"/></button> : <button  className="text-black" onClick={(e)=>(handleEdit(index+1))} ><MdModeEdit className="text-3xl"/></button>} <button  className="text-black" onClick={(e)=>(deleteTableRows(index))} ><RiDeleteBin5Line className="text-3xl"/></button></td>
            </tr>
            </>
            )
        })
   
    )

}

export default TableRows;