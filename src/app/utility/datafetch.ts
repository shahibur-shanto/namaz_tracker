// const fetchData = async (dateString: string | undefined) => {
//     try {
//         const getUserData = localStorage.getItem("userData");
//         if (getUserData) {
//             const userData = JSON.parse(getUserData);
//             const { city, method, country } = userData;
//             const prayerTime = await fetch(
//                 `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${city}&country=${country}&method=${method}`
//             );
//             const prayer = await prayerTime.json();

//             prayer.data.forEach((item: { timings: Record<string, string> }) => {
//                 const newTimings: {
//                     [key: string]: {
//                         time: string;
//                         isComplete: boolean;
//                         isLateComplete: boolean;
//                     };
//                 } = {};

//                 Object.entries(item.timings).forEach(([timingKey, timingValue]) => {
//                     newTimings[timingKey] = {
//                         time: `${timingValue}`,
//                         isComplete: false,
//                         isLateComplete: false,
//                     };
//                     item.timings = newTimings as unknown as Record<string, string>;
//                 });
//             });
//             prayer.data.forEach(
//                 (element: { date: { gregorian: { date: any } } }) => {
//                     const dateString = element.date.gregorian.date;
//                     const value = JSON.stringify(element);
//                     if (!localStorage.getItem(dateString)) {
//                         localStorage.setItem(dateString, value);
//                     }
//                 }
//             );
//         }
//         const storedData = localStorage.getItem(dateString as string);

//         if (storedData && selectedDate !== undefined) {
//             const newData = JSON.parse(storedData);
//             setData(newData?.timings);
//         } else {
//             console.log("No data found in local storage.");
//         }
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };