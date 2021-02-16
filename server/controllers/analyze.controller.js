const { Op } = require("sequelize");
const { EntryTone } = require("../db");

module.exports.searchEntries = async (req, res) => {
  try {
    if (!req.body.searchQuery) {
      return res.json({ message: "Please type a search query to search!" });
    }
    const { searchQuery } = req.body;
    console.log(searchQuery);
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
