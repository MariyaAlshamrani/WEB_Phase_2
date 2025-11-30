document.addEventListener("DOMContentLoaded", () => {

    /* 
        REQUEST A SERVICE 
   */
    const requestForm = document.getElementById("requestForm");

    if (requestForm) {
        const requestsList = document.getElementById("requestsList");

        requestForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = requestForm.name.value.trim();
            const service = requestForm.service.value;
            const dueDate = requestForm.due.value;
            const desc = requestForm.desc.value.trim();

            const nameRegex = /^[A-Za-z ]+$/;

            if (service === "select your service") {
                alert("Please select a service.");
                return;
            }

            if (!nameRegex.test(name) || name.split(" ").length < 2) {
                alert("Please enter a valid full name.");
                return;
            }

            const today = new Date();
            const due = new Date(dueDate);
            const minDate = new Date();
            minDate.setDate(today.getDate() + 14);

            if (!dueDate || due < minDate) {
                alert("Due date must be at least two weeks from today.");
                return;
            }

            if (desc.length < 100) {
                alert("Description must be at least 100 characters.");
                return;
            }

            const stay = confirm("Your request was sent!\nDo you want to stay on this page?");

            if (!stay) {
                window.location.href = "customer_dashboard.html";
                return;
            }

            const card = document.createElement("div");
            card.style.border = "1px solid #ccc";
            card.style.padding = "15px";
            card.style.marginTop = "12px";
            card.style.borderRadius = "8px";
            card.style.backgroundColor = "#f9f9f9";

            card.innerHTML = `
                <h4>Request Summary</h4>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Due Date:</strong> ${dueDate}</p>
                <p><strong>Description:</strong> ${desc}</p>
            `;

            requestsList.appendChild(card);

            requestForm.reset();
        });
    }





    /* 
        SERVICE EVALUATION — evalForm
     */
    const evalForm = document.getElementById("evalForm");

    if (evalForm) {
        evalForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const pastOrder = document.getElementById("past_order");
            const enjoy = document.getElementById("enjoy");
            const improve = document.getElementById("improve");
            const rating = document.querySelector("input[name='rate']:checked");

            pastOrder.classList.remove("error-border");
            enjoy.classList.remove("error-border");
            improve.classList.remove("error-border");

            let valid = true;

            if (pastOrder.value === "") {
                pastOrder.classList.add("error-border");
                valid = false;
            }

            if (!rating) {
                alert("Please select a rating.");
                valid = false;
            }

            if (enjoy.value.trim() === "") {
                enjoy.classList.add("error-border");
                valid = false;
            }

            if (improve.value.trim() === "") {
                improve.classList.add("error-border");
                valid = false;
            }

            if (!valid) {
                alert("Please fill all required fields.");
                return;
            }

            if (rating.value >= 4) {
                alert("Thank you! We're glad you enjoyed the service.");
            } else {
                alert("We are sorry! We will work to improve our service.");
            }

            window.location.href = "customer_dashboard.html";
        });
    }





    /* 
       3) PROFILE FORM — profileForm
  */
    const profileForm = document.getElementById("profileForm");

    if (profileForm) {

        const nameInput = document.getElementById("name");
        const dobInput = document.getElementById("dob");
        const emailInput = document.getElementById("email");
        const educationSelect = document.getElementById("education");
        const skillsInput = document.getElementById("skills");
        const expertiseInput = document.getElementById("expertise");
        const fileInput = document.getElementById("photo");

        profileForm.addEventListener("submit", function (e) {

            let errors = [];

            if (nameInput.value.trim() === "") errors.push("Please enter your name.");
            if (dobInput.value === "") errors.push("Please enter your date of birth.");
            if (emailInput.value.trim() === "" || !emailInput.value.includes("@"))
                errors.push("Please enter a valid email.");
            if (educationSelect.value === "") errors.push("Please select your education.");
            if (skillsInput.value.trim() === "") errors.push("Please enter your skills.");
            if (expertiseInput.value.trim() === "") errors.push("Please enter your area of expertise.");
            if (fileInput.files.length === 0) errors.push("Please upload your photo.");

            if (errors.length > 0) {
                e.preventDefault();
                alert(errors.join("\n"));
                return;
            }
        });

        const filePreview = document.createElement("img");
        filePreview.style.width = "120px";
        filePreview.style.marginTop = "10px";
        fileInput.parentNode.appendChild(filePreview);

        fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (file) {
                filePreview.src = URL.createObjectURL(file);
            }
        });

        const scrollBtn = document.createElement("button");
        scrollBtn.textContent = "↑";
        scrollBtn.style.position = "fixed";
        scrollBtn.style.bottom = "25px";
        scrollBtn.style.right = "25px";
        scrollBtn.style.padding = "10px 15px";
        scrollBtn.style.borderRadius = "50%";
        scrollBtn.style.fontSize = "18px";
        scrollBtn.style.border = "none";
        scrollBtn.style.cursor = "pointer";
        scrollBtn.style.display = "none";
        scrollBtn.style.background = "#a98aff";
        scrollBtn.style.color = "#fff";
        document.body.appendChild(scrollBtn);

        window.addEventListener("scroll", () => {
            scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
        });

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }





    /* 
       4) SERVICES SORTING — .services-grid
    */
    const sortSelect = document.getElementById("sort");
    const servicesGrid = document.querySelector(".services-grid");

    if (sortSelect && servicesGrid) {

        let cards = Array.from(servicesGrid.querySelectorAll(".service-card"));

        function getPrice(card) {
            const pText = card.innerText.toLowerCase();
            if (pText.includes("free")) return 0;
            const match = pText.match(/(\d+)\s*sar/);
            return match ? parseInt(match[1]) : 0;
        }

        function shuffle() {
            cards.sort(() => Math.random() - 0.5);
        }

        function render() {
            servicesGrid.innerHTML = "";
            cards.forEach(card => servicesGrid.appendChild(card));
        }

        shuffle();
        render();

        sortSelect.addEventListener("change", () => {
            const value = sortSelect.value;

            if (value === "default") shuffle();
            else if (value === "name") {
                cards.sort((a, b) =>
                    a.querySelector("h3").innerText.localeCompare(b.querySelector("h3").innerText)
                );
            }
            else if (value === "price-asc") cards.sort((a, b) => getPrice(a) - getPrice(b));
            else if (value === "price-desc") cards.sort((a, b) => getPrice(b) - getPrice(a));

            render();
        });
    }





    /* 
      INTEREST TEST — 
    */
    const interestForm = document.querySelector(".interest-form");
    const output = document.querySelector(".recommendation");

    if (interestForm) {
        interestForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const age = Number(document.querySelector(".age-select").value);
            const city = document.querySelector(".city-select").value;
            const place = document.querySelector("input[name='place']:checked")?.value;
            const type = document.querySelector("input[name='type']:checked")?.value;
            const level = document.querySelector("input[name='level']:checked")?.value;
            const time = document.querySelector(".time-select").value;
            const group = document.querySelector("input[name='group']:checked")?.value;
            const budget = document.querySelector(".budget-select").value;

            if (!age || !city || !type) {
                output.textContent = "Please select all required options.";
                return;
            }

            // ACTIVITIES LIST
            const activities = [
                // ENTERTAINMENT
                { name: "Boulevard World", city: "Riyadh", type: "Entertainment", place: "Outdoor", budget: "High (600-1000)", level: "Light", group: "Group", bestAge: 20 },
                { name: "Cinema Riyadh Park", city: "Riyadh", type: "Entertainment", place: "Indoor", budget: "Medium (300-600)", level: "Light", group: "Group", bestAge: 18 },
                { name: "VR Gaming Arena", city: "Jeddah", type: "Entertainment", place: "Indoor", budget: "Medium (300-600)", level: "Moderate", group: "Group", bestAge: 16 },
                { name: "Mall of Arabia Fun Zone", city: "Jeddah", type: "Entertainment", place: "Indoor", budget: "Low (100-300)", level: "Light", group: "Group", bestAge: 15 },

                // SPORTS
                { name: "Hiking – Wadi Hanifa", city: "Riyadh", type: "Sports", place: "Outdoor", budget: "Low (100-300)", level: "Adventurous", group: "Group", bestAge: 22 },
                { name: "Kayaking – Obhur Beach", city: "Jeddah", type: "Sports", place: "Outdoor", budget: "Medium (300-600)", level: "Moderate", group: "Group", bestAge: 25 },
                { name: "Climbing Gym – Gravity", city: "Dammam", type: "Sports", place: "Indoor", budget: "Medium (300-600)", level: "Adventurous", group: "Solo", bestAge: 20 },
                { name: "Running Track – Dammam Corniche", city: "Dammam", type: "Sports", place: "Outdoor", budget: "Low (100-300)", level: "Light", group: "Solo", bestAge: 30 },

                // CULTURAL
                { name: "National Museum Riyadh", city: "Riyadh", type: "Cultural", place: "Indoor", budget: "Low (100-300)", level: "Light", group: "Group", bestAge: 35 },
                { name: "Historic Jeddah Tour", city: "Jeddah", type: "Cultural", place: "Outdoor", budget: "Low (100-300)", level: "Moderate", group: "Group", bestAge: 28 },
                { name: "Dammam Heritage Village", city: "Dammam", type: "Cultural", place: "Outdoor", budget: "Low (100-300)", level: "Light", group: "Group", bestAge: 40 },
                { name: "Art Gallery Visit", city: city, type: "Cultural", place: "Indoor", budget: budget, level: "Light", group: group, bestAge: age }
            ];

            let filtered = activities.filter(a => a.type === type);

            filtered = filtered.filter(a =>
                a.city === city &&
                (place ? a.place === place : true) &&
                (level ? a.level === level : true) &&
                (group ? a.group === group : true) &&
                (budget ? a.budget === budget : true)
            );

            if (filtered.length === 0) {
                const suggestion = activities.find(a => a.type === type)?.name;
                output.innerHTML = `<b>${suggestion}</b><p class="match-note">We hope this activity matches your interests 🤍</p>`;
                return;
            }

            let best = null;
            let bestScore = -999;

            filtered.forEach(a => {
                let score = 0;

                if (a.city === city) score += 4;
                if (a.place === place) score += 3;
                if (a.budget === budget) score += 2;
                if (a.level === level) score += 2;
                if (a.group === group) score += 2;

                const diff = Math.abs(a.bestAge - age);
                if (diff < 10) score += 4;
                else if (diff < 20) score += 2;

                if (score > bestScore) {
                    bestScore = score;
                    best = a.name;
                }
            });

            output.innerHTML = `<b>${best}</b><p class="match-note">We hope this activity matches your interests 🤍</p>`;
        });
    }





    /* 
       6) CUSTOMER SUPPORT FORM — supportForm
 */
    const supportForm = document.querySelector(".support-form");

    if (supportForm) {
        supportForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.querySelector(".s-name").value.trim();
            const email = document.querySelector(".s-email").value.trim();
            const msg = document.getElementById("message").value.trim();

            if (!name || !email || !msg) return;

            document.getElementById("supportSuccess").classList.add("show");

            setTimeout(() => {
                document.getElementById("supportSuccess").classList.remove("show");
            }, 3000);

            supportForm.reset();
        });
    }





    /* 
       7) VOLUNTEER FORM — vForm
     */
    const vForm = document.querySelector(".volunteer-form");

    if (vForm) {
        vForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.querySelector(".v-name").value.trim();
            const age = document.querySelector(".v-age").value.trim();
            const email = document.querySelector(".v-email").value.trim();
            const city = document.querySelector(".v-city").value;
            const type = document.querySelector("input[name='type']:checked");
            const time = document.querySelector("input[name='time']:checked");
            const availability = document.querySelector("input[name='availability']:checked");

            if (!name || !age || !email || !type || !time || !availability) return;

            document.getElementById("volunteerSuccess").classList.add("show");

            setTimeout(() => {
                document.getElementById("volunteerSuccess").classList.remove("show");
            }, 3000);

            vForm.reset();
        });
    }





    /* 
       CHARACTER COUNTER — #message
    */
    const msg = document.getElementById("message");
    const counter = document.getElementById("charCount");

    if (msg && counter) {
        counter.textContent = "0 / 300";

        msg.addEventListener("input", () => {
            counter.textContent = `${msg.value.length} / 300`;
        });
    }

});

