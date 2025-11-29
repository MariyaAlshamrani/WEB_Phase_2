document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const dobInput = document.getElementById("dob");
    const emailInput = document.getElementById("email");
    const educationSelect = document.getElementById("education");
    const skillsInput = document.getElementById("skills");
    const expertiseInput = document.getElementById("expertise");
    const fileInput = document.getElementById("photo");

    form.addEventListener("submit", function (e) {
        let errors = [];

        if (nameInput.value.trim() === "") {
            errors.push("Please enter your name.");
        }

        if (dobInput.value === "") {
            errors.push("Please enter your date of birth.");
        }

        if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
            errors.push("Please enter a valid email.");
        }

        if (educationSelect.value === "") {
            errors.push("Please select your education.");
        }

        if (skillsInput.value.trim() === "") {
            errors.push("Please enter your skills.");
        }

        if (expertiseInput.value.trim() === "") {
            errors.push("Please enter your area of expertise.");
        }

        if (fileInput.files.length === 0) {
            errors.push("Please upload your photo.");
        }

        if (errors.length > 0) {
            e.preventDefault();
            alert(errors.join("\n"));
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
});
