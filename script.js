
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
        if (!box) {
            console.error("Box not found!");
            return;
        }

        const carNr = box.querySelector(".carNr")?.textContent || "";
        const driverName = box.querySelector(".driverName")?.textContent || "";
        const eta = box.querySelector(".eta")?.textContent || "";

        const confirmBox = document.getElementById("confirm");
        if (!confirmBox) {
            console.error("#confirm not found!");
            return;
        }

        confirmBox.replaceChildren();

        const content = document.createElement("div");
        content.classList.add("confirm-content");

        const carNrP = document.createElement("p");
        carNrP.classList.add("car-nr");
        const carNrStrong = document.createElement("strong");
        carNrStrong.textContent = carNr;
        carNrP.appendChild(carNrStrong);

        const driverP = document.createElement("p");
        driverP.classList.add("driver-info");
        const driverStrong = document.createElement("strong");
        driverStrong.textContent = `Förare: ${driverName}`;
        driverP.appendChild(driverStrong);

        const etaP = document.createElement("p");
        etaP.classList.add("eta-info");
        const etaStrong = document.createElement("strong");
        etaStrong.textContent = eta;
        etaP.appendChild(etaStrong);

        const actionRow = document.createElement("div");
        actionRow.classList.add("action-row");

        const ringGroup = document.createElement("div");
        ringGroup.classList.add("ring-group");

        const ringImg = document.createElement("img");
        ringImg.src = "assets/Frame 48.png";
        ringImg.alt = "Ring förare";
        ringImg.width = 16;

        const ringSpan = document.createElement("span");
        ringSpan.textContent = "Ring förare";

        const actionBtn = document.createElement("button");
        actionBtn.id = "btnConfirm";
        actionBtn.classList.add("selectCars");
        actionBtn.textContent = "Bekräfta";

        ringGroup.append(ringImg, ringSpan);
        actionRow.append(ringGroup, actionBtn);
        content.append(carNrP, driverP, etaP, actionRow);
        confirmBox.append(content);
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


