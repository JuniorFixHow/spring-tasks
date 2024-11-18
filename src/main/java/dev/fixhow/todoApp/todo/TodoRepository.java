package dev.fixhow.todoApp.todo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository<Todo, ObjectId > {
    Optional<List<Todo>> findTodoByUserId(String id);
}
