import os

# --- CSS Design System ---
css_content = """
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Fira+Code:wght@400;500;600&display=swap');

:root {
  --color-white: #ffffff;
  --color-black: #000000;
  --color-navy: #0f172a; /* Dark Navy Blue */
  --color-navy-light: #1e293b;
  --color-yellow: #f59e0b; /* Small Yellow Accent */
  --color-gray-light: #f8fafc;
  --color-gray-border: #cbd5e1;
  --color-text-dark: #1e293b;
  --color-text-muted: #475569;
  
  --font-arabic: 'Cairo', sans-serif;
  --font-code: 'Fira Code', monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #e2e8f0;
  font-family: var(--font-arabic);
  color: var(--color-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  direction: rtl; /* Arabic Right-to-Left by default */
}

/* ── EXAM PAGE ────────────────────────────────────────────────── */
.exam-page {
  width: 794px;
  min-height: 1123px;
  background: var(--color-white);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  page-break-after: always;
}

/* ── PAGE HEADER ──────────────────────────────────────────────── */
.page-header {
  border-bottom: 3px solid var(--color-navy);
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  direction: ltr; /* Keep header LTR for layout */
}
.header-logo-area { display: flex; align-items: center; gap: 12px; }
.header-logo { height: 45px; width: auto; object-fit: contain; }
.header-brand { display: flex; flex-direction: column; }
.header-brand-name { font-size: 16px; font-weight: 800; color: var(--color-navy); font-family: sans-serif; }
.header-center { text-align: center; flex: 1; direction: rtl; }
.header-exam-title { font-size: 14px; font-weight: 700; color: var(--color-navy); }
.header-course { font-size: 12px; color: var(--color-text-muted); margin-top: 2px; font-weight: 600; }
.header-teacher { text-align: right; direction: rtl; border-right: 2px solid var(--color-yellow); padding-right: 12px; }
.header-teacher-name { font-size: 14px; font-weight: 800; color: var(--color-navy); }
.header-teacher-label { font-size: 11px; color: var(--color-text-muted); font-weight: 600; }

/* ── PAGE FOOTER ──────────────────────────────────────────────── */
.page-footer {
  margin-top: auto;
  border-top: 2px solid var(--color-navy);
  padding: 12px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.footer-text { font-size: 11px; font-weight: 600; color: var(--color-navy); }
.footer-page-num { font-size: 12px; font-weight: 800; color: var(--color-navy); background: var(--color-yellow); padding: 2px 12px; border-radius: 12px; }

/* ── PAGE BODY ────────────────────────────────────────────────── */
.page-body { padding: 24px 32px; flex: 1; display: flex; flex-direction: column; direction: rtl; }

/* ── COVER PAGE ───────────────────────────────────────────────── */
.cover-body {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; text-align: center; flex: 1; padding: 40px; gap: 0;
}
.cover-logo { height: 120px; margin-bottom: 24px; }
.cover-title {
  font-size: 38px; font-weight: 800; color: var(--color-navy); line-height: 1.2; margin-bottom: 8px;
}
.cover-subtitle { font-size: 22px; font-weight: 700; color: var(--color-text-muted); margin-bottom: 32px; }
.cover-divider {
  width: 120px; height: 4px; background: var(--color-yellow); margin: 0 auto 32px auto;
}
.cover-info-card {
  border: 2px solid var(--color-navy);
  border-radius: 8px; padding: 16px 24px; min-width: 200px;
  margin-bottom: 16px; display: flex; flex-direction: column; align-items: center;
}
.cover-info-label { font-size: 12px; font-weight: 700; color: var(--color-text-muted); margin-bottom: 6px; }
.cover-info-value { font-size: 16px; font-weight: 800; color: var(--color-navy); }

.cover-student-box {
  width: 100%; max-width: 500px;
  border: 2px solid var(--color-navy);
  border-radius: 8px; padding: 24px; display: flex; flex-direction: column; gap: 16px;
  margin-top: 32px; text-align: right;
}
.cover-field { display: flex; align-items: center; gap: 12px; }
.cover-field-label { font-size: 14px; font-weight: 700; color: var(--color-navy); min-width: 90px; }
.cover-field-line { flex: 1; height: 2px; background: var(--color-gray-border); }

/* ── SECTION HEADER ───────────────────────────────────────────── */
.section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; border-bottom: 2px solid var(--color-navy); padding-bottom: 8px; }
.section-title { font-size: 20px; font-weight: 800; color: var(--color-navy); }
.section-tag {
  background: var(--color-navy); color: var(--color-white); padding: 4px 12px;
  font-size: 12px; font-weight: 700; border-radius: 4px;
}

/* ── MCQ ──────────────────────────────────────────────────────── */
.mcq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.mcq-item {
  border: 1px solid var(--color-gray-border); border-radius: 8px; padding: 16px;
  background: var(--color-white);
}
.mcq-question {
  font-size: 14px; font-weight: 700; color: var(--color-black);
  margin-bottom: 12px; line-height: 1.6; display: flex; gap: 8px;
}
.mcq-num { font-weight: 800; color: var(--color-navy); min-width: 24px; }
.mcq-options { display: flex; flex-direction: column; gap: 8px; padding-right: 32px; }
.mcq-option { font-size: 13px; color: var(--color-text-dark); display: flex; align-items: center; gap: 8px; font-weight: 600;}
.mcq-option-circle {
  width: 20px; height: 20px; border: 2px solid var(--color-navy); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: var(--color-navy);
}
.mcq-code { font-family: var(--font-code); font-size: 12px; background: var(--color-gray-light); padding: 2px 6px; border: 1px solid var(--color-gray-border); border-radius: 4px; color: var(--color-black); direction: ltr; display: inline-block; }

/* ── WRITTEN Q ────────────────────────────────────────────────── */
.written-item {
  border: 1px solid var(--color-gray-border); border-radius: 8px; padding: 20px; margin-bottom: 20px;
}
.written-header { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; }
.written-num {
  min-width: 30px; height: 30px; background: var(--color-navy); color: var(--color-white);
  border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800;
}
.written-q { font-size: 15px; color: var(--color-black); line-height: 1.6; font-weight: 700; flex: 1; }

/* ── CODE BLOCK ───────────────────────────────────────────────── */
.code-block {
  background: var(--color-gray-light); border: 2px solid var(--color-navy-light);
  border-radius: 6px; margin: 12px 0; overflow: hidden; direction: ltr; text-align: left;
}
.code-block-header {
  background: var(--color-navy-light); color: var(--color-white);
  padding: 6px 12px; font-size: 11px; font-weight: 700; font-family: var(--font-code); text-transform: uppercase;
}
.code-pre {
  font-family: var(--font-code); font-size: 13px; color: var(--color-black);
  padding: 16px; line-height: 1.6; white-space: pre; font-weight: 600;
}

/* ── ANSWER AREAS ─────────────────────────────────────────────── */
.answer-lines { display: flex; flex-direction: column; gap: 24px; margin-top: 16px; }
.answer-line { height: 1px; border-bottom: 2px dotted var(--color-gray-border); }

/* ── ANSWER KEY ───────────────────────────────────────────────── */
.answer-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.answer-cell {
  border: 2px solid var(--color-navy); border-radius: 8px; padding: 12px 8px; text-align: center;
}
.answer-cell-num { font-size: 12px; color: var(--color-text-muted); font-weight: 700; margin-bottom: 4px; }
.answer-cell-val { font-size: 20px; font-weight: 800; color: var(--color-black); }

.model-answer-item {
  border: 2px solid var(--color-navy); border-radius: 8px; padding: 16px 20px; margin-bottom: 16px; background: var(--color-gray-light);
}
.model-answer-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid var(--color-gray-border); padding-bottom: 8px; }
.model-answer-num {
  min-width: 30px; height: 30px; background: var(--color-navy); color: var(--color-white);
  border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800;
}
.model-answer-q { font-size: 13px; font-weight: 700; color: var(--color-text-muted); flex: 1;}
.model-answer-body { font-size: 14px; color: var(--color-black); line-height: 1.7; font-weight: 600; }

/* ── PRINT ────────────────────────────────────────────────────── */
@media print {
  body { background: var(--color-white); padding: 0; }
  .exam-page { box-shadow: none; border: none; }
  .no-print { display: none !important; }
}
"""

