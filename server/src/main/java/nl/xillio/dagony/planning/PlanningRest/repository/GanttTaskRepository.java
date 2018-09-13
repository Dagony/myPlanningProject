package nl.xillio.dagony.planning.PlanningRest.repository;

import nl.xillio.dagony.planning.PlanningRest.model.GanttTask;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GanttTaskRepository extends CrudRepository<GanttTask, Integer> {

    GanttTask findOneById(long id);

    List<GanttTask> findAll();
}
