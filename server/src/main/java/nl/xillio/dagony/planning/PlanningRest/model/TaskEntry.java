package nl.xillio.dagony.planning.PlanningRest.model;


import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class TaskEntry {

    @GeneratedValue()
    @Id
    private Long id;
    private String qa;
    private String project;
    private int issueNr;
    private int issuePr;
    private String issueLink;
    private Double manPrepTime;
    private Double manPerfTime;
    private Double manDocTime;
    private Double autoPrepTime;
    private Double autoPerfTime;
    private Double autoDocTime;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private Date started;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private Date ended;

    public TaskEntry() {

    }

    public TaskEntry(Long id, String qa, String project, int issueNr, int issuePr, String issueLink, Double manPrepTime, Double manPerfTime, Double manDocTime, Double autoPrepTime, Double autoPerfTime, Double autoDoctime, Date started, Date ended) {
        this.id = id;
        this.qa = qa;
        this.project = project;
        this.issueNr = issueNr;
        this.issuePr = issuePr;
        this.issueLink = issueLink;
        this.manPrepTime = manPrepTime;
        this.manPerfTime = manPerfTime;
        this.manDocTime = manDocTime;
        this.autoPrepTime = autoPrepTime;
        this.autoPerfTime = autoPerfTime;
        this.autoDocTime = autoDoctime;
        this.started = started;
        this.ended = ended;
    }

    public String getQa() {
        return qa;
    }

    public void setQa(String qa) {
        this.qa = qa;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public int getIssueNr() {
        return issueNr;
    }

    public void setIssueNr(int issueNr) {
        this.issueNr = issueNr;
    }

    public int getIssuePr() {
        return issuePr;
    }

    public void setIssuePr(int issuePr) {
        this.issuePr = issuePr;
    }

    public String getIssueLink() {
        return issueLink;
    }

    public void setIssueLink(String issueLink) {
        this.issueLink = issueLink;
    }

    public Double getManPrepTime() {
        return manPrepTime;
    }

    public void setManPrepTime(Double manPrepTime) {
        this.manPrepTime = manPrepTime;
    }

    public Double getManPerfTime() {
        return manPerfTime;
    }

    public void setManPerfTime(Double manPerfTime) {
        this.manPerfTime = manPerfTime;
    }

    public Double getManDocTime() {
        return manDocTime;
    }

    public void setManDocTime(Double manDocTime) {
        this.manDocTime = manDocTime;
    }

    public Double getAutoPrepTime() {
        return autoPrepTime;
    }

    public void setAutoPrepTime(Double autoPrepTime) {
        this.autoPrepTime = autoPrepTime;
    }

    public Double getAutoPerfTime() {
        return autoPerfTime;
    }

    public void setAutoPerfTime(Double autoPerfTime) {
        this.autoPerfTime = autoPerfTime;
    }

    public Double getAutoDocTime() {
        return autoDocTime;
    }

    public void setAutoDocTime(Double autoDocTime) {
        this.autoDocTime = autoDocTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStarted() {
        return started;
    }

    public void setStarted(Date started) {
        this.started = started;
    }

    public Date getEnded() {
        return ended;
    }

    public void setEnded(Date ended) {
        this.ended = ended;
    }
}
