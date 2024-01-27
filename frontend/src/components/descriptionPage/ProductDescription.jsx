import React from 'react'
import { ListGroup,PropTypes } from '../../imports.js'
import Rating from '../Shared/Rating.jsx'

const ProductDescription = ({title,rating,price,description}) => {
  return (
    <ListGroup>
        <ListGroup.Item>
        <h1 style={{wordWrap:"break-word"}}>{title}</h1>
        </ListGroup.Item>
        <ListGroup.Item> 
            <Rating rating={rating.rate} numReviews={rating.count}></Rating>
      </ListGroup.Item>
      <ListGroup.Item>
        Price: ${price}
      </ListGroup.Item>
      <ListGroup.Item>
        Description:<p className="lead">{description}</p>
      </ListGroup.Item>
    </ListGroup>
  )
}
ProductDescription.propTypes = {
     title: PropTypes.string,
     rating: PropTypes.object,
     price: PropTypes.number,
     description: PropTypes.string}
export default ProductDescription