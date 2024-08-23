import _ from "underscore";

const sumOfCartProperties = (cart, property) =>
  _.reduce(_.pluck(cart, property), (memo, num) => {
    return memo + num;
  });

export default sumOfCartProperties;