# with open('exam_styles.css', 'w', encoding='utf-8') as f:
#     f.write(css_content)


def generate_header(page_num, is_key=False):
    title = "نموذج إجابة - Answer Key" if is_key else "امتحان شامل - Comprehensive Exam"
    color = "var(--color-navy)"
    return f"""
    <div class="page-header">
      <div class="header-logo-area">
        <img class="header-logo" src="../CODEX_Transparent_Yellow.png" alt="CODEX Logo" />
        <div class="header-brand">
          <div class="header-brand-name">CODEX</div>
        </div>
      </div>
      <div class="header-center">
        <div class="header-exam-title">{title}</div>
        <div class="header-course">البرمجة — الصف الثاني الثانوي — مسار الهندسة وعلوم الحاسب</div>
      </div>
      <div class="header-teacher">
        <div class="header-teacher-label">إعداد</div>
        <div class="header-teacher-name">أ/ عمر عبدالعزيز</div>
      </div>
    </div>
    """

def generate_footer(page_num, is_key=False):
    prefix = "KEY " if is_key else "PAGE "
    return f"""
    <div class="page-footer">
      <div class="footer-text">الصف الثاني الثانوي — مسار الهندسة وعلوم الحاسب</div>
      <div class="footer-page-num">{prefix}{page_num:02d}</div>
      <div class="footer-text">إعداد أ/ عمر عبدالعزيز — CODEX</div>
    </div>
    """

