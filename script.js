const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");


// MENÚ PARA CELULARES

menuButton.addEventListener("click", () => {

    nav.classList.toggle("active");

    const icon = menuButton.querySelector("i");

    if (nav.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


// FORMULARIO HACIA WHATSAPP

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const company = document.getElementById("company").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const whatsappNumber = "5490000000000";

    const whatsappMessage = `
Hola Walter.

Mi nombre es ${name}.
Empresa: ${company || "No indicada"}.
Correo: ${email}.

Consulta:
${message}
    `.trim();

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=` +
        encodeURIComponent(whatsappMessage);

    formMessage.textContent =
        "Abriendo WhatsApp para enviar la consulta...";

    window.open(whatsappUrl, "_blank");

});


// AÑO AUTOMÁTICO

currentYear.textContent = new Date().getFullYear();


// ANIMACIONES AL HACER SCROLL

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// CONTADORES ANIMADOS

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

const statsSection = document.querySelector(".stats-section");

const countersObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting && !countersStarted) {

                countersStarted = true;

                counters.forEach((counter) => {

                    const target = Number(
                        counter.getAttribute("data-target")
                    );

                    let current = 0;

                    const duration = 1500;
                    const intervalTime = 30;
                    const totalSteps = duration / intervalTime;
                    const increment = target / totalSteps;

                    const timer = setInterval(() => {

                        current += increment;

                        if (current >= target) {

                            counter.textContent = target;
                            clearInterval(timer);

                        } else {

                            counter.textContent = Math.floor(current);

                        }

                    }, intervalTime);

                });

            }

        });

    },
    {
        threshold: 0.4
    }
);

if (statsSection) {
    countersObserver.observe(statsSection);
}
// IMAGEN DE RESPALDO SI FALTA ALGÚN ARCHIVO

const siteImages = document.querySelectorAll("img");

siteImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.display = "none";

        const parent = image.parentElement;

        parent.classList.add("image-error");

        if (!parent.querySelector(".image-error-message")) {

            const message = document.createElement("div");

            message.className = "image-error-message";

            message.innerHTML = `
                <i class="fa-solid fa-image"></i>
                <span>Agregar imagen</span>
            `;

            parent.appendChild(message);

        }

    });

});