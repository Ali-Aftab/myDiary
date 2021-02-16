const { db, User, EntryTone, SentenceTone } = require("../db");

exports.postNewEntry = async (req, res) => {
  try {
    const { document_tone, sentence_tone } = req.entryResult;
    const entryTonesList = document_tone.tone_categories;

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
    const newestEntry = await EntryTone.create(diaryPost);
    res.json({ what: req.entryResult });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error occured during new Entry post" });
  }
};
