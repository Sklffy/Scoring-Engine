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

function loadInjects() {
  fetch("injects.json")
    .then((res) => res.json())
    .then((data) => {
      const injectBody = document.querySelector("#injectTable");
      injectBody.innerHTML = "";

      data.injects.forEach((inject) => {
        const row = document.createElement("tr");
        const fileInputId = `file-${inject.id}`;
        row.innerHTML = `
          <td>${inject.posted}</td>
          <td>${inject.title}</td>
          <td>${inject.due}</td>
          <td>${inject.status}</td>
          <td>
            <form class="inject-form" onsubmit="handleInjectSubmit(event, ${inject.id})">
<label for="fileInput1" class="file-label">
  <i class="fas fa-paperclip"></i> Choose File
</label>
              <input type="file" id="${fileInputId}" name="file" class="inject-upload" onchange="showFileName(this)" required />
              <span class="file-name">No file selected</span>
              <button type="submit">Upload</button>
            </form>
          </td>
        `;
        injectBody.appendChild(row);
      });
    });
}

function showFileName(input) {
  const span = input.nextElementSibling;
  span.textContent = input.files[0]?.name || "No file selected";
}


// Submit handler (simulated)
function handleInjectSubmit(event, injectId) {
  event.preventDefault();
  const form = event.target;
  const file = form.querySelector('input[type="file"]').files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  alert(`Inject ${injectId} submitted: ${file.name}`);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#injectTable")) {
    loadInjects();
  }
});

