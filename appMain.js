
function changePage(pageName) {
    let aboutEPL = document.getElementById("about")
    let teamPerf = document.getElementById("teamPerf")
    let pastEvents = document.getElementById("pastEvents")
    let upComing = document.getElementById("upComing")
    let chatBox = document.getElementById("chatBox")
    aboutEPL.style.display = "none";
    teamPerf.style.display = "none";
    pastEvents.style.display = "none";
    upComing.style.display = "none";
    chatBox.style.display = "none";
    switch (pageName) {

        case 'chatBox':
            chatBox1();
            chatBox.style.display = "block";
            //            pastEvents.style.display = "none";
            //            upComing.style.display = "none";
            break;
        case 'teamPerf':
            teamPerformance();
            teamPerf.style.display = "block";
            //            pastEvents.style.display = "none";
            //            upComing.style.display = "none";
            break;

        case 'pastEvents':
            pasEvents();
            pastEvents.style.display = "block";

            //            teamPerf.style.display = "none";
            //            upComing.style.display = "none";
            break;

        case 'upComing':
            upcomingEvents();
            upComing.style.display = "block";
            //            teamPerf.style.display = "none";
            //            pastEvents.style.display = "none";
            break;

        default:
            teamPerf.style.display = "block";
            teamPerformance();
    }



}

function teamPerformance() {
    var data =
        fetch("https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=4328&s=1819")
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {

            teamDetails(data.table);


        })
        .catch(function (error) {

        })
}

function teamDetails(seasondata) {

    var data =
        fetch("https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4328")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            TeamPerf(data.teams, seasondata);

        })
        .catch(function (error) {

        })
}

function TeamPerf(teamdata, seasondata) {

    let contEl = document.getElementById("teamInfo");
    contEl.className = "container";
    let rowEl = document.createElement("div");
    rowEl.className = "row align-items-start";
    for (i in teamdata) {
        let colEl = document.createElement("div");
        colEl.className = "col";
        let flipCard = document.createElement("div");
        flipCard.className = "flip";
        let flipIn = document.createElement("div");
        flipIn.className = "flipIn";
        let flipOut = document.createElement("div");
        flipOut.className = "flipOut";
        let imgEl = document.createElement("img");
        imgEl.setAttribute("src", teamdata[i].strTeamFanart1);
        imgEl.className = "TeamImg";
        flipOut.appendChild(imgEl);
        let flipBack = document.createElement("div");
        flipBack.className = "flipBack";
        for (j in seasondata) {
            if (teamdata[i].idTeam == seasondata[j].teamid) {
                let tableEl = document.createElement("table");
                tableEl.className = "table";
                let theadEl = document.createElement("thead");
                theadEl.className = "thead-dark";
                let trEl = document.createElement("tr");

                let thEl1 = document.createElement("th");
                thEl1.innerHTML = "Field";
                let thEl2 = document.createElement("th");
                thEl2.innerHTML = "Info";

                trEl.appendChild(thEl1);
                trEl.appendChild(thEl2);

                theadEl.appendChild(trEl);

                tableEl.appendChild(theadEl);
                let trEl1 = document.createElement("tr");
                let tdEl1 = document.createElement("td");
                tdEl1.innerHTML = "Name";
                trEl1.appendChild(tdEl1);
                let tdEl2 = document.createElement("td");
                tdEl2.innerHTML = seasondata[j].name;
                trEl1.appendChild(tdEl2);
                tableEl.appendChild(trEl1);

                let trEl2 = document.createElement("tr");
                let tdEl3 = document.createElement("td");
                tdEl3.innerHTML = "Played";
                trEl2.appendChild(tdEl3);
                let tdEl4 = document.createElement("td");
                tdEl4.innerHTML = seasondata[i].played;
                trEl2.appendChild(tdEl4);
                tableEl.appendChild(trEl2);

                let trEl3 = document.createElement("tr");
                let tdEl6 = document.createElement("td");
                tdEl6.innerHTML = "Win";
                trEl3.appendChild(tdEl6);
                let tdEl7 = document.createElement("td");
                tdEl7.innerHTML = seasondata[i].win;
                trEl3.appendChild(tdEl7);
                tableEl.appendChild(trEl3);

                let trEl4 = document.createElement("tr");
                let tdEl8 = document.createElement("td");
                tdEl8.innerHTML = "Draw";
                trEl4.appendChild(tdEl8);
                let tdEl9 = document.createElement("td");
                tdEl9.innerHTML = seasondata[i].draw;
                trEl4.appendChild(tdEl9);
                tableEl.appendChild(trEl4);

                let trEl5 = document.createElement("tr");
                let tdEl10 = document.createElement("td");
                tdEl10.innerHTML = "Loss";
                trEl5.appendChild(tdEl10);
                let tdEl11 = document.createElement("td");
                tdEl11.innerHTML = seasondata[i].loss;
                trEl5.appendChild(tdEl11);
                tableEl.appendChild(trEl5);

                flipBack.appendChild(tableEl);
            }
        }

        flipIn.appendChild(flipOut);
        flipIn.appendChild(flipBack);
        flipCard.appendChild(flipIn);
        colEl.appendChild(flipCard);
        rowEl.appendChild(colEl);

        let colEl2 = document.createElement("div");
        colEl2.className = "col";
        let infoEl = document.createElement("div");
        infoEl.className = "info";
        let headingEl = document.createElement("h4");
        headingEl.innerHTML = teamdata[i].strTeam;
        infoEl.appendChild(headingEl);
        let aEl = document.createElement("a");
        aEl.innerHTML = teamdata[i].strWebsite;
        aEl.setAttribute("alt", "");
        aEl.href = teamdata[i].strWebsite;
        infoEl.appendChild(aEl);

        /*let infologo = document.createElement("img");
       infologo.className = "logopic";
    infologo.setAttribute("src",teamdata[i].strTeamBadge);
        
        infoEl.appendChild(infologo);*/

        colEl2.appendChild(infoEl);

        rowEl.appendChild(colEl2);

        contEl.appendChild(rowEl);
    }

}

