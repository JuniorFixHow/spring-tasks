import { IoSearchOutline } from "react-icons/io5";
import Button from "./Button";
import { formatDate } from "../functions/Dates";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa6";
import { useState } from "react";
import { TodoProps } from "../types/Types";
import { SearchTodo } from "../functions/Search";
import New from "./New";
import { useUser } from "@clerk/clerk-react";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";
import { API } from "../functions/Constants";

const Todos = () => {
    const [currentTodo, setCurrentTodo] = useState<TodoProps|null>(null)
    const [serach, setSearch] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const {isLoaded} = useUser()
    const {tasks} = useFetch()
    if(!isLoaded) return null;

    // console.log(tasks)

    const handleClickTodo = (todo:TodoProps)=>{
        if(todo.idd === currentTodo?.idd){
            setCurrentTodo(null);
        }else{
            setCurrentTodo(todo);
        }
    }

    const handleNew = () =>{
        setCurrentTodo(null);
        setOpen(true);
    }

    const handleCompleted = async()=>{
        try {
            const data = {
                isCompleted: !currentTodo?.isCompleted
            }
            await axios.put(`${API}/${currentTodo?.idd}`, data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async()=>{
        try {
            await axios.delete(`${API}/${currentTodo?.idd}`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="w-full px-8 py-4 flex flex-col gap-4 relative" >
        <span className="text-[1.8rem] font-bold text-center" >Tasks</span>
        <div className="flex flex-col gap-4">
            <div className="flex gap-6 items-center justify-end">
                <Button onClick={handleNew} text="New" />
                <div className="flex items-center rounded p-1 border border-slate-300">
                    <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="search...." className="outline-none bg-transparent rounded px-1 border-none placeholder:text-[0.8rem]" />
                    <IoSearchOutline className="text-slate-300" />
                </div>
            </div>

            <New currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} open={open} setOpen={setOpen} />
            <div className="flex flex-col gap-4">
                {
                    SearchTodo(tasks, serach).map((todo)=>(
                        <div key={todo.idd}  className="flex px-4 py-2 flex-col gap-2 rounded bg-white shadow">
                            <span onClick={()=>handleClickTodo(todo)}  className={`${todo.isCompleted ? 'line-through':'underline'} font-bold hover:text-blue-600 cursor-pointer w-fit`} >{todo.title}</span>
                            {
                                currentTodo?.idd === todo.idd &&
                                <div className="flex flex-col gap-2 items-start">
                                    <span className="text-[0.9rem]" >{todo.task}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[0.8rem]" >Mark {todo.isCompleted ? 'uncompleted':'completed'}</span>
                                        <input onClick={handleCompleted}  className="cursor-pointer" type="checkbox" defaultChecked={todo.isCompleted} />
                                    </div>
                                    <div className="flex items-center gap-10">
                                        <span className="text-[0.75rem] text-slate-500" >Starts: <span className="text-black" >{formatDate(new Date(todo.start))}</span></span>
                                        <span className="text-[0.75rem] text-slate-500" >Due: <span className="text-black" >{formatDate(new Date(todo.end))}</span></span>
                                    </div>

                                    <div className="flex items-center justify-end w-full gap-4">
                                        <FaPen onClick={()=>setOpen(true)}  className="cursor-pointer" color="darkblue" />
                                        <MdDelete onClick={handleDelete}  className="cursor-pointer" color="crimson" />
                                    </div>
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Todos