const collateralBtn = document.querySelectorAll("#collateral-btn");
const collateralIcon = document.querySelectorAll("#collateral-icon");
let collateral = true;

console.log(collateralBtn);
console.log(collateralIcon);

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
