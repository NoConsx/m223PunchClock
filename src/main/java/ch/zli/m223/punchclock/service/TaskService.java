package ch.zli.m223.punchclock.service;

import ch.zli.m223.punchclock.domain.Task;
import ch.zli.m223.punchclock.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.saveAndFlush(task);
    }

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }
}