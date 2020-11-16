package ch.zli.m223.punchclock.repository;

import ch.zli.m223.punchclock.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
