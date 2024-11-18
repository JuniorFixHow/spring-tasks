package dev.fixhow.todoApp.todo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v2/todos")
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> fetchTodos(){
        return new ResponseEntity<List<Todo>>(todoService.getAllTodos(), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<List<Todo>>> fetchUserTodos(@PathVariable String userId){
        return new ResponseEntity<Optional<List<Todo>>>(todoService.getUserTodos(userId), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Todo>> fetchTodo(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<Todo>>(todoService.getOneTodo(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable ObjectId id){
        boolean isDeleted = todoService.deleteOneTodo(id);
        if(isDeleted){
            return ResponseEntity.ok("Todo deleted successfully");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Todo not found");
        }
    }

    @PostMapping("/new")
    public ResponseEntity<Todo> createTodo(@RequestBody Map<String, String> payload){
        String title = payload.get("title");
        String task = payload.get("task");
        Boolean isCompleted = Boolean.valueOf(payload.get("isCompleted"));
        String start = payload.get("start");
        String end = payload.get("end");
        String userId = payload.get("userId");

        return new ResponseEntity<Todo>(todoService.createOneTodo(title, task, isCompleted, start, end, userId), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTodo(@PathVariable ObjectId id, @RequestBody Map<String, String> payload){
        String title = payload.get("title");
        String task = payload.get("task");
        Boolean isCompleted = Boolean.valueOf(payload.get("isCompleted"));
        String start = payload.get("start");
        String end = payload.get("end");
        String userId = payload.get("userId");

        todoService.updateOneTodo(id, title, task, isCompleted, start, end, userId);
        return ResponseEntity.ok("Todo updated sucessfully");
    }
}
