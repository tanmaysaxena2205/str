export const CURRICULUM = [
  {
    lessonId: 1,
    title: "The Basics",
    sublevels: [
      {
        id: "1-1",
        title: "Introduction",
        challenges: [
          { type: "intro", word: "Hallo", translation: "Hello" },
          { type: "quiz", question: 'Which is "Hello"?', options: ["Hallo", "Tschüss"], correct: "Hallo" }
        ]
      },
      {
        id: "1-2",
        title: "Common Words",
        challenges: [ /* More words here */ ]
      }
    ]
  },
  {
    lessonId: 2,
    title: "Greetings",
    sublevels: [ /* Sublevels for Lesson 2 */ ]
  }
];