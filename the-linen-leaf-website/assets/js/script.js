document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("[data-nav]");
  const backTop = document.querySelector("[data-back-top]");

  const handleScroll = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);
    if (backTop) backTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backTop) backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Keep the mobile menu tidy after selecting a page.
  document.querySelectorAll("#mainNav .nav-link, #mainNav .social-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("mainNav");
      if (menu && menu.classList.contains("show")) {
        const toggle = document.querySelector(".navbar-toggler");
        if (toggle && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Collection filters
  const filters = document.querySelectorAll("[data-filter]");
  const products = document.querySelectorAll(".product-item");
  filters.forEach(btn => {
    btn.addEventListener("click", () => {
      filters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const selected = btn.dataset.filter;
      products.forEach(item => {
        const show = selected === "all" || item.dataset.category === selected;
        item.classList.toggle("hide", !show);
      });
    });
  });


  // Collection image lightbox
  const collectionModal = document.getElementById("collectionImageModal");
  if (collectionModal) {
    collectionModal.addEventListener("show.bs.modal", (event) => {
      const trigger = event.relatedTarget;
      if (!trigger) return;
      const image = document.getElementById("collectionModalImage");
      const title = document.getElementById("collectionModalTitle");
      image.src = trigger.dataset.image;
      image.alt = trigger.dataset.alt || trigger.dataset.title || "The Linen Leaf plant";
      title.textContent = trigger.dataset.title || "The Linen Leaf";
    });
    collectionModal.addEventListener("hidden.bs.modal", () => {
      const image = document.getElementById("collectionModalImage");
      image.removeAttribute("src");
    });
  }

  // Contact form prepares a WhatsApp message instead of pretending to submit to a server.
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const interest = document.getElementById("interest").value;
      const message = document.getElementById("message").value.trim();

      if (!name || !phone) {
        formMessage.textContent = "Please add your name and phone number.";
        return;
      }

      const text = `Hello The Linen Leaf!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AInterested in: ${encodeURIComponent(interest)}%0AMessage: ${encodeURIComponent(message || "I'd like to know more.")}`;
      formMessage.innerHTML = `Your enquiry is ready. <a href="https://wa.me/919998111338?text=${text}" target="_blank" rel="noopener"><strong>Open WhatsApp →</strong></a>`;
    });
  }
});
