var data =
    fetch("https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=4328")

    .then(function (response) {

        return response.json();
    })
    .then(function (data) {

        liveData(data.leagues);
    })
    .catch(function (error) {

    })

function liveData(epldata) {
    let data =

        fetch("https://www.thesportsdb.com/api/v1/json/1/latestsoccer.php")

        .then(function (response) {

            return response.json();
        })
        .then(function (data) {

            aboutEPL(epldata, data);
        })
        .catch(function (error) {

        })
}

function aboutEPL(epldata, data) {
    let htmlEl = document.getElementById("about");
    htmlEl.className = "homepage"
    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", epldata[0].strFanart1);
    imgEl.className = "aboutImg";
    let brEl = document.createElement("br");

    htmlEl.appendChild(imgEl);
    htmlEl.appendChild(brEl);

  let tableEl = document.createElement("table");
    tableEl.className = "table";
    let theadEl = document.createElement("thead");
    theadEl.className = "thead-dark";
    let trEl = document.createElement("tr");

    let thEl = document.createElement("th");
    thEl.innerHTML = "LIVE SCORE";
    trEl.appendChild(thEl);
    theadEl.appendChild(trEl);
    tableEl.appendChild(theadEl);

    let trEl1 = document.createElement("tr");
    let tdEL = document.createElement("td");
    tdEL.innerHTML = data.teams.Match.Date;
    trEl1.appendChild(tdEL);
    tableEl.appendChild(trEl1);

    let trEl2 = document.createElement("tr");
    let tdEL1 = document.createElement("td");
    tdEL1.innerHTML = data.teams.Match.League;
    trEl2.appendChild(tdEL1);
    tableEl.appendChild(trEl2);

    let trEl3 = document.createElement("tr");
    let tdEL3 = document.createElement("td");
    tdEL3.innerHTML = data.teams.Match.HomeTeam + " VS " + data.teams.Match.AwayTeam;
    trEl3.appendChild(tdEL3);
    tableEl.appendChild(trEl3);

    let trEl4 = document.createElement("tr");
    let tdEL4 = document.createElement("td");
    tdEL4.innerHTML = data.teams.Match.HomeGoals + " - " + data.teams.Match.AwayGoals;
    trEl4.appendChild(tdEL4);
    tableEl.appendChild(trEl4);


    htmlEl.appendChild(tableEl);

    let desc = document.createElement("div");
    desc.classList.add("textHome");
    desc.innerHTML = epldata[0].strDescriptionEN;

    htmlEl.appendChild(desc);
}
