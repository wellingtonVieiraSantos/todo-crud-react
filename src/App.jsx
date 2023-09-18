import { useEffect, useState } from "react"

import {RiAddBoxFill,RiDeleteBin2Fill,RiEditBoxFill,RiCheckboxFill} from 'react-icons/ri'

function App() {

  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)
  const [editableTask, setEditableTask] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  //create
  useEffect(()=>{
    if(!tasks || tasks.length == 0) return
    const objectToJson = JSON.stringify(tasks)
    localStorage.setItem('tasks', objectToJson)
  },[tasks])

  //read
  useEffect(()=>{
    const data = localStorage.getItem('tasks')
    if(!data) setTasks([])
    const jsonToObject = JSON.parse(data)
    setTasks(jsonToObject)
  },[])

  const handleTasks = () =>{
    if(!task) return
    if(!tasks) setTasks([task])
    else setTasks(prevState => [...prevState, task])
    setTask('')
  }

  //delete
  const handleDelete = (index) =>{
    const newTasks = tasks.filter((task,i)=> i !== index);
    setTasks(newTasks)
  }

  //update
  const handleEdit = (index) =>{
    setTasks(prevState => prevState.map((tsk,i)=>{
      if(i === index){
        if(!editableTask) return handleDelete(index)
        else return editableTask
      }
      else return tsk
    }))
    setEditableTask('')
    setIsEditing(false)
  }

  return (
    <main className="relative w-screen h-screen bg-slate-900 font-montserrat">
      <div className="w-2/3 flex flex-col m-auto items-center p-5 gap-4">
        <h1 className="text-2xl font-bold text-slate-100">To Do List</h1>
        <div className="flex">
          <input
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            type="text"
            placeholder="Add task"
            className="bg-slate-800 rounded-l outline-none text-slate-100 py-2 px-4 placeholder:text-slate-100"/>
          <button
            onClick={handleTasks}
            className="text-xl text-slate-100 bg-slate-700 p-2 px-4 rounded-e hover:bg-blue-500 transition-all">
              <RiAddBoxFill/>
          </button>
        </div>
      </div>
      <div>
        {tasks &&
        <ul className="max-w-2xl flex flex-col gap-1 p-2 m-auto">
          {tasks.map((task,index) =>(
            <li key={index}
              className="flex justify-between items-center p-4 text-slate-100 bg-slate-800 rounded"
            >
              {isEditing && editingIndex === index ?
              <input type="text"
                onChange={(e)=>setEditableTask(e.target.value)}
                onBlur={(e)=>{if(!e.target.value)setIsEditing(false)}}
                className="outline-none bg-slate-700 rounded px-2 py-1 text-slate-100 focus-visible:outline-violet-500"
              /> :
              <div className="font-semibold px-2">
                <input type="checkbox" id={index} className="peer hidden"/>
                <label htmlFor={index} className="peer-checked:line-through peer-checked:text-green-500 cursor-pointer">{task}</label>
              </div>
              }
              <div className="flex gap-2 text-xl">
                {isEditing && editingIndex === index ?
                  <button
                    onClick={()=>handleEdit(index)}
                    className="flex items-center gap-2 py-1 px-2 hover:text-emerald-500 transition-all">
                      <RiCheckboxFill/></button> :
                  <button
                    onClick={()=>{
                      setEditingIndex(index)
                      setIsEditing(true)
                    }}
                    className="flex items-center gap-2 py-1 px-2 hover:text-sky-500 transition-all">
                      <RiEditBoxFill/></button>
                }
                <button
                  onClick={()=>handleDelete(index)}
                  className="flex items-center aspect-square gap-2 py-1 px-2 hover:text-red-500 transition-all">
                    <RiDeleteBin2Fill/></button>
              </div>
            </li>
          ))}
        </ul>
          }
      </div>
    </main>
  )
}

export default App
