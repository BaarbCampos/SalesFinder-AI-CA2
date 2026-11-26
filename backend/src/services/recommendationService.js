const products = require("../data/products");

const getRecommendations = ({ category, budget, search }) => {
  let results = [...products];

  if (category) {
    results = results.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (budget !== undefined && budget !== null && budget !== "") {
    const maxBudget = Number(budget);

    if (!Number.isFinite(maxBudget) || maxBudget < 0) {
      throw new Error("Please provide a valid budget.");
    }

    results = results.filter(product => product.price <= maxBudget);
  }

  if (search) {
    results = results.filter(product =>
      `${product.name} ${product.brand} ${product.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  return results.sort((a, b) => b.rating - a.rating);
};

module.exports = { getRecommendations };
