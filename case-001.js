// ============================================================
// FILE TABS (Anatomy / Video / Quiz)
// ============================================================
const fileTabs = document.querySelectorAll('.file-tab');
const tabPanels = document.querySelectorAll('.tab-panel');

fileTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    fileTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    tabPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === 'panel-' + target) {
        // re-trigger the CSS animation each time it's opened
        panel.classList.add('active');
      }
    });
  });
});

// ============================================================
// VIDEO TAB — step data
// Edit this array once you have your real steps / timestamps / text.
// "time" is in seconds — where the video should jump to for that step.
// ============================================================
const steps = [
  { n: 1, time: 0,   text: "Placeholder text for step 1. This is where the description of what's happening at this stage of the procedure will go." },
  { n: 2, time: 20,  text: "Placeholder text for step 2 — swap this out once you've picked the real timestamp and description." },
  { n: 3, time: 45,  text: "Placeholder text for step 3 — this is a different bit of text so you can confirm it's actually changing." },
  { n: 4, time: 70,  text: "Placeholder text for step 4 — the video should have skipped ahead when you clicked this button." },
  { n: 5, time: 95,  text: "Placeholder text for step 5 — roughly the midpoint of the procedure." },
  { n: 6, time: 120, text: "Placeholder text for step 6 — getting into the later stages here." },
  { n: 7, time: 145, text: "Placeholder text for step 7 — almost done." },
  { n: 8, time: 170, text: "Placeholder text for step 8 — closing stages of the procedure." },
  { n: 9, time: 195, text: "Placeholder text for step 9 — final step. (This is also where the 3D model would finish rotating, once that's built.)" },
];

const stepRow = document.getElementById('stepRow');
const progressFill = document.getElementById('progressFill');
const stepNum = document.getElementById('stepNum');
const stepText = document.getElementById('stepText');
const ytFrame = document.getElementById('ytFrame');

let currentStep = 1;

// build the 9 step buttons
steps.forEach(step => {
  const btn = document.createElement('button');
  btn.className = 'step-btn';
  btn.textContent = step.n;
  btn.dataset.step = step.n;
  btn.addEventListener('click', () => goToStep(step.n));
  stepRow.appendChild(btn);
});

function goToStep(n) {
  currentStep = n;
  const stepData = steps.find(s => s.n === n);

  // update button states: earlier steps greyed out, current highlighted
  document.querySelectorAll('.step-btn').forEach(btn => {
    const btnStep = Number(btn.dataset.step);
    btn.classList.remove('visited', 'current');
    if (btnStep < n) btn.classList.add('visited');
    if (btnStep === n) btn.classList.add('current');
  });

  // progress bar fills up to this step's position
  const percent = ((n - 1) / (steps.length - 1)) * 100;
  progressFill.style.width = percent + '%';

  // update the readout text
  stepNum.textContent = n;
  stepText.innerHTML = stepData.text;

  // seek the embedded video to this step's timestamp
  seekVideo(stepData.time);
}

function seekVideo(seconds) {
  if (!ytFrame || !ytFrame.contentWindow) return;
  ytFrame.contentWindow.postMessage(JSON.stringify({
    event: 'command', func: 'seekTo', args: [seconds, true]
  }), '*');
  ytFrame.contentWindow.postMessage(JSON.stringify({
    event: 'command', func: 'playVideo', args: []
  }), '*');
}

// start on step 1 by default
goToStep(1);
