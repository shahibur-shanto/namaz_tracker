"use client";
import dayjs, { Dayjs } from "dayjs";
import React, {
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	useState,
} from "react";

interface DateContextProps {
	selectedDate: Dayjs; // Change the type to Moment
	setSelectedDate: Dispatch<SetStateAction<Dayjs>>; // Change the type to Moment
}

const DateContext = createContext<DateContextProps | undefined>(undefined);

export const DateProviders: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs()); // Initialize with moment()

	return (
		<DateContext.Provider
			value={{
				selectedDate,
				setSelectedDate,
			}}
		>
			{children}
		</DateContext.Provider>
	);
};

export const useDateContext = () => {
	const context = useContext(DateContext);

	if (!context) {
		throw new Error("useDateContext must be use within a Data Provider");
	}
	return context;
};
