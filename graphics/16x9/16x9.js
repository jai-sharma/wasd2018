"use strict";

// Information elements
const gameTitle    = document.getElementById("game-title");
const runCategory  = document.getElementById("run-category");
const gamePlatform = document.getElementById("game-platform");
const gameYear     = document.getElementById("game-year");
const runEstimate  = document.getElementById("run-estimate");
const runners      = document.getElementById("runners");

// Timer element
const timer = document.getElementById("timer");

// Replicants
const schedule  = nodecg.Replicant("schedule");
const stopwatch = nodecg.Replicant("stopwatch");

schedule.on("change", (newVal, oldVal) => {
	const run = newVal.entries[newVal.current];

	if (!run) {
		console.log("Current run is empty");
	}

	gameTitle.textContent    = run.game;
	runCategory.textContent  = run.category;
	gamePlatform.textContent = run.gamePlatform;
	gameYear.textContent     = run.gameYear;
	runEstimate.textContent  = run.estimate;
	runners.textContent      = run.runner1;
});

// flash timer to mark start of timing
const flashTimer = () => {
	anime({
		// See graphics-base.css for color definitions
		targets: "#timer",
		backgroundColor: [
			{value: "#3d53ff"}, // UWCS Blue
			{value: "#fdd835"}  // UWCS Yellow
		],
		direction: "alternate",
		duration: 500,
		easing: "easeOutQuad"
	});
};

stopwatch.on("change", (newVal, oldVal) => {
	timer.textContent = newVal.time;

	// oldVal may be undefined if this is the first update of the Replicant
	if (!oldVal) {
		return;
	}

	// transition "reset" -> "running" = flash
	if (oldVal.displayState == "reset" && newVal.displayState == "running") {
		flashTimer();
	}
});