def generate_mcq(q_num, text, options):
    letters = ['أ', 'ب', 'ج', 'د']
    opts_html = "".join([f'<div class="mcq-option"><div class="mcq-option-circle">{letters[i]}</div><div>{opt}</div></div>' for i, opt in enumerate(options)])
    return f"""
        <div class="mcq-item">
          <div class="mcq-question"><span class="mcq-num">{q_num}.</span> <div>{text}</div></div>
          <div class="mcq-options">{opts_html}</div>
        </div>
    """

def generate_written(q_num, text, lines=3, code=None):
    code_html = f'<div class="code-block"><div class="code-block-header">JavaScript</div><div class="code-pre">{code}</div></div>' if code else ""
    lines_html = '<div class="answer-lines">' + "".join(['<div class="answer-line"></div>' for _ in range(lines)]) + '</div>'
    return f"""
      <div class="written-item">
        <div class="written-header">
          <div class="written-num">{q_num}</div>
          <div class="written-q">{text}</div>
        </div>
        {code_html}
        {lines_html}
      </div>
    """

mcqs = [
    # Theory (15)
    ("في أي فترة زمنية ظهرت الحواسيب الإلكترونية مثل ENIAC والتي استخدمت للأغراض العسكرية؟", ["الأربعينات - الستينات (1940 - 1969)", "السبعينات - الثمانينات (1970 - 1989)", "التسعينات (1990 - 1999)", "العقد الأول من الألفية (2000 - 2009)"]),
    ("ما هي المكونات الأساسية التي اعتمدت عليها الحواسيب في أجيالها الأولى قبل الترانزيستور؟", ["الدوائر المتكاملة", "الصمامات المفرغة (Vacuum Tubes)", "المعالجات الدقيقة", "الحوسبة السحابية"]),
    ("من هو العالم المصري الذي شارك في اختراع وتطوير ترانزيستور MOSFET؟", ["د. أحمد زويل", "د. مصطفى السيد", "د. محمد محمد عطا الله", "د. فاروق الباز"]),
    ("ما هو المبدأ الأساسي لقانون مور (Moore's Law)؟", ["يتضاعف حجم الحاسوب كل عامين", "يتضاعف عدد الترانزيستورات في الشريحة تقريباً كل عامين", "تقل سرعة المعالجات كل عامين", "تتضاعف أسعار الحواسيب كل عامين"]),
    ("ما هي التقنية التي تتيح معالجة البيانات على الجهاز نفسه فوراً بدلاً من إرسالها إلى خوادم بعيدة؟", ["الحوسبة السحابية (Cloud Computing)", "الواقع الافتراضي (VR)", "الحوسبة الطرفية (Edge Computing)", "الحوسبة الكمومية (Quantum Computing)"]),
    ("أي من التقنيات التالية تضيف عناصر رقمية إلى مشهد من العالم الحقيقي (مثل لعبة Pokemon GO)؟", ["الواقع الافتراضي (VR)", "الواقع المعزز (AR)", "الذكاء الاصطناعي (AI)", "الحوسبة السحابية"]),
    ("ما هي التكنولوجيا التي تستخدم خصائص ميكانيكا الكم لمعالجة المعلومات وتوفر تفوقاً في فئات محددة من المسائل؟", ["الحوسبة الكمومية (Quantum Computing)", "الحوسبة السحابية (Cloud Computing)", "التجارة الإلكترونية (E-Commerce)", "شبكات التواصل الاجتماعي (SNS)"]),
    ("ما هو التحدي الفيزيائي والهندسي الأكبر الذي يواجه استمرار تصغير مكونات الدوائر (الترانزيستورات)؟", ["صعوبة البرمجة بلغة جافا سكريبت", "ازدياد تيارات التسرب والتأثيرات الكمومية", "انخفاض سرعة المعالجات", "زيادة وزن الكمبيوتر"]),
    ("لماذا تُعتبر الحوسبة الطرفية (Edge Computing) حاسمة في تقنية القيادة الذاتية؟", ["لأنها توفر مساحة تخزين أكبر للموسيقى", "لتقليل زمن الاستجابة ومنع التأخير في اتخاذ القرارات", "لأنها تزيد من استهلاك الوقود", "لتوصيل السيارة بالإنترنت فقط"]),
    ("ما هي التقنية التي تعتمد على شركات تمتلك خوادم ضخمة (Servers) لتخزين ومعالجة بيانات المستخدمين عبر الإنترنت؟", ["الحوسبة السحابية (Cloud Computing)", "الحوسبة الطرفية (Edge Computing)", "الترانزيستور", "الواقع المعزز (AR)"]),
    ("كيف ساهمت تكنولوجيا المعلومات في إحداث تغيرات اجتماعية في مجال العمل؟", ["ألغت الحاجة للعمل تماماً", "أتاحت العمل عن بعد (Remote Work)", "منعت التواصل بين الموظفين", "زادت من استخدام الورق"]),
    ("من الأمثلة على التغيرات الناتجة عن تكنولوجيا المعلومات في مجال الدفع والتسوق:", ["استخدام العملات المعدنية فقط", "التجارة الإلكترونية والدفع غير النقدي (Cashless payment)", "الاعتماد على المقايضة", "إلغاء البنوك"]),
    ("ما هو الحل الهندسي الذي تم اللجوء إليه عندما واجه تصغير الترانزيستورات مشاكل فيزيائية لزيادة الأداء؟", ["تعدد الأنوية (Quad-Core) والمعالجة المتوازية", "العودة لاستخدام الصمامات المفرغة", "إلغاء الترانزيستورات تماماً", "تقليل سرعة الكمبيوتر عمداً"]),
    ("تقنية تضع المستخدم داخل بيئة افتراضية مولدة حاسوبياً بالكامل وتفصله عن واقعه:", ["الواقع المعزز (AR)", "الحوسبة الكمومية", "الواقع الافتراضي (VR)", "التجارة الإلكترونية"]),
    ("ما هي الوظيفة الأساسية للصمام المفرغ أو الترانزيستور داخل الكمبيوتر؟", ["تخزين الصور فقط", "العمل كمفتاح كهربائي (يفتح ويقفل بالكهرباء)", "تشغيل شاشة الكمبيوتر", "إصدار الأصوات"]),
    
    # Practical (15)
    ("ما هي الكلمة المفتاحية المستخدمة لتعريف متغير يمكن تغيير قيمته لاحقاً في JavaScript؟", ["<span dir=\"ltr\">const</span>", "<span dir=\"ltr\">let</span>", "<span dir=\"ltr\">int</span>", "<span dir=\"ltr\">function</span>"]),
    ("أي من الأسماء التالية يُعتبر اسماً صحيحاً لمتغير حسب طريقة (camelCase)؟", ["<span dir=\"ltr\">student_age</span>", "<span dir=\"ltr\">StudentAge</span>", "<span dir=\"ltr\">student age</span>", "<span dir=\"ltr\">studentAge</span>"]),
    ("ما هو ناتج تنفيذ الكود التالي؟ <br><span dir=\"ltr\">let x = 5; x++; console.log(x);</span>", ["5", "6", "4", "Error"]),
    ("ما هو نوع البيانات (Data Type) للقيمة <span dir=\"ltr\">\"100\"</span> (مكتوبة بين علامات تنصيص)؟", ["Number", "Boolean", "String", "Undefined"]),
    ("ما هو ناتج تنفيذ الكود التالي؟ <br><span dir=\"ltr\">console.log(\"10\" + 20);</span>", ["30", "\"1020\"", "1020", "Error"]),
    ("ما هما القيمتان الوحيدتان الممكنتان لنوع البيانات المنطقي (Boolean)؟", ["<span dir=\"ltr\">1 and 0</span>", "<span dir=\"ltr\">yes and no</span>", "<span dir=\"ltr\">true and false</span>", "<span dir=\"ltr\">\"true\" and \"false\"</span>"]),
    ("ما هو الرمز المستخدم للمقارنة والتأكد من التساوي في JavaScript؟", ["<span dir=\"ltr\">=</span>", "<span dir=\"ltr\">==</span>", "<span dir=\"ltr\">:=</span>", "<span dir=\"ltr\">eq</span>"]),
    ("ما وظيفة الرمز <span dir=\"ltr\">//</span> في لغة JavaScript؟", ["عملية القسمة", "دمج النصوص", "كتابة تعليق (Comment) لا يتم تنفيذه", "استدعاء دالة"]),
    ("في الكود التالي: <span dir=\"ltr\">let score = 75;</span>، أي شرط من الشروط التالية نتيجته (True)؟", ["<span dir=\"ltr\">score == 80</span>", "<span dir=\"ltr\">score > 90</span>", "<span dir=\"ltr\">score < 50</span>", "<span dir=\"ltr\">score >= 75</span>"]),
    ("متى يتم تنفيذ الأكواد الموجودة داخل كتلة <span dir=\"ltr\">else</span>؟", ["دائماً", "عندما يكون شرط الـ if صحيحاً (True)", "عندما يكون شرط الـ if خاطئاً (False)", "في بداية البرنامج فقط"]),
    ("كم مرة سيتم تكرار هذا اللوب؟ <br><span dir=\"ltr\">for(let i=0; i<3; i++)</span>", ["مرتين", "3 مرات", "4 مرات", "لانهائي"]),
    ("في اللوب التالي: <span dir=\"ltr\">for(let i=1; i<=4; i++)</span>، ما هي آخر قيمة لـ i يتم طباعتها داخل اللوب؟", ["3", "4", "5", "1"]),
    ("ما هو دور الكلمة المفتاحية <span dir=\"ltr\">return</span> داخل الدالة (Function)؟", ["تكرار الدالة", "إرجاع قيمة من الدالة إلى مكان استدعائها", "تغيير اسم الدالة", "طباعة مخرجات على الشاشة"]),
    ("ما هو الفرق بين Parameter و Argument في الدوال؟", ["هما نفس الشيء تماماً", "الـ Parameter في الاستدعاء، والـ Argument في التعريف", "الـ Parameter في تعريف الدالة كمتغير فارغ، والـ Argument هو القيمة الحقيقية في الاستدعاء", "يستخدمان فقط في الحلقات التكرارية"]),
    ("أي شكل هندسي يمثل اتخاذ قرار (Decision / if) في خريطة التدفق (Flowchart)؟", ["المستطيل", "الدائرة", "المعين (السمبوكسة)", "المثلث"])
]

