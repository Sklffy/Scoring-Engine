// scripts.js

document.addEventListener("DOMContentLoaded", () => {
  const teamsDiv = document.getElementById("teams");
  const injectTable = document.getElementById("injectTable");

  // Homepage scoreboard
  if (teamsDiv) {
    fetch("scores.json")
      .then(r => r.json())
      .then(data => {
        teamsDiv.innerHTML = data.teams.map(team => `
          <div class="team ${team.status || 'Offline'}">
            ${team.name} | Score: ${team.score} | Status: ${team.status} | Uptime: ${team.uptime}s
          </div>
        `).join('');
      })
      .catch(() => {
        teamsDiv.textContent = "Failed to load scores.";
      });
  }

  // Injects table
  if (injectTable) {
    fetch("injects.json")
      .then(r => r.json())
      .then(data => {
        injectTable.innerHTML = data.injects.map(inj => `
          <tr>
            <td>${inj.posted}</td>
            <td>${inj.title}</td>
            <td>${inj.due}</td>
            <td>${inj.status}</td>
            <td><button onclick="alert('Inject ${inj.id} submitted!')">Submit</button></td>
          </tr>
        `).join('');
      });
  }
});