/* ==========================
THEME SWITCHER (Home page buttons)
========================== */
const body = document.body;
const darkBtn = document.getElementById("darkBtn");
const lightBtn = document.getElementById("lightBtn");

// default: dark theme
if (darkBtn && lightBtn) {
darkBtn.onclick = () => {
body.classList.remove("light-theme");
localStorage.setItem("theme", "dark");
};
lightBtn.onclick = () => {
body.classList.add("light-theme");
localStorage.setItem("theme", "light");
};
}

// load saved theme for ALL pages
const savedTheme = localStorage.getItem("theme");
if (!savedTheme || savedTheme === "dark") {
body.classList.remove("light-theme");
}
else if (savedTheme === "light") {
body.classList.add("light-theme");
}
/* ==========================
BACK TO TOP BUTTON
========================== */
let topBtn = document.createElement("button");
topBtn.id = "backTop";
topBtn.innerText = "↑";
document.body.appendChild(topBtn);

topBtn.style.cssText = `
position: fixed; bottom: 30px; right: 30px;
padding: 12px 17px; font-size: 22px;
border-radius: 50%; border: none;
background: #9b6fff; color: white;
cursor: pointer; display:none; z-index:999999;
`;

window.addEventListener("scroll", () => {
topBtn.style.display = window.scrollY > 350 ? "block" : "none";
});

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ==========================
REAL-TIME CLOCK (Footer)
========================== */
function updateClock() {
const clock = document.getElementById("clock");
if (!clock) return;
clock.textContent = new Date().toLocaleTimeString();
}
updateClock();
setInterval(updateClock, 1000);

