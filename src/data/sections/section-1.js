


export const SECTION_1_DATA = [
  {
    unitId: "1",
    unitTitle: "The Drinks",
    levels: [
      {
        levelId: "1",
        title: "The Drinks: The Master Foundation",
        questions: [
          // --- CONCEPT 1: PRIMARY NOUNS ---
          { type: "intro", word: "der Kaffee", translation: "The Coffee", content: "Masculine nouns use 'der'. Coffee is 'der Kaffee'." },
          { type: "choice", q: "Which one is 'The Coffee'?", options: ["die Kaffee", "der Kaffee", "das Kaffee"], a: "der Kaffee" },
          { type: "intro", word: "das Wasser", translation: "The Water", content: "Neuter nouns use 'das'. Water is 'das Wasser'." },
          { type: "choice", q: "Which one is 'The Water'?", options: ["der Wasser", "die Wasser", "das Wasser"], a: "das Wasser" },

         
        ]
      },
      // src/data/section-1.js (Unit 1, Level 2)
{
  levelId: "2",
  title: "I would like...",
  questions: [
    // --- CONCEPT 1: THE PRONOUN "ICH" (I) ---
    { type: "intro", word: "Ich", translation: "I", content: "In German, 'Ich' means 'I'. It's the starting point for every order you'll make." },
    { type: "choice", q: "How do you say 'I'?", options: ["Du", "Ich", "Er"], a: "Ich" },
    { type: "choice", q: "Which word means 'I'?", options: ["und", "ist", "Ich"], a: "Ich" },

    // --- CONCEPT 2: THE VERB "MÖCHTE" (WOULD LIKE) ---
    { type: "intro", word: "möchte", translation: "would like", content: "This is the polite way to order. 'Ich möchte' means 'I would like'." },
    { type: "choice", q: "How do you say 'would like'?", options: ["ist", "möchte", "kalt"], a: "möchte" },
    { type: "jumble", q: "I would like coffee", options: ["Kaffee", "möchte", "Ich"], a: "Ich möchte Kaffee" },
    { type: "jumble", q: "I would like water", options: ["Wasser", "möchte", "Ich"], a: "Ich möchte Wasser" },
    
    // --- CONCEPT 3: THE ACCUSATIVE "DEN" (THE BIG CHANGE) ---
    { type: "intro", word: "den Kaffee", translation: "the coffee (as an object)", content: "Grammar Alert! When you want 'the' coffee, 'der' changes to 'den'. This only happens to Masculine words!" },
    
    { type: "choice", q: "When ordering 'the coffee', use...", options: ["der Kaffee", "den Kaffee", "das Kaffee"], a: "den Kaffee" },
    { type: "jumble", q: "I would like the coffee", options: ["den", "Kaffee", "möchte", "Ich"], a: "Ich möchte den Kaffee" },

    // --- CONCEPT 4: NO CHANGE FOR NEUTER/FEMININE ---
    { type: "intro", title: "No Changes Here", content: "Good news! 'das Wasser' and 'die Milch' stay exactly the same when you order them." },
    { type: "jumble", q: "I would like the water", options: ["das", "Wasser", "möchte", "Ich"], a: "Ich möchte das Wasser" },
    { type: "jumble", q: "I would like the milk", options: ["die", "Milch", "möchte", "Ich"], a: "Ich möchte die Milch" },
    { type: "choice", q: "Which article stays the same when ordering?", options: ["der", "die", "none"], a: "die" },

    // --- CONCEPT 5: POLITENESS (BITTE & DANKE) ---
    { type: "intro", word: "bitte", translation: "please", content: "Always add 'bitte' to the end of your sentence to be a polite guest." },
    { type: "intro", word: "danke", translation: "thanks", content: "Use 'danke' when the waiter brings your drink." },
    { type: "jumble", q: "I would like the milk, please", options: ["bitte", "die", "Milch", "möchte", "Ich"], a: "Ich möchte die Milch bitte" },
    { type: "jumble", q: "The tea, please", options: ["bitte", "Tee", "der"], a: "der Tee bitte" },
    { type: "choice", q: "Which word means 'please'?", options: ["danke", "bitte", "und"], a: "bitte" },

    // --- CONCEPT 6: COMBINING EVERYTHING ---
    { type: "jumble", q: "I would like the water and the coffee", options: ["den", "Kaffee", "und", "das", "Wasser", "möchte", "Ich"], a: "Ich möchte das Wasser und den Kaffee" },
    { type: "jumble", q: "I would like the milk, thanks", options: ["danke", "die", "Milch", "möchte", "Ich"], a: "Ich möchte die Milch danke" },
    { type: "choice", q: "Translate: 'Ich möchte den Kaffee.'", options: ["I would like the coffee", "The coffee is hot", "I am the coffee"], a: "I would like the coffee" },

    // --- CONCEPT 7: QUESTIONS & BOSS (FINAL STEPS) ---
    { type: "intro", title: "Ordering as a Question", content: "You can also say 'Möchte ich...?' though it's less common than the statement." },
    { type: "jumble", q: "I would like the tea, please", options: ["bitte", "den", "Tee", "möchte", "Ich"], a: "Ich möchte den Tee bitte" },
    { type: "boss", q: "Translate: I would like the coffee and the water, please.", options: ["Ich möchte den Kaffee und das Wasser, bitte", "Ich möchte der Kaffee und das Wasser, bitte"], a: "Ich möchte den Kaffee und das Wasser, bitte" },
    { type: "boss", q: "Which is correct?", options: ["Ich möchte das Milch", "Ich möchte die Milch", "Ich möchte den Milch"], a: "Ich möchte die Milch" },
    { type: "jumble", q: "Final Jumble: I would like the tea, the milk, and the water", options: ["das", "Wasser", "und", "die", "Milch", "den", "Tee", "möchte", "Ich"], a: "Ich möchte den Tee die Milch und das Wasser" },
    { type: "boss", q: "Final Check: How do you say 'The coffee' when it is the object?", options: ["der Kaffee", "den Kaffee", "das Kaffee"], a: "den Kaffee" }
  ]
},// src/data/section-1.js (Unit 1, Level 3)
// src/data/section-1.js (Unit 1, Level 3)
{
  levelId: "3",
  title: "Being Polite",
  questions: [
    // --- CONCEPT 1: FORMAL GREETING ---
    { type: "intro", word: "Guten Tag", translation: "Good day", content: "This is the standard formal greeting in Germany. Use it when entering a café." },
    { type: "choice", q: "How do you say 'Good day'?", options: ["Guten Tag", "Hallo Tag", "Guten Wasser"], a: "Guten Tag" },
    { type: "jumble", q: "Good day, the coffee please", options: ["bitte", "Kaffee", "der", "Guten", "Tag"], a: "Guten Tag der Kaffee bitte" },

    // --- CONCEPT 2: GETTING ATTENTION ---
    { type: "intro", word: "Entschuldigung", translation: "Excuse me", content: "Use this long word to get a waiter's attention politely." },
    { type: "choice", q: "Which word means 'Excuse me'?", options: ["Danke", "Entschuldigung", "Bitte"], a: "Entschuldigung" },
    { type: "jumble", q: "Excuse me, the water please", options: ["bitte", "Wasser", "das", "Entschuldigung"], a: "Entschuldigung das Wasser bitte" },

    // --- CONCEPT 3: THE FORMAL "YOU" ---
    { type: "intro", word: "Sie", translation: "You (formal)", content: "In a café, you use 'Sie' for adults you don't know. It is always capitalized." },
    { type: "choice", q: "What does 'Sie' mean in a formal setting?", options: ["I", "You", "He"], a: "You" },

    // --- CONCEPT 4: THE VERB "HABEN" ---
    { type: "intro", word: "haben", translation: "have", content: "To check if the café has something, use the verb 'haben'." },
    { type: "choice", q: "Which word means 'have'?", options: ["ist", "haben", "nicht"], a: "haben" },
    { type: "jumble", q: "You have the coffee", options: ["Kaffee", "den", "haben", "Sie"], a: "Sie haben den Kaffee" },

    // --- CONCEPT 5: ASKING THE QUESTION ---
    { type: "intro", title: "Asking 'Do you have?'", content: "To ask a question, put the verb first: 'Haben Sie...?' means 'Do you have...?'" },
    { type: "jumble", q: "Do you have tea?", options: ["Tee", "Sie", "Haben"], a: "Haben Sie Tee" },
    { type: "jumble", q: "Excuse me, do you have milk?", options: ["Milch", "Sie", "Haben", "Entschuldigung"], a: "Entschuldigung Haben Sie Milch" },

    // --- CONCEPT 6: COMPLIMENTING ---
    { type: "intro", word: "lecker", translation: "delicious", content: "Use this to tell the waiter the drink is good." },
    { type: "intro", word: "sehr", translation: "very", content: "'sehr' makes an adjective stronger. 'Sehr lecker' = 'Very delicious'." },
    { type: "jumble", q: "The milk is very delicious", options: ["lecker", "sehr", "ist", "die", "Milch"], a: "die Milch ist sehr lecker" },
    { type: "choice", q: "Translate: 'sehr lecker'", options: ["very hot", "very cold", "very delicious"], a: "very delicious" },

    // --- CONCEPT 7: RESPONDING ---
    { type: "intro", word: "Gerne", translation: "Gladly / With pleasure", content: "A waiter says 'Gerne' when they are happy to serve you. It's like 'You're welcome'." },
    { type: "jumble", q: "Yes, gladly", options: ["Gerne", "Ja"], a: "Ja Gerne" },

    // --- MIXED RECAP & COMPLEX SENTENCES ---
    { type: "jumble", q: "Do you have the water and the tea?", options: ["den", "Tee", "und", "das", "Wasser", "Sie", "Haben"], a: "Haben Sie das Wasser und den Tee" },
    { type: "choice", q: "What is 'The tea' when it's an object?", options: ["der Tee", "den Tee", "das Tee"], a: "den Tee" },
    { type: "jumble", q: "Good day, I would like the coffee", options: ["Kaffee", "den", "möchte", "Ich", "Guten", "Tag"], a: "Guten Tag Ich möchte den Kaffee" },

    // --- FINAL BOSS CHALLENGES ---
    
    { type: "boss", q: "Translate: Excuse me, do you have water?", options: ["Entschuldigung, haben Sie Wasser?", "Entschuldigung, ist das Wasser?"], a: "Entschuldigung, haben Sie Wasser?" },
    { type: "boss", q: "Translate: Good day, the milk is very delicious.", options: ["Guten Tag, die Milch ist sehr lecker", "Hallo, das Milch ist sehr lecker"], a: "Guten Tag, die Milch ist sehr lecker" },
    { type: "jumble", q: "Final Jumble: Excuse me, do you have the coffee please", options: ["bitte", "den", "Kaffee", "Sie", "Haben", "Entschuldigung"], a: "Entschuldigung Haben Sie den Kaffee bitte" },
    { type: "boss", q: "Translate: I would like the tea, thank you.", options: ["Ich möchte den Tee, danke", "Ich möchte der Tee, bitte"], a: "Ich möchte den Tee, danke" },
    { type: "boss", q: "Final Test: Which is the formal way to say 'You'?", options: ["du", "den", "Sie"], a: "Sie" }
  ]
},
// src/data/section-1.js (Unit 1, Level 4)
{
  levelId: "4",
  title: "Foods and Snacks",
  questions: [
    // --- CONCEPT 1: NEW MASCULINE FOOD ---
    { type: "intro", word: "der Kuchen", translation: "The Cake", content: "Cake is Masculine. Remember: 'der' changes to 'den' if you order it!" },
    { type: "choice", q: "How do you say 'The Cake'?", options: ["das Kuchen", "die Kuchen", "der Kuchen"], a: "der Kuchen" },
    { type: "jumble", q: "The cake is delicious", options: ["lecker", "ist", "der", "Kuchen"], a: "der Kuchen ist lecker" },

    // --- CONCEPT 2: NEW NEUTER FOOD ---
    { type: "intro", word: "das Brot", translation: "The Bread", content: "Bread is Neuter: 'das Brot'. Neuter words don't change when you order them." },
    { type: "choice", q: "Which one is 'The Bread'?", options: ["der Brot", "das Brot", "die Brot"], a: "das Brot" },
    { type: "jumble", q: "The bread is hot", options: ["heiß", "ist", "das", "Brot"], a: "das Brot ist heiß" },

    // --- CONCEPT 3: ORDERING FOOD (ACCUSATIVE) ---
    { type: "jumble", q: "I would like the cake", options: ["den", "Kaffee", "Kuchen", "möchte", "Ich"], a: "Ich möchte den Kuchen" },
    { type: "choice", q: "Why did we use 'den' for cake?", options: ["It is an object", "It is feminine", "It is plural"], a: "It is an object" },
    { type: "jumble", q: "I would like the bread", options: ["das", "Brot", "möchte", "Ich"], a: "Ich möchte das Brot" },

    // --- CONCEPT 4: ANOTHER NEUTER FOOD ---
    { type: "intro", word: "das Sandwich", translation: "The Sandwich", content: "German often borrows words from English. It is Neuter: 'das Sandwich'." },
    { type: "choice", q: "What is 'The Sandwich'?", options: ["der Sandwich", "das Sandwich"], a: "das Sandwich" },
    { type: "jumble", q: "The sandwich is very cold", options: ["kalt", "sehr", "ist", "das", "Sandwich"], a: "das Sandwich ist sehr kalt" },

    // --- CONCEPT 5: EXPRESSING HUNGER ---
    { type: "intro", word: "Hunger", translation: "Hunger", content: "In German, you don't 'are' hungry, you 'have' hunger." },
    { type: "jumble", q: "I have hunger (I am hungry)", options: ["Hunger", "habe", "Ich"], a: "Ich habe Hunger" },
    { type: "choice", q: "How do you say 'I am hungry' in German?", options: ["Ich bin Hunger", "Ich habe Hunger"], a: "Ich habe Hunger" },

    // --- CONCEPT 6: COMBINING DRINKS AND FOOD ---
    { type: "jumble", q: "The cake and the coffee", options: ["der", "und", "der", "Kaffee", "Kuchen"], a: "der Kuchen und der Kaffee" },
    { type: "jumble", q: "I would like the sandwich and the water", options: ["das", "und", "das", "Wasser", "Sandwich", "möchte", "Ich"], a: "Ich möchte das Sandwich und das Wasser" },
    { type: "choice", q: "Recall: What is 'The Milk'?", options: ["der Milch", "die Milch", "das Milch"], a: "die Milch" },

    // --- CONCEPT 7: QUESTIONS ABOUT FOOD ---
    { type: "jumble", q: "Do you have cake?", options: ["Kuchen", "Sie", "Haben"], a: "Haben Sie Kuchen" },
    { type: "jumble", q: "Is the bread delicious?", options: ["lecker", "Brot", "das", "Ist"], a: "Ist das Brot lecker" },

    // --- MIXED REINFORCEMENT ---
    { type: "jumble", q: "Excuse me, I would like the cake please", options: ["bitte", "den", "Kuchen", "möchte", "Ich", "Entschuldigung"], a: "Entschuldigung Ich möchte den Kuchen bitte" },
    { type: "choice", q: "Translate: 'sehr lecker'", options: ["very hot", "very cold", "very delicious"], a: "very delicious" },

    // --- FINAL BOSS CHALLENGES ---
    
    { type: "boss", q: "Translate: I would like the sandwich, please.", options: ["Ich möchte das Sandwich, bitte", "Ich möchte den Sandwich, bitte"], a: "Ich möchte das Sandwich, bitte" },
    { type: "boss", q: "Translate: Do you have the cake?", options: ["Haben Sie den Kuchen?", "Haben Sie der Kuchen?"], a: "Haben Sie den Kuchen?" },
    { type: "jumble", q: "Final Jumble: The bread is very delicious and the coffee is hot", options: ["heiß", "ist", "Kaffee", "der", "und", "lecker", "sehr", "ist", "Brot", "das"], a: "das Brot ist sehr lecker und der Kaffee ist heiß" },
    { type: "boss", q: "Translate: I am hungry (I have hunger).", options: ["Ich habe Hunger", "Ich bin Hunger"], a: "Ich habe Hunger" },
    { type: "boss", q: "Final Check: 'The cake' as an object is...", options: ["der Kuchen", "den Kuchen", "das Kuchen"], a: "den Kuchen" }
  ]
},
// src/data/section-1.js (Unit 1, Level 5)
// src/data/section-1.js (Unit 1, Level 5)
// src/data/section-1.js (Unit 1, Level 5)
// src/data/section-1.js (Unit 1, Level 5)
{
  levelId: "5",
  title: "Final Order",
  questions: [
    // --- CONCEPT 1: ARRIVING & THE TABLE ---
    { type: "intro", word: "der Tisch", translation: "The Table", content: "To start your visit, find a table. 'Tisch' is Masculine (der)." },
    { type: "intro", word: "frei", translation: "free / available", content: "Use 'frei' to see if a table or seat is open for you." },
    { type: "jumble", q: "Is the table free?", options: ["frei", "Tisch", "der", "Ist"], a: "Ist der Tisch frei" },
    { type: "jumble", q: "The table is free and I would like coffee", options: ["Kaffee", "möchte", "Ich", "und", "frei", "ist", "Tisch", "der"], a: "der Tisch ist frei und Ich möchte Kaffee" },

    // --- CONCEPT 2: THE MENU ---
    { type: "intro", word: "die Karte", translation: "The Menu", content: "Ask for 'die Karte' to see the food and drink options." },
    { type: "jumble", q: "Excuse me, do you have the menu?", options: ["Karte", "die", "Sie", "Haben", "Entschuldigung"], a: "Entschuldigung Haben Sie die Karte" },
    { type: "jumble", q: "I would like the menu and the water", options: ["Wasser", "das", "und", "Karte", "die", "möchte", "Ich"], a: "Ich möchte die Karte und das Wasser" },

    // --- CONCEPT 3: THE BILL ---
    { type: "intro", word: "die Rechnung", translation: "The Bill", content: "When you are finished eating and drinking, ask for 'die Rechnung'." },
    { type: "jumble", q: "The cake is delicious, the bill please", options: ["bitte", "Rechnung", "die", "lecker", "ist", "Kuchen", "der"], a: "der Kuchen ist lecker die Rechnung bitte" },
    { type: "choice", q: "Which word means 'The Bill'?", options: ["der Rechnung", "die Rechnung", "das Rechnung"], a: "die Rechnung" },

    // --- CONCEPT 4: TO PAY ---
    { type: "intro", word: "zahlen", translation: "to pay", content: "Use the verb 'zahlen' when you are ready to settle the bill." },
    { type: "jumble", q: "I would like to pay the bill", options: ["Rechnung", "die", "zahlen", "möchte", "Ich"], a: "Ich möchte die Rechnung zahlen" },
    { type: "jumble", q: "Good day, I would like to pay", options: ["zahlen", "möchte", "Ich", "Tag", "Guten"], a: "Guten Tag Ich möchte zahlen" },

    // --- CONCEPT 5: TOGETHER OR SEPARATE ---
    { type: "intro", word: "zusammen", translation: "together", content: "Pay 'zusammen' if one person is paying for the whole group." },
    { type: "intro", word: "getrennt", translation: "separately", content: "Pay 'getrennt' if everyone is paying for their own items." },
    
    { type: "jumble", q: "Together please, and the coffee is delicious", options: ["lecker", "ist", "Kaffee", "der", "und", "bitte", "zusammen"], a: "zusammen bitte und der Kaffee ist lecker" },
    { type: "choice", q: "What do you say if you pay ONLY for your sandwich?", options: ["zusammen", "getrennt"], a: "getrennt" },
    { type: "jumble", q: "Separately please, thank you", options: ["danke", "bitte", "getrennt"], a: "getrennt bitte danke" },

    // --- CONCEPT 6: FULL SCENARIOS ---
    { type: "jumble", q: "Do you have a table and the menu please?", options: ["bitte", "Karte", "die", "und", "Tisch", "einen", "Sie", "Haben"], a: "Haben Sie einen Tisch und die Karte bitte" },
    { type: "jumble", q: "The milk is hot and the tea is very delicious", options: ["lecker", "sehr", "ist", "Tee", "der", "und", "heiß", "ist", "Milch", "die"], a: "die Milch ist heiß und der Tee ist sehr lecker" },
    { type: "jumble", q: "I would like the bread and the water please", options: ["bitte", "Wasser", "das", "und", "Brot", "das", "möchte", "Ich"], a: "Ich möchte das Brot und das Wasser bitte" },

    // --- FINAL BOSS: THE FULL EXPERIENCE ---
    { type: "boss", q: "Translate: 'Is the table free? I would like the menu.'", options: ["Ist der Tisch frei? Ich möchte die Karte.", "Ist das Tisch frei? Ich möchte den Karte."], a: "Ist der Tisch frei? Ich möchte die Karte." },
    { type: "boss", q: "Translate: 'I would like to pay separately, please.'", options: ["Ich möchte getrennt zahlen, bitte", "Ich möchte zusammen zahlen, bitte"], a: "Ich möchte getrennt zahlen, bitte" },
    { type: "jumble", q: "Final Order: I would like the coffee, the cake, and the bill please", options: ["bitte", "Rechnung", "die", "und", "Kuchen", "den", "Kaffee", "den", "möchte", "Ich"], a: "Ich möchte den Kaffee den Kuchen und die Rechnung bitte" },
    { type: "boss", q: "How do you tell the waiter 'The sandwich is very delicious'?", options: ["Das Sandwich ist sehr lecker", "Das Sandwich ist sehr kalt"], a: "Das Sandwich ist sehr lecker" },
    { type: "boss", q: "Final Test: You want to pay for yourself and your friend at once. You say:", options: ["Zusammen bitte", "Getrennt bitte"], a: "Zusammen bitte" }
  ]
}
    ]
  },
  // src/data/section-1.js

  // ... Unit 1 (The Drinks) stays above this ...
  // src/data/section-1.js
// src/data/section-1.js
// src/data/section-1.js
{
  unitId: "2",
  unitTitle: "Describe Your Family",
  levels: [
    {
      levelId: "1",
      title: "Core Family Vocab",
      questions: [
        // --- STEP 1: THE PARENTS (NOUNS) ---
        { type: "intro", word: "Vater & Mutter", translation: "Father & Mother", content: "Family follows gender: 'der Vater' (Masculine) and 'die Mutter' (Feminine)." },
        { type: "jumble", q: "The mother and the father", options: ["die", "der", "und", "Vater", "Mutter"], a: "die Mutter und der Vater" },

        // --- STEP 2: POSSESSION (MEIN / MEINE) ---
        { type: "intro", word: "mein / meine", translation: "my", content: "Add an 'e' for feminine: 'meine Mutter'. Keep it short for masculine: 'mein Vater'." },
        
        { type: "choice", q: "How do you say 'My father'?", options: ["mein Vater", "meine Vater"], a: "mein Vater" },
        { type: "jumble", q: "My mother and my father", options: ["mein", "meine", "und", "Mutter", "Vater"], a: "mein Vater und meine Mutter" },

        // --- STEP 3: SIBLINGS ---
        { type: "intro", word: "Bruder & Schwester", translation: "Brother & Sister", content: "Pattern check: 'der Bruder' (M) and 'die Schwester' (F)." },
        { type: "jumble", q: "My brother and my sister", options: ["mein", "meine", "und", "Schwester", "Bruder"], a: "mein Bruder und meine Schwester" },
        { type: "choice", q: "Which one is 'My sister'?", options: ["meine Schwester", "mein Schwester"], a: "meine Schwester" },

        // --- STEP 4: PLURAL VERB (SIND) ---
        { type: "intro", word: "sind", translation: "are", content: "When talking about more than one person, use 'sind' instead of 'ist'." },
        { type: "choice", q: "Which word means 'are'?", options: ["ist", "sind", "und"], a: "sind" },
        { type: "jumble", q: "The mother and father are here", options: ["hier", "sind", "Vater", "der", "und", "Mutter", "die"], a: "die Mutter und der Vater sind hier" },

        // --- STEP 5: PERSONALITY (NETT) ---
        { type: "intro", word: "nett", translation: "nice", content: "A simple description for people. Use it with 'ist' or 'sind'." },
        { type: "jumble", q: "My brother is nice", options: ["nett", "ist", "mein", "Bruder"], a: "mein Bruder ist nett" },
        { type: "jumble", q: "My mother and father are nice", options: ["nett", "sind", "Vater", "mein", "und", "Mutter", "meine"], a: "meine Mutter und mein Vater sind nett" },

        // --- STEP 6: AGE (JUNG / ALT) ---
        { type: "intro", word: "jung / alt", translation: "young / old", content: "Let's describe ages. 'jung' (young) and 'alt' (old)." },
        { type: "jumble", q: "My sister is young", options: ["jung", "ist", "meine", "Schwester"], a: "meine Schwester ist jung" },
        { type: "jumble", q: "My brother and sister are young", options: ["jung", "sind", "Schwester", "meine", "und", "Bruder", "mein"], a: "mein Bruder und meine Schwester sind jung" },

        // --- STEP 7: PROGRESSIVE MIXING ---
        { type: "jumble", q: "My father is not old", options: ["alt", "nicht", "ist", "mein", "Vater"], a: "mein Vater ist nicht alt" },
        { type: "choice", q: "Which sentence uses 'sind' correctly?", options: ["Mein Bruder sind nett", "Meine Mutter und mein Vater sind nett"], a: "Meine Mutter und mein Vater sind nett" },
        { type: "jumble", q: "My sister is nice and my brother is young", options: ["jung", "ist", "Bruder", "mein", "und", "nett", "ist", "Schwester", "meine"], a: "meine Schwester ist nett und mein Bruder ist jung" },

        // --- FINAL BOSS CHALLENGES ---
        { type: "boss", q: "Translate: 'My father and my mother are nice.'", options: ["Mein Vater und meine Mutter sind nett", "Meine Vater und mein Mutter ist nett"], a: "Mein Vater und meine Mutter sind nett" },
        { type: "jumble", q: "My brother is young and my sister is nice", options: ["nett", "ist", "Schwester", "meine", "und", "jung", "ist", "Bruder", "mein"], a: "mein Bruder ist jung und meine Schwester ist nett" },
        { type: "boss", q: "Final Check: 'My sister is young.'", options: ["Meine Schwester ist jung", "Mein Schwester ist jung"], a: "Meine Schwester ist jung" },
        { type: "jumble", q: "The mother and the sister are not old", options: ["alt", "nicht", "sind", "Schwester", "die", "und", "Mutter", "die"], a: "die Mutter und die Schwester sind nicht alt" },
        { type: "boss", q: "Which word means 'are'?", options: ["ist", "sind", "und"], a: "sind" }
      ]
    },// src/data/section-1.js (Unit 2, Level 2)
// src/data/section-1.js (Unit 2, Level 2)
// src/data/section-1.js (Unit 2, Level 2)
{
  levelId: "2",
  title: "Possessive Pronouns (Mein/Dein)",
  questions: [
    // --- STEP 1: INTRODUCING DEIN (MASCULINE) ---
    { type: "intro", word: "dein", translation: "your (masculine)", content: "To talk about someone else's family, use 'dein' for masculine members like Vater." },
    { type: "choice", q: "How do you say 'Your father'?", options: ["deine Vater", "dein Vater"], a: "dein Vater" },
    { type: "jumble", q: "Your brother is young", options: ["jung", "ist", "dein", "Bruder"], a: "dein Bruder ist jung" },

    // --- STEP 2: INTRODUCING DEINE (FEMININE) ---
    { type: "intro", word: "deine", translation: "your (feminine)", content: "Use 'deine' for feminine family members. It follows the same 'e' pattern as 'meine'." },
    
    { type: "choice", q: "How do you say 'Your sister'?", options: ["dein Schwester", "deine Schwester"], a: "deine Schwester" },
    { type: "jumble", q: "Your mother is nice", options: ["nett", "ist", "deine", "Mutter"], a: "deine Mutter ist nett" },

    // --- STEP 3: NEW MASCULINE MEMBER (OPA) ---
    { type: "intro", word: "der Opa", translation: "The Grandfather", content: "Grandfather is 'der Opa'. It is masculine." },
    { type: "choice", q: "Which is correct?", options: ["dein Opa", "deine Opa"], a: "dein Opa" },
    { type: "jumble", q: "My opa and your opa", options: ["dein", "Opa", "und", "mein", "Opa"], a: "mein Opa und dein Opa" },

    // --- STEP 4: NEW FEMININE MEMBER (OMA) ---
    { type: "intro", word: "die Oma", translation: "The Grandmother", content: "Grandmother is 'die Oma'. It is feminine." },
    { type: "choice", q: "Which is correct?", options: ["mein Oma", "meine Oma"], a: "meine Oma" },
    { type: "jumble", q: "Your Grandmother is very nice", options: ["nett", "sehr", "ist", "deine", "Oma"], a: "deine Oma ist sehr nett" },

    // --- STEP 5: PROGRESSIVE MIXING (BUILDING SENTENCES) ---
    { type: "jumble", q: "My brother and your brother are young", options: ["jung", "sind", "Bruder", "dein", "und", "Bruder", "mein"], a: "mein Bruder und dein Bruder sind jung" },
    {type : "intro", word: "aber", translation: "but", content: "Use 'aber' to contrast two statements."},
    { type: "jumble", q: "Your sister is nice but my sister is old", options: ["alt", "ist", "Schwester", "meine", "aber", "nett", "ist", "Schwester", "deine"], a: "deine Schwester ist nett aber meine Schwester ist alt" },

    // --- STEP 6: COMPLEX COMBINATIONS ---
    { type: "jumble", q: "Your Grandmother and my grandfather are old", options: ["alt", "sind", "Opa", "mein", "und", "Oma", "deine"], a: "deine Oma und mein Opa sind alt" },
    { type: "jumble", q: "Your mother is young and my father is nice", options: ["nett", "ist", "Vater", "mein", "und", "jung", "ist", "Mutter", "deine"], a: "deine Mutter ist jung und mein Vater ist nett" },

    // --- STEP 7: FINAL BOSS ---
    { type: "boss", q: "Translate: 'Your grandfather is nice.'", options: ["Dein Opa ist nett", "Deine Opa ist nett"], a: "Dein Opa ist nett" },
    { type: "boss", q: "Translate: 'Your grandmother and my sister are young.'", options: ["Deine Oma und meine Schwester sind jung", "Dein Oma und mein Schwester ist jung"], a: "Deine Oma und meine Schwester sind jung" },
    { type: "jumble", q: "Final Order: My brother your sister and the father", options: ["Vater", "der", "und", "Schwester", "deine", "Bruder", "mein"], a: "mein Bruder deine Schwester und der Vater" },
    { type: "boss", q: "Which possessive matches 'Opa'?", options: ["mein", "meine"], a: "mein" },
    { type: "boss", q: "Final Test: 'Your mother is not young.'", options: ["Deine Mutter ist nicht jung", "Dein Mutter ist nicht jung"], a: "Deine Mutter ist nicht jung" }
  ]
},// src/data/section-1.js (Unit 2, Level 3)
{
  levelId: "3",
  title: "He, She, and the Relatives",
  questions: [
    // --- STEP 1: NEW RELATIVES (MASCULINE) ---
    { type: "intro", word: "der Onkel", translation: "The Uncle", content: "Meet the rest of the family! 'Onkel' is Masculine (der/mein/dein)." },
    { type: "choice", q: "How do you say 'My uncle'?", options: ["meine Onkel", "mein Onkel"], a: "mein Onkel" },
    { type: "jumble", q: "Your uncle is nice", options: ["nett", "ist", "dein", "Onkel"], a: "dein Onkel ist nett" },

    // --- STEP 2: NEW RELATIVES (FEMININE) ---
    { type: "intro", word: "die Tante", translation: "The Aunt", content: "Aunt is Feminine: 'die Tante' (die/meine/deine)." },
    { type: "choice", q: "How do you say 'Your aunt'?", options: ["dein Tante", "deine Tante"], a: "deine Tante" },
    { type: "jumble", q: "My aunt is young", options: ["jung", "ist", "meine", "Tante"], a: "meine Tante ist jung" },

    // --- STEP 3: POINTING (DAS) ---
    { type: "intro", word: "das", translation: "that / this", content: "Use 'das ist' to point someone out." },
    { type: "jumble", q: "That is my uncle", options: ["Onkel", "mein", "ist", "das"], a: "das ist mein Onkel" },
    { type: "jumble", q: "That is your aunt", options: ["Tante", "deine", "ist", "das"], a: "das ist deine Tante" },

    // --- STEP 4: ASKING (WER) ---
    { type: "intro", word: "wer", translation: "who", content: "Use 'wer' to ask about a person you don't know." },
    { type: "jumble", q: "Who is that?", options: ["das", "ist", "wer"], a: "wer ist das" },
    { type: "jumble", q: "Who is your uncle?", options: ["Onkel", "dein", "ist", "wer"], a: "wer ist dein Onkel" },

    // --- STEP 5: PRONOUNS (ER / SIE) ---
    { type: "intro", word: "er / sie", translation: "he / she", content: "Instead of repeating the name, use 'er' for men and 'sie' for women." },
    
    { type: "choice", q: "Which word means 'She'?", options: ["er", "sie", "wer"], a: "sie" },
    { type: "jumble", q: "He is old", options: ["alt", "ist", "er"], a: "er ist alt" },
    { type: "jumble", q: "She is very nice", options: ["nett", "sehr", "ist", "sie"], a: "sie ist sehr nett" },

    // --- STEP 6: PROGRESSIVE DESCRIPTION (PRONOUN + RELATIVE) ---
    { type: "jumble", q: "That is my Grandfather. He is nice.", options: ["nett", "ist", "er", "Opa", "mein", "ist", "das"], a: "das ist mein Opa er ist nett" },
    { type: "jumble", q: "That is your aunt. She is young.", options: ["jung", "ist", "sie", "Tante", "deine", "ist", "das"], a: "das ist deine Tante sie ist jung" },
    { type: "choice", q: "If 'Onkel' is masculine, which pronoun do we use?", options: ["er", "sie"], a: "er" },

    // --- STEP 7: FINAL BOSS ---
    { type: "boss", q: "Translate: 'Who is that? That is my uncle.'", options: ["Wer ist das? Das ist mein Onkel", "Wer ist das? Das ist meine Onkel"], a: "Wer ist das? Das ist mein Onkel" },
    { type: "jumble", q: "My aunt and your uncle are very nice", options: ["nett", "sehr", "sind", "Onkel", "dein", "und", "Tante", "meine"], a: "meine Tante und dein Onkel sind sehr nett" },
    { type: "boss", q: "Translate: 'She is not old.'", options: ["Sie ist nicht alt", "Er ist nicht alt"], a: "Sie ist nicht alt" },
    { type: "jumble", q: "That is my sister. She is nice.", options: ["nett", "ist", "sie", "Schwester", "meine", "ist", "das"], a: "das ist meine Schwester sie ist nett" },
    { type: "boss", q: "Final Test: Which word is feminine?", options: ["Opa", "Onkel", "Tante"], a: "Tante" }
  ]
}
  ]
}
];
