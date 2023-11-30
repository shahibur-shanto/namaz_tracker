// export const fetchPrayerData = async (currentYear, currentMonth, city, country, method) => {
//     try {
//       const prayerTime = await fetch(
//         `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${city}&country=${country}&method=${method}`
//       );
//       const prayer = await prayerTime.json();
  
//       prayer.data.forEach((item) => {
//         const newTimings = {};
//         Object.entries(item.timings).forEach(([timingKey, timingValue]) => {
//           newTimings[timingKey] = {
//             time: `${timingValue}`,
//             isComplete: false,
//             isLateComplete: false,
//           };
//         });
//         item.timings = newTimings;
//       });
  
//       localStorage.setItem("prayerTime", JSON.stringify(prayer.data));
//       return prayer.data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error;
//     }
//   };