/* ==========================
FAVORITES SYSTEM (sessionStorage)
========================== */
function loadFavorites() {
return JSON.parse(sessionStorage.getItem("favorites") || "[]");
}
function saveFavorites(list) {
sessionStorage.setItem("favorites", JSON.stringify(list));
}

// hearts in HOME
document.querySelectorAll(".fav").forEach(btn => {
const card = btn.closest(".project-card");
if (!card) return;

const name = card.querySelector("h3").innerText;

// if already in favorites → active + full heart
if (loadFavorites().some(x => x.name === name)) {
btn.classList.add("active");
btn.textContent = "♥";
}

btn.addEventListener("click", () => {
const img = card.querySelector("img").src;
const desc = card.querySelector("p").innerText;

let favorites = loadFavorites();
const exists = favorites.find(x => x.name === name);

if (exists) {
// remove
favorites = favorites.filter(x => x.name !== name);
btn.classList.remove("active");
btn.textContent = "♡";
} else {
// add
favorites.push({ name, img, desc });
btn.classList.add("active");
btn.textContent = "♥";
}

saveFavorites(favorites);
renderProfileFavorites();
});
});

// render favorites in PROFILE
function renderProfileFavorites() {
const container = document.querySelector(".profile-right");
if (!container) return;

const favorites = loadFavorites();

container.innerHTML = `<h2 class="saved-title">Saved Projects 🔖</h2>`;

if (favorites.length === 0) {
container.innerHTML += `<p class="empty">No saved projects yet.</p>`;
return;
}

favorites.forEach(item => {
container.innerHTML += `
<div class="saved-card">
<img src="${item.img}">
<div>
<h3>${item.name}</h3>
<p>${item.desc}</p>
</div>
</div>
`;
});
}
renderProfileFavorites();