html_parts = []
# Cover
html_parts.append(f"""
  <div class="exam-page">
    {generate_header(1)}
    <div class="cover-body">
      <div class="section-tag" style="margin-bottom: 20px;">امتحان شامل</div>
      <div class="cover-title">مادة البرمجة</div>
      <div class="cover-subtitle">الصف الثاني الثانوي</div>
      <div class="cover-divider"></div>
      
      <div style="display: flex; gap: 16px; margin-bottom: 32px;">
        <div class="cover-info-card">
          <div class="cover-info-label">المحتوى</div>
          <div class="cover-info-value" style="font-size:14px; text-align:center;">تكنولوجيا المعلومات والمجتمع<br>وأساسيات JavaScript</div>
        </div>
        <div class="cover-info-card">
          <div class="cover-info-label">عدد الأسئلة</div>
          <div class="cover-info-value">40 سؤال</div>
        </div>
      </div>

      <div class="cover-student-box">
        <div class="cover-field">
          <div class="cover-field-label">اسم الطالب:</div>
          <div class="cover-field-line"></div>
        </div>
        <div class="cover-field">
          <div class="cover-field-label">الفصل / المجموعة:</div>
          <div class="cover-field-line"></div>
        </div>
        <div class="cover-field">
          <div class="cover-field-label">التاريخ:</div>
          <div class="cover-field-line"></div>
        </div>
        <div class="cover-field">
          <div class="cover-field-label">الدرجة:</div>
          <div class="cover-field-line"></div>
        </div>
      </div>
    </div>
    {generate_footer(1)}
  </div>
""")

