var currentIndex = 0;
let prevScrollPos = window.pageYOffset;
let last = 0;
const innerContainer = document.querySelectorAll(".inner-container");
const sidebarContainer = document.getElementById(
	"side-bar-container"
);

document.getElementById("hamburger").addEventListener("click", () => {
	document.body.style.overflow = "hidden";
	sidebarContainer.classList.add("side-bar-show");
	sidebarContainer.classList.remove("side-bar-hide");
});
document.getElementById("close").addEventListener("click", () => {
	document.body.style.overflow = "auto";
	sidebarContainer.classList.add("side-bar-hide");
	sidebarContainer.classList.remove("side-bar-show");
});

function scrollToSmoothly(pos, time) {
	var currentPos = window.pageYOffset;
	var start = null;
	if (time == null) time = 500;
	(pos = +pos), (time = +time);
	window.requestAnimationFrame(function step(currentTime) {
		start = !start ? currentTime : start;
		var progress = currentTime - start;
		if (currentPos < pos) {
			window.scrollTo(
				0,
				((pos - currentPos) * progress) / time + currentPos
			);
		} else {
			window.scrollTo(
				0,
				currentPos - ((currentPos - pos) * progress) / time
			);
		}
		if (progress < time) {
			window.requestAnimationFrame(step);
		} else {
			window.scrollTo(0, pos);
		}
	});
}

var position;

let popupActive = false;

document
	.getElementById("show-more-btn")
	.addEventListener("click", () => {
		scrollToSmoothly(vh, 300);
	});

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

document.getElementById("popup-btn").addEventListener("click", () => {
	document.querySelector(".mobile-screen-container").style.display =
		"none";
	fourthContainer.style.height = "100vh";
	fourthContainer.scrollIntoView(true);
	document.querySelector(".popup-container").style.display = "block";
	document.body.style.overflow = "hidden";
	popupActive = true;
	cards = document.querySelectorAll(".card");
	cards.forEach((el) => {
		el.classList.remove("show");
		el.classList.add("show");
	});
});
document
	.getElementById("popup-close-btn")
	.addEventListener("click", () => {
		document.querySelector(".mobile-screen-container").style.display =
			"flex";
		fourthContainer.style.height = "100%";
		fourthContainer.style.opacity = 1;
		document.querySelector(".popup-container").style.display = "none";
		document.body.style.overflow = "scroll";
		popupActive = false;
	});

let vh = document.documentElement.clientHeight;
let vw = document.documentElement.clientWidth;

const firstContainer = document.getElementById("0-container");
const secondContainer = document.getElementById("1-container");
const thirdContainer = document.getElementById("2-container");
const fourthContainer = document.getElementById("3-container");
const fifthContainer = document.getElementById("4-container");
const sixthContainer = document.getElementById("5-container");

var firstHeight = firstContainer.offsetHeight;
var secondHeight = secondContainer.offsetHeight;
var thirdHeight = thirdContainer.offsetHeight;
var fourthHeight = fourthContainer.offsetHeight;
var fifthHeight = fifthContainer.offsetHeight;
var sixthHeight = sixthContainer.offsetHeight;

document.addEventListener("DOMContentLoaded", function () {
	var fullURL = window.location.href;
	if (fullURL.includes("#")) {
		var sectionID = fullURL.split("#")[1];
		if (sectionID == "whitepaper") {
			scrollToSmoothly(firstHeight + secondHeight + thirdHeight, 600);
		}
	}
});

const scrolling = (position) => {
	let firstOpc, secondOpc, thirdOpc, fourthOpc, fifthOpc, sixthOpc;
	firstOpc = (firstHeight - position) / firstHeight;

	if (vw > 730) {
		if (
			position + vh - 300 >
			firstHeight + secondHeight + thirdHeight
		) {
			cards = document.querySelectorAll(".card");
			cards.forEach((el) => {
				el.classList.add("show");
			});
		}
	}

	if (position < firstHeight) {
		secondOpc = position / firstHeight;
	} else {
		secondOpc =
			(secondHeight + firstHeight - position) / secondHeight;
	}
	if (position < firstHeight + secondHeight) {
		thirdOpc = position / (firstHeight + secondHeight);
	} else {
		thirdOpc =
			(thirdHeight + firstHeight + secondHeight - position) /
			thirdHeight;
	}
	if (position < firstHeight + secondHeight + thirdHeight) {
		fourthOpc = position / (secondHeight + thirdHeight + firstHeight);
	} else {
		fourthOpc =
			(fourthHeight +
				thirdHeight +
				firstHeight +
				secondHeight -
				position) /
			fourthHeight;
	}
	if (
		position <
		firstHeight + secondHeight + thirdHeight + fourthHeight
	) {
		fifthOpc =
			position /
			(secondHeight + thirdHeight + firstHeight + fourthHeight);
	} else {
		fifthOpc =
			(firstHeight +
				secondHeight +
				thirdHeight +
				fourthHeight +
				fifthHeight -
				position) /
			fifthHeight;
	}
	if (
		position <
		firstHeight +
			secondHeight +
			thirdHeight +
			fourthHeight +
			fifthHeight
	) {
		sixthOpc =
			position /
			(firstHeight +
				secondHeight +
				thirdHeight +
				fourthHeight +
				fifthHeight);
	} else {
		sixthOpc =
			(firstHeight +
				secondHeight +
				thirdHeight +
				fourthHeight +
				fifthHeight +
				sixthHeight -
				position) /
			sixthHeight;
	}

	firstContainer.style.opacity = firstOpc > 0.1 ? firstOpc : 0.1;
	secondContainer.style.opacity = secondOpc > 0.1 ? secondOpc : 0.1;
	thirdContainer.style.opacity = thirdOpc > 0.1 ? thirdOpc : 0.1;
	fourthContainer.style.opacity = fourthOpc > 0.1 ? fourthOpc : 0.1;
	fifthContainer.style.opacity = fifthOpc > 0.1 ? fifthOpc : 0.1;
	sixthContainer.style.opacity = sixthOpc > 0.1 ? sixthOpc : 0.1;
	sixthContainer.style.opacity = sixthOpc > 0.8 ? 1 : sixthOpc;
};

window.onscroll = function (e) {
	scrolling(window.scrollY);
};
