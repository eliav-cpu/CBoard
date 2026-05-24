# NotebookLM Python API - הגדרה ושימוש

ספרייה Python לא-רשמית לגישה תכנותית ל-[Google NotebookLM](https://notebooklm.google.com/).

## התקנה

### דרישות מקדימות
- Python 3.10+
- pip

### שלבי התקנה

```bash
# 1. התקנת החבילה עם תמיכת דפדפן
pip install "notebooklm-py[browser]"

# 2. התקנת Chromium (לאימות דרך Google)
playwright install chromium

# 3. התחברות לחשבון Google
notebooklm login

# 4. בדיקת אימות (אופציונלי)
notebooklm auth check --test --json
```

## פקודות בסיסיות

```bash
# רשימת מחברות
notebooklm list

# יצירת מחברת חדשה
notebooklm create "שם המחברת"

# שאלה למחברת הפעילה
notebooklm ask "מה יש כאן?"

# הצגת סטטוס נוכחי
notebooklm status
```

## שימוש כ-Python Library

```python
from notebooklm import NotebookLM

# התחברות (פעם ראשונה צריך לרוץ notebooklm login)
nlm = NotebookLM()

# רשימת מחברות
notebooks = nlm.list_notebooks()

# יצירת מחברת
notebook = nlm.create_notebook("My Research")

# הוספת מקורות
notebook.add_source("https://example.com/article")

# שאלה
response = notebook.ask("סכם את המאמר")
print(response)
```

## יכולות עיקריות

| קטגוריה | פעולות |
|----------|---------|
| **מחברות** | יצירה, שינוי שם, מחיקה, רשימה |
| **מקורות** | URLs, PDFs, YouTube, Google Drive |
| **תוכן** | Audio overviews, קוויזים, כרטיסיות, mind maps |
| **הורדות** | MP3, MP4, PDF, JSON, CSV |
| **צ'אט** | שאלות, היסטוריה, פרסונות מותאמות |
| **שיתוף** | הרשאות וגישה |

## גרסה שהותקנה

- **notebooklm-py**: 0.5.0
- **playwright**: 1.60.0

## הערות חשובות

> ⚠️ ספרייה זו משתמשת ב-API לא-רשמי של Google. ייתכנו שינויים ללא התראה.
> מומלץ לשימוש בפרוטוטייפים ומחקר בלבד.

## קישורים

- [GitHub Repository](https://github.com/teng-lin/notebooklm-py)
- [NotebookLM](https://notebooklm.google.com/)
