function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const dayNo = now.getDate();

    const dayNames = [
        "Söndag", "Måndag", "Tisdag",
        "Onsdag", "Torsdag", "Fredag",
        "Lördag",
    ];

    const dayName = dayNames[now.getDay()];

    const months = [
        "Januari", "Februari", "Mars", "April",
        "Maj", "Juni", "Juli", "Augusti",
        "September", "Oktober", "November", "December"
    ];

    const month = months[now.getMonth()];

    document.getElementById("clock").textContent = `${hours}:${minutes}`;
    document.getElementById("day").textContent = `${dayName}`;
    document.getElementById("date").textContent = `${dayNo} ${month}`;
}

updateClock();
setInterval(updateClock, 1000);

document.addEventListener("DOMContentLoaded", function () {

    let currentSelectBtn = null;

    function removeCarValid() {
        const carValid = document.getElementById("carValid");
        if (carValid) carValid.remove();
    }

    function updateConfirm(box) {
        if (!box) return console.error("Box not found!");

        const carNr = box.querySelector(".carNr")?.textContent;
        const driverName = box.querySelector(".driverName")?.textContent;
        const eta = box.querySelector(".eta")?.textContent;

        const actionRow = `<div class="action-wrapper">
        <div class="ring-group">
            <img src="assets/Frame.png" style="width:16px;">
            <span>Ring förare</span>
        </div>
            <button id="btnConfirm">Bekräfta</button>
        </div>`;

        const confirmEl = document.getElementById("confirm");
        confirmEl.replaceChildren();

        const temp = document.createElement("div");
        temp.innerHTML = `
        <div class="confirm-content">
        <p class="car-nr"><strong>${carNr}</strong></p>
        <p class="driver-info"><strong>Förare: ${driverName}</strong></p>
        <p class="eta-info"><strong>${eta}</strong></p>
        <div class="action-row">
            ${actionRow}
        </div>
        </div>
        `;

        confirmEl.appendChild(temp.firstElementChild);
    }

    const selectCars = document.getElementsByClassName("selectCars");

    for (let i = 0; i < selectCars.length; i++) {
        selectCars[i].addEventListener("click", function () {
            removeCarValid();
            const box = this.closest(".box-car");
            currentSelectBtn = this;
            updateConfirm(box);
        });
    }

    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "btnConfirm") {
            if (currentSelectBtn) {
                currentSelectBtn.textContent = "Vald";

                const box = currentSelectBtn.closest(".box-car");
                if (box) {
                    box.classList.add("selected");
                }
            }
        }
    });

    const phoneIcon = document.getElementById("phoneIcon");
    const callTimer = document.getElementById("callTimer");
    const carValidBtn = document.getElementById("carValid");
    const drivers = document.getElementById("drivers");

    let seconds = 0;
    let timerStarted = false;

    function formatTime(sec) {
        const m = String(Math.floor(sec / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");
        return `${m}:${s}`;
    }

    if (phoneIcon) {
        phoneIcon.addEventListener("click", function () {
            if (timerStarted) return;
            timerStarted = true;

            phoneIcon.style.filter = "grayscale(100%)";
            callTimer.textContent = "00:00";

            setInterval(() => {
                seconds++;
                callTimer.textContent = formatTime(seconds);
            }, 1000);
        });
    }

    if (carValidBtn && drivers) {
        carValidBtn.addEventListener("click", function (e) {
            e.preventDefault();
            drivers.classList.remove("blurred");
        });
    }
});