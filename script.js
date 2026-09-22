const colorData = {
	red: { name: "Ultra Red", front: "red%20T%20front.jpg", side: "red%20T%20side.jpg", back: "red%20T%20back.jpg" },
	black: { name: "Solid Black", front: "black%20T%20front.jpg", side: "black%20T%20side.jpg", back: "black%20T%20back.jpg" },
	white: { name: "Pearl White", front: "white%20T%20front.jpg", side: "white%20T%20side.jpg", back: "white%20T%20back.jpg" }
};
const heroCar = document.querySelector("#hero-car");
const sideView = document.querySelector("#side-view");
const backView = document.querySelector("#back-view");
const colorName = document.querySelector("#color-name");
const viewLabel = document.querySelector("#view-label");
const viewNames = ["front", "side", "back"];
let currentColor = "red";
let currentView = 0;

function updateHeroView() {
	const selectedColor = colorData[currentColor];
	heroCar.style.opacity = "0";
	window.setTimeout(() => {
		heroCar.src = selectedColor[viewNames[currentView]];
		heroCar.alt = `${selectedColor.name} Tesla Model T from the ${viewNames[currentView]}`;
		viewLabel.textContent = `0${currentView + 1} / 03`;
		heroCar.style.opacity = "1";
	}, 140);
}

document.querySelectorAll(".color-choice").forEach((choice) => {
	choice.addEventListener("click", () => {
		currentColor = choice.dataset.color;
		currentView = 0;
		const selectedColor = colorData[choice.dataset.color];
		[heroCar, sideView, backView].forEach((image) => { image.style.opacity = "0"; });
		window.setTimeout(() => {
			heroCar.src = selectedColor.front; sideView.src = selectedColor.side; backView.src = selectedColor.back;
			heroCar.alt = `${selectedColor.name} Tesla Model T from the front`; sideView.alt = `${selectedColor.name} Tesla side view`; backView.alt = `${selectedColor.name} Tesla rear view`;
			viewLabel.textContent = "01 / 03";
			colorName.textContent = selectedColor.name;
			[heroCar, sideView, backView].forEach((image) => { image.style.opacity = "1"; });
		}, 180);
		document.querySelectorAll(".color-choice").forEach((item) => {
			const isSelected = item === choice; item.classList.toggle("is-active", isSelected); item.setAttribute("aria-pressed", isSelected);
		});
	});
});

document.querySelector("#previous-view").addEventListener("click", () => {
	currentView = (currentView + viewNames.length - 1) % viewNames.length;
	updateHeroView();
});

document.querySelector("#next-view").addEventListener("click", () => {
	currentView = (currentView + 1) % viewNames.length;
	updateHeroView();
});

const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", () => {
	const expanded = menuButton.getAttribute("aria-expanded") === "true";
	menuButton.setAttribute("aria-expanded", String(!expanded));
});
