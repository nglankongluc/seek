import React from 'react';
import {ICONS} from 'semantic-ui-react/src/lib/SUI';

class ApplicationListItem extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        let item = this.props.item;

        return(
            <div className="item item-row" onClick={() => this.props.selectJob(this.props.index)}>
                <i className={"large middle aligned icon " +
                    (ICONS.includes(item.job_company) ? item.job_company : "briefcase")}></i>
                <div className="content">
                    <a className="header">{item.job_title}</a>
                    <div className="description">{item.job_company}</div>
                    <div className="date">{item.date_applied}</div>
                </div>
            </div>
        );
    }
}

export default ApplicationListItem;