/* ==========================
SEARCH + FILTER (Home)
========================== */
const searchInput = document.querySelector(".search");
const filterBtns = document.querySelectorAll(".filters button");
const cards = document.querySelectorAll(".project-card");

let currentCategory = "all";

const categoryMap = {
tourism: ["red sea", "alula", "riyadh art", "qiddiya"],
heritage: ["diriyah gate", "alula"],
economy: ["neom", "the line", "green riyadh"],
nature: ["red sea", "green riyadh", "alula"],
futuristic: ["neom", "the line", "riyadh art", "qiddiya"]
};

function applyFilters() {
if (!cards.length) return;

const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

cards.forEach(card => {
const title = card.querySelector("h3").innerText.toLowerCase();
const desc = card.querySelector("p").innerText.toLowerCase();

// category filter
let inCategory = true;
if (currentCategory !== "all") {
const list = categoryMap[currentCategory] || [];
inCategory = list.some(key => title.includes(key));
}

// search filter
let inSearch = true;
if (searchTerm) {
inSearch = title.includes(searchTerm);
}

card.style.display = (inCategory && inSearch) ? "block" : "none";
});
}

// search typing
if (searchInput) {
searchInput.addEventListener("input", applyFilters);
}

// filter buttons
filterBtns.forEach(btn => {
btn.addEventListener("click", () => {
const text = btn.innerText.toLowerCase();
currentCategory = text; // "all" or tourism, heritage.. etc
applyFilters();
});
});

