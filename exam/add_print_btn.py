import io

btn = '<button class="no-print" onclick="window.print()" style="position: fixed; bottom: 30px; left: 30px; padding: 14px 28px; background: #0f172a; color: #fff; border: none; border-radius: 12px; font-family: \'Cairo\', sans-serif; font-size: 16px; font-weight: 800; cursor: pointer; z-index: 1000; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">🖨 طباعة A4</button>'

with io.open('exam_student.html', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('</body>', btn + '</body>')
with io.open('exam_student.html', 'w', encoding='utf-8') as f:
    f.write(content)

with io.open('exam_answers.html', 'r', encoding='utf-8') as f:
    content2 = f.read()
content2 = content2.replace('</body>', btn + '</body>')
with io.open('exam_answers.html', 'w', encoding='utf-8') as f:
    f.write(content2)

print('Done OK')
