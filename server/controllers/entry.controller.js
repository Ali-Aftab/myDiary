const { EntryTone, SentenceTone } = require("../db");

exports.postNewEntry = async (req, res) => {
  try {
    const { entryResult, sentencesResult } = req.entryResult;

    const diaryPost = { ...entryResult.emotion.document.emotion };
    diaryPost.userId = req.userId;
    diaryPost.message = req.body.message;
    const newestDiaryEntry = await EntryTone.create(diaryPost);

    sentencesResult.forEach(async (sentenceRes) => {
      oneSenPost = { ...sentenceRes.result.emotion.document.emotion };
      oneSenPost.message = sentenceRes.text;
      oneSenPost.userId = req.userId;
      oneSenPost.entryToneId = newestDiaryEntry.id;
      const newestSentenceEntry = await SentenceTone.create(oneSenPost);
    });

    res.json({
      message: "Your diary entry has been saved!",
      data: newestDiaryEntry.dataValues,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Error occured when saving new Entry post",
      error,
    });
  }
};

exports.listAllUserEntry = async (req, res) => {
  try {
    const { count, rows } = await EntryTone.findAndCountAll({
      where: {
        userId: req.userId,
      },
    });
    res.json({ message: `You have ${count} entries!`, data: rows });
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error occured when grabbing all of your diary entries",
    });
  }
};

exports.listAllSenForOneEntry = async (req, res) => {
  try {
    const { userId } = req;
    let { entryToneId } = req.params;
    const allSentences = await SentenceTone.findAll({
      where: {
        userId,
        entryToneId,
      },
    });
    if (allSentences.length === 0) {
      res.json({
        message:
          "Could not find entry, please check to see if your entryToneId is correct!",
        data: allSentences,
      });
    } else {
      res.json({
        message:
          "You have received your tone analyzer for each sentence of your entry!",
        data: allSentences,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error,
      message: "Error occured when grabbing the sentences for your entry!",
    });
  }
};
