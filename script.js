const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav a");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const currentYear = document.getElementById("currentYear");


// MENÚ MOBILE

if (menuButton && nav) {

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

}


// CERRAR MENÚ AL TOCAR UN LINK

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        const icon = menuButton.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


// FORMULARIO HACIA WHATSAPP

if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();

        const company = document
            .getElementById("company")
            .value
            .trim();

        const service = document
            .getElementById("service")
            .value;

        const email = document
            .getElementById("email")
            .value
            .trim();

        const message = document
            .getElementById("message")
            .value
            .trim();


        // NÚMERO DE WHATSAPP WMSI

        const whatsappNumber = "542996052334";


        const whatsappMessage = `
Hola WMSI Soluciones.

Mi nombre es ${name}.

Empresa / emprendimiento:
${company || "No indicado"}

Servicio de interés:
${service}

Correo:
${email}

Consulta:
${message}
        `.trim();


        const whatsappUrl =
            `https://wa.me/${whatsappNumber}?text=` +
            encodeURIComponent(whatsappMessage);


        if (formMessage) {

            formMessage.textContent =
                "Abriendo WhatsApp para enviar tu consulta...";

        }


        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

    });

}


// AÑO AUTOMÁTICO

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


// ANIMACIONES AL HACER SCROLL

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("visible");

    });

}


// CONTADORES ANIMADOS

const counters =
    document.querySelectorAll(".counter");

const statsSection =
    document.querySelector(".stats-section");

let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach((counter) => {

        const target =
            Number(
                counter.getAttribute("data-target")
            );


        let current = 0;

        const duration = 1500;

        const intervalTime = 30;

        const totalSteps =
            duration / intervalTime;

        const increment =
            target / totalSteps;


        const timer = setInterval(() => {

            current += increment;


            if (current >= target) {

                counter.textContent =
                    target;

                clearInterval(timer);

            } else {

                counter.textContent =
                    Math.floor(current);

            }

        }, intervalTime);

    });

}


if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const countersObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        startCounters();

                        countersObserver
                            .unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.35
            }

        );


    countersObserver
        .observe(statsSection);

} else {

    startCounters();

}


// IMAGEN DE RESPALDO

const siteImages =
    document.querySelectorAll("img");


siteImages.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.style.display =
                "none";


            const parent =
                image.parentElement;


            if (!parent) {
                return;
            }


            parent.classList
                .add("image-error");


            if (
                !parent.querySelector(
                    ".image-error-message"
                )
            ) {

                const message =
                    document.createElement("div");


                message.className =
                    "image-error-message";


                message.innerHTML = `
                    <i class="fa-solid fa-image"></i>
                    <span>Imagen próximamente</span>
                `;


                parent.appendChild(message);

            }

        }
    );

});