const faqData = [
  { question: "How do I reset my password?", answer: "Go to settings and click 'Reset Password'.", category: "technical" },
  { question: "How to contact support?", answer: "Email us at support@example.com.", category: "general" },
  { question: "What are your billing cycles?", answer: "We offer monthly and annual billing options.", category: "billing" }
];

const faqList = document.getElementById("faqList");
const searchBar = document.getElementById("searchBar");
const categoryButtons = document.querySelectorAll(".category-btn");

// Render FAQs
function renderFAQs(filterCategory = "all", searchQuery = "") {
  faqList.innerHTML = "";
  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = filterCategory === "all" || faq.category === filterCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredFAQs.length === 0) {
    faqList.innerHTML = "<p>No FAQs found.</p>";
    return;
  }

  filteredFAQs.forEach(faq => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    const faqQuestion = document.createElement("div");
    faqQuestion.classList.add("faq-question");
    faqQuestion.textContent = faq.question;

    const faqAnswer = document.createElement("div");
    faqAnswer.classList.add("faq-answer");
    faqAnswer.textContent = faq.answer;

    faqQuestion.addEventListener("click", () => {
      faqAnswer.style.display = faqAnswer.style.display === "none" || faqAnswer.style.display === "" ? "block" : "none";
    });

    faqItem.appendChild(faqQuestion);
    faqItem.appendChild(faqAnswer);
    faqList.appendChild(faqItem);
  });
}

// Search Functionality
searchBar.addEventListener("input", () => {
  renderFAQs(getActiveCategory(), searchBar.value);
});

// Filter by Category
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderFAQs(button.dataset.category, searchBar.value);
  });
});

// Get Active Category
function getActiveCategory() {
  return document.querySelector(".category-btn.active").dataset.category;
}

// Initial Render
renderFAQs();