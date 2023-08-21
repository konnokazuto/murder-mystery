export default defineEventHandler((event) => {
  return [
    {
      id: 1,
      dialogues: [
        {
          speaker: "エンマ",
          text: "テキスト１",
          face: "enmadaiou",
          background: "upstairs",
        },
        {
          speaker: "ボク",
          text: "テキスト２",
          face: "enmadaiou",
          background: "upstairs",
        },
        {
          speaker: "男",
          text: "テキスト3",
          face: "enmadaiou",
          background: "upstairs",
        },
        {
          speaker: "女",
          text: "ねぇほら早く",
          face: "enmadaiou",
          background: "upstairs",
        },
      ] as Dialogues[],
      questions:{
        questionTitle: "死の手前に",
        choices: [
          { text: "食べる", nextId: 2 },
          { text: "食べない", nextId: 3 },
          { text: "ちゃぶ台をひっくり返す", nextId: 4 },
        ]
      }
    },
    {
      id: 2,
      dialogues: [
        { speaker: "女", text: "何かしら？", face: "mama" },
        {
          speaker: "女",
          text: "ほげ",
          face: "enmadaiou",
        },
        {
          speaker: "男",
          text: "ほげ",
          face: "mama",
        },
        { speaker: "女", text: "ねぇほら早く", face: "mama" },
      ] as Dialogues[],
      choices: [
        { text: "食べる", nextId: 2 },
        { text: "食べない", nextId: 3 },
        { text: "ちゃぶ台をひっくり返す", nextId: 4 },
      ] as Choices[],
    },
  ];
});
