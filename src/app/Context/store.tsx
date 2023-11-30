"use client";

import React, {
	createContext,
	useContext,
	Dispatch,
	SetStateAction,
	useState,
} from "react";

interface DateContexProps {
	selectedDate: Date;
	setSelectedDate: Dispatch<SetStateAction<Date>>;
}
const DateContext = createContext<DateContexProps | undefined>(undefined);

export const DateProviders: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

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
