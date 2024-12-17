document.addEventListener("DOMContentLoaded", function () {
  // יצירת המודל והוספתו ל-DOM
  const modalHTML = `
    <div class="modal fade" id="formModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">יצירת דוח אלגוריתמים לכתיבה</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="writing-algorithm-form">
              <!-- תרטי הספר -->
              <div class="mb-4">
                <h3 class="h5 mb-3">פרטי הספר</h3>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">שם הספר</label>
                    <input type="text" class="form-control" name="bookTitle" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">ז'אנר</label>
                    <input type="text" class="form-control" name="genre">
                  </div>
                  <div class="col-12">
                    <label class="form-label">תקציר קצר</label>
                    <textarea class="form-control" name="summary" rows="3"></textarea>
                  </div>
                </div>
              </div>

              <!-- מבנה עלילתי -->
              <div class="mb-4">
                <h3 class="h5 mb-3">מבנה עלילתי</h3>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">סוג המבנה העלילתי</label>
                    <select class="form-select" name="plotStructure">
                      <option value="three-act">שלוש מערכות</option>
                      <option value="hero-journey">מסע הגיבור</option>
                      <option value="five-act">חמש מערכות</option>
                      <option value="custom">מבנה מותאם אישית</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">אירוע מחולל</label>
                    <textarea class="form-control" name="triggerEvent" rows="2"></textarea>
                  </div>
                  <div class="col-12">
                    <label class="form-label">נקודת שיא מתוכננת</label>
                    <textarea class="form-control" name="climax" rows="2"></textarea>
                  </div>
                  <div class="col-12">
                    <label class="form-label">מכשולים עיקריים</label>
                    <textarea class="form-control" name="obstacles" rows="3"></textarea>
                  </div>
                </div>
              </div>

              <!-- דמויות -->
              <div class="mb-4">
                <h3 class="h5 mb-3">דמויות מרכזיות</h3>
                <div id="characters-container">
                  <div class="character-entry border rounded p-3 mb-3">
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label">שם הדמות</label>
                        <input type="text" class="form-control" name="characterName[]">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label">תפקיד בעלילה</label>
                        <input type="text" class="form-control" name="characterRole[]">
                      </div>
                      <div class="col-12">
                        <label class="form-label">מאפיינים עיקריים</label>
                        <textarea class="form-control" name="characterTraits[]" rows="2"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn btn-outline-secondary" id="add-character">
                  הוסף דמות +
                </button>
              </div>

              <!-- תכנון זמנים -->
              <div class="mb-4">
                <h3 class="h5 mb-3">תכנון זמנים</h3>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">תאריך יעד לסיום</label>
                    <input type="date" class="form-control" name="deadline">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">מספר מילים מתוכנן</label>
                    <input type="number" class="form-control" name="wordCount">
                  </div>
                  <div class="col-12">
                    <label class="form-label">יעדים שבועיים</label>
                    <textarea class="form-control" name="weeklyGoals" rows="2"></textarea>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-primary">צור דוח</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // הוספת המודל לגוף המסמך
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // הגדרת אירועים לטופס
  setupFormEvents();
});

// פונקציה להגדרת אירועי הטופס
function setupFormEvents() {
  const form = document.getElementById("writing-algorithm-form");
  const modal = document.getElementById("formModal");
  const bootstrapModal = new bootstrap.Modal(modal);

  // הוספת כפתור להוספת דמויות
  const addCharacterBtn = document.getElementById("add-character");
  if (addCharacterBtn) {
    const charactersContainer = document.getElementById("characters-container");
    addCharacterBtn.addEventListener("click", () => {
      const newCharacter = charactersContainer.children[0].cloneNode(true);
      newCharacter
        .querySelectorAll("input, textarea")
        .forEach((input) => (input.value = ""));
      charactersContainer.appendChild(newCharacter);
    });
  }

  // טיפול בשליחת הטופס
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    // סגירת המודל
    bootstrapModal.hide();

    // יצירת הדוח
    const reportContent = generateReport(formData);

    // הצגת הדוח בחלון חדש
    const reportWindow = window.open("", "_blank");
    reportWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="he">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>דוח תכנון ספר</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.rtl.min.css">
        <style>
          @media print {
            .no-print { display: none; }
            .page-break { page-break-before: always; }
          }
        </style>
      </head>
      <body>
        <div class="container my-5">
          <div class="d-flex justify-content-between mb-4 no-print">
            <button class="btn btn-primary" onclick="window.print()">הדפס דוח</button>
            <button class="btn btn-secondary" onclick="window.close()">סגור</button>
          </div>
          ${reportContent.outerHTML}
        </div>
      </body>
      </html>
    `);
    reportWindow.document.close();
  });
}

// פונקציה ליצירת הדוח
function generateReport(formData) {
  const report = document.createElement("div");
  report.className = "card shadow-sm";

  report.innerHTML = `
    <div class="card-body">
      <div class="report-section mb-4">
        <h2 class="h4 mb-3">פרטי הספר</h2>
        <div class="row">
          <div class="col-md-6">
            <p><strong>שם הספר:</strong> ${formData.get("bookTitle")}</p>
            <p><strong>ז'אנר:</strong> ${formData.get("genre")}</p>
            <p><strong>מבנה עלילתי:</strong> ${formData.get(
              "plotStructure"
            )}</p>
          </div>
          <div class="col-12">
            <p><strong>תקציר:</strong></p>
            <p>${formData.get("summary")}</p>
          </div>
        </div>
      </div>

      <div class="report-section mb-4">
        <h2 class="h4 mb-3">מבנה עלילתי</h2>
        <div class="row">
          <div class="col-md-6">
            <p><strong>אירוע מחולל:</strong></p>
            <p>${formData.get("triggerEvent")}</p>
          </div>
          <div class="col-md-6">
            <p><strong>נקודת שיא:</strong></p>
            <p>${formData.get("climax")}</p>
          </div>
          <div class="col-12">
            <p><strong>מכשולים עיקריים:</strong></p>
            <p>${formData.get("obstacles")}</p>
          </div>
        </div>
      </div>

      <div class="report-section mb-4">
        <h2 class="h4 mb-3">דמויות מרכזיות</h2>
        ${generateCharactersReport(formData)}
      </div>

      <div class="report-section">
        <h2 class="h4 mb-3">תכנון זמנים</h2>
        <div class="row">
          <div class="col-md-6">
            <p><strong>תאריך יעד:</strong> ${formData.get("deadline")}</p>
            <p><strong>מספר מילים מתוכנן:</strong> ${formData.get(
              "wordCount"
            )}</p>
          </div>
          <div class="col-12">
            <p><strong>יעדים שבועיים:</strong></p>
            <p>${formData.get("weeklyGoals")}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  return report;
}

// פונקציה ליצירת דוח הדמויות
function generateCharactersReport(formData) {
  const names = formData.getAll("characterName[]");
  const roles = formData.getAll("characterRole[]");
  const traits = formData.getAll("characterTraits[]");

  let charactersHtml = "";
  for (let i = 0; i < names.length; i++) {
    if (names[i]) {
      charactersHtml += `
        <div class="character-card mb-3 p-3 border rounded">
          <h3 class="h5">${names[i]}</h3>
          <p><strong>תפקיד:</strong> ${roles[i]}</p>
          <p><strong>מאפיינים:</strong> ${traits[i]}</p>
        </div>
      `;
    }
  }
  return charactersHtml;
}
