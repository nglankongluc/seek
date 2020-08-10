// import React, { useState, useEffect } from "react";
import React from "react";
import {Button} from 'semantic-ui-react';

const ProgressBoard = (props) => {
    // const [state, setState] = useState({
    // })

    return (
      <div>
        <div>Progress Board</div>
        <Button
          className="ui green button"
          onClick={() => {
            props.pageView();
          }}
        >
          Back
        </Button>
      </div>
    );
}

export default ProgressBoard;
