import dayjs, { Dayjs } from "dayjs";

export const getCurrentDate = () => {
	const today = dayjs();
	return today;
};

export const formatDate = (date: Dayjs): string => {
	return dayjs(date).format("DD-MM-YYYY");
};

export const removeOffsetFromWaqtTime = (waqtTime: string) => {
	return waqtTime.replace(/\s*\(\+\d+\)/, ""); // Remove "(+06)" or similar pattern
};

export function doesItemExist(dateKey: string) {
	return localStorage.getItem(dateKey) !== null;
}
// export const isFutureWaqt = (presentSelectedDate: Date, waqtTime: string) => {
// 	const currentDateTime = getCurrentDate();

// 	// Extract date components without time
// 	// const currentDate = new Date(
// 	// 	currentDateTime.getFullYear(),
// 	// 	currentDateTime.getMonth(),
// 	// 	currentDateTime.getDate()
// 	// );
// 	const selectedDate = new Date(
// 		presentSelectedDate.getFullYear(),
// 		presentSelectedDate.getMonth(),
// 		presentSelectedDate.getDate()
// 	);

// 	if (currentDate < selectedDate) {
// 		return true;
// 	} else if (currentDate > selectedDate) {
// 		return false;
// 	} else {
// 		const currentHour = currentDateTime.getHours();
// 		const currentMinute = currentDateTime.getMinutes();
// 		const [waqtHour, waqtMinutes] = removeOffsetFromWaqtTime(waqtTime)
// 			.split(":")
// 			.map(Number);

// 		if (currentHour * 60 + currentMinute < waqtHour * 60 + waqtMinutes) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
// };
