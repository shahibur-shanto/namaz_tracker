import DateSelect from "@/components/DateSelect";
import HeaderPage from "@/components/HeaderPage";
import MenuBar from "@/components/MenuBar";
import Today from "@/components/Today";
import { DateProviders } from "../Context/store";
import FooterPage from "@/components/FooterPage";

const TodayPage = () => {
	return (
		<>
			<DateProviders>
				<HeaderPage />
				<MenuBar />
				<DateSelect />
				<Today />
				<FooterPage/>
			</DateProviders>
		</>
	);
};

export default TodayPage;
