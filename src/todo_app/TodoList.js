import { useState } from "react";

const TodoList = ()=>{
    const [todoList,setTodoList] = useState([]);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [status] = useState(false);
    const [errors,setErrors]=useState("");
    const [statusFilter, setstatusFilter] = useState([]);
    const[editList,setEditList]=useState([]);

    // add task
const addTodo = (event) =>
{
    event.preventDefault();
  if(name.trim()!==""&&description.trim()!=="")
  {
    const taskData = {
        Name:name,
        Description:description,
        Status:status
      }
    
   setTodoList([...todoList,taskData]);
   setstatusFilter([...statusFilter,taskData]);
setName('');
setDescription('');
setErrors('');
  }
  else{
    setErrors("must fill all fields")
  }
}

// filter functions
const filterChange = (event)=>{
const value = event.target.value;
if(value==="All")
{
    const allFilter =  todoList.filter((data)=>data);
    setstatusFilter(allFilter);
}
else if(value==="NotCompleted"){
const notCompletedFilter = todoList.filter((data)=>!data.Status)
setstatusFilter(notCompletedFilter);
}
else{
    const completedFilter = todoList.filter((data)=>data.Status)
    setstatusFilter(completedFilter);
}
}
// handle edit button 
const handleEdit = (data,index)=>{
    // const updatedStatus = statusFilter.map((value, i) =>
    //   i === index ? {  ...editList,...value, } : value
    // );
    const updatedStatus = [...statusFilter];
    updatedStatus[index] = { ...data, ...editList };
   setTodoList(updatedStatus);
   setstatusFilter(updatedStatus);
    setEditList(null);
}
// edit change functions
const editChange =  (event,data,index)=>{
    const value = event.target.value;
    const editData = {
        Name:data.Name,
        Description:data.Description,
        // Status:value ==="true"?true:false,
        Status:JSON.parse(value)
    }
    setEditList(editData);
    }
    // delete function 
 const handleDelete = (index)=>{
const updatedList = [...statusFilter];
updatedList.splice(index,1);
setTodoList(updatedList);
setstatusFilter(updatedList);
 }   
return(
    <>
     {/* form */}
    <div className="form">
        <form>
                <div className="row">
                <h1 style={{marginLeft:"20%"}}>My ToDo</h1>
                </div>
             <div className="row">
                   <div className="col">
                     <input type="text" className="form-control" name="name" placeholder="Todo Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="col">
                      <input type="text" className="form-control" name="description" placeholder="Todo Description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    
                  <div className="col">
                     <button className="btn btn-primary btn-add" onClick={addTodo} >Add Todo</button>
                  </div>
                  <span style={{color:"red"}}>{errors}</span>
             </div>
         </form> 
    </div>
    {/* container  */}
 <div className="container">
     <div className="row">
      <div className="col">
      <span>My Todo List</span>
      </div>
      {/* status filter */}
      <div className="col">
        <span>Status Filter</span>
          <select className="form-select form-select-sm" name="statusFilter" defaultValue="All" onChange={filterChange}>
            <option  value="All">ALL</option>
            <option  value="NotCompleted">Not Completed</option>
            <option  value="Completed">Completed</option>
            
          </select>
       </div>
    </div>
  {/* box model */}
    <div className="Box">
    {/* task mapping */}
    {statusFilter&& statusFilter.map((data,index) => {
  return (
    <div className="cards" key={index}>
      <p>
        <label>Name </label>
        <br/> {data.Name}
      </p>
      <p>
        <label>Description </label>
        <br /> {data.Description}
      </p>
      <p>
        <label>Status </label>
        <select className="form-select form-select-sm" name="status" value={data.Status} onChange={(event)=>editChange(event,data,index)}>
          <option value={true}>Completed</option>
          <option value={false}>Not Completed</option>
        </select>
      </p>
      <button className="btn btn-secondary" onClick={()=>handleEdit(data,index)} >Edit</button>
      <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={()=>handleDelete(index)}>
       Delete
      </button>
    </div>
  );
})}

    </div>
</div>

    </>
)
}
export default TodoList;