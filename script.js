
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const dayNo = now.getDate();


    const dayNames = [
        "Söndag", "Måndag", "Tisdag",
        "Onsdag", "Torsdag", "Fredag",
        "Lördag",
    ]

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
        const ringImg = '<img src="assets/Frame 48.png" style= "width:16px;">';
        const ringGroup = `<div class="ring-group">${ringImg} <span>Ring förare</span></div>`;
        const actionBtn = '<button id="btnConfirm">Bekräfta</button>';


        document.getElementById("confirm").innerHTML = `
    <div class="confirm-content">
        <p class="car-nr"><strong>${carNr}</strong></p>
        <p class="driver-info"> <strong>Förare: ${driverName}</strong></p>
        <p class="eta-info"><strong>${eta}</strong></p>
        <div class="action-row">
            ${ringGroup}
            ${actionBtn}
        </div>
    </div>
`;

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
            }
        }
    });

});


