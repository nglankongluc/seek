import React from 'react';


class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div className="ui">
                <div className="ui active dimmer">
                    <div className="ui massive olive text loader">Loading</div>
                </div>
            </div>
        );
    }

}

export default Loading;