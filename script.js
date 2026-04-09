
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


