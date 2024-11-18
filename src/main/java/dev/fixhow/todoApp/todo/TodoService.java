package dev.fixhow.todoApp.todo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    public List<Todo> getAllTodos(){
        return todoRepository.findAll();
    }

    public Optional<List<Todo>> getUserTodos(String userId){
        return todoRepository.findTodoByUserId(userId);
    }

    public Optional<Todo> getOneTodo (ObjectId id){
        return todoRepository.findById(id);
    }

    public Todo createOneTodo(String title, String task, Boolean isCompleted, String start, String end, String userId){
        Todo todo = new Todo(title, task, isCompleted, start, end, userId);
        todoRepository.insert(todo);
        return todo;
    }

    public boolean deleteOneTodo(ObjectId id){
        Optional<Todo> currentTodo = todoRepository.findById(id);
        if(currentTodo.isPresent()){
            todoRepository.delete(currentTodo.get());
            return true;
        }
        return false;
    }


    public Optional<Todo> updateOneTodo(ObjectId id, String title, String task, Boolean isCompleted, String start, String end, String userId){
        Optional<Todo> currentTodo = todoRepository.findById(id);
        if(currentTodo.isPresent()){
            Todo todo = currentTodo.get();
            if(title != null){
                todo.setTitle(title);
            }if(task != null){
                todo.setTask(task);
            }if(isCompleted != null){
                todo.setIsCompleted(isCompleted);
            }if(start != null){
                todo.setStart(start);
            }if(end != null){
                todo.setEnd(end);
            }if(userId != null){
                todo.setUserId(userId);
            }
            todoRepository.save(todo);
        }
        return Optional.empty();
    }
}
