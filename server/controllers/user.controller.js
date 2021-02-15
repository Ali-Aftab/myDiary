exports.allAccess = (req, res) => {
  res.status(200).send({ message: "Public Content" });
};
exports.userAccess = (req, res) => {
  res.status(200).send({ message: "User Content" });
};