/* ==========================
MAP → CLICK → OPEN PAGE
========================== */
document.querySelectorAll(".pin").forEach(pin => {
pin.addEventListener("click", () => {
const name = pin.dataset.name;

const page = {
"NEOM": "project-neom.html",
"Qiddiya": "project-Qiddiya.html",
"Red Sea": "project-RedSea.html",
"AlUla": "project-alUla.html",
"The Line": "project-TheLine.html",
"Diriyah Gate": "project-Diriyah.html",
"Green Riyadh": "project-Griyadh.html",
"Riyadh Art": "project-RiyadhArt.html"
}[name];

if (page) window.location.href = page;
});
});

/* ==========================
PROFILE — EDIT INFO (popup)
========================== */
document.querySelectorAll(".edit-btn").forEach(btn => {
btn.addEventListener("click", () => {
const container = document.querySelector(".profile-container");
if (!container) return;

const nameEl = container.querySelector(".profile-name");
const emailEl = container.querySelector(".profile-email");
const phoneEl = container.querySelector(".profile-phone");

const currentName = nameEl ? nameEl.innerText : "";
const currentEmail = emailEl ? emailEl.innerText : "";
const currentPhone = phoneEl ? phoneEl.innerText : "";

const popup = document.createElement("div");
popup.className = "edit-popup";
popup.innerHTML = `
<div class="popup-box">
<h2>Edit Info</h2>

<label for="editName">Name</label>
<input type="text" id="editName" value="${currentName}">

<label for="editEmail">Email</label>
<input type="email" id="editEmail" value="${currentEmail}">

<label for="editPhone">Phone</label>
<input type="text" id="editPhone" value="${currentPhone}">

<div class="popup-actions">
<button id="cancelEdit">Cancel</button>
<button id="saveEdit">Save</button>
</div>
</div>
`;
document.body.appendChild(popup);

const saveBtn = document.getElementById("saveEdit");
const cancelBtn = document.getElementById("cancelEdit");

saveBtn.onclick = () => {
const newName = document.getElementById("editName").value;
const newEmail = document.getElementById("editEmail").value;
const newPhone = document.getElementById("editPhone").value;

if (nameEl) nameEl.innerText = newName || currentName;
if (emailEl) emailEl.innerText = newEmail || currentEmail;
if (phoneEl) phoneEl.innerText = newPhone || currentPhone;

popup.remove();
};

cancelBtn.onclick = () => {
popup.remove();
};
});
});


