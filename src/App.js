import React, { useState, useEffect, useReducer } from "react";
import { Switch, Route, BrowserRouter} from "react-router-dom";
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
            return {
                session: action.session
            }
        case "signout":
            console.log("ACTIONS: ");
            return {
                session: null
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
        session: null
    })

    // useEffect(() => {
    //     if (accInfo.username !== null){
    //         console.log("Found username not null, fetching");
    //         console.log(accInfo.username);
    //         fetchData();
    //     }
    // }, [accInfo])

    useEffect(() => {
        const loadData = async () => {
            console.log("Refreshing...")
            try{
                const session = (await Auth.currentSession()).getAccessToken()
                if (!state.isLoaded && session !== null) {
                    await fetchData()
                }
            }catch(err){
                console.log("No session found.")
            }
        }
        loadData();
        
    }, []);

    useEffect(() => {
        console.log("Detected accInfo change")
        const loadData = async () => {
            try{
                const session = (await Auth.currentSession()).getAccessToken()
                if (!state.isLoaded && state.items !== null){
                    setState({...state, isLoaded: true})
                    accInfoDispatch({
                        type: "signin",
                        session: session
                    });
                }
            }catch(err){
                console.log("Error upon state.items change: " + err)
            }
        }
        loadData();
        
    }, [state.items]);

    useEffect(() => {
        const fetchWrapper = async () => {
            await fetchData()
        }
        fetchWrapper();
    }, [accInfo])

    const fetchData = async () => {
        console.log("fetching data...");
        const session = (await Auth.currentSession()).getAccessToken();

        // if (accInfo.username) {
        if (session !== null) {
            console.log("no session, retreiving data")
          try {
            // get data from graphQL
            await client
              .query({
                query: gql(listApplications),
                fetchPolicy: "no-cache",
              })
              .then(({ data }) => {
                const applications = data.listApplications.items;
                const applicationLength = applications.length;
                const items = {
                  applications_count: applicationLength,
                  applications: applications,
                };
                setState({ ...state, items: items});
              });
          } catch (err) {
            console.log("Error while fetching: " + JSON.stringify(err));
            setState({ ...state, error: err });
          }
        }
    };

    const logout = () => {
        console.log("Logging out!!!");
        // accInfoDispatch({type: "signout"});
        Auth.signOut();
        setState({
            ...state, 
            isLoaded: false,
            error: null,
            items: null,
            application_count: 0
        });
        accInfoDispatch({
            type: "signout",
            session: null
        });
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                    <UserContext.Provider value={accInfo}>
                        <Homepage
                        {...state}
                        logout={() => logout()}
                        accInfoDispatch={accInfoDispatch}
                        />
                    </UserContext.Provider>
                    )}
                />
                <Route
                    exact
                    path="/board"
                    render={() => <ProgressBoard {...state}/>}
                />
            </Switch>
        </BrowserRouter>
    );

}

export default App;