import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = (props) => {
    return (
      <div>
          <p>Progress</p>
        <Progress style={styles} value="0">0%</Progress>
      </div>
    );
}

//Såhär ska vi skriva vår styling för saker istället för att skapa massa CSS filer :) 
const styles = {
    width: 400,
    marginLeft: 20
    };

export default ProgressBar;