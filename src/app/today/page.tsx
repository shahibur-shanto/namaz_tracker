import DateSelect from "@/components/DateSelect";
import Header from "@/components/Header";
import MenuBar from "@/components/MenuBar";
import Today from "@/components/Today";
import { DateProviders } from "../Context/store";

const TodayPage = () => {
	return (
		<>
			<DateProviders>
				<Header />
				<MenuBar />
				<DateSelect />
				<Today />
			</DateProviders>
		</>
	);
};

export default TodayPage;
