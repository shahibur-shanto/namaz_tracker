import Image from "next/image";
import icon from "../assets/salat.png";

const Icon = () => {
	return (
		<div>
			<Image width={50} height={50} src={icon} alt="icon" />
		</div>
	);
};

export default Icon;
