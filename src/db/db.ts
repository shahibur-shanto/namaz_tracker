
export const db = (year:string,month:string,city:string,country:string,method:string) => {
    fetch(
        `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}&method=${method}&iso8601=true`
    )
        .then((response) => {
            if (!response.ok) {
                window.alert("Prayer time not found");
            }
            return response.json();
        })
        .then((prayer) => {
            if (prayer.code !== 200) {
            } else {
                console.log("Data updated successfully");
                localStorage.setItem("userData", JSON.stringify(values));
                router.push("/today");
            }
        })
        .catch((error) => {
            window.alert("Your Prayer Time not Found for your country");
            console.error("Error during fetch:", error);
        });

    // const prayerTime = await fetch(
    // 	`https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${values.city}&country=${values.country}&method=${values.method}&iso8601=true`
    // );
    // console.log(prayerTime);
    // const prayer = await prayerTime.json();
    // console.log(prayer);

    // if (prayer.code !== 200) {
    // 	window.alert("Your Prayer Time not Found");
    // } else {
    // 	console.log("Data updated successfully");
    // 	router.push("/today");
    // }
}