# MCQs Pages
mcq_per_page = 10
for page_i in range(3):
    start = page_i * mcq_per_page
    end = start + mcq_per_page
    page_mcqs = mcqs[start:end]
    
    mcq_html = ""
    for i, (q, opts) in enumerate(page_mcqs):
        mcq_html += generate_mcq(start + i + 1, q, opts)
        
    section_header = ""
    if page_i == 0:
        section_header = """
        <div class="section-header">
          <div class="section-tag">القسم الأول</div>
          <div class="section-title">أسئلة الاختيار من متعدد (30 درجة)</div>
        </div>
        """
        
    html_parts.append(f"""
      <div class="exam-page">
        {generate_header(page_i + 2)}
        <div class="page-body">
          {section_header}
          <div class="mcq-grid">
            {mcq_html}
          </div>
        </div>
        {generate_footer(page_i + 2)}
      </div>
    """)

# Written Pages (Optimized into 2 well-filled pages: 5 and 6)
code_34 = """let score = 10;
score = score + 5;
score++;
console.log('Final: ' + score);"""

code_35 = """for (let i = 1; i <= 4; i++) {
  console.log('Lap: ' + i);
}"""

code_37 = """let score = 60;

______ (score ______ 50) {
  console.log('Pass');
} ______ {
  console.log('Fail');
}"""

