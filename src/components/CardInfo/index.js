import React from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap';

const CardInfo = (props) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Project 1</CardTitle>
          <CardSubtitle>Kenya off-grid company blabla</CardSubtitle>
            </CardBody>
                <img width="50%" src="https://i.onthe.io/0fgjhs3aepa7mjf38g.r900.05b599e1.jpg" alt="Card image cap" />
            <CardBody>
          <CardText>Här fyller vi i kort men passande text för detta project</CardText>
          <CardLink href="#">Read more</CardLink>
          <CardLink href="#">About the local company</CardLink>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardInfo;

