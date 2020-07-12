import React from 'react';

class JobDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    loadSkills = (jobInfo) => {
        let skills_list = [];

        for(let i=0; i<jobInfo.skills.length; i++){
            skills_list.push(<div className="ui olive basic label" key={`job_${this.props.selectedJob}_skill_${i}`}>{jobInfo.skills[i]}</div>);
        }
        return(
            <div>
                {skills_list}
            </div>
        );
    }

    render(){
        let jobInfo = this.props.items.applications[this.props.selectedJob];
        let company = jobInfo.job_company.charAt(0).toUpperCase() + jobInfo.job_company.slice(1);

        return(
            <div>
                <h1 className="job_title">{jobInfo.job_title}</h1>
                <h2>{company}</h2>
                <a href={jobInfo.job_link} target="_blank" rel="noopener noreferrer">Job Posting Link</a>
                <div className="skills_box">
                    <div className="ui card">
                        <div className="content">
                            <div className="header">Detected Skills Required:</div>
                            {this.loadSkills(jobInfo)}
                        </div>
                    </div>
                </div>
                <h1>Job Description:</h1>
                <p>{jobInfo.job_description}</p>
            </div>
            
        );
    }

}

export default JobDescription;