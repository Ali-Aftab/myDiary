const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

const { iBMKey, iBMURL } = require("../config/auth.config");

sendEntryToIBM = (req, res, next) => {
  if (!req.body.message) {
    return res.json({ message: "Please type a diary entry!" });
  }
  const newMessage = req.body.message;
  const toneAnalyzer = new ToneAnalyzerV3({
    authenticator: new IamAuthenticator({ apikey: iBMKey }),
    version: "2016-05-19",
    serviceUrl: iBMURL,
  });

  toneAnalyzer
    .tone({
      toneInput: newMessage,
      contentType: "text/plain",
    })
    .then((response) => {
      req.entryResult = response.result;
      next();
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        message:
          "Error occured when sending entry to IBM. Please check if you're credentials are correct and properly placed",
        error,
      });
    });
};

module.exports = { sendEntryToIBM };
