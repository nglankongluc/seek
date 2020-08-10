import React, { useState, useEffect, useReducer } from "react";
import Homepage from "./Homepage.js";
import ProgressBoard from "./ProgressBoard.js";
import Error from "./Error.js";
import "fomantic-ui-css/semantic.css";
import "./Error.css";
import "./JobDescription.css";
import "./HomePage.css";
import "./Login.css";
import { listApplications } from "./graphql/queries";
import { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import AWSAppSyncClient from "aws-appsync";
import gql from "graphql-tag";

const GRAPHQL_API_REGION = awsconfig.aws_appsync_region;
const GRAPHQL_API_ENDPOINT_URL = awsconfig.aws_appsync_graphqlEndpoint;
const AUTH_TYPE = awsconfig.aws_appsync_authenticationType;

export const UserContext = React.createContext();

// AppSync client instantiation
const client = new AWSAppSyncClient({
  url: GRAPHQL_API_ENDPOINT_URL,
  region: GRAPHQL_API_REGION,
  auth: {
    type: AUTH_TYPE,
    // Get the currently logged in users credential.
    jwtToken: async () =>
      (await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  complexObjectsCredentials: () => Auth.currentCredentials(),
});

function accInfoReducer(state, action){
    console.log("DISPATCH CALLED");
    switch(action.type){
        case "signin":
            console.log("ACTIONS: " + action.username + " " + action.password);
            return {
                username: action.username,
                password: action.password,
                authToken: action.authToken
            }
        case "signout":
            console.log("ACTIONS: ");
            return {
                username: null,
                password: null,
                authToken: null
            };
        default:
            return {...state};
    }
}

const App = () => {

    const [state, setState] = useState({
      current_page_view: "homepage",
      application_count: 0,
      isLoaded: false,
      error: null,
      items: null,
    });

    const [accInfo, accInfoDispatch] = useReducer(accInfoReducer, {
        username: null,
        password: null,
        authToken: null
    })

    useEffect(() => {
        if (accInfo.username !== null){
            console.log("Found username not null, fetching");
            console.log(accInfo.username);
            fetchData();
        }
    }, [accInfo])

    const fetchData = async () => {
      if (accInfo.username) {
        try {
            // get data from graphQL
            await client
                .query({
                    query: gql(listApplications),
                })
                .then(({ data }) => {
                    const applications = data.listApplications.items;
                    const applicationLength = applications.length;
                    const items = {
                    applications_count: applicationLength,
                    applications: applications,
                };
                setState({...state, items: items, isLoaded: true});
            });
        } catch (err) {
            console.log("Error while fetching: " + JSON.stringify(err));
            setState({...state, error: err});
        }
      }
    };

    const changeViews = () => {
        if (state.current_page_view === "homepage") {
          setState({...state, current_page_view: "progressboard"});
        } else {
          setState({ ...state, current_page_view: "homepage" });
        }
    };

    const logout = () => {
        console.log("Logging out!!!");
        accInfoDispatch({type: "signout"});
        Auth.signOut();
        setState({
            ...state, 
            isLoaded: false,
            error: null,
            items: null,
            application_count: 0
        });
    };

    if (state.error !== null) {
        return <Error className="empty_page" error={state.error} />;
    } else {
        return state.current_page_view === "homepage" ? (
            <UserContext.Provider value={accInfo}>
                <Homepage
                    {...state}
                    pageView={changeViews}
                    logout={() => logout()}
                    accInfoDispatch={accInfoDispatch}
                />
            </UserContext.Provider>
        ) : (
          <ProgressBoard {...state} pageView={changeViews} />
        );
    }

}

export default App;