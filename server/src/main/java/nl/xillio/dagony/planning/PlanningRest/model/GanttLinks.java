package nl.xillio.dagony.planning.PlanningRest.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class GanttLinks {

    @GeneratedValue()
    @Id
    private long id;
    private long source;
    private long target;
    private long type;


    public GanttLinks() {}

    public GanttLinks(long id, long source, long target, long type) {
        this.id = id;
        this.source = source;
        this.target = target;
        this.type = type;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSource() {
        return source;
    }

    public void setSource(long source) {
        this.source = source;
    }

    public long getTarget() {
        return target;
    }

    public void setTarget(long target) {
        this.target = target;
    }

    public long getType() {
        return type;
    }

    public void setType(long type) {
        this.type = type;
    }
}