code_38 = """function greet(name) {
  console.log('Hello ' + name);
}

let studentName = 'Ahmed';
let studentName = 'Omar'; // Error 1

greet studentName; // Error 2"""

wr_p1 = f"""
  <div class="exam-page">
    {generate_header(5)}
    <div class="page-body">
      <div class="section-header">
        <div class="section-tag">القسم الثاني</div>
        <div class="section-title">الأسئلة المقالية والتطبيقية (40 درجة)</div>
      </div>
      {generate_written("31", "اشرح باختصار قانون مور (Moore's Law) وما هو تأثيره على تطور قدرات أجهزة الكمبيوتر؟", 4)}
      {generate_written("32", "قارن بين الحوسبة السحابية (Cloud Computing) والحوسبة الطرفية (Edge Computing) من حيث المفهوم وأعط مثالاً لاستخدام الحوسبة الطرفية.", 4)}
      {generate_written("33", "ما هو الفرق بين <span dir='ltr' class='mcq-code'>=</span> و <span dir='ltr' class='mcq-code'>==</span> في لغة JavaScript؟", 4)}
      {generate_written("34", "تتبع الكود التالي واكتب الناتج النهائي (Output) بدقة:", 3, code_34)}
      {generate_written("35", "تتبع حلقة التكرار (for loop) التالية واكتب المخرجات بالترتيب:", 3, code_35)}
    </div>
    {generate_footer(5)}
  </div>
"""

