/**
 * The JavaScript code includes functions to fetch and display team scores, injects, and a timer for an
 * event start time in Eastern Time.
 */
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
    loadInjects();
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
              <label for="${fileInputId}" class="file-label">
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
  const fileName = input.files[0]?.name || "No file selected";
  const fileNameDisplay = input.parentElement.querySelector(".file-name");
  fileNameDisplay.textContent = fileName;
}



// Submit handler (simulated)
function handleInjectSubmit(event, injectId) {
  event.preventDefault();

  const form = event.target;
  const fileInput = form.querySelector('input[type="file"]');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to upload.");
    return;
  }

  // Simulate successful upload
  alert(`Inject ${injectId} submitted: ${file.name}`);

  // Disable UI after submission
  form.querySelector("button").textContent = "Uploaded";
  form.querySelector("button").disabled = true;
  form.querySelector("button").style.opacity = "0.6";

  fileInput.disabled = true;
  form.querySelector(".file-label").style.opacity = "0.5";
  form.querySelector(".file-label").style.cursor = "not-allowed";
}


document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("eventTime")) {
    updateEventTimer();
    setInterval(updateEventTimer, 1000);
  }

  if (document.getElementById("lastCheck")) {
    updateLastCheck();
    setInterval(updateLastCheck, 1000);
  }
});


  // Force the event start time to be interpreted in Eastern Time
  const eventStartTime = new Date("2025-05-21T09:00:00-04:00"); // -04:00 for EDT (Daylight), -05:00 for EST

  function updateEventTimer() {
    const now = new Date(); // User’s local time
const estNow = new Date(
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour12: false,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  }).format(new Date())
);

    const diff = Math.max(0, estNow - eventStartTime);

    const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
    const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

    document.getElementById("eventTime").textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateEventTimer();
  setInterval(updateEventTimer, 1000);

  function updateLastCheck() {
  const now = new Date();

  const estString = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  }).format(now);

  const lastCheckEl = document.getElementById("lastCheck");
  if (lastCheckEl) {
    lastCheckEl.textContent = estString;
  }
}
