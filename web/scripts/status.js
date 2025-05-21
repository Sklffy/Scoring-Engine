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

async function loadInjects() {
  const res = await fetch("injects.json");
  const data = await res.json();
  const injectBody = document.querySelector("#injectTable tbody");
  injectBody.innerHTML = "";

  data.injects.forEach(inject => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${inject.posted}</td>
      <td>${inject.title}</td>
      <td>${inject.due}</td>
      <td>${inject.status}</td>
      <td><button onclick="alert('Inject ${inject.id} submitted!')">Submit</button></td>
    `;
    injectBody.appendChild(row);
  });
}

// Start and refresh every 3 seconds
loadStatus();
loadInjects();
setInterval(() => {
  loadStatus();
  loadInjects();
}, 3000);
