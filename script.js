const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = navMenu.querySelectorAll("a");

const testimonialItems = document.querySelectorAll(".testimonial");
const prevBtn = document.getElementById("prevTestimonial");
const nextBtn = document.getElementById("nextTestimonial");

const contactForm = document.getElementById("contactForm");
const yearEl = document.getElementById("year");

let activeTestimonial = 0;
let testimonialTimer;

function setNavScrolled() {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

function closeMobileMenu() {
  navMenu.classList.remove("open");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
}

function openMobileMenu() {
  navMenu.classList.add("open");
  navToggle.classList.add("active");
  navToggle.setAttribute("aria-expanded", "true");
}

function toggleMobileMenu() {
  if (navMenu.classList.contains("open")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function showTestimonial(index) {
  testimonialItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

function nextTestimonial() {
  activeTestimonial = (activeTestimonial + 1) % testimonialItems.length;
  showTestimonial(activeTestimonial);
}

function prevTestimonial() {
  activeTestimonial =
    (activeTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
  showTestimonial(activeTestimonial);
}

function startTestimonialAutoplay() {
  testimonialTimer = setInterval(nextTestimonial, 5000);
}

function resetTestimonialAutoplay() {
  clearInterval(testimonialTimer);
  startTestimonialAutoplay();
}

function setError(input, message) {
  const formGroup = input.closest(".form-group");
  const small = formGroup.querySelector(".error-message");
  formGroup.classList.add("error");
  small.textContent = message;
}

function clearError(input) {
  const formGroup = input.closest(".form-group");
  const small = formGroup.querySelector(".error-message");
  formGroup.classList.remove("error");
  small.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  let valid = true;

  if (!name.value.trim()) {
    setError(name, "Name is required.");
    valid = false;
  } else {
    clearError(name);
  }

  if (!email.value.trim()) {
    setError(email, "Email is required.");
    valid = false;
  } else if (!isValidEmail(email.value.trim())) {
    setError(email, "Please enter a valid email address.");
    valid = false;
  } else {
    clearError(email);
  }

  if (!message.value.trim()) {
    setError(message, "Message is required.");
    valid = false;
  } else if (message.value.trim().length < 10) {
    setError(message, "Message should be at least 10 characters.");
    valid = false;
  } else {
    clearError(message);
  }

  return valid;
}

navToggle.addEventListener("click", toggleMobileMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 900) {
      closeMobileMenu();
    }
  });
});

document.addEventListener("click", (event) => {
  const isClickInsideMenu = navMenu.contains(event.target);
  const isClickToggle = navToggle.contains(event.target);

  if (!isClickInsideMenu && !isClickToggle && navMenu.classList.contains("open")) {
    closeMobileMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) {
    closeMobileMenu();
  }
});

window.addEventListener("scroll", setNavScrolled);
setNavScrolled();

nextBtn.addEventListener("click", () => {
  nextTestimonial();
  resetTestimonialAutoplay();
});

prevBtn.addEventListener("click", () => {
  prevTestimonial();
  resetTestimonialAutoplay();
});

showTestimonial(activeTestimonial);
startTestimonialAutoplay();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const successMessage = document.getElementById("formSuccess");

  if (validateForm()) {
    successMessage.textContent = "Thank you. Your message has been sent successfully.";
    contactForm.reset();
    const formGroups = contactForm.querySelectorAll(".form-group");
    formGroups.forEach((group) => group.classList.remove("error"));
    const errorTexts = contactForm.querySelectorAll(".error-message");
    errorTexts.forEach((errorText) => {
      errorText.textContent = "";
    });
  } else {
    successMessage.textContent = "";
  }
});

yearEl.textContent = new Date().getFullYear();
