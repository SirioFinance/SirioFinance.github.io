const dashboardBtn = document.getElementById("dashboard-btn");
const statusBtn = document.getElementById("markets-btn");
const voteBtn = document.getElementById("vote-btn");

const pageSwitch = (el) => {
	document
		.querySelector(".active-page")
		.classList.remove("active-page");
	document
		.querySelector(`.${el}-container`)
		.classList.add("active-page");
};

dashboardBtn.onclick = () => pageSwitch("dashboard");
statusBtn.onclick = () => pageSwitch("status");
voteBtn.onclick = () => pageSwitch("vote");

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

const marketsContainer = document.querySelector(
	".popup-markets-container"
);
const walletContainer = document.querySelector(
	".popup-wallet-container"
);
const transactionContainer = document.querySelector(
	".popup-transaction-container"
);

const popupActive = () => {
	popupContainer.classList.add("popup-active");
	document.body.style.overflowY = "hidden";
};

const popupClose = () => {
	popupContainer.classList.remove("popup-active");
	document.body.style.overflowY = "scroll";
	document.querySelector(".show").classList.remove("show");
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
		popupActive();
		marketsContainer.classList.add("show");
		if (document.querySelector(".active")) {
			document.querySelector(".active").classList.remove("active");
		}
		document.querySelector(".supply-popup").classList.add("active");
	};
});
borrowMarketData.forEach((el) => {
	el.onclick = () => {
		popupActive();
		marketsContainer.classList.add("show");
		if (document.querySelector(".active")) {
			document.querySelector(".active").classList.remove("active");
		}
		document.querySelector(".borrow-popup").classList.add("active");
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

const borrowBtn = document.getElementById("borrow-btn");
const riskBackBtn = document.getElementById("risk-back-btn");

const riskContainer = document.querySelector(".risk-popup");

borrowBtn.onclick = () => {
	document.querySelector(".active").classList.remove("active");
	riskContainer.classList.add("active");
};

riskBackBtn.onclick = () => {
	document.querySelector(".active").classList.remove("active");
	borrowContainer.classList.add("active");
};

const connectWalletBtn = document.getElementById(
	"connect-wallet-btn"
);

connectWalletBtn.onclick = () => {
	popupActive();
	walletContainer.classList.add("show");
};

const searchBtn = document.getElementById("search-btn");
const searchContainer = document.querySelector(
	".popup-search-container"
);

searchBtn.onclick = () => {
	popupActive();
	searchContainer.classList.add("show");

	//search

	//search-success

	//search-failed
};
