const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const { iBMKey, iBMURL } = require("../config/auth.config");

sendEntryToIBM = async (req, res, next) => {
  if (!req.body.message) {
    return res.json({ message: "Please type a diary entry!" });
  }
  req.entryResult = {};

  const text = req.body.message;

  const toneAnalyzer = new NaturalLanguageUnderstandingV1({
    version: "2024-04-01",
    authenticator: new IamAuthenticator({ apikey: iBMKey }),
    serviceUrl: iBMURL,
  });

  const analyzePost = async (post) => {
    const analysis = await toneAnalyzer.analyze({
      text: post,
      features: {
        emotion: {},
      },
    });
    return analysis.result;
  };

  try {
    req.entryResult.entryResult = await analyzePost(text);

    const sentences = text
      .split(/[.!?]/)
      .map((s) => s.trim())
      .filter(Boolean);

    req.entryResult.sentencesResult = await Promise.all(
      sentences.map(async (text) => {
        const result = await analyzePost(text);
        return {
          text,
          result,
        };
      })
    );

    next();
  } catch (error) {
    console.log(error);
    return res.json({
      message:
        "Error occured when sending entry to IBM. Please check if you're credentials are correct and properly placed",
      error,
    });
  }
};

module.exports = { sendEntryToIBM };
