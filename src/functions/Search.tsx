import { TodoProps } from "../types/Types";

export const SearchTodo = (todos:TodoProps[], text:string):TodoProps[]=>{
    const filtered = todos.filter((todo)=>{
        return text === '' ? todo : Object.values(todo)
        .join(' ')
        .toLowerCase()
        .includes(text.toLowerCase())
    })
    return filtered;
}