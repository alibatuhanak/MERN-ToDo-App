import React from "react";
import Avatar from "../components/Avatar";
import ChangePassword from "../components/ChangePassword";

const Settings = () => {
	return (
		<div id="settings" className="max-[1000px]:flex-col max-[1000px]:gap-0 gap-60 w-screen h-screen  flex justify-center items-center flex-row relative">
			<Avatar />
			<ChangePassword />
			{/* <div className="max-[480px]:invisible pointer-events-none w-[100px] h-[100px] absolute left-[150px] top-[100px]">
				<img src="assets/016.png" alt="settings_icon" />
			</div> */}
			{/* {[18, 19, 20, 21, 22].map((item, key) => (
				<div key={key} className="pointer-events-none w-[60px] h-[60px] absolute left-96 bottom-36">
					<img src={`assets/0${item}.png`} alt="settings_icon" />
				</div>
			))} */}
		</div>
	);
};

export default Settings;
