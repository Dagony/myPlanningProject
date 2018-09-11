package nl.xillio.dagony.planning.PlanningRest.controller;

import io.swagger.annotations.Api;
import nl.xillio.dagony.planning.PlanningRest.model.TaskEntry;
import nl.xillio.dagony.planning.PlanningRest.repository.TaskEntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "Swagger2DemoRestController", description = "REST Apis related to TaskEntry")
@RestController
public class Swagger2DemoRestController {

    private final TaskEntryRepository ter;

    @Autowired
    public Swagger2DemoRestController(TaskEntryRepository ter) {
        this.ter = ter;
    }

    @GetMapping("/taskentries/{id}")
    public TaskEntry getTaskEntry(@PathVariable(value = "id") long id) {
        return ter.findOneById(id);
    }

    @GetMapping("/getTaskEntryByIssueNr/{issueNr}")
    public TaskEntry getTaskEntryByIssuenr(@PathVariable(value = "issueNr") int issueNr) {
        return ter.findFirstByIssueNr(issueNr);
    }

    @GetMapping("/getTaskEntriesByProject/{project}")
    public List<TaskEntry> getTaskEntriesByProject(@PathVariable(value = "project") String project) {
        return ter.findAllByProject(project);
    }

    @GetMapping("/taskentries")
    public Iterable<TaskEntry> getTaskEntries() {
        return ter.findAll();
    }

    @PutMapping("/taskentries")
    public void updateTaskEntry(@RequestBody TaskEntry body) {
        ter.save(body);
    }

    @PostMapping("/TaskEntries")
    public TaskEntry createTaskEntry(@RequestBody TaskEntry body) {
        body.setId(null);
        return ter.save(body);
    }
}
