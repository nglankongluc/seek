import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import JobDescription from "./JobDescription.js";
import ApplicationListItem from "./ApplicationListItem.js";
import Login from "./Login.js";
import {UserContext} from "./App.js";

const Homepage = (props) => {
    const [state, setState] = useState({
        selectedJob: 0,
    });

    const accInfo = useContext(UserContext);

    const selectJob = (index) => {
        setState({...state, selectedJob: index});
    };

    const loadApplicationsList = () => {
      return props.items.applications.map((item, index) => (
        <ApplicationListItem
          key={`application_item_${index}`}
          date={item.date_applied}
          item={item}
          index={index}
          selectJob={selectJob}
        />
      ));
    };

    // const sortByDate = (order) => {
    //   let sortedItems = props.items;
    //   if (order === "asc") {
    //     sortedItems.applications.sort((a, b) => {
    //       return Date.parse(a.date_applied) - Date.parse(b.date_applied);
    //     });
    //   } else {
    //     // descending
    //     sortedItems.applications.sort((a, b) => {
    //       return Date.parse(b.date_applied) - Date.parse(a.date_applied);
    //     });
    //   }
    //   setState({...state, items: sortedItems});
    // };

    // const sortByCompany = (order) => {
    //   let sortedItems = props.items;
    //   if (order === "asc") {
    //     sortedItems.applications.sort((a, b) => {
    //       if (a.job_company > b.job_company) {
    //         return 1;
    //       } else {
    //         return -1;
    //       }
    //     });
    //   } else {
    //     // descending
    //     sortedItems.applications.sort((a, b) => {
    //       if (a.job_company < b.job_company) {
    //         return 1;
    //       } else {
    //         return -1;
    //       }
    //     });
    //   }
    //   setState({...state, items: sortedItems});
    // };

    const getJobDescription = () => {
      let applications_list_empty = true;

      if (props.isLoaded && props.items.applications.length > 0) {
        applications_list_empty = false;
      }

      if (props.isLoaded && !applications_list_empty) {
        return <JobDescription {...props} selectedJob={state.selectedJob} />;
      } else {
        return (
          <div className="empty_page">
            <h1>No Jobs Applied</h1>
            <em data-emoji="anguished" className="big"></em>
          </div>
        );
      }
    };

    return (
      <div className="homepage">
        <section className="header-wrapper">
          <div className="homepage-header">
            {/* Title and num applications sent */}
            <h1 className="seek">Seek</h1>
            <div className="apps-and-progress">
              <div className="applications">
                {props.application_count} Applications Sent
              </div>
              <div>
                <Link className="ui green button" to="/board">
                  Progress Board
                </Link>
                {accInfo.username ? (
                  <Button
                    className="ui green button"
                    onClick={() => {
                      props.logout();
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Login
                    accInfoDispatch={props.accInfoDispatch}
                    setHomepageState={setState}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="body">
          <div className="ui relaxed selection divided list menu application-catalog selected">
            {props.items === null ? null : loadApplicationsList(props.items)}
          </div>
          <div className="application-description">
            {accInfo.username ? getJobDescription() : null}
          </div>
        </section>
      </div>
    );

}

export default Homepage;
