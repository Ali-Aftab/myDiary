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
    for (let i = 0; i < sentenceToneList.length; i++) {
      const sentenceEl = sentenceToneList[i];
      const oneSenPost = {};

      const senToneCategories = sentenceEl.tone_categories;
      for (let i = 0; i < senToneCategories.length - 1; i++) {
        const emotionCategory = senToneCategories[i].tones;
        emotionCategory.map(
          (emotion) => (oneSenPost[emotion.tone_id] = emotion.score)
        );
      }

      oneSenPost.message = sentenceEl.text;
      oneSenPost.userId = req.userId;
      oneSenPost.entryToneId = newestDiaryEntry.id;

      const newestSentenceEntry = await SentenceTone.create(oneSenPost);
    }

    res.json({
      message: "Your diary entry has been saved!",
      data: newestDiaryEntry.dataValues,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error occured when saving new Entry post" });
  }
};
