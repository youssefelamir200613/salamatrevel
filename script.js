
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");

  // قائمة الموبايل
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // الوضع الليلي
  const savedTheme = localStorage.getItem("salamaTheme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️" : "🌙";
    localStorage.setItem("salamaTheme", darkMode ? "dark" : "light");
  });

  // تأثير ظهور العناصر عند التمرير
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // تاريخ السنة الحالية
  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  // منع اختيار تاريخ سابق
  const travelDate = document.getElementById("travelDate");
  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

  travelDate.min = localToday;

  // أزرار الحجز داخل بطاقات الرحلات
  document.querySelectorAll(".book-trip").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById("destination").value =
        button.dataset.destination;

      document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // إرسال النموذج إلى Formspree
  const formspreeEndpoint = "https://formspree.io/f/xgaoqbly";

  async function sendForm(form, statusElement, successMessage) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    statusElement.textContent = "";
    statusElement.style.color = "";

    if (!form.reportValidity()) return;

    submitButton.disabled = true;
    submitButton.textContent = "جارٍ الإرسال...";

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        let errorMessage = "تعذر إرسال الرسالة. حاول مرة أخرى.";

        try {
          const result = await response.json();
          if (result.errors) {
            errorMessage = result.errors
              .map(error => error.message)
              .join(" ");
          }
        } catch (_) {}

        throw new Error(errorMessage);
      }

      statusElement.textContent = successMessage;
      statusElement.style.color = "#16803d";
      form.reset();

    } catch (error) {
      statusElement.textContent =
        error.message || "حدث خطأ في الاتصال. حاول مرة أخرى.";
      statusElement.style.color = "#d62828";

    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  document.getElementById("bookingForm").addEventListener("submit", event => {
    event.preventDefault();

    sendForm(
      event.currentTarget,
      document.getElementById("bookingStatus"),
      "تم إرسال طلب الحجز بنجاح! سنتواصل معك."
    );
  });

  document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    sendForm(
      event.currentTarget,
      document.getElementById("contactStatus"),
      "تم إرسال رسالتك بنجاح، شكرًا لتواصلك مع سلامة ترافيل!"
    );
  });
});
