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
    version: 2,
    offline: { enabled: true },
    title: 'HTML & CSS',
    titleAr: 'تطوير الويب: HTML و CSS',
    tag: 'Web Design',
    tagAr: 'تصميم الويب',
    color: 'pink',
    icon: '🎨',
    description: 'Master web structure with HTML and professional styling with CSS. Create interactive inputs and dynamic hover effects.',
    descriptionAr: 'اتعلم إزاي تبني هيكل الصفحة بـ HTML وتنسقها بـ CSS. هنضيف أزرار وحقول إدخال ونتعلم تأثيرات الـ Hover الاحترافية.',
    slideCount: 12,
    slidesFile: 'slides/lesson-03.html',
    handout: [
      // ── INTRODUCTION ──────────────────────────────────────────────
      { type: 'section-heading', text: '🏗️ مقدمة: بناء المنزل الرقمي', subtext: 'الفرق الجوهري بين HTML و CSS' },
      
      { type: 'concept', title: 'The Skeleton vs The Paint', titleAr: 'الهيكل مقابل الطلاء',
        text: 'Building a website is exactly like building a house. HTML (HyperText Markup Language) provides the bricks, pillars, and structure. CSS (Cascading Style Sheets) provides the interior design, colors, and layout.',
        ar: 'تخيل إنك بتبني عمارة. مستحيل تبدأ تدهن الحيطان وتفرش السجاد قبل ما تبني الطوب والأساسات! الـ HTML هو الطوب (العناوين، الفقرات، الصور). والـ CSS هو الديكور (الألوان، الخطوط، المسافات).' },

      // ── UNIT 1: HTML REVIEW ──────────────────────────────────────────────
      { type: 'section-heading', text: '🧱 الوحدة الأولى: حجر الأساس (HTML Review)', subtext: 'العناوين، الفقرات، القوائم، والصور' },
      
      { type: 'concept', title: 'Headings & Paragraphs', titleAr: 'العناوين والفقرات',
        text: 'HTML uses "Tags" to label content. Think of tags as containers. We use &lt;h1&gt; to &lt;h6&gt; for headings, and &lt;p&gt; for paragraphs of text.',
        ar: 'الـ HTML بيعتمد على حاجة اسمها "وسوم" (Tags). كل وسم بيفهّم المتصفح نوع الكلام. &lt;h1&gt; بيقول للمتصفح "ده عنوان رئيسي ضخم"، و &lt;p&gt; بتقوله "دي فقرة عادية". ولازم دايماً نقفل الوسم بعلامة / عشان المتصفح يعرف إننا خلصنا.' },
      
      { type: 'code', lang: 'html', label: 'Headings & Paragraphs Example',
        text: `<h1>Welcome to the Engineering Track</h1>
<p>In this track, we learn how to command computers to build the future.</p>` },
      
      { type: 'concept', title: 'Lists & Organization', titleAr: 'التنظيم والقوائم',
        text: 'To group items, we use lists. &lt;ul&gt; (Unordered List) creates bullet points. Inside it, every single item MUST be wrapped in an &lt;li&gt; (List Item) tag.',
        ar: 'عشان نعمل قائمة مرتبة أو نقطية بنستخدم &lt;ul&gt;. المتصفح مش بيفهم السطور الفاضية، لازم كل عنصر جوة القائمة تحطه جوة وسم &lt;li&gt; عشان يترسم جنبه نقطة.' },
      
      { type: 'code', lang: 'html', label: 'Tech Stack List',
        text: `<h3>My Tech Stack:</h3>
<ul>
  <li>HTML for Structure</li>
  <li>CSS for Styling</li>
  <li>JavaScript for Logic</li>
</ul>` },
      
      { type: 'concept', title: 'Images: The Self-Closing Tag', titleAr: 'الصور والوسوم ذاتية الإغلاق',
        text: 'The &lt;img&gt; tag embeds an image. It is unique because it has no closing tag. It uses the "src" (source) attribute to point to the image file.',
        ar: 'وسم الصورة &lt;img&gt; مختلف شوية، ملوش وسم إغلاق! لأنه مش بيحتوي على نص جواه، هو بس بيشاور على مسار الصورة باستخدام خاصية src.' },
      
      { type: 'code', lang: 'html', label: 'Image Tag Example',
        text: `<img src="robot.png">` },
      
      { type: 'rule', color: 'cyan', text: '🎯 جرب بنفسك (تطبيق 1): افتح المحرر، واكتب كود لصفحة تحتوي على عنوان رئيسي "مشروعي الأول"، ثم قائمة نقطية بها 3 أهداف تسعى لتحقيقها، وصورة تعبر عن النجاح.' },

      // ── UNIT 2: TARGETING ELEMENTS WITH HTML AND CSS ─────────────────────
      { type: 'section-heading', text: '🎯 الوحدة الثانية: فن التحديد والتشكيل (CSS)', subtext: 'كيف نعطي الأوامر لفرشاة الألوان؟' },
      
      { type: 'concept', title: 'Selector, Property, Value', titleAr: 'تشريح كود الـ CSS',
        text: 'Every CSS rule needs three things: Who are we styling? (Selector), What are we changing? (Property), and What is the new look? (Value).',
        ar: 'عشان تدي أمر للـ CSS، لازم تحدد 3 حاجات: المُحدد (أنا بكلم مين؟ مثلاً حرف p)، الخاصية (عايز أغير إيه؟ مثلاً color)، والقيمة (النتيجة إيه؟ مثلاً red).' },

      { type: 'code', lang: 'css', label: 'The Anatomy of CSS',
        text: `/* Selector { Property: Value; } */
p {
  color: red; 
  background-color: yellow;
}` },

      { type: 'concept', title: 'Classes: Naming Specific Elements', titleAr: 'الفئات (Classes) — التمييز الدقيق',
        text: 'If you have 100 paragraphs but only want to style 2 of them, you give them a "class" name in HTML, and target that exact name in CSS using a dot (.).',
        ar: 'تخيل عندك 100 كرسي في القاعة وعايز تلون 5 منهم بس بالذهبي للضيوف المهمين. هتحط عليهم ستيكر مكتوب عليه VIP. في البرمجة، الستيكر ده هو الـ class. وفي الـ CSS بننادي عليه بنقطة .VIP' },

      { type: 'code', lang: 'html', label: 'Adding classes in HTML',
        text: `<p>This is normal text.</p>
<p class="vip-text">This is very important text!</p>` },

      { type: 'code', lang: 'css', label: 'Targeting classes in CSS',
        text: `/* The dot (.) is crucial! It tells CSS to look for a class */
.vip-text {
  color: gold;
  font-size: 24px;
}` },

      { type: 'concept', title: 'The <span> Tag', titleAr: 'وسم <span> — الدقة المتناهية',
        text: 'What if you want to style a single word INSIDE a paragraph? You wrap that specific word in a &lt;span&gt; tag.',
        ar: 'لو حابب تلون كلمة واحدة بس جوة سطر طويل من غير ما تقطع السطر، بنحط الكلمة دي جوة وسم &lt;span&gt; ونديله class خاص بيه.' },
      
      { type: 'code', lang: 'html', label: 'Styling a single word',
        text: `<p>I love the <span class="sea">sea</span> and the <span class="mountain">mountain</span>.</p>` },
        
      { type: 'code', lang: 'css', label: 'CSS for the spans',
        text: `.sea { color: blue; }
.mountain { color: green; }` },

      { type: 'rule', color: 'cyan', text: '🎯 جرب بنفسك (تطبيق 2): اكتب فقرة عن فصل الصيف، واستخدم <span> لتلوين كلمة "الشمس" باللون البرتقالي الساطع.' },

      // ── UNIT 3: INPUTS AND BUTTONS ────────────────────────────────────────
      { type: 'section-heading', text: '🔘 الوحدة الثالثة: التفاعل ونقل البيانات', subtext: 'حقول الإدخال والأزرار' },

      { type: 'concept', title: 'Forms & Inputs', titleAr: 'أدوات الإدخال',
        text: 'A website without inputs is just a poster. To let users interact, we use the &lt;input&gt; tag. Changing its "type" changes its function completely.',
        ar: 'عشان نخلي المستخدم يتفاعل معانا ويدخل بياناته، بنستخدم وسم &lt;input&gt;. الجميل إن الوسم ده بيتغير شكله تماماً حسب الـ type اللي بنكتبهوله.' },

      { type: 'code', lang: 'html', label: 'Text Box vs Button',
        text: `<!-- Creates a box for typing text -->
<input type="text">

<!-- Creates a clickable button -->
<input type="button" value="Send Message">` },

      { type: 'rule', color: 'amber', text: '⚠️ ملاحظة هندسية هامة: وسم الزر (button) في الـ HTML يقوم برسم شكل الزر فقط على الشاشة. إذا ضغطت عليه لن يحدث شيء! لكي يقوم بإرسال البيانات فعلياً، سنحتاج لاحقاً إلى برمجته باستخدام لغة JavaScript.' },

      // ── UNIT 4: CSS REVIEW & TEXT FORMATTING ──────────────────────────────
      { type: 'section-heading', text: '🖌️ الوحدة الرابعة: أدوات التنسيق الشاملة', subtext: 'مراجعة خصائص الـ CSS' },

      { type: 'concept', title: 'Essential CSS Properties', titleAr: 'الخصائص الأساسية التي لا غنى عنها',
        text: 'Mastering these 4 properties gives you control over 80% of text styling in any web project.',
        ar: 'إتقانك للخصائص الأربعة دي هيديك تحكم كامل في شكل أي نص في موقعك.' },

      { type: 'types-grid', types: [
        { name: 'color', color: 'cyan', icon: 'A', desc: 'Changes the text color itself.', example: 'color: blue;' },
        { name: 'background-color', color: 'emerald', icon: '🎨', desc: 'Changes the box behind the text.', example: 'background-color: yellow;' },
        { name: 'font-size', color: 'pink', icon: '📏', desc: 'Changes text size in pixels (px).', example: 'font-size: 24px;' },
        { name: 'font-weight', color: 'amber', icon: 'B', desc: 'Changes text thickness (bold).', example: 'font-weight: bold;' }
      ]},

      { type: 'code', lang: 'css', label: 'Combining properties on a button class',
        text: `.submit-btn {
  color: white;
  background-color: black;
  font-size: 18px;
  font-weight: bold;
}` },

      { type: 'rule', color: 'cyan', text: '🎯 جرب بنفسك (تطبيق 3): قم بإنشاء عنوان &lt;h1&gt; وقم بتغيير حجم الخط إلى 50px والخلفية إلى اللون الأسود، ولون النص إلى الأبيض.' },

      // ── UNIT 5: BUTTON HOVER EFFECTS ──────────────────────────────────────
      { type: 'section-heading', text: '✨ الوحدة الخامسة: سحر الـ Hover', subtext: 'إضافة الحيوية للعناصر التفاعلية' },

      { type: 'concept', title: 'The :hover Pseudo-class', titleAr: 'مؤثر المرور (Hover)',
        text: 'The :hover selector activates ONLY when the user\'s mouse pointer is resting on the element. It is crucial for UX (User Experience).',
        ar: 'عشان نحسس المستخدم إن الزرار شغال وتفاعلي، بنستخدم إضافة صغيرة اسمها :hover. دي بتخلي الكود يتنفذ (مثلاً يتغير لونه) فقط طول ما الماوس واقف فوق العنصر.' },

      { type: 'code', lang: 'css', label: 'Hover Effect in Action',
        text: `/* 1. The Normal State (Always visible) */
.btn-magic {
  background-color: gray;
  color: white;
}

/* 2. The Hover State (Visible only on mouse over) */
.btn-magic:hover {
  background-color: lime;
  color: black;
}` },

      { type: 'rule', color: 'pink', text: '💡 التفكير البرمجي: نحن لا ننشئ زراً جديداً في الـ hover! بل نكتب فقط الخصائص التي نريد تغييرها (مثل اللون). باقي الخصائص (كحجم الخط) ستظل موروثة من الشكل الأساسي.' },

      // ── UNIT 6: CSS TRANSITIONS ───────────────────────────────────────────
      { type: 'section-heading', text: '⏳ الوحدة السادسة: نعومة الانتقالات (Transition)', subtext: 'وداعاً للتغيرات المفاجئة!' },

      { type: 'concept', title: 'The Transition Property', titleAr: 'خاصية الانتقال التدريجي',
        text: 'By default, CSS changes happen instantly (in 0.001 seconds). The transition property acts like a brake, slowing down the change over a specified time in seconds (s).',
        ar: 'تغيير اللون في الـ hover بيحصل فجأة زي الخبطة! عشان نخليه يتغير بنعومة واحترافية، بنستخدم خاصية transition وبنحدد الوقت بالثواني (حرف s).' },

      { type: 'code', lang: 'css', label: 'Adding Smoothness',
        text: `.btn-smooth {
  background-color: blue;
  /* Tell the browser: Any change to this element should take 1 second */
  transition: 1s; 
}

.btn-smooth:hover {
  background-color: red;
}` },

      { type: 'rule', color: 'crimson', text: '⚠️ خطأ كارثي شائع: لا تكتب خاصية transition بداخل الـ :hover! بل اكتبها في الـ class الأساسي. إذا كتبتها في الـ hover، سيكون الانتقال ناعماً عند وضع الماوس، ولكنه سيختفي فجأة وبشكل قبيح عند إبعاد الماوس!' },

      // ── UNIT 7: CSS BORDERS ───────────────────────────────────────────────
      { type: 'section-heading', text: '🔲 الوحدة السابعة: فن التأطير (Borders)', subtext: 'تحديد مساحة العناصر' },

      { type: 'concept', title: 'CSS Borders Anatomy', titleAr: 'تشريح الإطار',
        text: 'The border property creates a frame around an element. It requires 3 values in exactly this order: Thickness (px), Style (solid, double, dashed), and Color.',
        ar: 'خاصية border بتعمل إطار حوالين العنصر. لازم نحدد 3 حاجات بالترتيب: السُمك (مثلاً 5px)، والنوع (مُصمت solid، أو مزدوج double، أو متقطع dashed)، واللون.' },

      { type: 'code', lang: 'css', label: 'Border Examples',
        text: `.alert-box {
  border: 5px solid red; 
}

.fancy-frame {
  border: 10px double gold; 
}` },

      { type: 'rule', color: 'cyan', text: '🎯 جرب بنفسك (تطبيق 4): اصنع صندوقاً باستخدام &lt;div&gt; وضع له حداً متقطعاً (dashed) بسمك 4px ولون أزرق، يحيط بنص ترحيبي.' },

      // ── COMMON MISTAKES ──────────────────────────────────────────────────
      { type: 'section-heading', text: '🚨 أخطاء شائعة — المطبات البرمجية', subtext: 'أكثر 4 أخطاء يقع فيها المبرمجون المبتدئون!' },
      { type: 'mistakes-grid', mistakes: [
        { title: '1. نسيان الإغلاق', desc: 'نسيان إغلاق الوسوم مثل &lt;/h1&gt;. النتيجة؟ المتصفح سيقوم بتكبير حجم جميع الكلمات في الصفحة بالكامل!' },
        { title: '2. نسيان النقطة في الـ class', desc: 'كتابة blue { color: blue; } بدلاً من .blue في الـ CSS. المتصفح سيبحث عن وسم اسمه blue ولن يجده.' },
        { title: '3. استخدام color للخلفية', desc: 'كتابة color لتلوين خلفية الزر بدلاً من background-color. خاصية color تغير لون حبر الكتابة فقط.' },
        { title: '4. كتابة الـ transition خطأ', desc: 'كتابة الـ transition داخل الـ hover، مما يجعل العنصر يعود لشكله الطبيعي فجأة بدون أي نعومة عند إبعاد الفأرة.' }
      ]},

      // ── FINAL REVIEW & EXERCISES ─────────────────────────────────────────
      { type: 'section-heading', text: '📝 التقييم الشامل والتطبيقات العملية', subtext: 'اختبر فهمك وتأكد من استيعابك للمفاهيم' },
      
      { type: 'concept', title: 'أولاً: أسئلة الاختيار من متعدد (MCQ)', titleAr: '', text: `
        <div style="font-size: 16px; line-height: 2;">
          <strong>1. أي وسم يستخدم لإنشاء قائمة نقطية (غير مرقمة)؟</strong><br>
          &nbsp;&nbsp; ⚪ أ) &lt;ol&gt; &nbsp;&nbsp;&nbsp; ⚪ ب) &lt;ul&gt; &nbsp;&nbsp;&nbsp; ⚪ ج) &lt;li&gt;<br><br>
          
          <strong>2. لإضافة صورة في صفحة الـ HTML، نستخدم الخاصية:</strong><br>
          &nbsp;&nbsp; ⚪ أ) href &nbsp;&nbsp;&nbsp; ⚪ ب) class &nbsp;&nbsp;&nbsp; ⚪ ج) src<br><br>
          
          <strong>3. الخاصية المسؤولة عن تغيير لون خلفية عنصر ما هي:</strong><br>
          &nbsp;&nbsp; ⚪ أ) color &nbsp;&nbsp;&nbsp; ⚪ ب) background-color &nbsp;&nbsp;&nbsp; ⚪ ج) bgcolor<br><br>
          
          <strong>4. ما هو الترتيب الصحيح لقيم خاصية الـ border؟</strong><br>
          &nbsp;&nbsp; ⚪ أ) Color, Style, Thickness &nbsp;&nbsp;&nbsp; ⚪ ب) Thickness, Style, Color
        </div>
      `},

      { type: 'concept', title: 'ثانياً: ضع علامة صح (✓) أو خطأ (✗)', titleAr: '', text: `
        <div style="font-size: 16px; line-height: 2.2;">
          <div style="display: flex; gap: 10px; align-items: baseline;">
            <div style="min-width: 30px; color: var(--text-dim);">[ &nbsp; ]</div>
            <div>وسم الصورة &lt;img&gt; يُعتبر من الوسوم ذاتية الإغلاق ولا يحتاج إلى &lt;/img&gt;.</div>
          </div>
          <div style="display: flex; gap: 10px; align-items: baseline;">
            <div style="min-width: 30px; color: var(--text-dim);">[ &nbsp; ]</div>
            <div>خاصية transition تُستخدم لجعل تغييرات الـ CSS تحدث فجأة وبأقصى سرعة ممكنة.</div>
          </div>
          <div style="display: flex; gap: 10px; align-items: baseline;">
            <div style="min-width: 30px; color: var(--text-dim);">[ &nbsp; ]</div>
            <div>وسم &lt;span&gt; يُستخدم لتمييز وتنسيق جزء صغير أو كلمة محددة داخل فقرة طويلة.</div>
          </div>
          <div style="display: flex; gap: 10px; align-items: baseline;">
            <div style="min-width: 30px; color: var(--text-dim);">[ &nbsp; ]</div>
            <div>لكتابة class في الـ CSS يجب أن نبدأ باسم الـ class مباشرة دون إضافة أي علامات قبله.</div>
          </div>
        </div>
      `},

      { type: 'concept', title: 'ثالثاً: اكتشف الخطأ البرمجي (Debugging)', titleAr: '', text: `
        <p style="margin-bottom: 10px;">طلب منك أحد الأصدقاء مراجعة الكود الخاص به لأنه لا يعمل كما هو متوقع. استخرج 3 أخطاء برمجية:</p>
        <pre style="background: rgba(0,0,0,0.25); color: #e2e8f0; padding: 15px; border-radius: 8px; font-family: 'Fira Code', monospace; font-size: 14px; border: 1px solid var(--border-subtle);">
&lt;!-- HTML --&gt;
&lt;h1&gt;Welcome To My Page&lt;h1&gt;
&lt;input type="button" text="Click Me"&gt;

&lt;!-- CSS --&gt;
btn {
  color: red;
  transition: 1;
}
        </pre>
      `},

      { type: 'concept', title: 'رابعاً: المشروع الختامي (التحدي الكبير)', titleAr: '', text: `
        <p style="margin-bottom: 15px;">انتقل إلى المحرر (Coding Lab)، واستخدم كل ما تعلمته اليوم لبناء واجهة تسجيل دخول مصغرة تحتوي على الآتي:</p>
        <ul style="margin-left: 20px; line-height: 1.8;">
          <li>عنوان رئيسي <code>&lt;h1&gt;</code> بكلمة "تسجيل الدخول"، لونه أزرق داكن وحجمه 40px.</li>
          <li>فقرة ترحيبية <code>&lt;p&gt;</code>، بها كلمة "المهندس" مميزة بلون مختلف باستخدام <code>&lt;span&gt;</code>.</li>
          <li>حقل إدخال نصي <code>&lt;input type="text"&gt;</code> لاسم المستخدم.</li>
          <li>زر <code>&lt;input type="button"&gt;</code> مكتوب عليه "دخول".</li>
          <li><strong>المتطلبات السحرية للزر:</strong> يجب أن يمتلك الزر إطاراً (border) بسمك 2px من نوع solid ولون أسود. عندما تمرر الماوس عليه، يجب أن تتغير خلفيته إلى اللون الأخضر الزاهي، وأن يحدث هذا التغيير بنعومة خلال ثانية واحدة (1s).</li>
        </ul>
      `},

      { type: 'concept', title: '💡 الدليل الإرشادي للإجابات', titleAr: '', text: `
        <div style="background: rgba(16, 185, 129, 0.1); padding: 20px; border-radius: 8px; border-left: 5px solid var(--accent-emerald); font-size: 15px; line-height: 1.7;">
          <strong>1. إجابات الاختيار من متعدد:</strong> 1(ب) - 2(ج) - 3(ب) - 4(ب).<br>
          <strong>2. إجابات صح وخطأ:</strong> (✓) صح - (✗) خطأ - (✓) صح - (✗) خطأ.<br>
          <strong>3. أخطاء الكود (Debugging):</strong> <br>
          <span style="color: var(--accent-pink);">الخطأ الأول:</span> إغلاق العنوان خاطئ، يجب إضافة علامة مائلة <code>&lt;/h1&gt;</code>.<br>
          <span style="color: var(--accent-pink);">الخطأ الثاني:</span> الكلمة المكتوبة على الزر تحدد بخاصية <code>value</code> وليس text.<br>
          <span style="color: var(--accent-pink);">الخطأ الثالث:</span> نسيان النقطة قبل الـ class في الـ CSS (يجب أن يكون <code>.btn</code>). كما أن وقت الانتقال ينقصه حرف s ليكون <code>1s</code>.
        </div>
      `}
    ]
  }
];
