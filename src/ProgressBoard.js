// import React, { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {Button} from 'semantic-ui-react';

const ProgressBoard = (props) => {
    // const [state, setState] = useState({
    // })

    return (
      <div>
        <div>Progress Board</div>
        <Link className="ui green button" to="/">
          Back
        </Link>
      </div>
    );
}

export default ProgressBoard;
