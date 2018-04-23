import React from 'react';
import { Progress } from 'reactstrap';

const ProgressBar = (props) => {
    return (
      <div>
          <p>Progress Project</p>
        <Progress style={styles} value="60">60%</Progress>
      </div>
    );
}

//Såhär ska vi skriva vår styling för saker istället för att skapa massa CSS filer :) 
const styles = {
    width: 400,
    marginLeft: 20
    };

export default ProgressBar;