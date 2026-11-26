const { getRecommendations } = require("../services/recommendationService");

const recommendProducts = (req, res) => {
  try {
    const recommendations = getRecommendations(req.body);

    res.json({
      success: true,
      total: recommendations.length,
      recommendations
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { recommendProducts };
