import { Button, Col, Link, ListGroup, PropTypes, Row } from "../../imports";
import MessageBox from "../Shared/MessageBox";

const ItemsInCart = ({ cartItems, updateCartHandler , removeProductHandler,  }) => {
  return (
    <div>
      {cartItems.length === 0 ? (
        <MessageBox>
          Your cart is empty. <Link to="/">Go back to home page.</Link>
        </MessageBox>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={3}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded img-thumbnail"
                  />
                </Col>
                <Col md={5}>
                  <Link to={`/products/${item.token}`}>{item.title}</Link>
                </Col>
                <Col md={2}>
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    name="minusButton"
                    disabled={item.quantity === 1}
                    variant="light"
                  >
                    <i className="fa fa-minus-circle" />
                  </Button>{" "}
                  <span>{item.quantity}</span>{" "}
                  <Button
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    name="plusButton"
                    variant="light"
                  >
                    <i className="fa fa-plus-circle" />
                  </Button>
                </Col>
                <Col md={1}>${item.price}</Col>
                <Col md={1}>
                  <Button
                    variant="light"
                    onClick={() => removeProductHandler(item)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};
ItemsInCart.propTypes = {
  cartItems: PropTypes.array,
  updateCartHandler: PropTypes.func,
};
export default ItemsInCart;