wr_p2 = f"""
  <div class="exam-page">
    {generate_header(6)}
    <div class="page-body">
      {generate_written("36", "اكتب دالة (Function) في JavaScript تسمى <span dir='ltr' class='mcq-code'>multiply</span> تستقبل متغيرين <span dir='ltr' class='mcq-code'>a</span> و <span dir='ltr' class='mcq-code'>b</span> وتقوم بإرجاع (return) حاصل ضربهما. ثم قم باستدعاء الدالة بالأرقام 6 و 7.", 4)}
      {generate_written("37", "أكمل الكود التالي ليقوم بطباعة Pass إذا كانت الدرجة 50 أو أكبر، ويطبع Fail عكس ذلك:", 2, code_37)}
      {generate_written("38", "الكود التالي يحتوي على خطأين (Errors). اكتشفهما واكتب الكود بعد التصحيح:", 4, code_38)}
      {generate_written("39", "ارسم خريطة تدفق (Flowchart) لبرنامج يختبر درجة الطالب: إذا كانت 90 أو أكبر يطبع 'Excellent'، وإذا كانت بين 50 و 89 يطبع 'Pass'، وإلا يطبع 'Fail'.", 5)}
      {generate_written("40", "اذكر اثنين من التغيرات الاجتماعية الناتجة عن تطور تكنولوجيا المعلومات في المجتمع (مع الشرح المبسط).", 3)}
    </div>
    {generate_footer(6)}
  </div>
"""

html_parts.extend([wr_p1, wr_p2])


student_full = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>Student Exam - Programming</title>
  <link rel="stylesheet" href="exam_styles.css" />
</head>
<body>
{"".join(html_parts)}
</body>
</html>
"""
with open('exam_student.html', 'w', encoding='utf-8') as f:
    f.write(student_full)

# --- Generate Answers ---
answers_parts = []
answers_parts.append(f"""
  <div class="exam-page">
    {generate_header(1, True)}
    <div class="cover-body">
      <img class="cover-logo" src="../CODEX_Transparent_Yellow.png" alt="CODEX" />
      <div class="section-tag" style="margin-bottom: 20px; background:var(--color-navy); color:var(--color-yellow);">نموذج الإجابة السري</div>
      <div class="cover-title">مادة البرمجة</div>
      <div class="cover-subtitle">الصف الثاني الثانوي</div>
      <div class="cover-divider"></div>
      <div class="cover-student-box" style="text-align:center;">
        <h2 style="color:var(--color-navy); margin-bottom:10px;">⚠️ نموذج إجابة المدرس</h2>
        <p style="color:var(--color-text-muted);">هذا المستند يحتوي على الإجابات النموذجية. لا تقم بمشاركته مع الطلاب.</p>
      </div>
    </div>
    {generate_footer(1, True)}
  </div>
""")

mcq_ans_keys = ["ب", "ب", "ج", "ب", "ج", "ب", "أ", "ب", "ب", "أ", "ب", "ب", "أ", "ج", "ب", 
                "ب", "د", "ب", "ج", "ب", "ج", "ب", "ج", "د", "ج", "ب", "ب", "ب", "ج", "ج"]

mcq_grid = '<div class="answer-grid">'
for i, ans in enumerate(mcq_ans_keys):
    mcq_grid += f'<div class="answer-cell"><div class="answer-cell-num">س {i+1}</div><div class="answer-cell-val">{ans}</div></div>'
mcq_grid += '</div>'

answers_parts.append(f"""
  <div class="exam-page">
    {generate_header(2, True)}
    <div class="page-body">
      <div class="section-header">
        <div class="section-tag">القسم الأول</div>
        <div class="section-title">إجابات الاختيار من متعدد</div>
      </div>
      {mcq_grid}
      
      <div class="section-header" style="margin-top:40px;">
        <div class="section-tag">القسم الثاني</div>
        <div class="section-title">إجابات الأسئلة المقالية (31 - 34)</div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">31</div><div class="model-answer-q">قانون مور</div></div>
        <div class="model-answer-body">ينص على أن عدد الترانزيستورات في الشريحة يتضاعف تقريباً كل عامين. تأثيره: زيادة سرعة وقدرات أجهزة الكمبيوتر بشكل هائل.</div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">32</div><div class="model-answer-q">السحابية والطرفية</div></div>
        <div class="model-answer-body">السحابية: معالجة البيانات وتخزينها على خوادم بعيدة عبر الإنترنت.<br>الطرفية: معالجة البيانات محلياً على الجهاز نفسه فوراً.<br>مثال للطرفية: السيارات ذاتية القيادة لتقليل زمن الاستجابة ومنع الحوادث.</div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">33</div><div class="model-answer-q">= vs ==</div></div>
        <div class="model-answer-body">= تستخدم لتعيين (تخزين) قيمة داخل متغير (Assignment).<br>== تستخدم للمقارنة بين قيمتين لاختبار التساوي (Comparison).</div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">34</div><div class="model-answer-q">ناتج الكود score</div></div>
        <div class="model-answer-body">الناتج هو: <span dir="ltr" class="mcq-code">Final: 16</span><br>(10 + 5 = 15، ثم ++ تزيد 1 لتصبح 16).</div>
      </div>
      
    </div>
    {generate_footer(2, True)}
  </div>
