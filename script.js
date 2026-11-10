const portfolioItems = [
    {
        id: 1,
        title: "Cozinha Moderna",
        category: "cozinha",
        images: [
            "Fotos/cozinhaModerna.jpeg",
            "Fotos/cozinhaModerna1.jpeg",
            "Fotos/cozinhaModerna2.jpeg",
            "Fotos/cozinhaModerna3.jpeg",
            "Fotos/cozinhaModerna4.jpeg"
        ]
    },
    {
        id: 2,
        title: "Banheiro",
        category: "banheiro",
        images: [
            "Fotos/banheiro.jpeg",
            "Fotos/banheiro1.jpeg",
            "Fotos/banheiro2.jpeg",
        ]   
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
        category: ["sala", "ferro"],
        images: ["Fotos/salaLed.jpeg",
            "Fotos/salaLed1.jpeg",
            "Fotos/salaLed2.jpeg",
            "Fotos/salaLed3.jpeg"
        ]
    },
    {
        id: 5,
        title: "Sala de Reunião",
        category: ["escritorio", "ferro"],
        images: ["Fotos/escritorio.jpeg",
            "Fotos/escritorio2.jpeg",
        ]
    },
    {
        id: 6,
        title: "Área de Churrasco Planejada",
        category: "area",
        images: ["Fotos/areaChurrasco.jpeg",
            "Fotos/areaChurrasco1.jpeg",
            "Fotos/areaChurrasco2.jpeg",
            "Fotos/areaChurrasco3.jpeg"
        ]
    },
    {
        id: 7,
        title: "Cozinha Planejada",
        category: ["cozinha","ferro"],
        images: ["Fotos/cozinha3.jpeg"]
    },
    {
        id: 8,
        title: "Painel para Sala com Torre Quente",
        category: ["sala", "ferro"],
        images: ["Fotos/torre_sala.jpeg",
            "Fotos/torre_sala1.jpeg",
            "Fotos/torre_sala2.jpeg"
        ]
    },

    {
        id: 9,
        title: "Cozinha Branca Planejada",
        category: "cozinha",
        images: ["Fotos/cozinhabranca.jpeg",
            "Fotos/cozinhabranca1.jpeg",
            //"Fotos/cozinhabranca2.jpeg"
        ]
    },

];

function renderGallery(filter = "all") {
    const galleryContainer = document.getElementById("gallery-container");
    if (!galleryContainer) return;

    const filteredItems = filter === "all"
        ? portfolioItems
        : portfolioItems.filter(item => {
            if (Array.isArray(item.category)) {
                return item.category.includes(filter);
            }
            return item.category === filter;
        });

    if (filteredItems.length === 0) {
        galleryContainer.innerHTML = `<p style="grid-column:1/-1; text-align:center;">Nenhum projeto encontrado nesta categoria.</p>`;
        return;
    }

    // Mapeamento de categorias para exibição
    const categoryLabels = {
        cozinha: "Cozinhas",
        banheiro: "Banheiros",
        area: "Área de Lazer",
        sala: "Salas",
        escritorio: "Escritórios",
        ferro: "Ferro & Led"
    };

    let cardsHTML = "";
    filteredItems.forEach(item => {
        // Formata a(s) categoria(s) para exibição
        const categories = Array.isArray(item.category) ? item.category : [item.category];
        const categoryDisplay = categories.map(cat => categoryLabels[cat] || cat).join(", ");
        const dataCategory = Array.isArray(item.category) ? item.category.join(",") : item.category;
        const imagemInicial = item.images ? item.images[0] : item.image;

       cardsHTML += `
    <div class="card" data-category="${dataCategory}">

        <div class="card-image-container">

            <img 
                id="projeto-img-${item.id}"
                class="card-img" 
                src="${imagemInicial}" 
                alt="${item.title}" 
                loading="lazy"
            >

            ${item.images && item.images.length > 1 ? `
                <button 
                    class="card-arrow card-arrow-prev"
                    data-prev="projeto-img-${item.id}"
                    aria-label="Imagem anterior"
                >
                    ❮
                </button>

                <button 
                    class="card-arrow card-arrow-next"
                    data-next="projeto-img-${item.id}"
                    aria-label="Próxima imagem"
                >
                    ❯
                </button>

                <div 
                    id="dots-${item.id}" 
                    class="card-dots"
                ></div>
            ` : ''}

        </div>

        <div class="card-content">
            <div class="card-category">${categoryDisplay}</div>
            <h3 class="card-title">${item.title}</h3>
            <p class="card-desc">${item.desc || ''}</p>
        </div>

    </div>
`;
    });
    galleryContainer.innerHTML = cardsHTML;
    filteredItems.forEach(item => {
    if (item.images && item.images.length > 1) {
        criarCarrosselCard(
            `projeto-img-${item.id}`,
            item.images,
            `dots-${item.id}`
        );
    }
});
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
        "Fotos/areaChurrasco.jpeg",
        "Fotos/cozinha.jpeg",
        "Fotos/cozinha3.jpeg",
        "Fotos/cozinhabranca.jpeg",
        "Fotos/area.jpeg",
        "Fotos/banheiro.jpeg"
    ], 3000);
});

function criarCarrosselCard(idImagem, imagens, idDots) {
    const img = document.getElementById(idImagem);
    const dotsContainer = document.getElementById(idDots);
    const btnAnterior = document.querySelector(`[data-prev="${idImagem}"]`);
    const btnProximo = document.querySelector(`[data-next="${idImagem}"]`);

    if (!img || !dotsContainer || !btnAnterior || !btnProximo) return;

    let indice = 0;

    // Criar as bolinhas
    imagens.forEach((_, i) => {
        const dot = document.createElement("span");

        dot.classList.add("card-dot");

        if (i === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
            indice = i;
            atualizarImagem();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".card-dot");

    function atualizarImagem() {
        img.src = imagens[indice];

        dots.forEach(dot => dot.classList.remove("active"));
        dots[indice].classList.add("active");
    }

    // Foto anterior
    btnAnterior.addEventListener("click", () => {
        indice--;

        if (indice < 0) {
            indice = imagens.length - 1;
        }

        atualizarImagem();
    });

    // Próxima foto
    btnProximo.addEventListener("click", () => {
        indice++;

        if (indice >= imagens.length) {
            indice = 0;
        }

        atualizarImagem();
    });
}