function upcomingEvents() {

    var data =
        fetch("https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4328")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //document.getElementById("pastEvents");
            Events(data.events, "schedule-upcoming");

        })
        .catch(function (error) {

        })

}

function pasEvents() {
    var data =
        fetch("https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4328")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //document.getElementById("upComing");
            Events(data.events, "schedule-past");


        })
        .catch(function (error) {

        })
}

function Events(eventdata, id) {
    let contEl = document.getElementById(id);
    contEl.className = "container";
    contEl.innerHTML = " ";

    let conmap = document.getElementById("map");
    //conmap.className = "container";
    conmap.innerHTML = " ";

    for (i in eventdata) {

        let rowEl = document.createElement("div");
        rowEl.className = "row align-items-start";
        rowEl.classList.add("row");

        let eventDetail = document.createElement("div");
        eventDetail.className = "col-sm-4 col-lg-3 ";
        eventDetail.classList.add("eventCol");
        //        let att = document.createAttribute("data-team");
        //        att.value = eventdata[i].strHomeTeam
        eventDetail.setAttribute("data-team", eventdata[i].strHomeTeam)
        let eventDate = document.createElement("div");
        eventDate.className = "col";
        eventDate.innerHTML = eventdata[i].dateEvent;
        eventDetail.appendChild(eventDate);
        let eventTime = document.createElement("div");
        eventTime.className = "col";
        eventTime.innerHTML = eventdata[i].strTime;
        eventDetail.appendChild(eventTime);
        let eventVenue = document.createElement("div")
        eventVenue.className = "col";
        //        let aEl = document.createElement('a');
        //        aEl.setAttribute("id", "event");
        let linkText = document.createTextNode("Venue: " + eventdata[i].strHomeTeam);
        eventVenue.classList.add("linkMap");
        //        aEl.href = "map.html";
        eventDetail.addEventListener("click", (event) => {
            var homeTeam = event.currentTarget.getAttribute("data-team")
            googleMap(homeTeam)
        });

        /*document.getElementById("event").addEventListener("click", function () {
                googleMap(eventdata[i].strHomeTeam);
            });*/

        //        aEl.appendChild(linkText);
        eventVenue.appendChild(linkText);
        eventDetail.appendChild(eventVenue);
        rowEl.appendChild(eventDetail);
        let eventBadge = document.createElement("div");
        eventBadge.setAttribute("id", eventdata[i].idEvent)
        eventBadge.className = "col-sm-8 col-lg-6";
        eventBadge.classList.add("badge");
        let homeTeam = eventdata[i].idHomeTeam;
        let awayTeam = eventdata[i].idAwayTeam;
        teamsDetails(homeTeam, eventdata[i].idEvent, 1, id);

        teamsDetails(awayTeam, eventdata[i].idEvent, 2, id);
        rowEl.appendChild(eventBadge);

        /*let mapCol = document.createElement("div");
        mapCol.className = "col-2";
        mapCol.classList.add("mapCol");
        let mapLogo = document.createElement("img");
        mapLogo.setAttribute("src", "mapLogo.webp")
        mapLogo.classList.add("map");
        mapCol.appendChild(mapLogo);
        rowElement.appendChild(mapCol)*/

        contEl.appendChild(rowEl);

    }

}

function teamsDetails(team, iddiv, order, id) {
    var data = fetch("https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4328")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            teamsLogo(data.teams, team, iddiv, order, id);


        })
        .catch(function (error) {})
}

