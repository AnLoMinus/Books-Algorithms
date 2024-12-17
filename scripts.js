document.addEventListener("DOMContentLoaded", function () {
  const algorithms = [
    {
      id: "algo-1",
      title: "אלגוריתם מבנה עלילתי 🧩",
      content: `
        <h3 class="h5 mb-3">שלבים:</h3>
        <ol class="list-group list-group-flush">
            <li class="list-group-item"><strong>מבנה ראשוני:</strong>
                <ul class="mt-2">
                    <li>פתיחה: הגדרת דמויות ורקע</li>
                    <li>אירוע מחולל: שינוי שמניע את העלילה</li>
                    <li>התפתחות: מכשולים ואתגרים</li>
                    <li>שיא: נקודת מפנה קריטית</li>
                    <li>סיום: פתרון וקתרזיס</li>
                </ul>
            </li>
            <li class="list-group-item"><strong>פירוק לפרקים:</strong> כל פרק יתמקד בחלק מהעלילה</li>
            <li class="list-group-item"><strong>מעקב אחר קצב:</strong> ודא שדרגת המתח עולה בהתמדה</li>
        </ol>`,
    },
    {
      id: "algo-2",
      title: "אלגוריתם בניית דמויות 🎭",
      content: `
        <h3>שלבים:</h3>
        <ol>
            <li><strong>יצירת פרופיל לדמות:</strong>
                <ul>
                    <li>מראה חיצוני: גיל, מראה, לבוש</li>
                    <li>אישיות: מטרות, פחדים, עקרונות</li>
                    <li>רקע: היסטוריה אישית, קשרים</li>
                </ul>
            </li>
            <li><strong>בניית יחסים בין דמויות:</strong>
                <ul>
                    <li>דינמיקות רגשיות</li>
                    <li>קונפליקטים פנימיים וחיצוניים</li>
                </ul>
            </li>
            <li><strong>יצירת אבולוציה:</strong> כיצד הדמות משתנה במהלך הספר</li>
        </ol>`,
    },
    {
      id: "algo-3",
      title: "אלגוריתם לתיאור סצנות 🌅",
      content: `
        <h3>שלבים:</h3>
        <ol>
            <li><strong>מבנה בסיסי:</strong>
                <ul>
                    <li>רקע: היכן מתרחשת הסצנה</li>
                    <li>דמויות: מי נוכח ומה מטרתן</li>
                    <li>דיאלוגים: דינמיקה בין הדמויות</li>
                    <li>פעולות: מה מתרחש</li>
                </ul>
            </li>
            <li><strong>חמשת החושים:</strong>
                <ul>
                    <li>הוסף תיאורי ריח, קול, מראה, טעם ומגע</li>
                </ul>
            </li>
            <li><strong>שימוש בדרמה:</strong>
                <ul>
                    <li>הטמעת רגשות והפתעות</li>
                </ul>
            </li>
        </ol>`,
    },
    {
      id: "algo-4",
      title: "אלגוריתם יצירת רעיונות לכתיבה 💡",
      content: `
        <h3>שלבים:</h3>
        <ol>
            <li><strong>מילות מפתח:</strong> רשום מילים או נושאים רלוונטיים</li>
            <li><strong>חיבור אקראי:</strong> שלב מילים או רעיונות בדרכים חדשות</li>
            <li><strong>שאלות מנחות:</strong>
                <ul>
                    <li>מה אם...? (לדוגמה: "מה אם העולם ללא חשמל?")</li>
                    <li>למה זה קרה? (לחפש סיבה לעלילה)</li>
                </ul>
            </li>
            <li><strong>שימוש בכלים אוטומטיים:</strong> GPT או בינה מלאכותית אחרת להרחבת רעיונות</li>
        </ol>`,
    },
    {
      id: "algo-5",
      title: "אלגוריתם עריכה ושכתוב ✍️",
      content: `
        <h3>שלבים:</h3>
        <ol>
            <li><strong>מעקב אחר חוקים:</strong>
                <ul>
                    <li>תחביר תקין</li>
                    <li>מניעת חזרות מיותרות</li>
                </ul>
            </li>
            <li><strong>שיפור סגנון:</strong>
                <ul>
                    <li>החלפת מילים חלשות בחזקות</li>
                    <li>קיצור משפטים ארוכים</li>
                </ul>
            </li>
            <li><strong>משוב אוטומטי:</strong> שימוש בכלים לעריכה (כמו Grammarly)</li>
        </ol>`,
    },
    {
      id: "algo-6",
      title: "אלגוריתם תכנון זמנים ⏱️",
      content: `
        <h3>שלבים:</h3>
        <ol>
            <li>חלוקת זמן כתיבה לפרקים/חלקים</li>
            <li>הצבת מטרות שבועיות/חודשיות</li>
            <li>מעקב אחרי התקדמות (גרפים או דוחות)</li>
        </ol>`,
    },
  ];

  const tools = [
    { name: "Scrivener", description: "לארגון כתיבה" },
    { name: "ChatGPT", description: "להשראה ושכתוב" },
    { name: "ProWritingAid", description: "עריכה ושיפור שפה" },
    { name: "Notion/Trello", description: "לניהול זמנים ומעקב" },
  ];

  // טעינת התוכן לדף
  const content = document.getElementById("content");
  algorithms.forEach((algo) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6";

    const section = document.createElement("div");
    section.id = algo.id;
    section.className = "algorithm-section card h-100 shadow-sm";
    section.innerHTML = `
      <div class="card-body">
        <h2 class="card-title h4 mb-4">${algo.title}</h2>
        ${algo.content}
      </div>
    `;

    col.appendChild(section);
    content.appendChild(col);
  });

  // טעינת הכלים המומלצים
  const toolsList = document.getElementById("recommended-tools");
  tools.forEach((tool) => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";
    col.innerHTML = `
      <div class="tool-card card h-100 border-0 rounded-3 p-3">
        <div class="card-body">
          <h4 class="h5 card-title">${tool.name}</h4>
          <p class="card-text mb-0">${tool.description}</p>
        </div>
      </div>
    `;
    toolsList.appendChild(col);
  });

  // הוספת אנימציה חלקה לניווט
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: "smooth" });
    });
  });
});
