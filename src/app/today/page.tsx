import DateSelect from "@/components/DateSelect";
import Header from "@/components/Header";
import MenuBar from "@/components/MenuBar";
import Today from "@/components/Today";

const TodayPage = () => {
	return (
		<>
			<Header />
			<MenuBar />
			<DateSelect/>
            <Today/>
		</>
	);
};

export default TodayPage;
