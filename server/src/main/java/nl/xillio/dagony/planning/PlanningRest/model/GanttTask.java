package nl.xillio.dagony.planning.PlanningRest.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class GanttTask {

    @GeneratedValue()
    @Id
    private Long id;
    private String text;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") // dd-MM-yyyy
    private Date startDate;
    private int duration;
    private Double progress;
    private Long parent;

    public GanttTask() {

    }

    public GanttTask(Long id, String text, Date startDate, int duration, Double progress, Long parent) {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Double getProgress() {
        return progress;
    }

    public void setProgress(Double progress) {
        this.progress = progress;
    }

    public Long getParent() { return parent; }

    public void setParent(Long parent) { this.parent = parent; }

}
