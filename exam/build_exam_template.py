import os

# ═══════════════════════════════════════════════════════════════
# ⚙️  EXAM CONFIGURATION — عدّل هذا القسم لكل امتحان جديد
# ═══════════════════════════════════════════════════════════════
EXAM_CONFIG = {
    "title_ar": "امتحان شامل",
    "title_en": "Comprehensive Exam",
    "subject": "البرمجة",
    "grade": "الصف الثاني الثانوي",
    "track": "مسار الهندسة وعلوم الحاسب",
    "teacher": "أ/ عمر عبدالعزيز",
    "content_topics": "الموضوع الأول\nوالموضوع الثاني",
    "total_questions": "40",
    "mcq_marks": "30",
    "written_marks": "40",
    "logo_path": "../CODEX_Transparent_Yellow.png",
    "student_output": "exam_student.html",
    "answers_output": "exam_answers.html",
}

# ═══════════════════════════════════════════════════════════════
# 🔧  HELPER FUNCTIONS — لا تعدّل هذا القسم
# ═══════════════════════════════════════════════════════════════
def generate_header(page_num, is_key=False):
    c = EXAM_CONFIG
    title = "نموذج إجابة - Answer Key" if is_key else f"{c['title_ar']} - {c['title_en']}"
    key_tag = "KEY" if is_key else "PAGE"
    return (
        '\n    <div class="page-header">'
        '\n      <div class="header-logo-area">'
        f'\n        <img class="header-logo" src="{c["logo_path"]}" alt="CODEX Logo" />'
        '\n        <div class="header-brand"><div class="header-brand-name">CODEX</div></div>'
        '\n      </div>'
        f'\n      <div class="header-center"><div class="header-exam-title">{title}</div>'
        f'\n      <div class="header-course">{c["subject"]} — {c["grade"]} — {c["track"]}</div></div>'
        f'\n      <div class="header-teacher"><div class="header-teacher-label">إعداد</div>'
        f'\n      <div class="header-teacher-name">{c["teacher"]}</div></div>'
        '\n    </div>'
    )

def generate_footer(page_num, is_key=False):
    c = EXAM_CONFIG
    key_tag = "KEY" if is_key else "PAGE"
    return (
        '\n    <div class="page-footer">'
        f'\n      <div class="footer-text">{c["grade"]} — {c["track"]}</div>'
        f'\n      <div class="footer-page-num">{key_tag} {page_num:02d}</div>'
        f'\n      <div class="footer-text">إعداد {c["teacher"]} — CODEX</div>'
        '\n    </div>'
    )

def generate_mcq(num, question, options):
    labels = ["أ", "ب", "ج", "د"]
    opts_html = "".join(
        f'<div class="mcq-option"><div class="mcq-option-circle">{labels[i]}</div><div>{opt}</div></div>'
        for i, opt in enumerate(options)
    )
    return (
        '\n    <div class="mcq-item">'
        f'\n      <div class="mcq-question"><span class="mcq-num">{num}.</span> <div>{question}</div></div>'
        f'\n      <div class="mcq-options">{opts_html}</div>'
        '\n    </div>'
    )

def generate_written(q_num, text, lines=3, code=None):
    code_html = (
        f'<div class="code-block"><div class="code-block-header">JavaScript</div>'
        f'<div class="code-pre">{code}</div></div>'
    ) if code else ""
    lines_html = (
        '<div class="answer-lines">'
        + "".join('<div class="answer-line"></div>' for _ in range(lines))
        + '</div>'
    )
    return (
        '\n      <div class="written-item">'
        '\n        <div class="written-header">'
        f'\n          <div class="written-num">{q_num}</div>'
        f'\n          <div class="written-q">{text}</div>'
        '\n        </div>'
        f'\n        {code_html}'
        f'\n        {lines_html}'
        '\n      </div>'
    )

