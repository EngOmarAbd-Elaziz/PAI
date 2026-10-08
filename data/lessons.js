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
    version: 1,
    offline: { enabled: true },
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
  },
  {
    id: 'lesson-02',
    number: '02',
    version: 1,
    offline: { enabled: true },
    title: 'Functions & Flowcharts',
    titleAr: 'الدوال والمخططات الانسيابية',
    tag: 'Chapter 31 & 32',
    tagAr: 'الفصل 31 و 32',
    color: 'emerald',
    icon: '⚙️',
    description: 'Learn how to create reusable functions, pass parameters, and return values. Then visualize logic using Flowcharts.',
    descriptionAr: 'تعلم كيفية إنشاء دوال قابلة لإعادة الاستخدام، تمرير المتغيرات، وإرجاع القيم. ثم تخطيط المنطق باستخدام المخططات الانسيابية.',
    slideCount: 11,
    slidesFile: 'slides/lesson-02.html',
    handout: [
      { type: 'section-heading', text: '⚙️ Topic 1: What is a Function?', subtext: 'ما هي الدالة ولماذا نستخدمها؟' },
      { type: 'concept', title: 'What is a Function?', titleAr: 'ما هي الدالة؟', text: 'A function is a reusable block of code that performs a specific task. We use it to avoid repeating code.', ar: 'الدالة هي مجموعة من الأوامر البرمجية تم تجميعها معًا وإعطاؤها اسمًا محددًا، لتقوم بتنفيذ مهمة معينة بدلاً من تكرار الكود.' },
      { type: 'rule', color: 'cyan', text: 'Parameter vs Argument: Parameter is the placeholder when defining the function. Argument is the real value passed when calling it.' },
      { type: 'code', lang: 'javascript', label: 'Function to Add Two Values', text: `function sum(freestyle, breaststroke) {
  let result = freestyle + breaststroke;
  return result;
}

let teamRed = sum(39.5, 60.5);
console.log(teamRed); // 100` },
      { type: 'rule', color: 'pink', text: 'Execution Flow: 1. Function creation 2. Function call 3. Arguments passed 4. Calculation 5. return sends result 6. Store/Print result' },
      
      { type: 'section-heading', text: '🔄 Topic 2: Variables as Arguments & Multiple Parameters', subtext: 'المتغيرات كمدخلات والمعاملات المتعددة' },
      { type: 'concept', title: 'Adding More Parameters', titleAr: 'زيادة عدد الـ Parameters', text: 'Functions can take any number of parameters. This allows for more complex operations while maintaining reusability.', ar: 'يمكن للدالة أن تستقبل أي عدد من الـ Parameters، مما يسمح بإجراء عمليات معقدة وإعادة الاستخدام عدة مرات ببيانات مختلفة.' },
      { type: 'code', lang: 'javascript', label: 'Using variables as arguments and Math.min()', text: `let teamRed = sum(39.5, 60.5, 58.5);
let teamBlue = sum(40, 62, 58);
let teamGreen = sum(41, 59.5, 60);

console.log("The fastest time is " + Math.min(teamRed, teamBlue, teamGreen));` },
      
      { type: 'section-heading', text: '📐 Topic 3: Flowcharts & Conditions', subtext: 'المخططات الانسيابية والشروط' },
      { type: 'concept', title: 'What is a Flowchart?', titleAr: 'ما هو المخطط الانسيابي؟', text: "A Flowchart is a visual representation of a program's logic and decisions.", ar: 'المخطط الانسيابي هو رسم بياني يمثل خطوات البرنامج والقرارات المنطقية داخله. يساعدنا في التفكير وتخطيط البرنامج قبل كتابة الكود.' },
      { type: 'types-grid', types: [
        { name: 'Decision (معين)', color: 'amber', icon: '🔷', desc: 'Represents an if condition', example: 'Is it sunny?' },
        { name: 'Process (مستطيل)', color: 'emerald', icon: '▭', desc: 'Represents an operation', example: 'count++' },
        { name: 'Arrows (أسهم)', color: 'cyan', icon: '➔', desc: 'Flow of execution', example: 'True / False paths' }
      ]},
      { type: 'code', lang: 'javascript', label: 'Array + Loop + Condition Pattern (Crucial!)', text: `let count = 0;
for (let day of volunteerList) {
  if (day == "Yes") {
    count++;
  }
}
console.log(count);` },
      { type: 'concept', title: 'Nested Conditions', titleAr: 'الشروط المتداخلة', text: 'A Nested if is an if statement placed inside another if statement, used when a decision depends on a previous decision.', ar: 'تعني وضع شرط داخل شرط آخر. نستخدمها عندما نحتاج لاتخاذ قرار مبني على نتيجة قرار سابق.' },
      { type: 'code', lang: 'javascript', label: 'Nested Conditions Example', text: `if (passed == true) {
    if (score == 100) {
        console.log("Full Mark");
    } else {
        console.log("Congratulations");
    }
} else {
    console.log("Study Harder");
}` },
      { type: 'section-heading', text: '⚠️ Common Beginner Mistakes', subtext: 'أخطاء شائعة — احذر هذه المطبات!' },
      { type: 'mistakes-grid', mistakes: [
        { title: '1. Forgetting return', desc: 'If you do not write return, the result is lost and output is undefined.' },
        { title: '2. Missing Function Call', desc: 'Writing a function without calling it means it will never run.' },
        { title: '3. Wrong Arguments Count', desc: 'Passing 3 values to a function that only expects 2 causes errors.' },
        { title: '4. String vs Variable', desc: 'sum("teamRed") passes text, sum(teamRed) passes the actual variable value.' }
      ]}
    ]
  },
  {
    id: 'lesson-03',
    number: '03',
    version: 1,
    offline: { enabled: true },
    title: 'HTML & CSS',
    titleAr: 'تطوير الويب: HTML و CSS',
    tag: 'Web Design',
    tagAr: 'تصميم الويب',
    color: 'pink',
    icon: '🎨',
    description: 'Master web structure with HTML and professional styling with CSS. Create interactive inputs and dynamic hover effects.',
    descriptionAr: 'اتعلم إزاي تبني هيكل الصفحة بـ HTML وتنسقها بـ CSS. هنضيف أزرار وحقول إدخال ونتعلم تأثيرات الـ Hover الاحترافية.',
    slideCount: 2,
    slidesFile: 'slides/lesson-03.html',
    handout: [
      // ── UNIT 1: HTML REVIEW ──────────────────────────────────────────────
      { type: 'section-heading', text: '🏗️ الوحدة الأولى: مراجعة HTML', subtext: 'العناوين، الفقرات، القوائم، والصور' },
      
      { type: 'concept', title: 'Headings & Paragraphs', titleAr: 'العناوين والفقرات',
        text: 'HTML provides specific tags for structuring text. We use &lt;h1&gt; for the main title and &lt;p&gt; for standard text paragraphs.',
        ar: 'الـ HTML بيوفرلنا وسوم (Tags) لترتيب الكلام. بنستخدم &lt;h1&gt; عشان نكتب العنوان الرئيسي، و&lt;p&gt; عشان نكتب فقرة عادية. ولازم نقفل الوسم بعد ما نخلص كتابة.' },
      
      { type: 'code', lang: 'html', label: 'Headings & Paragraphs Example',
        text: `<h1>Welcome to My Website</h1>
<p>This is a paragraph of text explaining the website.</p>` },
      
      { type: 'concept', title: 'Lists (ul, ol, li)', titleAr: 'القوائم',
        text: 'Lists organize items. &lt;ul&gt; creates a bulleted list (Unordered), &lt;ol&gt; creates a numbered list (Ordered), and &lt;li&gt; represents each item inside them.',
        ar: 'عشان نعمل قائمة بنستخدم &lt;ul&gt; لو قائمة نقطية، أو &lt;ol&gt; لو قائمة مرقمة. وكل عنصر جوة القائمة بنحطه جوة &lt;li&gt;.' },
      
      { type: 'code', lang: 'html', label: 'Sports Tournament List Example',
        text: `<ul>
  <li>Football Match</li>
  <li>Basketball Finals</li>
  <li>Tennis Championship</li>
</ul>` },
      
      { type: 'concept', title: 'Images', titleAr: 'إضافة الصور',
        text: 'The &lt;img&gt; tag is used to embed images. It requires the "src" attribute to specify the image path. It does NOT have a closing tag.',
        ar: 'بستخدم وسم &lt;img&gt; عشان أحط صورة. الخاصية src بتحدد مكان الصورة. خلي بالك إن وسم الصورة ملوش وسم إغلاق (Self-closing).' },
      
      { type: 'code', lang: 'html', label: 'Image Tag Example',
        text: `<img src="sports.png">` },
      
      { type: 'rule', color: 'cyan', text: 'جرب بنفسك: اكتب كود لصفحة ويب بسيطة تحتوي على عنوان رئيسي "أهدافي"، وقائمة نقطية بهدفين، وصورة تعبر عن النجاح.' },

      // ── UNIT 2: TARGETING ELEMENTS WITH HTML AND CSS ─────────────────────
      { type: 'section-heading', text: '🎯 الوحدة الثانية: تحديد وتنسيق العناصر', subtext: 'كيفية ربط الـ HTML بالـ CSS' },
      
      { type: 'concept', title: 'HTML vs CSS', titleAr: 'الهيكل مقابل المظهر',
        text: 'HTML builds the structure (like a house frame), while CSS adds style (paint, furniture).',
        ar: 'الـ HTML بيبني هيكل الصفحة الأساسي، لكن الـ CSS هو اللي بيضيف الألوان والتنسيقات ويخلي شكلها حلو.' },
      
      { type: 'concept', title: 'Selector, Property, Value', titleAr: 'أجزاء الـ CSS',
        text: 'A CSS rule consists of a Selector (what to style), a Property (what to change), and a Value (the new style).',
        ar: 'أي كود CSS بيتكون من: المُحدد (Selector) عشان نختار العنصر، الخاصية (Property) زي اللون، والقيمة (Value) زي اللون الأحمر.' },

      { type: 'code', lang: 'css', label: 'CSS Anatomy',
        text: `p {
  color: red; /* color is Property, red is Value */
  background-color: yellow;
}` },

      { type: 'concept', title: 'Classes & The Span Tag', titleAr: 'الفئات ووسم span',
        text: 'A "class" is a label given to HTML elements to style them specifically. &lt;span&gt; is used to wrap a small piece of text inside a line to style it.',
        ar: 'الـ class هو اسم مميز بنديه للعنصر عشان ننسقه في الـ CSS (وبنكتب قبله نقطة). وسم &lt;span&gt; بنستخدمه لو عايزين نلون كلمة واحدة بس جوة سطر.' },

      { type: 'code', lang: 'html', label: 'Using span and class in HTML',
        text: `<p>I love the <span class="sea">sea</span> and the <span class="mountain">mountain</span>.</p>` },

      { type: 'code', lang: 'css', label: 'Styling classes in CSS',
        text: `/* Notice the dot (.) before the class name! */
.sea {
  color: blue;
}
.mountain {
  color: green;
}` },
      
      { type: 'rule', color: 'cyan', text: 'جرب بنفسك: اكتب فقرة عن فصل الصيف، واستخدم <span> لتلوين كلمة "الشمس" باللون البرتقالي.' },

      // ── UNIT 3: INPUTS AND BUTTONS ────────────────────────────────────────
      { type: 'section-heading', text: '🔘 الوحدة الثالثة: حقول الإدخال والأزرار', subtext: 'إنشاء نماذج تفاعلية' },

      { type: 'concept', title: 'Text Inputs & Buttons', titleAr: 'مربعات النص والأزرار',
        text: 'We use the &lt;input&gt; tag to create form controls. type="text" creates a text box, and type="button" creates a clickable button.',
        ar: 'بنستخدم وسم &lt;input&gt; عشان نعمل أدوات الإدخال. لو كتبنا type="text" هيعمل مربع نص، ولو كتبنا type="button" هيعمل زرار. خاصية value بتحدد الكلام اللي هيظهر على الزرار.' },

      { type: 'code', lang: 'html', label: 'Survey Form Example',
        text: `<h1>Quick Survey</h1>
<p>What is your favorite color?</p>
<input type="text">
<input type="button" value="Submit">` },

      { type: 'rule', color: 'amber', text: 'تنبيه هام: هذا الكود يصمم شكل الزر فقط. لكي يقوم الزر بإرسال البيانات فعلياً، نحتاج إلى إضافة أوامر برمجية باستخدام JavaScript لاحقاً.' },

      // ── UNIT 4: CSS REVIEW & TEXT FORMATTING ──────────────────────────────
      { type: 'section-heading', text: '🖌️ الوحدة الرابعة: مراجعة CSS وتنسيق النصوص', subtext: 'الألوان والخطوط' },

      { type: 'types-grid', types: [
        { name: 'color', color: 'cyan', icon: 'A', desc: 'Changes text color', example: 'color: blue;' },
        { name: 'background-color', color: 'emerald', icon: '🎨', desc: 'Changes background', example: 'background-color: yellow;' },
        { name: 'font-size', color: 'pink', icon: '📏', desc: 'Changes text size in pixels', example: 'font-size: 24px;' },
        { name: 'font-weight', color: 'amber', icon: 'B', desc: 'Changes text thickness', example: 'font-weight: bold;' }
      ]},

      { type: 'code', lang: 'html', label: 'Homework List (HTML)',
        text: `<h2>Homework</h2>
<ul>
  <li>History Study</li>
  <li class="blue">Math Practice</li>
  <li>Essay</li>
</ul>` },

      { type: 'code', lang: 'css', label: 'Homework List (CSS)',
        text: `.blue {
  color: blue;
  font-weight: 900;
}` },

      { type: 'rule', color: 'cyan', text: 'جرب بنفسك: قم بإنشاء عنوان <h1> وقم بتغيير حجم الخط إلى 40px والخلفية إلى اللون الأسود.' },

      // ── UNIT 5: BUTTON HOVER EFFECTS ──────────────────────────────────────
      { type: 'section-heading', text: '✨ الوحدة الخامسة: تزيين الأزرار باستخدام Hover', subtext: 'التفاعل عند مرور الفأرة' },

      { type: 'concept', title: 'The :hover Pseudo-class', titleAr: 'مؤثر المرور :hover',
        text: 'The :hover selector is used to select elements when you mouse over them. It makes web pages feel interactive and alive.',
        ar: 'بنستخدم :hover عشان نغير شكل العنصر (زي الزرار) لما الماوس يعدي من عليه. ده بيدي حيوية للصفحة ويحسس المستخدم إن الزرار تفاعلي.' },

      { type: 'code', lang: 'css', label: 'Hover Effect Example',
        text: `/* 1. Normal state of the button */
.btn1 {
  background-color: gray;
  color: white;
}

/* 2. State when mouse hovers over it */
.btn1:hover {
  background-color: lime;
}` },

      { type: 'rule', color: 'pink', text: 'الفرق: .btn1 هو الشكل الطبيعي اللي بيظهر دايماً. لكن .btn1:hover هو الشكل المؤقت اللي بيظهر بس لما الماوس يلمس الزرار.' },

      { type: 'code', lang: 'css', label: 'Another Button Example',
        text: `.btn2 { background-color: white; color: black; }
.btn2:hover { background-color: yellow; }` },

      { type: 'rule', color: 'cyan', text: 'جرب بنفسك: اصنع زراً كلاسيكياً يتغير لونه إلى الأحمر عند مرور الماوس عليه.' },

      // ── UNIT 6: CSS TRANSITIONS ───────────────────────────────────────────
      { type: 'section-heading', text: '⏳ الوحدة السادسة: الانتقالات التدريجية (Transition)', subtext: 'حركة ناعمة واحترافية' },

      { type: 'concept', title: 'Smooth Transitions', titleAr: 'الانتقال السلس',
        text: 'The transition property allows you to change property values smoothly over a given duration (in seconds, "s").',
        ar: 'خاصية transition بتخلي التغيير اللي بيحصل (مثلاً تغيير اللون) يحصل بالتدريج وبنعومة بدل ما يتغير فجأة. وبنحدد المدة بالثواني باستخدام حرف s.' },

      { type: 'code', lang: 'css', label: 'Adding Transition to Hover',
        text: `.btn-smooth {
  background-color: blue;
  transition: 2s; /* Takes 2 seconds to change */
}

.btn-smooth:hover {
  background-color: red;
}` },

      { type: 'rule', color: 'amber', text: 'ملاحظة: بنكتب transition في الـ class الأساسي (زي .btn-smooth)، مش في الـ :hover. عشان الانتقال يشتغل واحنا بنشيل الماوس كمان!' },

      // ── UNIT 7: CSS BORDERS ───────────────────────────────────────────────
      { type: 'section-heading', text: '🔲 الوحدة السابعة: إضافة الحدود (Border)', subtext: 'تأطير العناصر' },

      { type: 'concept', title: 'CSS Borders', titleAr: 'حدود العناصر',
        text: 'The border property allows you to specify the style, width, and color of an element\'s border. Types include solid and double.',
        ar: 'خاصية border بتعمل إطار أو برواز حوالين العنصر. بنحدد فيه 3 حاجات بالترتيب: السُمك (بالبيكسل px)، والنوع (زي solid خط واحد، أو double خطين)، واللون.' },

      { type: 'code', lang: 'css', label: 'Border Examples',
        text: `h1 {
  border: 5px solid red; /* 5px thick, single line, red color */
}

.packing-list {
  border: 10px double blue; /* 10px thick, double lines, blue color */
}` },

      { type: 'rule', color: 'cyan', text: 'جرب بنفسك: اصنع صندوقاً باستخدام &lt;div&gt; وضع له حداً مزدوجاً بسمك 8px ولون أخضر.' },

      // ── COMMON MISTAKES ──────────────────────────────────────────────────
      { type: 'section-heading', text: '⚠️ أخطاء شائعة — Common Mistakes', subtext: 'احذر هذه المطبات البرمجية!' },
      { type: 'mistakes-grid', mistakes: [
        { title: '1. نسيان الإغلاق', desc: 'نسيان إغلاق الوسوم مثل &lt;/h1&gt;، مما يؤدي إلى تطبيق التنسيق على باقي الصفحة بالخطأ.' },
        { title: '2. نسيان النقطة في الـ class', desc: 'كتابة blue { color: blue; } بدلاً من .blue في الـ CSS. النقطة ضرورية جداً!' },
        { title: '3. استخدام color للخلفية', desc: 'كتابة color لتلوين الخلفية بدلاً من background-color. color يغير لون النص فقط.' },
        { title: '4. كتابة الـ transition في الـ hover', desc: 'هذا يجعل العنصر يعود لشكله الطبيعي فجأة بدون نعومة عند إبعاد الماوس.' }
      ]},

      // ── FINAL REVIEW & EXERCISES ─────────────────────────────────────────
      { type: 'section-heading', text: '📝 المراجعة الشاملة والتطبيقات', subtext: 'اختبر فهمك لمواضيع الحصة' },
      
      { type: 'concept', title: '1. أسئلة الاختيار من متعدد (MCQ)', titleAr: '', text: `
        <ol style="margin-left: 20px; line-height: 1.8;">
          <li>أي وسم يستخدم لإنشاء قائمة نقطية؟
            <br> a) &lt;ol&gt; &nbsp;&nbsp; b) &lt;ul&gt; &nbsp;&nbsp; c) &lt;li&gt;
          </li>
          <li>لإضافة صورة، نستخدم الخاصية:
            <br> a) href &nbsp;&nbsp; b) class &nbsp;&nbsp; c) src
          </li>
          <li>لتغيير لون الخلفية لزر معين نستخدم:
            <br> a) color &nbsp;&nbsp; b) background-color &nbsp;&nbsp; c) bgcolor
          </li>
          <li>ما هو الترتيب الصحيح لخصائص الـ border؟
            <br> a) Color, Type, Thickness &nbsp;&nbsp; b) Thickness, Type, Color
          </li>
        </ol>
      `},

      { type: 'concept', title: '2. صح أم خطأ', titleAr: '', text: `
        <ul style="margin-left: 20px; line-height: 1.8;">
          <li>( ) وسم الصورة &lt;img&gt; يحتاج دائماً إلى وسم إغلاق &lt;/img&gt;.</li>
          <li>( ) الخاصية transition تستخدم لتغيير حالة العنصر فوراً دون تدرج.</li>
          <li>( ) وسم &lt;span&gt; يستخدم لتمييز وتنسيق جزء صغير من النص داخل السطر.</li>
          <li>( ) لكتابة class في الـ CSS يجب أن نبدأ باسم الـ class مباشرة دون علامات.</li>
        </ul>
      `},

      { type: 'concept', title: '3. اكتشف الخطأ', titleAr: '', text: `
        <p>يوجد خطأ في الكود التالي، اكتشفه وصححه:</p>
        <pre style="background: rgba(0,0,0,0.2); color: #fff; padding: 10px; border-radius: 5px; font-family: 'Fira Code', monospace; font-size: 13px;">
&lt;h1&gt;Welcome&lt;h1&gt;
&lt;input type="button" text="Click Me"&gt;

btn {
  color: red;
}
        </pre>
      `},

      { type: 'concept', title: '4. التمرين النهائي (مشروع صغير)', titleAr: '', text: `
        <p>باستخدام المحرر (Coding Lab)، صمم صفحة تحتوي على:</p>
        <ul style="margin-left: 20px; line-height: 1.8;">
          <li>عنوان رئيسي أزرق اللون.</li>
          <li>صورة من اختيارك.</li>
          <li>قائمة نقطية تحتوي على 3 مهام.</li>
          <li>زر مكتوب عليه "إرسال"، له إطار 2px solid black، ويتغير لون خلفيته تدريجياً خلال 1s عند مرور الماوس عليه.</li>
        </ul>
      `},

      { type: 'concept', title: '💡 نموذج الإجابة السريع', titleAr: '', text: `
        <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-emerald);">
          <strong>1. MCQ:</strong> 1(b), 2(c), 3(b), 4(b)<br>
          <strong>2. صح وخطأ:</strong> (خطأ) - (خطأ) - (صح) - (خطأ)<br>
          <strong>3. تصحيح الخطأ:</strong> <br>
          - وسم الإغلاق يكون &lt;/h1&gt;<br>
          - النص داخل الزر يُكتب بالخاصية value="Click Me"<br>
          - يجب وضع نقطة قبل الـ class في الـ CSS هكذا .btn 
        </div>
      `}
    ]
  }
];