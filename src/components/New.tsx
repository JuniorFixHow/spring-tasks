import { Alert, Modal } from '@mui/material'
import { Dispatch,  FormEvent,  SetStateAction, useRef, useState } from 'react'
import { TodoProps } from '../types/Types'
import Button from './Button'
import {  minimumDate } from '../functions/Dates'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { API } from '../functions/Constants'

type ModalProps = {
    currentTodo:TodoProps | null,
    setCurrentTodo:Dispatch<SetStateAction<TodoProps|null>>,
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
}

type ErrorProps ={
    error:boolean,
    message:string
}
const New = ({currentTodo, setCurrentTodo, open, setOpen}:ModalProps) => {
    const {user} = useUser();
    const [start, setStart] = useState<Date>(new Date())
    const [end, setEnd] = useState<Date>(new Date())
    const [title, setTtitle] = useState<string>('');
    const [task, setTask] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<ErrorProps>({error:false, message:''});

    const formRef = useRef<HTMLFormElement|null>(null)
    const handleClose = ()=>{
        setCurrentTodo(null);
        setOpen(false)
    }

    const handleNew = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        setMessage({error:false, message:""})
        try {
            if(title !=="" && task !=="" && (end > start)){
                const data = {
                    title, task,
                    isCompleted:false,
                    start:start.toString(),
                    end:end.toString(),
                    userId:user?.id
                }
                
                await axios.post(`${API}/new`, data);
                setMessage({error:false, message:"Successfully added"})
                formRef.current?.reset();
            }else{
                setMessage({error:true, message:"Please enter correct data!"})
            }
        } catch (error) {
            setMessage({error:true, message:"Error occured"})
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

    const handleUpdate = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        setMessage({error:false, message:""})
        try {
            const data = {
                title: title || currentTodo?.title,
                task: task || currentTodo?.task,
                start: start || currentTodo?.start,
                end: end || currentTodo?.end,
                isCompleted:currentTodo?.isCompleted,
                userId:currentTodo?.userId,
            }
            await axios.put(`${API}/${currentTodo?.idd}`, data);
            setMessage({error:false, message:"Successfully updated"})
            formRef.current?.reset();
        } catch (error) {
            setMessage({error:true, message:"Error occured"})
            console.log(error)
        }finally{
            setLoading(false);
        }
    }

  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='w-full h-screen'
        >
        <div className="flex size-full items-center justify-center">
            <div className="flex bg-white rounded flex-col p-8 gap-4">
                <span className='text-[1.5rem] font-bold text-center' >{currentTodo ? 'Update Task':'Add new task'}</span>
                <form onSubmit={currentTodo ? handleUpdate : handleNew} ref={formRef}  className="flex flex-col gap-2">
                    <input onChange={(e)=>setTtitle(e.target.value)} defaultValue={currentTodo?.title} placeholder='Title' type="text" className='px-2 py-1 outline-none border border-slate-300 rounded' />
                    <textarea onChange={(e)=>setTask(e.target.value)} defaultValue={currentTodo?.task} placeholder='Task'  className='px-2 py-1 outline-none border border-slate-300 rounded' />
                    <input defaultValue={currentTodo? minimumDate(new Date(currentTodo.start)):''} onChange={(e)=>setStart(new Date(e.target.value))} min={currentTodo ? minimumDate(new Date(currentTodo.start)) : minimumDate(new Date)} type='datetime-local' placeholder='Start time'  className='px-2 py-1 outline-none border border-slate-300 rounded' />
                    <input defaultValue={currentTodo? minimumDate(new Date(currentTodo.end)):''} onChange={(e)=>setEnd(new Date(e.target.value))} min={currentTodo ? minimumDate(new Date(currentTodo.end)) : minimumDate(start)} type='datetime-local' placeholder='Due time'  className='px-2 py-1 outline-none border border-slate-300 rounded' />
                    <div className="flex w-full gap-4 justify-between">
                        <Button onClick={handleClose} text='Cancel' danger />
                        <Button disabled={loading} type='submit' text={loading ? 'loading' : currentTodo? 'Update':'Create'} />
                    </div>
                    {
                        message.message &&
                        <Alert variant='standard' severity={message.error?'error':'success'} >
                            {message.message}
                        </Alert>
                    }
                </form>
            </div>
        </div>
    </Modal>
  )
}

export default New