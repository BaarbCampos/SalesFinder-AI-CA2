const products = require("../data/products");

const getAllProducts = (req, res) => {
  const { category, search } = req.query;

  let result = products;

  if (category) {
    result = result.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    result = result.filter(product =>
      `${product.name} ${product.brand} ${product.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    total: result.length,
    products: result
  });
};

const getProductById = (req, res) => {
  const product = products.find(item => item.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.json({
    success: true,
    product
  });
};

module.exports = {
  getAllProducts,
  getProductById
};