# ═══════════════════════════════════════════════════════════════
# 📝  MCQ QUESTIONS — عدّل هذه القائمة بأسئلة الاختيار الجديدة
# ═══════════════════════════════════════════════════════════════
# كل سؤال على الشكل: ("نص السؤال", ["خيار أ", "خيار ب", "خيار ج", "خيار د"])
mcqs = [
    # ─── أسئلة نظرية (1-15) ───
    ("سؤال نموذجي 1", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 2", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 3", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 4", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 5", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 6", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 7", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 8", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 9", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 10", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 11", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 12", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 13", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 14", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال نموذجي 15", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    # ─── أسئلة عملية JavaScript (16-30) ───
    ("سؤال عملي 16", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 17", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 18", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 19", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 20", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 21", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 22", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 23", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 24", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 25", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 26", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 27", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 28", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 29", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
    ("سؤال عملي 30", ["خيار أ", "خيار ب", "خيار ج", "خيار د"]),
]

# ═══════════════════════════════════════════════════════════════
# 🔑  MCQ ANSWER KEY — إجابات الاختيار الصحيح (أ/ب/ج/د)
# ═══════════════════════════════════════════════════════════════
mcq_ans_keys = [
    "أ", "ب", "ج", "ب", "ج", "ب", "أ", "ب", "ب", "أ",
    "ب", "ب", "أ", "ج", "ب", "ب", "د", "ب", "ج", "ب",
    "ج", "ب", "ج", "د", "ج", "ب", "ب", "ب", "ج", "ج",
]

# ═══════════════════════════════════════════════════════════════
# ✏️  CODE SNIPPETS للأسئلة التطبيقية — عدّل حسب الامتحان
# ═══════════════════════════════════════════════════════════════
code_q34 = """let x = 10;
x = x + 5;
console.log(x);"""

code_q35 = """for (let i = 1; i <= 3; i++) {
  console.log("Count: " + i);
}"""

# ═══════════════════════════════════════════════════════════════
# 🏗️  BUILD STUDENT EXAM
# ═══════════════════════════════════════════════════════════════
c = EXAM_CONFIG
html_parts = []

# Cover Page
html_parts.append(
    '\n  <div class="exam-page">'
    + generate_header(1)
    + '\n    <div class="cover-body">'
    + f'\n      <div class="section-tag" style="margin-bottom: 20px;">{c["title_ar"]}</div>'
    + f'\n      <div class="cover-title">{c["subject"]}</div>'
    + f'\n      <div class="cover-subtitle">{c["grade"]}</div>'
    + '\n      <div class="cover-divider"></div>'
    + '\n      <div style="display:flex;gap:16px;margin-bottom:32px;">'
    + '\n        <div class="cover-info-card">'
    + '\n          <div class="cover-info-label">المحتوى</div>'
    + f'\n          <div class="cover-info-value" style="font-size:14px;text-align:center;">{c["content_topics"]}</div>'
    + '\n        </div>'
    + '\n        <div class="cover-info-card">'
    + '\n          <div class="cover-info-label">عدد الأسئلة</div>'
    + f'\n          <div class="cover-info-value">سؤال {c["total_questions"]}</div>'
    + '\n        </div>'
    + '\n      </div>'
    + '\n      <div class="cover-student-box">'
    + '\n        <div class="cover-field"><div class="cover-field-label">اسم الطالب:</div><div class="cover-field-line"></div></div>'
    + '\n        <div class="cover-field"><div class="cover-field-label">الفصل / المجموعة:</div><div class="cover-field-line"></div></div>'
    + '\n        <div class="cover-field"><div class="cover-field-label">التاريخ:</div><div class="cover-field-line"></div></div>'
    + '\n        <div class="cover-field"><div class="cover-field-label">الدرجة:</div><div class="cover-field-line"></div></div>'
    + '\n      </div>'
    + '\n    </div>'
    + generate_footer(1)
    + '\n  </div>'
)

# MCQ Pages (10 per page)
for page_i in range(3):
    start = page_i * 10
    page_mcqs = mcqs[start:start + 10]
    mcq_html = "".join(generate_mcq(start + i + 1, q, opts) for i, (q, opts) in enumerate(page_mcqs))
    section_header = (
        '\n        <div class="section-header">'
        '\n          <div class="section-tag">القسم الأول</div>'
        f'\n          <div class="section-title">أسئلة الاختيار من متعدد ({c["mcq_marks"]} درجة)</div>'
        '\n        </div>'
    ) if page_i == 0 else ""

    html_parts.append(
        '\n      <div class="exam-page">'
        + generate_header(page_i + 2)
        + '\n        <div class="page-body">'
        + section_header
        + '\n          <div class="mcq-grid">'
        + mcq_html
        + '\n          </div>'
        + '\n        </div>'
        + generate_footer(page_i + 2)
        + '\n      </div>'
    )

# ═══════════════════════════════════════════════════════════════
# ✍️  WRITTEN QUESTION PAGES — عدّل الأسئلة المقالية هنا
# ═══════════════════════════════════════════════════════════════

# صفحة 5: الأسئلة المقالية (31-34)
wr_p1 = (
    '\n  <div class="exam-page">'
    + generate_header(5)
    + '\n    <div class="page-body">'
    + '\n      <div class="section-header">'
    + '\n        <div class="section-tag">القسم الثاني</div>'
    + f'\n        <div class="section-title">الأسئلة المقالية والتطبيقية ({c["written_marks"]} درجة)</div>'
    + '\n      </div>'
    + generate_written("31", "سؤال مقالي 31 — نظري", 4)
    + generate_written("32", "سؤال مقالي 32 — نظري", 4)
    + generate_written("33", "سؤال مقالي 33 — مقارنة", 4)
    + generate_written("34", "تتبع الكود التالي واكتب الناتج النهائي (Output) بدقة:", 3, code_q34)
    + '\n    </div>'
    + generate_footer(5)
    + '\n  </div>'
)

# صفحة 6: الأسئلة التطبيقية (35-40)
wr_p2 = (
    '\n  <div class="exam-page">'
    + generate_header(6)
    + '\n    <div class="page-body">'
    + generate_written("35", "تتبع حلقة التكرار التالية واكتب المخرجات بالترتيب:", 3, code_q35)
    + generate_written("36", "سؤال تطبيقي 36 — اكتب دالة (Function)", 5)
    + generate_written("37", "سؤال تطبيقي 37 — أكمل الكود", 3)
    + generate_written("38", "سؤال تطبيقي 38 — اكتشف الأخطاء وصحّح الكود", 4)
    + generate_written("39", "سؤال تطبيقي 39 — ارسم خريطة التدفق (Flowchart)", 5)
    + generate_written("40", "سؤال مقالي 40 — اذكر وأشرح", 3)
    + '\n    </div>'
    + generate_footer(6)
    + '\n  </div>'
)

html_parts.extend([wr_p1, wr_p2])

student_full = (
    '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n'
    '  <meta charset="UTF-8" />\n'
    '  <title>Student Exam - Programming</title>\n'
    '  <link rel="stylesheet" href="exam_styles.css" />\n'
    '</head>\n<body>\n'
    + "\n".join(html_parts)
    + '\n</body>\n</html>\n'
)
with open(c["student_output"], 'w', encoding='utf-8') as f:
    f.write(student_full)

# ═══════════════════════════════════════════════════════════════
# 🔑  BUILD ANSWER KEY — عدّل الإجابات النموذجية هنا
# ═══════════════════════════════════════════════════════════════
answers_parts = []

# Cover
answers_parts.append(
    '\n  <div class="exam-page">'
    + generate_header(1, True)
    + '\n    <div class="cover-body">'
    + '\n      <div class="section-tag" style="margin-bottom:20px;background:var(--color-navy);color:var(--color-yellow);">نموذج الإجابة السري</div>'
    + f'\n      <div class="cover-title">{c["subject"]}</div>'
    + f'\n      <div class="cover-subtitle">{c["grade"]}</div>'
    + '\n      <div class="cover-divider"></div>'
    + '\n      <div class="cover-student-box" style="text-align:center;">'
    + '\n        <h2 style="color:var(--color-navy);margin-bottom:10px;">نموذج إجابة المدرس</h2>'
    + '\n        <p style="color:var(--color-text-muted);">هذا المستند يحتوي على الإجابات النموذجية. لا تقم بمشاركته مع الطلاب.</p>'
    + '\n      </div>'
    + '\n    </div>'
    + generate_footer(1, True)
    + '\n  </div>'
)

# MCQ Grid
mcq_grid = '<div class="answer-grid">' + "".join(
    f'<div class="answer-cell"><div class="answer-cell-num">س {i+1}</div><div class="answer-cell-val">{ans}</div></div>'
    for i, ans in enumerate(mcq_ans_keys)
) + '</div>'

answers_parts.append(
    '\n  <div class="exam-page">'
    + generate_header(2, True)
    + '\n    <div class="page-body">'
    + '\n      <div class="section-header"><div class="section-tag">القسم الأول</div><div class="section-title">إجابات الاختيار من متعدد</div></div>'
    + '\n      ' + mcq_grid
    + '\n      <div class="section-header" style="margin-top:30px;"><div class="section-tag">القسم الثاني</div><div class="section-title">إجابات الأسئلة المقالية (31 - 34)</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">31</div><div class="model-answer-q">سؤال 31</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 31.</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">32</div><div class="model-answer-q">سؤال 32</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 32.</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">33</div><div class="model-answer-q">سؤال 33</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 33.</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">34</div><div class="model-answer-q">ناتج الكود</div></div><div class="model-answer-body">الناتج: <span dir="ltr" class="mcq-code">...</span></div></div>'
    + '\n    </div>'
    + generate_footer(2, True)
    + '\n  </div>'
)

answers_parts.append(
    '\n  <div class="exam-page">'
    + generate_header(3, True)
    + '\n    <div class="page-body">'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">35</div><div class="model-answer-q">تتبع اللوب</div></div><div class="model-answer-body" dir="ltr" style="text-align:left;">Count: 1<br>Count: 2<br>Count: 3</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">36</div><div class="model-answer-q">سؤال 36</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 36.</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">37</div><div class="model-answer-q">سؤال 37</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 37.</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">38</div><div class="model-answer-q">سؤال 38</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 38.</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">39</div><div class="model-answer-q">سؤال 39</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 39.</div></div>'
    + '\n      <div class="model-answer-item"><div class="model-answer-header"><div class="model-answer-num">40</div><div class="model-answer-q">سؤال 40</div></div><div class="model-answer-body">الإجابة النموذجية للسؤال 40.</div></div>'
    + '\n    </div>'
    + generate_footer(3, True)
    + '\n  </div>'
)

ans_full = (
    '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n'
    '  <meta charset="UTF-8" />\n'
    '  <title>Answer Key - Programming</title>\n'
    '  <link rel="stylesheet" href="exam_styles.css" />\n'
    '</head>\n<body>\n'
    + "\n".join(answers_parts)
    + '\n</body>\n</html>\n'
)
with open(c["answers_output"], 'w', encoding='utf-8') as f:
    f.write(ans_full)

print("Files generated successfully!")
print(f"  {c['student_output']}")
print(f"  {c['answers_output']}")
print("\n  Now run: python add_print_btn.py")
