package dev.fixhow.todoApp.todo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "todos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    @Id
    private ObjectId id = new ObjectId();
    private String idd;
    private String title;
    private String task;
    private Boolean isCompleted;
    private String start;
    private String end;
    private String userId;

    @LastModifiedDate
    private Date updatedAt;

    public Todo(String title, String task, Boolean isCompleted, String start, String end, String userId) {
        this.idd = this.id.toHexString();
        this.title = title;
        this.task = task;
        this.isCompleted = isCompleted;
        this.start = start;
        this.end = end;
        this.userId = userId;
    }
}
