import { useEffect, useState } from "react"
import { TodoProps } from "../types/Types"
import axios from "axios"
import { API } from "../functions/Constants"
import { useUser } from "@clerk/clerk-react"

export const useFetch=()=>{
    const [tasks, setTasks] = useState<TodoProps[]>([])
    const {user} = useUser();

    useEffect(()=>{
        const FetchData = async()=>{
           try {
            if(user){
                const res = await axios.get(`${API}/user/${user.id}`)
                const data = res.data as TodoProps[];
                setTasks(data.sort((a, b)=>new Date(a.createdAt)> new Date(b.createdAt)? -1:1));
            }
           } catch (error) {
            console.log(error)
           }
        }

        FetchData()
    },[tasks, user])

    return {tasks}
}