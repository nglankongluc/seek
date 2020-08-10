import React from 'react';

class Error extends React.Component{

    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        return(
            <div className="error">
                <em data-emoji="anguished" className="big"></em>
                <h1>Sorry, something went wrong.</h1>
            </div>
        );
    }

}

export default Error;