package nl.xillio.dagony.planning.PlanningRest.repository;


import nl.xillio.dagony.planning.PlanningRest.model.TaskEntry;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskEntryRepository extends CrudRepository<TaskEntry, Integer> {
    TaskEntry findFirstByIssueNr(int issueNr);

    List<TaskEntry> findAllByProject(String project);

    TaskEntry findOneById(long id);
}