""")

answers_parts.append(f"""
  <div class="exam-page">
    {generate_header(3, True)}
    <div class="page-body">
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">35</div><div class="model-answer-q">تتبع اللوب</div></div>
        <div class="model-answer-body" dir="ltr" style="text-align:left;">
          Lap: 1<br>Lap: 2<br>Lap: 3<br>Lap: 4
        </div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">36</div><div class="model-answer-q">دالة multiply</div></div>
        <div class="model-answer-body" dir="ltr" style="text-align:left;">
          function multiply(a, b) {{<br>
          &nbsp;&nbsp;return a * b;<br>
          }}<br>
          let result = multiply(6, 7);
        </div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">37</div><div class="model-answer-q">إكمال الكود</div></div>
        <div class="model-answer-body" dir="ltr" style="text-align:left;">
          الفراغ الأول: if<br>
          الفراغ الثاني: >=<br>
          الفراغ الثالث: else
        </div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">38</div><div class="model-answer-q">اكتشاف الأخطاء</div></div>
        <div class="model-answer-body" dir="ltr" style="text-align:left;">
          1- مسح كلمة let في السطر الثاني لتصبح reassignment فقط.<br>
          2- وضع أقواس الاستدعاء للدالة.<br>
          الكود الصحيح:<br>
          let studentName = "Ahmed";<br>
          studentName = "Omar";<br>
          greet(studentName);
        </div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">39</div><div class="model-answer-q">خريطة التدفق (Flowchart)</div></div>
        <div class="model-answer-body">
          شكل بيضاوي: Start<br>
          معين قرار: Score >= 90? (نعم -> مستطيل Print Excellent -> End)<br>
          (لا) -> معين قرار: Score >= 50? (نعم -> مستطيل Print Pass -> End)<br>
          (لا) -> مستطيل Print Fail -> End<br>
          شكل بيضاوي: End
        </div>
      </div>
      
      <div class="model-answer-item">
        <div class="model-answer-header"><div class="model-answer-num">40</div><div class="model-answer-q">التغيرات الاجتماعية</div></div>
        <div class="model-answer-body">
          يُقبل أي اثنين من الآتي:<br>
          1. التجارة الإلكترونية (E-Commerce): الشراء والبيع عبر الإنترنت.<br>
          2. العمل عن بعد (Remote Work): أداء المهام من المنزل.<br>
          3. التعلم عبر الإنترنت (Online Learning): منصات الدروس والجامعات.<br>
          4. الدفع غير النقدي (Cashless payment): البطاقات وتطبيقات الهواتف.
        </div>
      </div>
      
    </div>
    {generate_footer(3, True)}
  </div>
""")

ans_full = f"""<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>Answer Key - Programming</title>
  <link rel="stylesheet" href="exam_styles.css" />
</head>
<body>
{"".join(answers_parts)}
</body>
</html>
"""
with open('exam_answers.html', 'w', encoding='utf-8') as f:
    f.write(ans_full)
print("Files generated successfully!")
