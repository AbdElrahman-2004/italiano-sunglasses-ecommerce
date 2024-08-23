import _ from "underscore";

const handleAddToCart = (cart, setCart, productData, toast) => {
  const existingItem = cart.find((item) => item?._id === productData._id);

  let cartItem = {};
  let prevCart = [];

  if (existingItem) {
    prevCart = cart.filter((item) => item._id !== existingItem._id);
    cartItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };
  } else {
    prevCart = cart;
    cartItem = {
      ...productData,
      quantity: 1,
    };
  }

  const newCart = _.sortBy([...prevCart, cartItem], "_id");

  localStorage.setItem("cart", JSON.stringify(newCart));
  setCart(JSON.parse(localStorage.getItem("cart")));

  toast({
    title: "تمت إضافة المنتج الى العربة",
    status: "success",
    duration: 3000,
    isClosable: false,
  });
};

export default handleAddToCart;
