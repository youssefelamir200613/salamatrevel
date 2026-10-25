document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const themeToggle = document.getElementById("themeToggle");
  const langSelect = document.getElementById("langSelect");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const bookingForm = document.getElementById("bookingForm");
  const formMessage = document.getElementById("formMessage");

  document.getElementById("year").textContent = new Date().getFullYear();

  // تأثير ظهور العناصر عند الوصول إليها أثناء التمرير.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(element => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(element => observer.observe(element));
  }

  // ظل بسيط للشريط العلوي عند التمرير.
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 10);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // الوضع الداكن والفاتح؛ الاختيار محفوظ على نفس المتصفح.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("salamaTheme"); } catch (error) {}
  if (savedTheme === "dark") body.classList.add("dark");
  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    try { localStorage.setItem("salamaTheme", body.classList.contains("dark") ? "dark" : "light"); } catch (error) {}
    updateThemeButton();
  });
  function updateThemeButton() {
    const dark = body.classList.contains("dark");
    themeToggle.textContent = dark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن");
    themeToggle.title = dark ? "الوضع الفاتح" : "الوضع الداكن";
  }

  // قائمة الهاتف.
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));

  const translations = {
    ar: {
      brand:"سلامة ترافيل", tagline:"رحلتك تبدأ من هنا", navHome:"الرئيسية", navDestinations:"الوجهات", navServices:"خدماتنا", navAbout:"من نحن", navBooking:"احجز رحلتك",
      heroEyebrow:"اكتشف سحر مصر", heroTitle:"مصر أجمل مما تتخيل", heroText:"من شواطئ البحر الأحمر إلى كنوز الحضارة القديمة، خطط لرحلتك القادمة مع سلامة ترافيل.", exploreBtn:"اكتشف الوجهات", bookBtn:"احجز الآن", heroNote:"تجارب مميزة داخل مصر، وذكريات تدوم", heroCardTitle:"وجهات تستحق الزيارة", heroCardText:"من البحر إلى قلب التاريخ",
      statDest:"وجهات مميزة", statLocal:"رحلات داخل مصر", statSupport:"اهتمام باستفساراتك",
      destEyebrow:"اختار مغامرتك", destTitle:"وجهات مصر في انتظارك", destIntro:"استمتع بتنوع مصر بين البحر والطبيعة والتاريخ، واختر الوجهة الأقرب لقلبك.",
      typeSea:"بحر وشواطئ", typeHistory:"تاريخ وحضارة", typeNature:"طبيعة وهدوء", typeCity:"مدينة ساحلية", typeCulture:"ثقافة ومغامرة",
      sharm:"شرم الشيخ", sharmText:"مياه صافية وشعاب مرجانية وأجواء مليئة بالحيوية.", hurghada:"الغردقة", hurghadaText:"رحلات بحرية وأنشطة مائية وأيام مريحة على البحر الأحمر.", luxor:"الأقصر وأسوان", luxorText:"رحلة بين المعابد والآثار ونهر النيل الساحر.", siwa:"واحة سيوة", siwaText:"واحة فريدة وعيون مياه ومناظر صحراوية خلابة.", alex:"الإسكندرية", alexText:"أجواء البحر المتوسط والكورنيش والمعالم الثقافية.", cairo:"القاهرة والجيزة", cairoText:"الأهرامات وأجواء المدينة ومزيج من القديم والحديث.", details:"اعرف المزيد",
      servicesEyebrow:"خدماتنا", servicesTitle:"نهتم بتفاصيل رحلتك", servicesIntro:"خطط أوضح وتجربة أسهل من أول استفسار لحد نهاية الرحلة.", service1Title:"تنظيم الرحلات", service1Text:"مساعدة في اختيار الوجهة والبرنامج المناسب لوقتك واهتماماتك.", service2Title:"ترتيب الإقامة", service2Text:"مساعدة في الاستفسار عن خيارات الإقامة المناسبة لرحلتك.", service3Title:"تنسيق الانتقالات", service3Text:"تخطيط الانتقالات ضمن برنامج الرحلة حسب الاتفاق والتوافر.", service4Title:"متابعة واستفسارات", service4Text:"تواصل واضح للرد على أسئلتك ومساعدتك قبل الحجز.",
      aboutEyebrow:"عن سلامة ترافيل", aboutTitle:"رحلات محلية بروح مختلفة", aboutText:"نهدف إلى مساعدتك على اكتشاف أماكن مصر المتنوعة من خلال تخطيط واضح وتجربة تناسب اهتماماتك وميزانيتك. تفاصيل الرحلة النهائية يتم تأكيدها معك قبل الحجز.", value1Title:"وضوح وشفافية", value1Text:"تفاصيل الرحلة والتكلفة قبل التأكيد.", value2Title:"اهتمام بتجربتك", value2Text:"نساعدك تختار ما يناسبك.", value3Title:"اكتشف مصر", value3Text:"مناظر وتجارب متنوعة داخل بلدنا.", aboutBtn:"ابدأ التخطيط",
      bookingEyebrow:"خطوتك الأولى", bookingTitle:"خلينا نخطط لرحلتك القادمة", bookingText:"املأ البيانات التالية وسيفتح لك برنامج البريد رسالة جاهزة بطلبك. لا يتم إرسال البيانات تلقائيًا من الموقع.", bookingPoint1:"اختر الوجهة والموعد المناسب.", bookingPoint2:"حدد عدد المسافرين ووسيلة التواصل.", bookingPoint3:"راجع الرسالة قبل إرسالها.", formTitle:"طلب حجز رحلة", formSubtitle:"كل الحقول المميزة بنجمة مطلوبة", labelName:"الاسم الكامل *", labelEmail:"البريد الإلكتروني *", labelDestination:"الوجهة *", chooseDestination:"اختر الوجهة", otherDestination:"وجهة أخرى داخل مصر", labelDate:"التاريخ المفضل", labelTravelers:"عدد المسافرين", labelPhone:"رقم الهاتف (اختياري)", labelNotes:"تفاصيل إضافية", submitBtn:"تجهيز رسالة الحجز", formDisclaimer:"ملاحظة: هذا النموذج يجهز رسالة بريد إلكتروني ولا يؤكد الحجز تلقائيًا.",
      footerText:"اكتشف مصر، وخطط لرحلتك القادمة بكل سهولة.", footerQuick:"روابط سريعة", footerContact:"ابدأ التواصل", footerLocation:"رحلات داخل جمهورية مصر العربية", footerRights:"جميع الحقوق محفوظة", backTop:"العودة للأعلى ↑",
      placeholderName:"اكتب اسمك", placeholderNotes:"اكتب أي تفاصيل تساعدنا في فهم طلبك", msgReady:"تم تجهيز رسالة الحجز في برنامج البريد. راجع التفاصيل قبل الإرسال.", msgNoEmail:"لا يوجد برنامج بريد افتراضي؟ انسخ بياناتك وأرسلها من بريدك الإلكتروني."
    },
    de: {
      brand:"Salama Travel", tagline:"Deine Reise beginnt hier", navHome:"Startseite", navDestinations:"Reiseziele", navServices:"Leistungen", navAbout:"Über uns", navBooking:"Reise buchen",
      heroEyebrow:"Entdecke den Zauber Ägyptens", heroTitle:"Ägypten ist schöner, als du denkst", heroText:"Von den Stränden des Roten Meeres bis zu den Schätzen der Antike – plane deine nächste Reise mit Salama Travel.", exploreBtn:"Reiseziele entdecken", bookBtn:"Jetzt anfragen", heroNote:"Besondere Erlebnisse in Ägypten, Erinnerungen fürs Leben", heroCardTitle:"Reiseziele, die sich lohnen", heroCardText:"Vom Meer bis in die Geschichte",
      statDest:"Besondere Reiseziele", statLocal:"Reisen in Ägypten", statSupport:"Wir beantworten Fragen",
      destEyebrow:"Wähle dein Abenteuer", destTitle:"Ägyptens Reiseziele warten", destIntro:"Entdecke Ägyptens Vielfalt aus Meer, Natur und Geschichte.",
      typeSea:"Meer und Strände", typeHistory:"Geschichte und Kultur", typeNature:"Natur und Ruhe", typeCity:"Küstenstadt", typeCulture:"Kultur und Abenteuer",
      sharm:"Sharm El-Sheikh", sharmText:"Klares Wasser, Korallenriffe und lebendige Atmosphäre.", hurghada:"Hurghada", hurghadaText:"Bootsausflüge und Wasseraktivitäten am Roten Meer.", luxor:"Luxor und Assuan", luxorText:"Tempel, historische Stätten und der Nil.", siwa:"Siwa-Oase", siwaText:"Eine besondere Oase mit Quellen und Wüstenlandschaften.", alex:"Alexandria", alexText:"Mittelmeer, Uferpromenade und Kulturstätten.", cairo:"Kairo und Gizeh", cairoText:"Pyramiden und eine Mischung aus Alt und Neu.", details:"Mehr erfahren",
      servicesEyebrow:"Unsere Leistungen", servicesTitle:"Wir kümmern uns um die Details", servicesIntro:"Klare Planung und einfache Kommunikation von der ersten Frage bis zum Reiseende.", service1Title:"Reiseplanung", service1Text:"Hilfe bei der Auswahl eines passenden Reiseziels und Programms.", service2Title:"Unterkunft", service2Text:"Informationen zu passenden Unterkunftsmöglichkeiten.", service3Title:"Transfers", service3Text:"Planung von Transfers nach Absprache und Verfügbarkeit.", service4Title:"Fragen und Betreuung", service4Text:"Klare Kommunikation vor deiner Buchung.",
      aboutEyebrow:"Über Salama Travel", aboutTitle:"Lokale Reisen mit besonderem Flair", aboutText:"Wir möchten dir helfen, die Vielfalt Ägyptens mit klarer Planung und passenden Erlebnissen zu entdecken. Die endgültigen Reisedetails werden vor der Buchung bestätigt.", value1Title:"Klarheit und Transparenz", value1Text:"Reisedetails und Kosten vor der Bestätigung.", value2Title:"Dein Erlebnis zählt", value2Text:"Wir helfen dir, das Passende zu finden.", value3Title:"Ägypten entdecken", value3Text:"Vielfältige Orte und Erlebnisse im Land.", aboutBtn:"Planung beginnen",
      bookingEyebrow:"Dein erster Schritt", bookingTitle:"Planen wir deine nächste Reise", bookingText:"Fülle das Formular aus. Dein E-Mail-Programm öffnet eine vorbereitete Nachricht; die Daten werden nicht automatisch versendet.", bookingPoint1:"Wähle Ziel und Wunschtermin.", bookingPoint2:"Gib Reisendenzahl und Kontakt an.", bookingPoint3:"Prüfe die Nachricht vor dem Senden.", formTitle:"Reiseanfrage", formSubtitle:"Mit Stern markierte Felder sind Pflichtfelder", labelName:"Vollständiger Name *", labelEmail:"E-Mail-Adresse *", labelDestination:"Reiseziel *", chooseDestination:"Reiseziel auswählen", otherDestination:"Anderes Ziel in Ägypten", labelDate:"Wunschtermin", labelTravelers:"Anzahl der Reisenden", labelPhone:"Telefon (optional)", labelNotes:"Weitere Angaben", submitBtn:"E-Mail vorbereiten", formDisclaimer:"Hinweis: Das Formular bereitet eine E-Mail vor und bestätigt keine Buchung automatisch.",
      footerText:"Entdecke Ägypten und plane deine nächste Reise ganz einfach.", footerQuick:"Schnelllinks", footerContact:"Kontakt aufnehmen", footerLocation:"Reisen innerhalb Ägyptens", footerRights:"Alle Rechte vorbehalten", backTop:"Nach oben ↑",
      placeholderName:"Deinen Namen eingeben", placeholderNotes:"Weitere Angaben zu deiner Anfrage", msgReady:"Die Buchungsanfrage wurde im E-Mail-Programm vorbereitet. Bitte vor dem Senden prüfen.", msgNoEmail:"Kein Standard-E-Mail-Programm? Kopiere deine Angaben und sende sie per E-Mail."
    },
    ru: {
      brand:"Salama Travel", tagline:"Твоё путешествие начинается здесь", navHome:"Главная", navDestinations:"Направления", navServices:"Услуги", navAbout:"О нас", navBooking:"Забронировать",
      heroEyebrow:"Откройте магию Египта", heroTitle:"Египет прекраснее, чем вы думаете", heroText:"От пляжей Красного моря до сокровищ древней цивилизации — спланируйте следующую поездку с Salama Travel.", exploreBtn:"Выбрать направление", bookBtn:"Оставить заявку", heroNote:"Яркие впечатления в Египте и воспоминания надолго", heroCardTitle:"Места, которые стоит увидеть", heroCardText:"От моря до истории",
      statDest:"Интересные направления", statLocal:"Поездки по Египту", statSupport:"Ответы на вопросы",
      destEyebrow:"Выберите приключение", destTitle:"Направления Египта ждут вас", destIntro:"Откройте разнообразие Египта: море, природа и история.",
      typeSea:"Море и пляжи", typeHistory:"История и культура", typeNature:"Природа и спокойствие", typeCity:"Приморский город", typeCulture:"Культура и приключения",
      sharm:"Шарм-эш-Шейх", sharmText:"Чистая вода, коралловые рифы и оживлённая атмосфера.", hurghada:"Хургада", hurghadaText:"Морские прогулки и водные развлечения на Красном море.", luxor:"Луксор и Асуан", luxorText:"Храмы, памятники древности и прекрасный Нил.", siwa:"Оазис Сива", siwaText:"Уникальный оазис, источники и пустынные пейзажи.", alex:"Александрия", alexText:"Средиземное море, набережная и культурные достопримечательности.", cairo:"Каир и Гиза", cairoText:"Пирамиды и сочетание старого и современного города.", details:"Подробнее",
      servicesEyebrow:"Наши услуги", servicesTitle:"Мы заботимся о деталях", servicesIntro:"Понятное планирование и удобная связь от первого вопроса до конца поездки.", service1Title:"Планирование поездки", service1Text:"Помощь в выборе направления и программы.", service2Title:"Размещение", service2Text:"Информация о подходящих вариантах проживания.", service3Title:"Трансферы", service3Text:"Планирование трансферов по договорённости и наличию.", service4Title:"Поддержка и вопросы", service4Text:"Понятная связь перед бронированием.",
      aboutEyebrow:"О Salama Travel", aboutTitle:"Особенные путешествия по Египту", aboutText:"Мы помогаем открывать разные уголки Египта с понятным планированием и впечатлениями под ваши интересы. Окончательные детали поездки подтверждаются до бронирования.", value1Title:"Ясность и прозрачность", value1Text:"Детали и стоимость до подтверждения.", value2Title:"Ваши впечатления важны", value2Text:"Поможем подобрать подходящий вариант.", value3Title:"Откройте Египет", value3Text:"Разные места и впечатления в стране.", aboutBtn:"Начать планирование",
      bookingEyebrow:"Первый шаг", bookingTitle:"Спланируем вашу следующую поездку", bookingText:"Заполните форму, и почтовая программа откроет подготовленное письмо. Данные не отправляются автоматически.", bookingPoint1:"Выберите направление и дату.", bookingPoint2:"Укажите число путешественников и контакты.", bookingPoint3:"Проверьте письмо перед отправкой.", formTitle:"Заявка на поездку", formSubtitle:"Поля со звёздочкой обязательны", labelName:"Полное имя *", labelEmail:"Электронная почта *", labelDestination:"Направление *", chooseDestination:"Выберите направление", otherDestination:"Другое место в Египте", labelDate:"Желаемая дата", labelTravelers:"Количество путешественников", labelPhone:"Телефон (необязательно)", labelNotes:"Дополнительная информация", submitBtn:"Подготовить письмо", formDisclaimer:"Примечание: форма готовит письмо и не подтверждает бронирование автоматически.",
      footerText:"Откройте Египет и легко спланируйте следующую поездку.", footerQuick:"Быстрые ссылки", footerContact:"Связаться", footerLocation:"Поездки по Египту", footerRights:"Все права защищены", backTop:"Наверх ↑",
      placeholderName:"Введите имя", placeholderNotes:"Дополнительная информация о поездке", msgReady:"Письмо с заявкой подготовлено в почтовой программе. Проверьте его перед отправкой.", msgNoEmail:"Нет почтовой программы по умолчанию? Скопируйте данные и отправьте письмо вручную."
    }
  };

  const destinationLabels = {
    ar: ["شرم الشيخ", "الغردقة", "الأقصر وأسوان", "واحة سيوة", "الإسكندرية", "القاهرة والجيزة", "وجهة أخرى داخل مصر"],
    de: ["Sharm El-Sheikh", "Hurghada", "Luxor und Assuan", "Siwa-Oase", "Alexandria", "Kairo und Gizeh", "Anderes Ziel in Ägypten"],
    ru: ["Шарм-эш-Шейх", "Хургада", "Луксор и Асуан", "Оазис Сива", "Александрия", "Каир и Гиза", "Другое место в Египте"]
  };
  const destinationKeys = ["sharm", "hurghada", "luxor", "siwa", "alex", "cairo"];

  function applyLanguage(language) {
    const lang = translations[language] ? language : "ar";
    const dict = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = lang === "ar" ? "سلامة ترافيل | اكتشف مصر" : "Salama Travel | Discover Egypt";

    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (dict[key]) element.textContent = dict[key];
    });

    const nameInput = document.getElementById("fullName");
    const notesInput = document.getElementById("notes");
    nameInput.placeholder = dict.placeholderName;
    notesInput.placeholder = dict.placeholderNotes;

    // تحديث أسماء الوجهات في نموذج الحجز مع الحفاظ على الاختيار.
    const destinationSelect = document.getElementById("destination");
    const oldValue = destinationSelect.value;
    const options = destinationSelect.querySelectorAll("option");
    options.forEach((option, index) => {
      if (index === 0) option.textContent = dict.chooseDestination;
      else option.textContent = destinationLabels[lang][index - 1] || option.textContent;
    });
    if (oldValue) destinationSelect.value = oldValue;
    langSelect.value = lang;
  }

  let savedLanguage = "ar";
  try { savedLanguage = localStorage.getItem("salamaLanguage") || "ar"; } catch (error) {}
  applyLanguage(savedLanguage);
  langSelect.addEventListener("change", () => {
    applyLanguage(langSelect.value);
    try { localStorage.setItem("salamaLanguage", langSelect.value); } catch (error) {}
  });

  // أزرار "اعرف المزيد" تختار الوجهة في نموذج الحجز.
  document.querySelectorAll(".book-destination").forEach(link => {
    link.addEventListener("click", () => {
      const destinationArabic = link.dataset.destination;
      const options = [...document.getElementById("destination").options];
      const option = options.find(item => item.textContent === destinationArabic || item.value === destinationArabic);
      if (option) document.getElementById("destination").value = option.value || option.textContent;
    });
  });

  // يجهّز رسالة بريد؛ لا يرسل أو يؤكد حجزًا تلقائيًا.
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;

    const language = langSelect.value;
    const dict = translations[language];
    const data = new FormData(bookingForm);
    const labels = {
      ar: { subject: "طلب حجز رحلة - سلامة ترافيل", name: "الاسم", email: "البريد الإلكتروني", destination: "الوجهة", date: "التاريخ المفضل", travelers: "عدد المسافرين", phone: "الهاتف", notes: "تفاصيل إضافية" },
      de: { subject: "Reiseanfrage - Salama Travel", name: "Name", email: "E-Mail", destination: "Reiseziel", date: "Wunschtermin", travelers: "Reisende", phone: "Telefon", notes: "Weitere Angaben" },
      ru: { subject: "Заявка на поездку - Salama Travel", name: "Имя", email: "Электронная почта", destination: "Направление", date: "Желаемая дата", travelers: "Путешественники", phone: "Телефон", notes: "Дополнительная информация" }
    }[language];

    const destinationOption = document.getElementById("destination").selectedOptions[0];
    const values = [
      `${labels.name}: ${data.get("fullName")}`,
      `${labels.email}: ${data.get("email")}`,
      `${labels.destination}: ${destinationOption ? destinationOption.textContent : data.get("destination")}`,
      `${labels.date}: ${data.get("tripDate") || "-"}`,
      `${labels.travelers}: ${data.get("travelers")}`,
      `${labels.phone}: ${data.get("phone") || "-"}`,
      `${labels.notes}: ${data.get("notes") || "-"}`
    ];
    const subject = encodeURIComponent(labels.subject);
    const bodyText = encodeURIComponent(values.join("\n"));
    formMessage.textContent = dict.msgReady;
    window.location.href = `mailto:?subject=${subject}&body=${bodyText}`;
  });
});
