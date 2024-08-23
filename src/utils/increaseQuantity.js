import _ from "underscore";

const increaseQuantity = (cart, setCart, productData) => {
  const existingItem = cart.find((item) => item._id === productData._id);

  const cartItem = {
    ...existingItem,
    quantity: existingItem.quantity + 1,
  };

  const prevCart = cart.filter((item) => item._id !== existingItem._id);

  const newCart = _.sortBy([...prevCart, cartItem], "_id");

  localStorage.setItem("cart", JSON.stringify(newCart));
  setCart(JSON.parse(localStorage.getItem("cart")));
};

export default increaseQuantity;
