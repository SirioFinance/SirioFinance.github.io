window.onbeforeunload = function () {
	if (location.protocol !== "https:")
		location.replace("https://" + location.href.split("//")[1]);
};

const collateralBtn = document.querySelectorAll("#collateral-btn");
const collateralIcon = document.querySelectorAll("#collateral-icon");
let collateral = true;

collateralBtn.forEach((el) =>
	el.addEventListener("click", () => {
		console.log("click");
		if (!collateral) {
			collateralIcon.forEach((el) => el.classList.remove("on"));
			collateral = !collateral;
		} else {
			collateralIcon.forEach((el) => el.classList.add("on"));
			collateral = !collateral;
		}
	})
);

const supplyMarketData = document.querySelectorAll(
	".supply-market-row"
);
const borrowMarketData = document.querySelectorAll(
	".borrow-market-row"
);

const popupContainer = document.querySelector(".popup-container");

const popupActive = (popup) => {
	popupContainer.classList.add("popup-active");
	document.body.style.overflowY = "hidden";
	document.querySelector(popup).classList.add("active");
};

const popupClose = () => {
	popupContainer.classList.remove("popup-active");
	document.body.style.overflowY = "scroll";
	document.querySelector(".active").classList.remove("active");
};

popupContainer.onclick = (click) => {
	if (click.target.classList.contains("popup-container")) {
		popupClose();
	}
};
document.getElementById("popup-close-button").onclick = () => {
	popupClose();
};

supplyMarketData.forEach((el) => {
	el.onclick = () => {
		popupActive(".supply-popup");
	};
});
borrowMarketData.forEach((el) => {
	el.onclick = () => {
		popupActive(".borrow-popup");
	};
});

const supplyContainer = document.querySelector(".supply-popup");
const supplyOptionBtn = document.getElementById("supply-option");
const withdrawOptionBtn = document.getElementById("withdraw-option");

supplyOptionBtn.onclick = () => {
	supplyContainer.classList.remove("withdraw-active");
	supplyContainer.classList.add("supply-active");
};

withdrawOptionBtn.onclick = () => {
	supplyContainer.classList.remove("supply-active");
	supplyContainer.classList.add("withdraw-active");
};

const borrowContainer = document.querySelector(".borrow-popup");
const borrowOptionBtn = document.getElementById("borrow-option");
const repayOptionBtn = document.getElementById("repay-option");

repayOptionBtn.onclick = () => {
	borrowContainer.classList.remove("borrow-active");
	borrowContainer.classList.add("repay-active");
};

borrowOptionBtn.onclick = () => {
	borrowContainer.classList.remove("repay-active");
	borrowContainer.classList.add("borrow-active");
};
