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



const API_KEY = "bda96a9f-435e-417f-a407-c4cc4d6f1f7b";

async function getLiveScore() {

    try {

        const response = await fetch(
            `https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`
        );

        const data = await response.json();

        console.log(data); // see API data in console

        // Find IPL match
        const iplMatch = data.data.find(match =>
            match.series &&
            (
                match.series.toLowerCase().includes("ipl") ||
                match.series.toLowerCase().includes("indian premier league")
            )
        );

        if(iplMatch){

            document.getElementById("live-status").innerText =
                iplMatch.status || "Live";

            if(iplMatch.score && iplMatch.score.length > 0){

                document.getElementById("team1-score").innerText =
                    `${iplMatch.score[0].r}/${iplMatch.score[0].w}`;

                if(iplMatch.score[1]){
                    document.getElementById("team2-score").innerText =
                        `${iplMatch.score[1].r}/${iplMatch.score[1].w}`;
                }

            }

        } 
        
        else {

            document.getElementById("live-status").innerText =
                "No IPL match live now";

        }

    } 
    
    catch(error) {

        console.log("Error:", error);

    }

}

getLiveScore();
setInterval(getMatchData, 30000); // 30 seconds (safe)
