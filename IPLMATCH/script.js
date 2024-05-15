document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/7607/points-table';
    const headers = {
        'Content-Type': 'application/json',
        // 'X-RapidAPI-Key': 'd61c0ce9a3mshb002769d62f4b14p1aed4ejsn60e5e1dc8199',
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com',
        'X-RapidAPI-Key': 'c2cc4214a2msheb1548a2f4e56d6p1ef772jsn5677585da4d0',
    }
    console.log("script loaded")
    const displayTableBtn = document.getElementById('getPointsTable');
        console.log("button clicked");
        fetch(apiUrl,{
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('pointsTableBody');
            tbody.innerHTML = '';
            data.pointsTable[0].pointsTableInfo.forEach((teamInfo, index) => {
                const row = document.createElement('tr');
                const posCell = document.createElement('td');
                posCell.textContent = index + 1;
                row.appendChild(posCell);

                const teamNameCell = document.createElement('td');
                teamNameCell.textContent = teamInfo.teamFullName;
                row.appendChild(teamNameCell);

                const matchesPlayedCell = document.createElement('td');
                matchesPlayedCell.textContent = teamInfo.matchesPlayed;
                row.appendChild(matchesPlayedCell);

                const matchesWonCell = document.createElement('td');
                matchesWonCell.textContent = teamInfo.matchesWon;
                row.appendChild(matchesWonCell);

                const matchesLostCell = document.createElement('td');
                matchesLostCell.textContent = teamInfo.matchesLost;
                row.appendChild(matchesLostCell);

                const nrrCell = document.createElement('td');
                nrrCell.textContent = teamInfo.nrr;
                row.appendChild(nrrCell);

                const pointsCell = document.createElement('td');
                pointsCell.textContent = teamInfo.points;
                row.appendChild(pointsCell);

                const formCell = document.createElement('td');
                const formList = document.createElement('ul');
                formList.id = 'formList';
                teamInfo.form.forEach(formItem => {
                    const li = document.createElement('li');
                    li.textContent = formItem;
                    if (formItem === 'W') {
                        li.style.color = 'green';
                        li.style.border = '1px solid green';
                    } else {
                        li.style.color = 'red';
                        li.style.border = '1px solid red';
                    }
                    formList.appendChild(li);
                });
                formCell.appendChild(formList);
                row.appendChild(formCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.log("error fetching points table data:", error);
        });
});