function teamsLogo(teamdata, team, iddiv, order, id) {
    for (i in teamdata) {
        if (team == teamdata[i].idTeam) {
            var min = 0;
            var max = teamdata[i].idTeam;
            var random = Math.floor(Math.random() * (+max - +min)) + +min;
            let teamBadge = document.createElement('img');
            teamBadge.setAttribute("src", teamdata[i].strTeamBadge);
            teamBadge.setAttribute("id", random);
            //teamBadge.setAttribute("id",teamsDetails[i].idTeam);
            teamBadge.classList.add("eventBadge");


            document.getElementById(iddiv).appendChild(teamBadge);

            document.getElementById(random).addEventListener("click", function () {
                playerData(team, id)
            });
        }

    }
    if (order == 1) {
        let teamVS = document.createElement('img');
        teamVS.setAttribute("src", "vs.png");
        teamVS.classList.add("eventBadge");
        document.getElementById(iddiv).appendChild(teamVS);
    }

}

function playerData(teamid, id) {
    var data =
        fetch("https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=" + teamid)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            playerDetail(data.player, id);
        })
        .catch(function (error) {

        })
}

function playerDetail(teamData, id) {

    let contElement = document.getElementById(id);
    contElement.className = "container";
    contElement.classList.add = "playertable"
    contElement.innerHTML = "";
    let tableEl = document.createElement("table");
    tableEl.className = "table";
    let tableBd = document.createElement("tbody");

    let theadEl = document.createElement("thead");
    theadEl.className = "thead-dark";
    let trEl = document.createElement("tr");

    let thEl = document.createElement("th");
    thEl.innerHTML = "Name";
    let thEl1 = document.createElement("th");
    thEl1.innerHTML = "Nationality";
    let thEl2 = document.createElement("th");
    thEl2.innerHTML = "Wages";
    trEl.appendChild(thEl);
    trEl.appendChild(thEl1);
    trEl.appendChild(thEl2);
    theadEl.appendChild(trEl);
    tableEl.appendChild(theadEl);

    for (i in teamData) {
        //        let rowElement = document.createElement("div");
        //        rowElement.className = "row align-items-start";
        //        let colElement = document.createElement("div");
        //        colElement.className = "col";

        let trEl = document.createElement("tr");
        let tdEl = document.createElement("td");
        tdEl.innerHTML = teamData[i].strPlayer;
        let tdEl1 = document.createElement("td");
        tdEl1.innerHTML = teamData[i].strNationality;
        let tdEl2 = document.createElement("td");
        tdEl2.innerHTML = teamData[i].strWage;
        trEl.appendChild(tdEl);
        trEl.appendChild(tdEl1);
        trEl.appendChild(tdEl2);
        tableBd.appendChild(trEl);

        //contElement.appendChild(rowElement);
    }
    tableEl.appendChild(tableBd);
    contElement.appendChild(tableEl);
}

//var map;

function googleMap(location) {

    var data = fetch("https://api.jsonbin.io/b/5d3f3a2ce6d0051e2a724975/1", {
            headers: {
                "secret-key": "$2a$10$lBImQfBWvIDFEeLj4hUBZe8KryxyrwjgJGb8B6YqNLqfcmMH07lZq"
            }
        })
        .then(function (response) {


            return response.json();
        })
        .then(function (data) {

            initMap(location, data.location);

        })
        .catch(function (error) {

        });
}

function initMap(location, locdata) {

    for (i in locdata) {
        if (location == locdata[i].NAME) {
            let clear = document.getElementById('upComing');
            clear.innerHTML = "";
            var map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: locdata[i].LAT,
                    lng: locdata[i].LNG
                },
                zoom: 15 // typical is usually 8 or 9
            });

        }
    }
}
/*
function initMap(){
    map = new google.maps.Map(document.getElementById('map'),{ 
                center: {
                    lat: 53.4084,
                    lng: -1.2345
                },
                zoom: 15 // typical is usually 8 or 9
            });

}
*/

function chatBox1() {
    console.log(firebase)
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);

    var database = firebase.database();
    console.log(database)
    let username = "";
    let email = "";

    function logIn() {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...

                console.log(result);
                console.log("user", user);
                username = user.displayName;
                email = user.email;
                getPosts();
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log("error", error);
            });
    }

    function writeNewPost() {
        let message = document.getElementById("message").value;
        console.log(message);
        // A post entry.
        var postData = {
            author: username,
            body: message
        };

        // Get a key for a new Post.
        var newPostKey = firebase
            .database()
            .ref()
            .child("posts")
            .push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates["/posts/" + newPostKey] = postData;
        getPosts();
        return firebase
            .database()
            .ref()
            .update(updates);
    }

    function getPosts() {
        let allPosts = firebase
            .database()
            .ref("posts/")
            .once("value")
            .then(function (snapshot) {
                let allPosts = snapshot.val();
                console.log(posts);
                let chat = document.getElementById("posts");
                let template = "";
                for (key in allPosts) {
                    console.log(allPosts[key].author);
                    let author = allPosts[key].author;
                    let message = allPosts[key].body;

                    template += `<div >
                            <p>${author}</p>
                            <p>${message}</p>
                           
                        </div>`;
                }
                chat.innerHTML = template;
            });
    }
}
