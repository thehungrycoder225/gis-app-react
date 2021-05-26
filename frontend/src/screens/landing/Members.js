import React from 'react'
import {Card, Image} from 'react-bootstrap'

const Members = ({name, title, description, img}) => {
    return (
        <div>
            <Card className="border-0">
               <Image src={`${img}`} roundedCircle className="w-25 h-25 p-2 m-auto d-block"  />
                <Card.Title className="text-center">{name}</Card.Title>
                <Card.Subtitle className="p-2">{title}</Card.Subtitle>
                <Card.Text className="p-2">{description}</Card.Text>
            </Card>
            
        </div>
    )
}

export default Members
