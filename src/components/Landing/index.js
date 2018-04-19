import React from 'react';
import Slideshow from '../Slideshow';

/*import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

   <div class="card">
      <Card>
        <CardImg width="40%" src="https://www.pexels.com/photo/alternative-alternative-energy-blue-eco-411592/" alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div> */

const LandingPage = () =>
    <div>
      <div class="jumbotron">
        <center>
          <h1>Seeding Solar</h1> 
          <p>Here we will do godlike work together</p>
        </center>  
      </div>
      <center>
      <div>
          <Slideshow />
      </div>
      </center>
  </div>

export default LandingPage;
