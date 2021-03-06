const { EntryTone, SentenceTone } = require("../db");

exports.postNewEntry = async (req, res) => {
  try {
    const { document_tone, sentences_tone } = req.entryResult;
    const entryTonesList = document_tone.tone_categories;
    const sentenceToneList = sentences_tone;

    const diaryPost = {};

    //loop to get emotions for the entry model
    for (let i = 0; i < entryTonesList.length - 1; i++) {
      const emotionCategory = entryTonesList[i].tones;
      emotionCategory.map(
        (emotion) => (diaryPost[emotion.tone_id] = emotion.score)
      );
    }

    diaryPost.userId = req.userId;
    diaryPost.message = req.body.message;
    const newestDiaryEntry = await EntryTone.create(diaryPost);

    // loop to get all the emotions for each sentence
    if (sentenceToneList) {
      for (let i = 0; i < sentenceToneList.length; i++) {
        const sentenceEl = sentenceToneList[i];
        let oneSenPost = {};

        const senToneCategories = sentenceEl.tone_categories;
        for (let j = 0; j < senToneCategories.length - 1; j++) {
          const emotionCategory = senToneCategories[j].tones;
          const oneSenToneCategory = emotionCategory.reduce(
            (accum, emotion) => ({
              ...accum,
              [emotion.tone_id]: emotion.score,
            }),
            {}
          );
          oneSenPost = { ...oneSenPost, ...oneSenToneCategory };
        }

        console.log;
        oneSenPost.message = sentenceEl.text;
        oneSenPost.userId = req.userId;
        oneSenPost.entryToneId = newestDiaryEntry.id;
        console.log(oneSenPost);

        const newestSentenceEntry = await SentenceTone.create(oneSenPost);
      }
    } else {
      const oneSentencePostData = { ...diaryPost };
      oneSentencePostData.entryToneId = newestDiaryEntry.id;
      const oneSentencePost = await SentenceTone.create(oneSentencePostData);
    }

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
