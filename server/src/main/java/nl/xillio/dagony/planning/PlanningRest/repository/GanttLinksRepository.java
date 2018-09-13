package nl.xillio.dagony.planning.PlanningRest.repository;

import nl.xillio.dagony.planning.PlanningRest.model.GanttLinks;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GanttLinksRepository extends CrudRepository<GanttLinks, Integer> {

    List<GanttLinks> findAll();

}
