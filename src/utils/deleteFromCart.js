const deleteFromCart = (cart, setCart, productData) => {
  const newCart = cart.filter((item) => item._id !== productData._id);

  localStorage.setItem("cart", JSON.stringify(newCart));
  setCart(JSON.parse(localStorage.getItem("cart")));
};

export default deleteFromCart;
