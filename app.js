/**
 * PROGRAMMING FUNDAMENTALS - 2nd Secondary Revision Deck
 * Egyptian Baccalaureate - Engineering & Computer Science Track
 * Core Interactive Application & Presenter System
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentSlide = 1;
  const totalSlides = 44;
  let isPresenterOpen = false;
  let isGridOpen = false;

  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const slideNumberDisplay = document.getElementById('current-slide-num');
  const totalSlideDisplay = document.getElementById('total-slide-num');
  const progressBarFill = document.getElementById('progress-fill');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const presenterDrawer = document.getElementById('presenter-drawer');
  const presenterToggleBtn = document.getElementById('btn-toggle-presenter');
  const presenterCloseBtn = document.getElementById('btn-close-presenter');
  const gridModal = document.getElementById('grid-modal');
  const gridToggleBtn = document.getElementById('btn-toggle-grid');
  const gridCloseBtn = document.getElementById('btn-close-grid');
  const fullscreenBtn = document.getElementById('btn-toggle-fullscreen');
  const gridContainer = document.getElementById('grid-thumbnails');
  const presenterSlideBadge = document.getElementById('presenter-slide-badge');
  const presenterSections = document.getElementById('presenter-sections');

  // Teacher Presenter Notes Data for all slides
  const presenterNotes = {
    1: {
      title: "Title & Opening Context",
      explain: "Welcome students warmly. Emphasize that this is an energizing revision of foundational concepts that empowers them for 2nd Secondary Engineering & CS topics (like OOP and Data Structures).",
      analogy: "Like an athlete doing warm-ups before entering the championship match.",
      question: "Who remembers the first program they ever wrote?",
      misconception: "Thinking that starting 2nd year means throwing away 1st year concepts.",
      expected: "'Hello World', or a basic calculator.",
      followup: "Did you ever wonder why computers need variables before anything else?",
      ar: "نرحب بالطلاب ونفكرهم إن المحاضرة دي مش بداية من الصفر، دي تثبيت وتربيط للمفاهيم الأساسية اللي هيبنوا عليها كل المنهج الجديد (زي الـ OOP وهياكل البيانات)."
    },
    2: {
      title: "Why Are We Here?",
      explain: "Clarify that syntax is easily forgotten, but logic remains. Today's goal is connecting the 5 fundamental puzzle pieces into one continuous flow.",
      analogy: "You don't need to memorize the dictionary to speak a language fluently; you just need grammar and sentence flow.",
      question: "What is harder: memorizing how code is written, or knowing how to break down a problem?",
      misconception: "Believing that programming ability equals memorizing keywords without understanding logic.",
      expected: "Breaking down problems is usually the harder part.",
      followup: "Can a great programmer write code without looking up syntax occasionally?",
      ar: "الهدف هو التفكير المنطقي وربط المفاهيم، مش حفظ السطور عن ظهر قلب. الكود أداة، والتفكير المنطقي هو الأساس."
    },
    3: {
      title: "Curriculum Roadmap",
      explain: "Walk through the 5 pillars: Variables (memory), Concatenation (joining data), Conditions (decisions), Loops (repetition), and Functions (reusable machines).",
      analogy: "Building a house: Bricks (Variables), Mortar (Concatenation), Doors/Switches (Conditions), Conveyor Belts (Loops), and Power Generators (Functions).",
      question: "Which of these 5 areas did you find most challenging last year?",
      misconception: "Assuming these 5 topics are separate silos rather than cooperating parts of one system.",
      expected: "Usually loops or functions.",
      followup: "Notice how each pillar naturally leads into the next!",
      ar: "استعرض الخمس محاور كرحلة متكاملة: تخزين (متغيرات) -> دمج (ربط نصوص) -> قرارات (شروط) -> تكرار (تكرار ذكي) -> وحدات قابلة لإعادة الاستخدام (دوال)."
    },
    4: {
      title: "Diagnostic Challenge",
      explain: "Give students 30 seconds of quiet thinking. Do not reveal the answer immediately. Encourage them to trace line by line in memory.",
      analogy: "Mental execution: act like the computer's CPU step by step.",
      question: "What is the value of score right before line 3 executes?",
      misconception: "Thinking line 2 creates an algebra contradiction ('score = score + 5 is impossible in math!').",
      expected: "15.",
      followup: "Why does the '=' sign mean assignment here and not mathematical equality?",
      ar: "تحدي تشخيصي: امنح الطلاب 30 ثانية للتفكير. نبههم إن علامة (=) هنا معناها تخزين وتحديث مش معادلة رياضية مستحيلة."
    },
    5: {
      title: "What Is a Variable?",
      explain: "A variable is simply a named memory container. It has a label (identifier) and can hold one value at a time.",
      analogy: "A labeled storage box or a locker in school.",
      question: "What would happen if the box didn't have a label?",
      misconception: "Confusing the label of the box with the contents inside the box.",
      expected: "We wouldn't know where to look or retrieve our stored value.",
      followup: "Can a variable hold multiple distinct numbers at the same instant in basic variables? (No, just one value).",
      ar: "المتغير زي صندوق ليه اسم ومحتوى. الاسم عشان ننادي بيه، والمحتوى هو القيمة اللي متخزنة جواه."
    },
    6: {
      title: "Variable Declaration",
      explain: "Show that `let score;` reserves the memory box and names it, but doesn't fill it with any specific value yet.",
      analogy: "Reserving an empty locker with your nameplate on it.",
      question: "What does the keyword 'let' tell the JavaScript engine?",
      misconception: "Thinking that declaration automatically puts 0 inside.",
      expected: "It signals that we are creating a new variable in memory.",
      followup: "What is inside the box right now if we haven't assigned anything? (In JS, it's undefined).",
      ar: "الإعلان (Declaration) هو حجز الصندوق في الذاكرة بالاسم، لكن من غير ما نحط فيه قيمة لسه."
    },
    7: {
      title: "Assignment",
      explain: "The assignment operator `=` takes the value on the right side and places it into the container on the left side.",
      analogy: "Placing a 100-pound dumbbell into the labeled locker.",
      question: "Which side evaluates first: the right side or the left side of the '='?",
      misconception: "Reading '=' from left to right like an equality equation.",
      expected: "The right side evaluates first, then gets stored into the left variable.",
      followup: "Can we write `100 = score;`? Why not?",
      ar: "التخصيص (Assignment) هو وضع القيمة داخل الصندوق. اليمين بيتحسب الأول ويتحط في الشمال."
    },
    8: {
      title: "Declaration + Assignment",
      explain: "Compare the two-step syntax vs the one-step initialization. Both yield the exact same memory state, but one is more concise.",
      analogy: "Buying a box and immediately putting shoes inside vs buying an empty box and putting shoes inside tomorrow.",
      question: "In real projects, which form do developers use most often?",
      misconception: "Thinking the combined form is a different programming concept.",
      expected: "The combined one-step form (`let score = 100;`).",
      followup: "When would you intentionally declare without assigning right away? (e.g. before an IF statement).",
      ar: "الدمج بين الحجز والتخزين في سطر واحد هو الأسلوب الأكثر شيوعاً واختصاراً في كتابة الأكواد."
    },
    9: {
      title: "Reassignment",
      explain: "Reassignment overwrites the old value. The variable can only store its latest value. You cannot reassign something that wasn't declared.",
      analogy: "Emptying out the old contents of a box and putting new items inside.",
      question: "What happened to the old number 10 when we assigned 20?",
      misconception: "Thinking the variable remembers both 10 and 20 at the same time.",
      expected: "It is overwritten and gone.",
      followup: "Notice we do NOT write 'let' again when reassigning!",
      ar: "إعادة التعيين (Reassignment): القيمة الجديدة بتمسح القديمة وتستقر مكانها. لاحظوا إننا مش بنكتب let تاني لما بنعدل القيمة!"
    },
    10: {
      title: "Increment & Decrement",
      explain: "Explain `score++` and `score--` as clean shortcuts for adding or subtracting 1.",
      analogy: "A digital tally counter clicker at a supermarket entrance or prayer beads counter.",
      question: "If score is 10, what is score after running `score++` twice?",
      misconception: "Thinking `score++` multiplies or adds 2.",
      expected: "12.",
      followup: "How would you add 5 to score without writing `score = score + 5`? (Shortcut `score += 5`).",
      ar: "الزيادة والنقصان بمقدار 1: أدوات اختصار بتستخدم بكثرة خاصة جوه اللوبات (عداد رقمي)."
    },
    11: {
      title: "Variable Naming Rules",
      explain: "Code is read more often than it is written. Meaningful names and camelCase make code self-documenting and prevent bugs.",
      analogy: "Labeling spice jars in a kitchen: 'Sugar' vs 'White Powder #1'.",
      question: "Can variable names contain spaces or start with numbers?",
      misconception: "Naming variables `a`, `b`, `c`, `x` because it saves typing.",
      expected: "No spaces allowed, and cannot start with numbers.",
      followup: "If you look at your code after 6 months, which naming style will save your grade?",
      ar: "قواعد التسمية: تجنب الأسماء الغامضة زي x و y. استخدم camelCase والأسماء الواضحة اللي تشرح محتواها."
    },
    12: {
      title: "Data Types Overview",
      explain: "Introduce the 3 core types: String (text), Number (numeric values), Boolean (true/false flags).",
      analogy: "Different types of shipping containers: one for liquid, one for dry goods, one for switches.",
      question: "Why does the computer need to know the type of data?",
      misconception: "Assuming computers treat '100' and 100 the exact same way.",
      expected: "Because mathematical operations only make sense on numbers, text concatenation on strings, etc.",
      followup: "What happens if you try to multiply words like 'apple' * 'banana'?",
      ar: "الأنواع الأساسية التلاتة: نص (String)، رقم (Number)، ومنطقي (Boolean). كل نوع ليه عملياته الخاصة."
    },
    13: {
      title: "String Data Type",
      explain: "Strings are sequences of characters wrapped in matching quotation marks. Quotes act as a protective fence.",
      analogy: "Speech bubbles in comic books.",
      question: "What tells the programming language that something is a String?",
      misconception: "Forgetting quotes around text or mixing single and double quotes inconsistently.",
      expected: "The quotation marks (\" \" or ' ').",
      followup: "Is `\"123\"` a Number or a String?",
      ar: "الـ String هو أي نص بين علامتي تنصيص. علامات التنصيص هي الحارس اللي بيقول للمترجم: ده نص متنفذهوش ككود!"
    },
    14: {
      title: "Number Data Type",
      explain: "Numbers represent mathematical quantities. They are written raw without quotes so the computer can calculate with them.",
      analogy: "The numbers on an electronic pocket calculator.",
      question: "What is the difference between `100` and `\"100\"`?",
      misconception: "Thinking `\"100\"` can automatically be calculated mathematically without string conversion.",
      expected: "100 is a numeric value for math; \"100\" is literal text.",
      followup: "Can numbers include decimals? Yes (e.g. 98.5).",
      ar: "الـ Number بيتكتب بدون علامات تنصيص عشان الكمبيوتر يقدر يعمل عليه عمليات حسابية فورية."
    },
    15: {
      title: "Boolean Data Type",
      explain: "A Boolean has only two possible states: true or false. It is the fundamental currency of computer decision-making.",
      analogy: "A simple on/off wall light switch.",
      question: "Why don't we put quotes around true and false?",
      misconception: "Writing `\"true\"` which turns it into a String instead of a Boolean.",
      expected: "Because true and false are reserved language keywords representing logical states.",
      followup: "When in life do you make a Boolean decision? (e.g., Am I hungry? Yes/No).",
      ar: "الـ Boolean ليه قيمتين فقط: true أو false. ده المفتاح السحري اللي بتعتمد عليه كل الشروط وقرارات الكود."
    },
    16: {
      title: "Output using console.log()",
      explain: "Deconstruct `console.log()`: `console` is the environment object, `.` accesses its capability, and `log()` is the action that displays data.",
      analogy: "Sending a text message to the developer's screen.",
      question: "Does `console.log()` change the value stored in a variable?",
      misconception: "Thinking printing a variable modifies it.",
      expected: "No, it only inspects and displays the value.",
      followup: "Where do programmers see this output in modern browsers? (Developer Tools Console).",
      ar: "أمر الطباعة console.log() بيعرض القيمة على الشاشة للمطور بدون ما يغير في قيمة المتغير الأصلية نهائياً."
    },
    17: {
      title: "Predict the Output",
      explain: "Engage students with 3 rapid fire predictions: a variable lookup, a direct number, and a direct addition.",
      analogy: "Testing your mental compiler before hitting run.",
      question: "In test #3, what will be logged: the words '10 + 20' or the number 30?",
      misconception: "Thinking console.log always prints everything as plain text verbatim.",
      expected: "30, because expressions are calculated before printing.",
      followup: "What if there were quotes around `\"10 + 20\"`?",
      ar: "توقع المخرجات: شجع الطلاب يفكروا الأول. التعبير الرياضي بيتحسب الأول وبعدين الناتج هو اللي بيطبع."
    },
    18: {
      title: "Comments in Code",
      explain: "Comments using `//` are completely invisible to the computer. They are notes from humans for humans.",
      analogy: "Sticky notes on a refrigerator or side notes in the margin of a notebook.",
      question: "Does adding 100 comments make the program run slower?",
      misconception: "Thinking comments are executed or increase running time.",
      expected: "No, comments are stripped out during execution.",
      followup: "Why should professional engineers write comments on tricky code?",
      ar: "التعليقات (Comments): رسائل من المبرمج للمبرمجين التانيين، الكمبيوتر بيتجاهلها تماماً ومش بتأثر على تشغيل الكود."
    },
    19: {
      title: "Commenting Out Code",
      explain: "Show that prepending `//` temporarily disables a line of code for testing without permanently deleting it.",
      analogy: "Putting a 'Temporarily Out of Order' sign on a vending machine button instead of smashing the machine.",
      question: "When would a programmer want to comment out code rather than hitting backspace?",
      misconception: "Deleting working code when debugging, then forgetting how to rewrite it.",
      expected: "When testing alternative solutions or isolating a bug.",
      followup: "How do you restore the code? Just delete the `//`!",
      ar: "تعطيل الكود (Commenting Out): حيلة ذكية للاختبار والبحث عن الأخطاء بدون ما تضطر تمسح السطور وترجع تكتبها تاني."
    },
    20: {
      title: "Consolidation / Concatenation",
      explain: "The `+` operator has a dual personality: with numbers it adds mathematically; with strings it glues pieces together end-to-end.",
      analogy: "Snapping LEGO bricks or puzzle pieces together.",
      question: "If we join 'Score: ' and 100, what type is the final output?",
      misconception: "Expecting an error when combining text and numbers.",
      expected: "It becomes a single combined String: 'Score: 100'.",
      followup: "Did you remember to include a space after 'Score:'? Otherwise it reads 'Score:100'.",
      ar: "الدمج (Concatenation): علامة (+) لما بتيجي مع نصوص بتتحول لـ صمغ أو بازل بيلزق الكلمات في بعضها."
    },
    21: {
      title: "String vs Calculation",
      explain: "Highlight the critical visual difference between `\"100 + 200\"` (literal characters) and `(100 + 200)` (math calculation).",
      analogy: "A picture of an apple vs an actual edible apple.",
      question: "What is printed by `console.log(\"10 + 20\");`?",
      misconception: "Assuming the engine calculates inside quotation marks.",
      expected: "It prints exactly '10 + 20'.",
      followup: "What does `console.log(\"Total: \" + 10 + 20);` print vs `console.log(\"Total: \" + (10 + 20));`?",
      ar: "فرق جوهري: أي حاجة جوه علامات تنصيص بتنزل زي ما هي نص، بينما اللي بين أقواس عادية بيتحسب كعملية رياضية."
    },
    22: {
      title: "Concatenation Practice",
      explain: "Have students trace the variables and read aloud the exact formatted sentences.",
      analogy: "Filling in blanks on an official student ID card.",
      question: "What is the exact printed string for line 4?",
      misconception: "Forgetting the spaces between words.",
      expected: "'My name is Omar' and 'I am 16'.",
      followup: "How can we combine both statements into a single console.log()?",
      ar: "تدريب عملي: ركز على أهمية المسافات عشان الجمل متطلعش لازقة في بعضها في الطباعة."
    },
    23: {
      title: "Programming Decisions",
      explain: "Programs cannot just execute blindly in a straight line; they must adapt and take different paths based on circumstances.",
      analogy: "A traffic light: Green means Go, Red means Stop.",
      question: "Name a real-life decision you made this morning that acts like an IF condition.",
      misconception: "Thinking code always executes every single line from top to bottom.",
      expected: "'If it rains, take an umbrella; else leave it home.'",
      followup: "What determines which branch code takes? A Boolean condition (true or false).",
      ar: "اتخاذ القرارات: البرامج الحقيقية مش بتمشي في خط مستقيم، بتفكر وتقرر زي إشارات المرور بناءً على الشروط."
    },
    24: {
      title: "IF Statement Syntax",
      explain: "Break down the 3 components: `if` keyword, condition inside `()`, and process inside `{}` braces.",
      analogy: "A security guard at a gate: checks your badge in `()`; opens the gate in `{}` only if valid.",
      question: "What happens to the code inside `{}` if the condition evaluates to false?",
      misconception: "Putting a semicolon immediately after the `if (...)` header.",
      expected: "The code inside `{}` is completely skipped.",
      followup: "Why do we indent the code inside the braces? (Readability).",
      ar: "تركيب جملة IF: كلمة if، بعديها الشرط بين قوسين مدورين ()، والأمر اللي هيتنفذ جوه قوسين متعرجين {}."
    },
    25: {
      title: "Condition vs Process",
      explain: "Clearly separate the question being asked (the condition) from the action taken (the process block).",
      analogy: "The exam question vs the reward you receive if you pass.",
      question: "In `if (score >= 50)`, what is the condition?",
      misconception: "Believing the action executes even when the condition fails.",
      expected: "`score >= 50` is the condition; `console.log(\"Pass\")` is the process.",
      followup: "What if score is 49? Does it print 'Pass'? No.",
      ar: "التمييز بين الشرط (السؤال) والعملية (الفعل): العملية مش هتتحرك خطوة واحدة إلا لو السؤال إجابته نعم (true)."
    },
    26: {
      title: "TRUE or FALSE?",
      explain: "Comparison operators evaluate to a single Boolean: `true` or `false`. Check `>`, `<`, and `==`.",
      analogy: "A courtroom judge issuing a True or False verdict.",
      question: "Is 10 < 5 true or false?",
      misconception: "Confusing assignment `=` with comparison `==`.",
      expected: "False. And 10 == 10 is True.",
      followup: "What does `==` check? It checks equality without reassigning.",
      ar: "اختبار فوري: المقارنات دايماً بترجع يا true يا false. افتكروا: علامة (=) واحدة بتخزن، علامتين (==) بتقارن!"
    },
    27: {
      title: "ELSE Statements",
      explain: "`else` provides a guaranteed fallback pathway. It runs if and only if the `if` condition evaluates to false.",
      analogy: "A fork in the road: you MUST take either path A or path B, never both, never neither.",
      question: "Can both the `if` block and the `else` block run during the same execution?",
      misconception: "Adding a condition to `else` like `else (condition)`. (Conditions belong to `if` or `else if`!).",
      expected: "Never. Only one branch can ever execute.",
      followup: "Does `else` require its own condition? No, it catches everything else.",
      ar: "جملة ELSE: المسار البديل. لو شرط IF طلع false، الكود بيجري فوراً ينفذ أوامر الـ else."
    },
    28: {
      title: "ELSE IF Multi-Branch",
      explain: "`else if` allows chaining multiple options in sequence. The first condition that is true executes, and the rest are ignored.",
      analogy: "Grading system: A (>=90), B (>=80), C (>=70), otherwise Fail.",
      question: "If condition 1 is true, does the engine even check condition 2?",
      misconception: "Thinking all matching `else if` blocks execute.",
      expected: "No, it immediately jumps out of the entire chain once one branch succeeds.",
      followup: "Why is order crucial in an `else if` ladder?",
      ar: "سلسلة ELSE IF: فحص متعدد بالترتيب. أول شرط يتحقق بينفذ أوامره وبيتجاهل باقي السلسلة بالكامل."
    },
    29: {
      title: "Conditional Challenge",
      explain: "Let students trace `score = 75` through the multi-tier grading ladder.",
      analogy: "Dropping a ball down a pinball maze: which bucket does it land in?",
      question: "Does 75 satisfy `score >= 90`? No. Does it satisfy `score >= 75`? Yes!",
      misconception: "Assuming it prints both 'Very Good' and 'Pass'.",
      expected: "It prints only 'Very Good'.",
      followup: "What would print if score was 45? ('Needs Improvement').",
      ar: "تحدي تتبع الشروط: مع درجة 75، الشرط الأول false، التاني true فبيطبع ويتوقف بدون ما يكمل لتحت."
    },
    30: {
      title: "Why Loops?",
      explain: "Demonstrate the tediousness of copy-pasting 10 lines vs writing a loop. Loops automate repetition with zero code bloat.",
      analogy: "A physical stamp repeating an impression vs handwriting the same text 1,000 times.",
      question: "What if your boss asked you to print 'Hello' 10,000 times instead of 10?",
      misconception: "Thinking loops are only for math equations.",
      expected: "Copy-pasting would take hours and crash maintainability; a loop does it in 3 lines.",
      followup: "What core risk exists if a loop has no stopping condition? (Infinite loop!).",
      ar: "ليه بنحتاج التكرار (Loops)؟ بدل ما نكرر الكود 10 أو 1000 مرة ونملأ الملف سطور، اللوب بينفذ التكرار بذكاء وسطرين بس."
    },
    31: {
      title: "FOR Loop Structure",
      explain: "Color-code the 4 parts: 1. Initialization (`let i = 0`), 2. Condition (`i < 5`), 3. Update (`i++`), 4. Process block inside `{}`.",
      analogy: "A gym lap counter: Start at lap 0; check if under target; run lap; increment counter.",
      question: "How many times does the initialization step run in the entire lifetime of the loop?",
      misconception: "Thinking `let i = 0` runs every single iteration.",
      expected: "Only once at the very beginning.",
      followup: "What separates the 3 statements in the for loop header? Semicolons `;`.",
      ar: "تشريح حلقة FOR: أربع أجزاء ملونة: البداية (Initialization)، شرط الاستمرار (Condition)، خطوة الزيادة (Update)، وجسم اللوب (Process)."
    },
    32: {
      title: "Loop Timeline & Cycle",
      explain: "Walk through the exact circular cycle: Init -> Check condition -> If true, run body -> Update counter -> Check condition again -> Exit when false.",
      analogy: "A carousel ride that checks your ticket before each spin.",
      question: "Does the update (`i++`) happen BEFORE or AFTER the body code executes?",
      misconception: "Thinking `i++` happens before the process executes.",
      expected: "AFTER the body executes, right before re-checking the condition.",
      followup: "When the condition is finally false, where does the computer go? To the next line outside the loop.",
      ar: "دورة حياة اللوب: خطوة بخطوة: البداية مرة واحدة -> فحص الشرط -> تنفيذ الكود -> زيادة العداد -> فحص الشرط تاني حتى ينتهي."
    },
    33: {
      title: "++ and Loop Counting",
      explain: "Trace values: `i` starts at 0, then 1, 2, 3, 4. When `i` hits 5, `5 < 5` is false, so it stops!",
      analogy: "Counting fingers starting from index 0.",
      question: "How many numbers were printed? Count them: 0, 1, 2, 3, 4.",
      misconception: "Thinking `i < 5` runs 4 times because it stops at 4.",
      expected: "It runs exactly 5 times (0, 1, 2, 3, 4).",
      followup: "What is the final value of `i` that caused the loop to terminate? 5.",
      ar: "العد من الصفر: لما نبدأ من 0 ونقول i < 5، اللوب بيلف 5 مرات ويطبع (0، 1، 2، 3، 4) ويتوقف لما i تبقى 5."
    },
    34: {
      title: "Loop Challenge",
      explain: "Present the loop `for (let i = 1; i <= 4; i++)`. Ask for first value, last value, total iterations, and printed sequence.",
      analogy: "Countdown or round counter in a boxing match.",
      question: "What is the first number printed here?",
      misconception: "Assuming all loops start at 0.",
      expected: "First value: 1. Last value: 4. Total runs: 4.",
      followup: "What if the condition was `i < 4` instead of `i <= 4`?",
      ar: "تحدي تتبع اللوب: هنا البداية من 1 والشرط أصغر من أو يساوي 4، إذن هيطبع 1 و 2 و 3 و 4 بالتحديد."
    },
    35: {
      title: "What Is a Function?",
      explain: "A function is a packaged, reusable machine. You give it raw materials (input), it performs work (process), and produces results (output).",
      analogy: "A coffee maker or an automated juicer machine.",
      question: "Why build a coffee maker instead of manually brewing coffee beans by hand every time?",
      misconception: "Thinking functions only exist to do math formulas.",
      expected: "To write the recipe once and use it anytime you want coffee.",
      followup: "What programming principle does this support? (DRY: Don't Repeat Yourself).",
      ar: "الدالة (Function): زي ماكينة تصنيع قهوة جاهزة ومقفولة. بتديها مدخلات، تنفذ العملية، وتطلعلك النتيجة في أي وقت تناديها."
    },
    36: {
      title: "Function Structure",
      explain: "Dissect the anatomy: `function` keyword, name `greet`, parentheses `()`, and curly brackets `{}` containing the instructions.",
      analogy: "The factory blueprint with its registered company name.",
      question: "Can you give a function any name you want?",
      misconception: "Forgetting the parentheses `()` when creating the function.",
      expected: "Yes, following standard variable naming rules (meaningful, no spaces).",
      followup: "What is inside the curly braces `{}`? The reusable code block.",
      ar: "تشريح كتابة الدالة: كلمة function، اسم الدالة، القوسين ()، ثم جسم الدالة {} اللي جواه الأوامر."
    },
    37: {
      title: "Defining vs Calling a Function",
      explain: "Defining creates the machine in memory. Calling (invoking) presses the START button. Without a call, a function NEVER runs!",
      analogy: "Building a microwave in a factory vs plugging it in and pressing START in your kitchen.",
      question: "If we define a function with 50 lines of code but never call it, how many lines execute?",
      misconception: "Expecting a function to run just because it was written on the screen.",
      expected: "Zero lines execute.",
      followup: "How do we call a function? By typing its name followed by parentheses `greet();`.",
      ar: "الفرق الجوهري: التعريف (Definition) هو صناعة الماكينة وتخزينها، والاستدعاء (Call) هو الضغط على زر التشغيل لتنفيذها."
    },
    38: {
      title: "Function with Input (Parameters)",
      explain: "Parameters make a machine flexible. Instead of a machine that only greets one fixed name, it greets whoever's name you pass in!",
      analogy: "A microwave slot where you can insert popcorn or pizza.",
      question: "In `greet(\"Omar\")`, what is `\"Omar\"` called? (An argument/input value).",
      misconception: "Thinking functions must use the exact same input every time.",
      expected: "It prints 'Hello Omar', and if we call `greet(\"Nour\")` it prints 'Hello Nour'.",
      followup: "Where does the value 'Omar' get copied into? Inside the parameter variable `name`.",
      ar: "الدوال بمدخلات (Parameters): الماكينة الذكية اللي بتغير مخرجاتها حسب القيمة اللي بتدخلها ليها عند الاستدعاء."
    },
    39: {
      title: "From Variable to Function (Big Picture)",
      explain: "Show how all 5 concepts intertwine: Variables hold data -> Concatenation formats data -> Conditions choose paths -> Loops repeat actions -> Functions bundle it all into clean reusable units.",
      analogy: "Building a smartphone: memory chips, wiring, switches, processors, and full apps.",
      question: "Can a function contain both an IF condition and a FOR loop?",
      misconception: "Viewing programming as separate isolated chapters.",
      expected: "Absolutely! Real-world functions always combine all these elements.",
      followup: "How does this prepare you for 2nd Secondary OOP? (A Class is basically variables + functions bundled together!).",
      ar: "الخريطة الكاملة: المتغيرات بتحفظ، والربط بينسق، والشروط بتقرر، واللوب بيكرر، والدالة بتجمع كل ده في وحدة واحدة قابلة للاستخدام."
    },
    40: {
      title: "Final Integrated Challenge",
      explain: "Walk through the 'Student Grade Checker': a function that accepts a student name and score, checks condition (>=50), and logs pass/fail.",
      analogy: "An automated grading system at the Ministry of Education.",
      question: "If we pass `checkStudent(\"Kareem\", 85);`, which branch executes?",
      misconception: "Getting overwhelmed when multiple concepts appear in one snippet.",
      expected: "'Kareem: Passed with 85'.",
      followup: "Could we place this function inside a loop to check a whole classroom of 30 students? Yes!",
      ar: "التحدي التكاملي: تطبيق بيجمع المتغيرات والدوال والشروط والطباعة المنسقة في كود عملي ومفهوم لطلاب تانية ثانوي."
    },
    41: {
      title: "Common Mistakes Checklist",
      explain: "Go through the 9 classic traps: `=` vs `==`, missing quotes, forgetting `++`, defining without calling, etc.",
      analogy: "A pre-flight safety checklist before a pilot takes off.",
      question: "Which of these mistakes have you personally made before?",
      misconception: "Thinking errors mean you're bad at coding. (Even senior engineers make these syntax typos!).",
      expected: "Usually `=` vs `==` or forgetting quotes around strings.",
      followup: "How does having a mental checklist speed up your debugging?",
      ar: "قائمة الأخطاء الشائعة: الدليل السريع لتجنب أشهر 9 مطبات بيقع فيها طلاب البرمجة أثناء كتابة الكود وحل الامتحانات."
    },
    42: {
      title: "Rapid Review: 10 Questions",
      explain: "Run a fast-paced game show style review. Click each question to reveal the snappy, precise answer.",
      analogy: "Flashcards before entering the exam room.",
      question: "Quick! Question 1: What is a variable?",
      misconception: "Overthinking simple definitions.",
      expected: "A named container that stores a value!",
      followup: "Who can answer all 10 without looking at notes?",
      ar: "المراجعة السريعة: 10 أسئلة سريعة لاختبار استيعاب الطلاب لكل المفاهيم الخمسة في أقل من دقيقتين."
    },
    43: {
      title: "Exit Ticket",
      explain: "Ask students to write down their exit ticket answers on paper or phone before leaving. Let them solve the loop mental trace.",
      analogy: "A boarding pass before leaving the station.",
      question: "In the prediction box: score starts at 5. The loop runs 3 times, incrementing score each time. What is the final score?",
      misconception: "Thinking score becomes 3, or forgetting to add 5 + 3.",
      expected: "8.",
      followup: "Hand in your tickets so we know what to review next session!",
      ar: "تذكرة الخروج (Exit Ticket): تقييم ختامي سريع، وتوقع ناتج كود بيقيس فهمهم للمتغيرات واللوب والزيادة."
    },
    44: {
      title: "Final Message & Next Steps",
      explain: "Deliver an inspiring closing message. Reinforce that understanding logic and problem solving matters infinitely more than memorizing syntax.",
      analogy: "A master chess player doesn't memorize every wooden board; they understand positioning and strategy.",
      question: "Are you ready to build amazing things in 2nd Secondary Computer Science?",
      misconception: "Believing you have to be a genius to be a software engineer.",
      expected: "Confidence, motivation, and excitement for the year ahead.",
      followup: "Keep practicing, keep building, and never be afraid of red error messages!",
      ar: "رسالة الختام: البرمجة مش حفظ، البرمجة فهم وطريقة تفكير. جاهزون لرحلة تانية ثانوي بكل ثقة وتفوق!"
    }
  };

  // Populate Slide Grid Modal
  function initGridModal() {
    gridContainer.innerHTML = '';
    slides.forEach((slide, index) => {
      const slideNum = index + 1;
      const titleElem = slide.querySelector('.slide-title');
      const tagElem = slide.querySelector('.slide-tag');
      const titleText = titleElem ? titleElem.innerText.split('\n')[0] : `Slide ${slideNum}`;
      const tagText = tagElem ? tagElem.innerText : 'Topic';

      const item = document.createElement('div');
      item.className = `grid-item ${slideNum === currentSlide ? 'active' : ''}`;
      item.dataset.slide = slideNum;
      item.innerHTML = `
        <div class="grid-num">SLIDE ${String(slideNum).padStart(2, '0')}</div>
        <div class="grid-name">${titleText}</div>
        <div class="grid-cat">${tagText}</div>
      `;
      item.addEventListener('click', () => {
        goToSlide(slideNum);
        closeGrid();
      });
      gridContainer.appendChild(item);
    });
  }

  // Update Presenter Drawer Content
  function updatePresenterDrawer(slideNum) {
    const note = presenterNotes[slideNum];
    if (!note) return;

    presenterSlideBadge.innerText = `SLIDE ${slideNum} OF ${totalSlides}`;
    presenterSections.innerHTML = `
      <div class="presenter-section">
        <div class="presenter-section-title">
          <span>🎯</span> Key Teaching Concept
        </div>
        <div class="presenter-section-text">${note.explain}</div>
        <div class="presenter-section-arabic">${note.ar}</div>
      </div>

      <div class="presenter-section">
        <div class="presenter-section-title">
          <span>💡</span> Concrete Analogy
        </div>
        <div class="presenter-section-text">${note.analogy}</div>
      </div>

      <div class="presenter-section">
        <div class="presenter-section-title">
          <span>❓</span> Question to Ask Students
        </div>
        <div class="presenter-section-text"><strong>Ask:</strong> "${note.question}"</div>
        <div class="presenter-section-text" style="margin-top:6px; color: var(--accent-emerald);"><strong>Expected Answer:</strong> ${note.expected}</div>
      </div>

      <div class="presenter-section">
        <div class="presenter-section-title" style="color: var(--accent-crimson);">
          <span>⚠️</span> Common Misconception
        </div>
        <div class="presenter-section-text">${note.misconception}</div>
      </div>

      <div class="presenter-section">
        <div class="presenter-section-title" style="color: var(--accent-amber);">
          <span>🚀</span> Optional Follow-Up
        </div>
        <div class="presenter-section-text">${note.followup}</div>
      </div>
    `;
  }

  // Go to slide
  function goToSlide(slideNum) {
    if (slideNum < 1) slideNum = 1;
    if (slideNum > totalSlides) slideNum = totalSlides;

    currentSlide = slideNum;

    // Update active slide class
    slides.forEach((slide, index) => {
      if (index + 1 === currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    // Update bottom bar counters & progress
    slideNumberDisplay.innerText = currentSlide;
    const progressPercent = ((currentSlide - 1) / (totalSlides - 1)) * 100;
    progressBarFill.style.width = `${Math.max(2.2, progressPercent)}%`;

    // Button states
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;

    // Update presenter drawer if open or cached
    updatePresenterDrawer(currentSlide);

    // Update active item in grid
    const gridItems = gridContainer.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      if (parseInt(item.dataset.slide) === currentSlide) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update URL hash without jumping
    window.history.replaceState(null, null, `#slide-${currentSlide}`);
    localStorage.setItem('egyptian_bac_last_slide', currentSlide);
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }

  // Presenter Mode Toggle
  function togglePresenter() {
    isPresenterOpen = !isPresenterOpen;
    if (isPresenterOpen) {
      presenterDrawer.classList.add('open');
      presenterToggleBtn.classList.add('active');
      updatePresenterDrawer(currentSlide);
    } else {
      presenterDrawer.classList.remove('open');
      presenterToggleBtn.classList.remove('active');
    }
  }

  // Grid Modal Toggle
  function toggleGrid() {
    isGridOpen = !isGridOpen;
    if (isGridOpen) {
      gridModal.classList.add('open');
      gridToggleBtn.classList.add('active');
    } else {
      closeGrid();
    }
  }

  function closeGrid() {
    isGridOpen = false;
    gridModal.classList.remove('open');
    gridToggleBtn.classList.remove('active');
  }

  // Fullscreen Toggle
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  // Interactive "Stop & Think" Answer Reveal buttons
  document.querySelectorAll('.think-btn-reveal').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.think-card');
      if (!card) return;
      const answer = card.querySelector('.revealed-answer');
      if (answer) {
        answer.classList.toggle('open');
        if (answer.classList.contains('open')) {
          button.innerHTML = '<span>👁️</span> Hide Answer';
        } else {
          button.innerHTML = '<span>🤔</span> Reveal Answer';
        }
      }
    });
  });

  // Interactive Rapid Review items (Slide 42)
  document.querySelectorAll('.review-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('revealed');
    });
  });

  // Event Listeners for Nav Buttons
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  presenterToggleBtn.addEventListener('click', togglePresenter);
  presenterCloseBtn.addEventListener('click', togglePresenter);
  gridToggleBtn.addEventListener('click', toggleGrid);
  gridCloseBtn.addEventListener('click', closeGrid);
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    // If typing in any input field (none currently, but good practice)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;

      case 'ArrowLeft':
      case 'PageUp':
      case 'Backspace':
        e.preventDefault();
        prevSlide();
        break;

      case 'p':
      case 'P':
        e.preventDefault();
        togglePresenter();
        break;

      case 'g':
      case 'G':
      case 'o':
      case 'O':
        e.preventDefault();
        toggleGrid();
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;

      case 'Escape':
        if (isGridOpen) closeGrid();
        if (isPresenterOpen) togglePresenter();
        break;

      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;

      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
    }
  });

  // Handle Hash on Load
  function parseHash() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) {
        return num;
      }
    }
    const saved = localStorage.getItem('egyptian_bac_last_slide');
    if (saved) {
      const num = parseInt(saved, 10);
      if (!isNaN(num) && num >= 1 && num <= totalSlides) return num;
    }
    return 1;
  }

  // Initialize
  initGridModal();
  totalSlideDisplay.innerText = totalSlides;
  const startSlide = parseHash();
  goToSlide(startSlide);
});
