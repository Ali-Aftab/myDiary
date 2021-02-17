const Sequelize = require("sequelize");
const { Op } = Sequelize;
const { EntryTone, SentenceTone } = require("../db");

module.exports.searchEntries = async (req, res) => {
  try {
    if (!req.body.searchQuery) {
      return res.json({ message: "Please type a search query to search!" });
    }
    const { searchQuery } = req.body;
    const searchList = await EntryTone.findAndCountAll({
      where: {
        userId: req.userId,
        message: { [Op.iLike]: `%${searchQuery}%` },
      },
    });
    return res.json({
      message: `${searchList.count} entries were found that matched your query!`,
      data: searchList.rows,
    });
  } catch (error) {
    res.json({ message: "Error occured when searching your query!", error });
  }
};

module.exports.searchSentences = async (req, res) => {
  try {
    if (!req.body.searchQuery) {
      return res.json({ message: "Please type a search query to search!" });
    }
    const { searchQuery } = req.body;
    const searchList = await SentenceTone.findAndCountAll({
      where: {
        userId: req.userId,
        message: { [Op.iLike]: `%${searchQuery}%` },
      },
    });
    return res.json({
      message: `${searchList.count} entries were found that matched your query!`,
      data: searchList.rows,
    });
  } catch (error) {
    res.json({ message: "Error occured when searching your query!", error });
  }
};

module.exports.detectAverageTone = async (req, res) => {
  try {
    const { userId } = req;
    let averageMood;

    const allEntries = await EntryTone.findAll({
      where: {
        userId,
      },
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("anger")), "anger"],
        [Sequelize.fn("AVG", Sequelize.col("disgust")), "disgust"],
        [Sequelize.fn("AVG", Sequelize.col("fear")), "fear"],
        [Sequelize.fn("AVG", Sequelize.col("joy")), "joy"],
        [Sequelize.fn("AVG", Sequelize.col("sadness")), "sadness"],
        [Sequelize.fn("AVG", Sequelize.col("analytical")), "analytical"],
        [Sequelize.fn("AVG", Sequelize.col("confident")), "confident"],
        [Sequelize.fn("AVG", Sequelize.col("tentative")), "tentative"],
      ],
    }).then((data) => {
      averageMood = data;
    });
    res.json({
      message: "Your average mood has been computed!",
      data: averageMood,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error occured when trying to detect the average mood!",
      error,
    });
  }
};

module.exports.findSenToneMatch = async (req, res) => {
  try {
    const { userId } = req;
    if (!req.body.tone) {
      return res.json({ message: "Please type a proper tone in the body!" });
    }
    const allSentences = await SentenceTone.findAll({
      where: {
        userId,
        [req.body.tone]: {
          [Op.gte]: 0.5,
        },
      },
    });
    res.json({
      message: `We have bits of your entires that you emit ${req.body.tone}`,
      data: allSentences,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message:
        "Error occured when trying to find sentences that match to the emotion!",
      error,
    });
  }
};
