/**
 * DIGITAL COURSE LIBRARY — LESSON DATA
 * Egyptian Baccalaureate — Engineering & Computer Science Track
 *
 * HOW TO ADD A NEW LESSON:
 * 1. Create a new slide fragment at slides/lesson-XX.html
 * 2. Add a new entry to the LESSONS array below (copy the template at the bottom)
 * 3. That's it — the library page renders automatically.
 */

const LESSONS = [
  {
    id: 'lesson-01',
    number: '01',
    title: 'Programming Fundamentals',
    titleAr: 'أساسيات البرمجة',
    tag: 'Foundation Review',
    tagAr: 'مراجعة تأسيسية',
    color: 'cyan',           // Used for card accent: 'cyan' | 'amber' | 'purple' | 'pink' | 'emerald'
    icon: '📦',
    description: 'Variables, concatenation, conditions, loops & functions — the 5 core pillars every engineer must master.',
    descriptionAr: 'المتغيرات، دمج النصوص، الشروط، التكرار، والدوال — المحاور الخمسة الأساسية لكل مهندس.',
    slideCount: 44,
    slidesFile: 'slides/lesson-01.html',
    handout: [
      // ── SECTION 1: VARIABLES ──────────────────────────────────────────────
      { type: 'section-heading', text: '📦 Topic 1: Variables', subtext: 'المتغيرات — التخزين في ذاكرة الكمبيوتر' },

      { type: 'concept', title: 'What is a Variable?', titleAr: 'ما هو المتغير؟',
        text: 'A variable is a named container in the computer\'s memory (RAM) used to store a value. Think of it as a labeled storage box: the label is the identifier and the contents are the value.',
        ar: 'المتغير هو مكان مسمى ومحجوز داخل ذاكرة الكمبيوتر (RAM) عشان نحفظ فيه معلومة أو قيمة نحتاجها ونرجع نستخدمها أو نعدلها لاحقاً.' },

      { type: 'code', lang: 'javascript', label: 'Declaration + Assignment (combined — recommended)',
        text: `let score = 100;   // Creates "score", stores 100 inside it
let name = "Omar"; // Creates "name", stores text "Omar"` },

      { type: 'rule', color: 'cyan', text: 'Declaration = reserving the box. Assignment = putting a value inside. Reassignment = replacing the old value with a new one.' },

      { type: 'code', lang: 'javascript', label: 'Reassignment — no "let" keyword again!',
        text: `let score = 10;
score = 20;        // Replaces 10 with 20. Old value is gone.
// ❌ WRONG: let score = 20; (can't re-declare!)` },

      { type: 'code', lang: 'javascript', label: 'Increment & Decrement shorthand',
        text: `let lives = 3;
lives++;           // Same as: lives = lives + 1  → now 4
lives--;           // Same as: lives = lives - 1  → now 3` },

      { type: 'rule', color: 'amber', text: 'Naming Rules: Use camelCase (e.g. studentScore). No spaces. Must be descriptive. Cannot start with a number.' },

      { type: 'code', lang: 'javascript', label: 'Good vs Bad naming',
        text: `// ❌ Bad names:
let x = 16;        // What does x mean?
let data = "Omar"; // What kind of data?

// ✓ Good names:
let studentAge = 16;
let studentName = "Omar";` },

      // ── SECTION 2: DATA TYPES ─────────────────────────────────────────────
      { type: 'section-heading', text: '🔤 Topic 2: Data Types & Output', subtext: 'أنواع البيانات والإخراج' },

      { type: 'concept', title: 'The Three Core Data Types', titleAr: 'أنواع البيانات الثلاثة الأساسية',
        text: 'Every value in JavaScript has a type that determines how the engine treats it.',
        ar: 'كل قيمة في جافاسكريبت ليها نوع بيحدد إزاي الكمبيوتر يتعامل معاها.' },

      { type: 'types-grid', types: [
        { name: 'String (نص)', color: 'emerald', icon: '🔤', desc: 'Text in quotes', example: '"Ziad"  \'Hello\'' },
        { name: 'Number (رقم)', color: 'amber', icon: '🔢', desc: 'Numeric value without quotes', example: '100  16  98.5' },
        { name: 'Boolean (منطقي)', color: 'purple', icon: '⚖️', desc: 'Only two states', example: 'true  false' }
      ]},

      { type: 'rule', color: 'crimson', text: '⚠️ "100" (with quotes) is a String, NOT a number. You cannot do math with it directly!' },

      { type: 'code', lang: 'javascript', label: 'console.log() — your window into the program',
        text: `console.log("Hello!");       // Prints text
console.log(score);         // Prints the value of a variable
console.log(10 + 20);      // Prints 30 (evaluates expression first!)` },

      // ── SECTION 3: COMMENTS ──────────────────────────────────────────────
      { type: 'section-heading', text: '💬 Topic 3: Comments', subtext: 'التعليقات — ملاحظات يتجاهلها الكمبيوتر' },

      { type: 'concept', title: 'Comments in Code', titleAr: 'التعليقات في الكود',
        text: 'Comments are human-readable notes ignored completely by the JavaScript engine. They explain why code was written that way.',
        ar: 'التعليقات بتبدأ بـ // والكمبيوتر بيتجاهلها تماماً. هي معمولة للبشر عشان يفهموا الكود.' },

      { type: 'code', lang: 'javascript', label: 'Single-line comment & commenting out code',
        text: `// This is a comment — the engine skips this line completely
let score = 100;             // Inline comment after code
// console.log(score);      // This line is "commented out" — disabled but not deleted` },

      // ── SECTION 4: CONCATENATION ──────────────────────────────────────────
      { type: 'section-heading', text: '🧩 Topic 4: Consolidation / Concatenation', subtext: 'دمج النصوص والبيانات' },

      { type: 'concept', title: 'The + Operator: Math vs Glue', titleAr: 'عامل الجمع: حساب أم صمغ؟',
        text: 'The + operator has two personalities: with numbers it adds mathematically; with strings it acts like glue, sticking text values end-to-end.',
        ar: 'علامة + مع الأرقام بتجمع رياضياً، لكن أول ما يظهر نص بتبقى "صمغ" يربط القيم جنب بعضها!' },

      { type: 'code', lang: 'javascript', label: 'Concatenation examples',
        text: `let name = "Omar";
let age = 16;

console.log("My name is " + name);     // My name is Omar
console.log("I am " + age);            // I am 16
console.log("Score: " + 95);           // Score: 95` },

      { type: 'code', lang: 'javascript', label: 'String vs Calculation — crucial difference!',
        text: `console.log("100 + 200");    // Output: 100 + 200  (literal text!)
console.log(100 + 200);      // Output: 300        (actual math!)` },

      // ── SECTION 5: CONDITIONS ─────────────────────────────────────────────
      { type: 'section-heading', text: '🚦 Topic 5: Conditional Statements', subtext: 'الجمل الشرطية — اتخاذ القرارات' },

      { type: 'concept', title: 'IF / ELSE / ELSE IF', titleAr: 'if / else / else if',
        text: 'Conditional statements allow a program to choose different paths based on whether a condition evaluates to true or false.',
        ar: 'الجمل الشرطية تسمح للبرنامج يختار مسارات مختلفة بناءً على هل الشرط صح أو غلط — زي إشارة المرور بالظبط!' },

      { type: 'code', lang: 'javascript', label: 'IF — ELSE — ELSE IF structure',
        text: `let score = 75;

if (score >= 90) {
    console.log("Excellent");
} else if (score >= 75) {
    console.log("Very Good");   // ← This prints (75 >= 75 is true)
} else if (score >= 50) {
    console.log("Pass");
} else {
    console.log("Fail");
}` },

      { type: 'rule', color: 'amber', text: 'The computer checks conditions TOP TO BOTTOM and stops at the FIRST true one. The others are completely skipped.' },

      { type: 'code', lang: 'javascript', label: 'Comparison operators — always produce true or false',
        text: `10 > 5    // true  (greater than)
10 < 5    // false (less than)
10 == 10  // true  (equal value)
10 >= 10  // true  (greater than OR equal)` },

      { type: 'rule', color: 'crimson', text: '⚠️ = (one equals) means STORE. == (two equals) means COMPARE. Never confuse them inside an if condition!' },

      // ── SECTION 6: FOR LOOPS ──────────────────────────────────────────────
      { type: 'section-heading', text: '🔄 Topic 6: For Loops', subtext: 'حلقات التكرار — الأتمتة الذكية' },

      { type: 'concept', title: 'The FOR Loop', titleAr: 'حلقة التكرار FOR',
        text: 'A for loop lets you write an instruction once and tell the computer how many times to repeat it. It eliminates code duplication entirely.',
        ar: 'حلقة التكرار بتخليك تكتب الأمر مرة واحدة وتقول للكمبيوتر كرره كذا مرة. بدها ما تكتبش نفس السطر 100 مرة!' },

      { type: 'code', lang: 'javascript', label: 'FOR loop — 4 components (color-coded in slides)',
        text: `//         Init      Condition  Update
for (let i = 0;  i < 5;    i++) {
    console.log(i);    // Process: runs 5 times (i = 0,1,2,3,4)
}` },

      { type: 'rule', color: 'purple', text: 'Execution Order: 1. Init (once) → 2. Check condition → 3. Run body → 4. Update (i++) → back to step 2. Exits when condition is false.' },

      { type: 'code', lang: 'javascript', label: 'Loop counter timeline trace',
        text: `for (let i = 1; i <= 4; i++) {
    console.log("Lap: " + i);
}
// Output: Lap: 1 / Lap: 2 / Lap: 3 / Lap: 4
// Runs 4 times. First value: 1. Last value: 4.` },

      // ── SECTION 7: FUNCTIONS ──────────────────────────────────────────────
      { type: 'section-heading', text: '⚙️ Topic 7: Functions', subtext: 'الدوال — ماكينات برمجية قابلة لإعادة الاستخدام' },

      { type: 'concept', title: 'What is a Function?', titleAr: 'ما هي الدالة؟',
        text: 'A function is a reusable block of code that performs a specific task. Write it once, call it anywhere. Think of it as a machine: Input → Process → Output.',
        ar: 'الدالة هي ماكينة برمجية بتاخد مدخلات، تعالجها، وتطلع نتيجة. اكتبها مرة، ناديها في أي مكان!' },

      { type: 'code', lang: 'javascript', label: 'Defining vs Calling — THE most important distinction',
        text: `// DEFINITION — creates the machine (does NOT run it yet!)
function greet() {
    console.log("Hello, Engineer!");
}

// CALL — presses the start button!
greet();    // Output: Hello, Engineer!
greet();    // Called again! Prints again.` },

      { type: 'rule', color: 'pink', text: 'Defining a function stores the recipe in memory. Calling it executes the recipe. A function that is never called runs ZERO lines!' },

      { type: 'code', lang: 'javascript', label: 'Function with Parameter — makes it flexible',
        text: `function greet(name) {                // "name" is the parameter
    console.log("Hello " + name);
}

greet("Omar");   // Passes "Omar" → prints: Hello Omar
greet("Nour");   // Passes "Nour" → prints: Hello Nour` },

      { type: 'code', lang: 'javascript', label: 'Complete example — all 5 concepts working together',
        text: `function checkGrade(studentName, score) {
    if (score >= 50) {
        console.log(studentName + ": Passed with " + score);
    } else {
        console.log(studentName + ": Needs improvement");
    }
}

checkGrade("Kareem", 85);  // Kareem: Passed with 85
checkGrade("Sara", 42);    // Sara: Needs improvement` },

      // ── COMMON MISTAKES ──────────────────────────────────────────────────
      { type: 'section-heading', text: '⚠️ Common Beginner Mistakes', subtext: 'أشهر 9 أخطاء — احذر هذه المطبات!' },
      { type: 'mistakes-grid', mistakes: [
        { title: '1. = vs ==', desc: 'Using = (assignment) inside an if condition. Always use == or === for comparison.' },
        { title: '2. Forgetting Quotes', desc: 'Writing let name = Omar; — JavaScript searches for a variable named Omar!' },
        { title: '3. "100 + 200" Trap', desc: 'Thinking quoted text calculates. Quotes freeze it as literal text.' },
        { title: '4. Forgetting i++', desc: 'Omitting the loop increment creates an infinite loop that crashes the browser.' },
        { title: '5. Defining Without Calling', desc: 'Writing a function but not calling it — nothing runs!' },
        { title: '6. Semicolon After IF', desc: 'Writing if (x > 5); { ... } — the semicolon terminates the check prematurely.' }
      ]}
    ]
  }

  // ══════════════════════════════════════════════════════════════
  // ADD NEW LESSONS HERE ↓  (copy the template below)
  // ══════════════════════════════════════════════════════════════
  //
  // ,{
  //   id: 'lesson-02',
  //   number: '02',
  //   title: 'Object-Oriented Programming',
  //   titleAr: 'البرمجة الكائنية',
  //   tag: 'OOP',
  //   tagAr: 'البرمجة بالكائنات',
  //   color: 'purple',
  //   icon: '🏗️',
  //   description: 'Classes, objects, properties and methods.',
  //   descriptionAr: 'الفئات والكائنات والخصائص والطرق.',
  //   slideCount: 0,
  //   slidesFile: 'slides/lesson-02.html',
  //   handout: []
  // }
];
