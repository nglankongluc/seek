import React from 'react';
import {Storage} from 'aws-amplify';

class JobDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        job_info: "",
        company: "",
        job_requirements: "",
        job_responsibilities: "",
        job_index: 0
    };
  }

  componentDidUpdate(){
    console.log("INDEX: " + this.props.selectedJob)
    
    if (this.props.selectedJob !== this.state.job_index) {
        let jobInfo = this.props.items.applications[this.props.selectedJob];
        this.setState({ job_info: jobInfo });
        let company =
          jobInfo.job_company.charAt(0).toUpperCase() +
          jobInfo.job_company.slice(1);
        this.setState({ company: company });
        this.getRequirements(jobInfo.job_description);
        this.getResponsibilities(jobInfo.job_description);
        this.setState({job_index: this.props.selectedJob});
    }
  }

  getRequirements = async (job_desc_s3_path) => {

    let job_desc = ""

    job_desc_s3_path = job_desc_s3_path.split("/");
    job_desc_s3_path = job_desc_s3_path[2] + "/" + job_desc_s3_path[3];

    try{
        let job_desc_blob = await Storage.get(job_desc_s3_path, {
                        level: 'private',
                        contentType: 'text/plain',
                        download: true
                    })

        job_desc = await job_desc_blob.Body.text();

    }catch(e){
        console.log("Error retrieving job description: " + e.message);
    }
    
    // parse job description HTML
    const doc = new DOMParser().parseFromString(job_desc, "text/html");

    const listItemsHTML = doc.querySelectorAll("ul")[1].querySelectorAll("li");

    var requirements = [].map.call( listItemsHTML, function(v){
        return v.textContent || v.innerText || "";
    });

    const listItems = requirements.map((item) => (
      <li key={item.toString()}>{item}</li>
    ));

    this.setState({ job_requirements: listItems});

  };

  getResponsibilities = async (job_desc_s3_path) => {

    let job_desc = ""

    job_desc_s3_path = job_desc_s3_path.split("/");
    job_desc_s3_path = job_desc_s3_path[2] + "/" + job_desc_s3_path[3];

    try{
        let job_desc_blob = await Storage.get(job_desc_s3_path, {
          level: "private",
          contentType: "text/plain",
          download: true,
        });

        job_desc = await job_desc_blob.Body.text();

    }catch(e){
        console.log("Error retrieving job description: " + e.message);
    }

    const doc = new DOMParser().parseFromString(job_desc, "text/html");

    const listItemsHTML = doc.querySelectorAll("ul")[0].querySelectorAll("li");

    var responsibilities = [].map.call( listItemsHTML, function(v){
        return v.textContent || v.innerText || "";
    });

    const listItems = responsibilities.map((item) => (
      <li key={item.toString()}>{item}</li>
    ));

    this.setState({ job_responsibilities: listItems});
    
  };

  loadSkills = (jobInfo) => {
    let skills_list = [];

    if (!jobInfo.skills){
        return <div/>
    }

    for (let i = 0; i < jobInfo.skills.length; i++) {
      skills_list.push(
        <div
          className="ui olive basic label"
          key={`job_${this.props.selectedJob}_skill_${i}`}
        >
          {jobInfo.skills[i]}
        </div>
      );
    }
    return <div>{skills_list}</div>;
  };

  render() {

    return (
      <div>
        <h1 className="job_title">{this.state.job_info.job_title}</h1>
        <h2>{this.state.company}</h2>
        <a href={this.state.job_info.job_link} target="_blank" rel="noopener noreferrer">
          Job Posting Link
        </a>
        <div className="skills_box">
          <div className="ui card">
            <div className="content">
              <div className="header">Detected Skills Required:</div>
              {this.loadSkills(this.state.job_info)}
            </div>
          </div>
        </div>
        <h1>Requirements:</h1>
        <ul>{this.state.job_requirements}</ul>
        <h1>Responsibilities:</h1>
        <ul>{this.state.job_responsibilities}</ul>
      </div>
    );
  }
}

export default JobDescription;