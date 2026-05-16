const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page-section");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => {
            item.classList.remove("active");
        });

        this.classList.add("active");

        pages.forEach(page => {
            page.classList.remove("active");
        });

        const pageId = this.getAttribute("data-page");

        document
            .getElementById(pageId)
            .classList.add("active");

    });

});

function toggleTheme() {

    document.body.classList.toggle("light-mode");

}