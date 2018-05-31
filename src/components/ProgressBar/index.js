import React from 'react';
import { Progress } from 'reactstrap';
//Progress bar for a project
const ProgressBar = (props) => {
    return (
      <div>
          <p>Progress</p>
        <Progress style={styles} value="0">0%</Progress>
      </div>
    );
}

//Style of the progress bar
const styles = {
    width: 400,
    marginLeft: 20
    };

export default ProgressBar;