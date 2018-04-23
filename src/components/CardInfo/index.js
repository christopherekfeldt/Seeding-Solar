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
                <img width="50%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
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

