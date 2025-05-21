// status.js

async function loadStatus() {
  const res = await fetch("scores.json");
  const data = await res.json();

  const statusBody = document.querySelector("#statusTable tbody");
  const uptimeBody = document.querySelector("#uptimeTable tbody");
  statusBody.innerHTML = "";
  uptimeBody.innerHTML = "";

  data.teams.forEach(team => {
    const sRow = document.createElement("tr");
    const uRow = document.createElement("tr");

    sRow.innerHTML = `<td>${team.name}</td>`;
    uRow.innerHTML = `<td>${team.name}</td>`;

    ["dns", "ftp", "ssh", "http"].forEach(svc => {
      const sStatus = team.status?.[svc] || "unknown";
      const uptime = team.uptime?.[svc] ?? 0;

      sRow.innerHTML += `<td class="${sStatus.toLowerCase()}">${sStatus.toUpperCase()}</td>`;
      uRow.innerHTML += `<td>${uptime}%</td>`;
    });

    statusBody.appendChild(sRow);
    uptimeBody.appendChild(uRow);
  });
}

// Load status on page load
loadStatus();
setInterval(loadStatus, 3000); // Refresh every minute