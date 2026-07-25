const portfolioItems = [
    {
        id: 1,
        title: "Cozinha Moderna",
        category: "cozinha",
        image: "Fotos/cozinha.jpeg"
    },
    {
        id: 2,
        title: "Banheiro",
        category: "banheiro",
        image: "Fotos/banheiro.jpeg"
    },
    {
        id: 3,
        title: "Cozinha Gourmet Externa",
        category: "area",
        image: "Fotos/area.jpeg"
    },
    {
        id: 4,
        title: "Sala de Estar",
        category: "ferro",
        image: "Fotos/teste.jpeg"
    },
    {
        id: 5,
        title: "Sala de Reunião",
        category: "escritorio",
        image: "Fotos/escritorio.jpeg"
    },
    {
        id: 6,
        title: "Área de Churrasco Planejada",
        category: "area",
        image: "Fotos/area2.jpeg"
    },
    {
        id: 7,
        title: "Cozinha Planejada",
        category: "cozinha",
        image: "Fotos/cozinha3.jpeg"
    },
    {
        id: 8,
        title: "Painel para Sala com Torre Quente",
        category: "ferro",
        image: "Fotos/torre_sala.jpeg"
    },

    {
        id: 9,
        title: "Cozinha Branca Planejada",
        category: "cozinha",
        image: "Fotos/cozinhabranca.jpeg"
    },

];

function renderGallery(filter = "all") {
    const galleryContainer = document.getElementById("gallery-container");
    if (!galleryContainer) return;

    const filteredItems = filter === "all"
        ? portfolioItems
        : portfolioItems.filter(item => item.category === filter);

    if (filteredItems.length === 0) {
        galleryContainer.innerHTML = `<p style="grid-column:1/-1; text-align:center;">Nenhum projeto encontrado nesta categoria.</p>`;
        return;
    }

    let cardsHTML = "";
    filteredItems.forEach(item => {
        cardsHTML += `
            <div class="card" data-category="${item.category}">
                <img class="card-img" src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="card-content">
                    <div class="card-category">${item.category === "cozinha" ? "Cozinhas" : item.category === "banheiro" ? "Banheiros" : item.category === "area" ? "Área de Lazer" : item.category === "sala" ? "Salas" : item.category === "escritorio" ? "Escritórios" : item.category === "ferro" ? "Ferro & Led" : "cozinhas"}</div>
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-desc">${item.desc}</p>
                </div>
            </div>
        `;
    });
    galleryContainer.innerHTML = cardsHTML;
}

function initFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            // Remove active de todos
            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            const filterValue = this.getAttribute("data-filter");
            renderGallery(filterValue);
        });
    });
}

function initMobileMenu() {
    const mobileBtn = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            // Ícone alternativo (opcional)
            const icon = mobileBtn.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");
                } else {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#" || targetId === "") return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });
}

function criarCarrossel(idImagem, imagens, tempo = 3000) {

    const img = document.getElementById(idImagem);
    const dotsContainer = document.getElementById("heroDots");

    let indice = 0;

    // cria as bolinhas
    imagens.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("hero-dot");

        if (i === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            indice = i;
            atualizar();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".hero-dot");

    function atualizar() {
        img.src = imagens[indice];

        dots.forEach(dot => dot.classList.remove("active"));
        dots[indice].classList.add("active");
    }

    setInterval(() => {
        indice = (indice + 1) % imagens.length;
        atualizar();
    }, tempo);
}


document.addEventListener("DOMContentLoaded", () => {
    renderGallery("all");
    initFilters();
    initMobileMenu();
    initSmoothScroll();

    criarCarrossel("heroFoto", [
        "Fotos/home.jpeg",
        "Fotos/area2.jpeg",
        "Fotos/cozinha.jpeg",
        "Fotos/cozinha3.jpeg",
        "Fotos/cozinhabranca.jpeg",
        "Fotos/area.jpeg",
        "Fotos/teste.jpeg"
    ], 3000);
});

