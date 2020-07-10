import React from 'react';
import {Button} from 'semantic-ui-react';
import './App.css';
import {ICONS} from 'semantic-ui-react/src/lib/SUI'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application_count: 0,
            isLoaded: false,
            error: null,
            items: null
        };
    }

    componentDidMount(){

        // TODO: AJAX request
        // fetch("https://api.example.com/items")
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 applications: result.items
        //             });
        //         },
        //         (error) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 error
        //             });
        //         }
        //     )

        // TEMPORARY
        let result = {
            applications_count: 2,
            applications: [
                {
                    job_title: "Software Engineer",
                    job_company: "google",
                    job_link: "https://www.linkedin.com",
                    job_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    skills: ["React", "Java", "SQL"],
                    date_applied: "07/20/20"
                },
                {
                    job_title: "Site Reliability Engineer",
                    job_company: "amazon",
                    job_link: "https://www.glassdoor.com",
                    job_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    skills: ["Docker", "Kubernetes", "AWS"],
                    date_applied: "07/21/20"
                },
            ]
        }

        this.setState({
            isLoaded: true,
            items: result
        })
    }

    loadApplicationsList = () => {
        return (
            this.state.items.applications.map((item, index) => (
                <div className="item item-row" key={`application_item_${index}`}>
                    <i className={"large middle aligned icon " + 
                        (ICONS.includes(item.job_company) ? item.job_company : "briefcase")}></i>
                    <div className="content">
                        <a className="header">{item.job_title}</a>
                        <div className="description">{item.job_company}</div>
                        <div className="date">{item.date_applied}</div>
                    </div>
                    
                </div>
            ))
        );
    }

    render(){
        return (
            <div className="homepage">
                <section className="header-wrapper">
                    <div className="homepage-header">
                        {/* Title and num applications sent */}
                        <h1 className="seek">Seek</h1>
                        <div className="apps-and-progress">
                            <div className="applications">{this.state.application_count} Applications Sent</div>
                            <Button className="ui green button">Progress Board</Button>
                        </div>
                    </div>
                </section>
                <section className="body">
                    <div className="ui relaxed divided list menu application-catalog">
                        {this.state.items === null ? null : this.loadApplicationsList(this.state.items)}
                    </div>
                    <div className="application-description">
                        <div></div>
                    </div>

                </section>
            </div>
        );
    }
}

export default Homepage;
