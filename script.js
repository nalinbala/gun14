gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. GSAP CANVAS INTRO SEQUENCE
// ==========================================
const canvas = document.getElementById("shooting-canvas");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const frameCount = 33;
const currentFrame = (index) => {
  let frameNumber = (index + 1).toString().padStart(2, "0");
  return `./assets/images/frame_${frameNumber}.webp`;
};

const images = [];
const shootingFlow = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(shootingFlow, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: ".intro-sequence",
    start: "top top",
    end: "+=2000",
    scrub: 0.5,
    pin: true,
  },
  onUpdate: renderIntro,
});

images[0].onload = renderIntro;

function renderIntro() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[Math.round(shootingFlow.frame)], 0, 0);
}

// ==========================================
// 2. D3.JS DATA VISUALIZATION
// ==========================================
const svg = d3.select("#visual-stage");
const width = 1920;
const height = 1080;
// Make circles almost twice as large on mobile devices!
const radius = window.innerWidth < 768 ? 32 : 18;

// Colors matching your palette
const COLOR_MALE = "#3E5C76";
const COLOR_FEMALE = "#EE6C4D";

// ADD THIS: Age Color Scale based on your image
const ageColorScale = d3
  .scaleLinear()
  .domain([6, 12, 18, 30, 45, 60, 68]) // Input ages from image
  .range([
    "#1e6b3c",
    "#4cb050",
    "#ffeb3b",
    "#ff9800",
    "#f44336",
    "#b71c1c",
    "#880e4f",
  ]) // Matching colors
  .interpolate(d3.interpolateRgb); // Smoothly interpolates the RGB colors

let simulation;
let nodes;

// The Data
const shootingData = [
  {
    id: "m_01",
    age: 26,
    gender: "M",
    motive: "crime",
    district: "matara",
    month: "January",
  },
  {
    id: "m_02",
    age: 36,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "January",
  },
  {
    id: "m_03",
    age: 20,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "January",
  },
  {
    id: "m_04",
    age: 42,
    gender: "M",
    motive: "personal",
    district: "mannar",
    month: "January",
  },
  {
    id: "m_05",
    age: 61,
    gender: "M",
    motive: "personal",
    district: "mannar",
    month: "January",
  },
  {
    id: "m_06",
    age: 24,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "January",
  },
  {
    id: "m_07",
    age: 55,
    gender: "M",
    motive: "personal",
    district: "galle",
    month: "January",
  },
  {
    id: "m_08",
    age: 24,
    gender: "M",
    motive: "personal",
    district: "galle",
    month: "January",
  },
  {
    id: "m_09",
    age: 39,
    gender: "M",
    motive: "personal",
    district: "galle",
    month: "January",
  },
  {
    id: "m_10",
    age: 35,
    gender: "M",
    motive: "personal",
    district: "gampaha",
    month: "February",
  },
  {
    id: "m_11",
    age: 44,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "February",
  },
  {
    id: "m_12",
    age: 36,
    gender: "M",
    motive: "crime",
    district: "hambantota",
    month: "February",
  },
  {
    id: "m_13",
    age: 9,
    gender: "M",
    motive: "crime",
    district: "hambantota",
    month: "February",
  },
  {
    id: "f_01",
    age: 6,
    gender: "F",
    motive: "crime",
    district: "hambantota",
    month: "February",
  },
  {
    id: "m_14",
    age: 43,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "February",
  },
  {
    id: "m_15",
    age: 40,
    gender: "M",
    motive: "crime",
    district: "gampaha",
    month: "February",
  },
  {
    id: "m_16",
    age: 38,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "February",
  },
  {
    id: "f_02",
    age: 9,
    gender: "F",
    motive: "personal",
    district: "kurunegala",
    month: "February",
  },
  {
    id: "m_17",
    age: 61,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "March",
  },
  {
    id: "m_18",
    age: 45,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "March",
  },
  {
    id: "m_19",
    age: 28,
    gender: "M",
    motive: "crime",
    district: "matara",
    month: "March",
  },
  {
    id: "m_20",
    age: 29,
    gender: "M",
    motive: "crime",
    district: "matara",
    month: "March",
  },
  {
    id: "m_21",
    age: 61,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "April",
  },
  {
    id: "m_22",
    age: 61,
    gender: "M",
    motive: "personal",
    district: "gampaha",
    month: "April",
  },
  {
    id: "m_23",
    age: 39,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "April",
  },
  {
    id: "m_24",
    age: 35,
    gender: "M",
    motive: "crime",
    district: "kalutara",
    month: "April",
  },
  {
    id: "m_25",
    age: 46,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "May",
  },
  {
    id: "m_26",
    age: 52,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "May",
  },
  {
    id: "m_27",
    age: 19,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "May",
  },
  {
    id: "m_28",
    age: 43,
    gender: "M",
    motive: "personal",
    district: "colombo",
    month: "May",
  },
  {
    id: "m_29",
    age: 26,
    gender: "M",
    motive: "crime",
    district: "hambantota",
    month: "June",
  },
  {
    id: "m_30",
    age: 40,
    gender: "M",
    motive: "crime",
    district: "hambantota",
    month: "June",
  },
  {
    id: "m_31",
    age: 22,
    gender: "M",
    motive: "crime",
    district: "ratnapura",
    month: "June",
  },
  {
    id: "m_32",
    age: 50,
    gender: "M",
    motive: "crime",
    district: "gampaha",
    month: "July",
  },
  {
    id: "m_33",
    age: 45,
    gender: "M",
    motive: "crime",
    district: "gampaha",
    month: "July",
  },
  {
    id: "m_34",
    age: 22,
    gender: "M",
    motive: "personal",
    district: "gampaha",
    month: "July",
  },
  {
    id: "f_03",
    age: 30,
    gender: "F",
    motive: "crime",
    district: "puttalam",
    month: "July",
  },
  {
    id: "m_35",
    age: 23,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "July",
  },
  {
    id: "m_36",
    age: 32,
    gender: "M",
    motive: "personal",
    district: "hambantota",
    month: "August",
  },
  {
    id: "m_37",
    age: 23,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "August",
  },
  {
    id: "m_38",
    age: 23,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "August",
  },
  {
    id: "m_39",
    age: 46,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "August",
  },
  {
    id: "m_40",
    age: 45,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "August",
  },
  {
    id: "m_41",
    age: 57,
    gender: "M",
    motive: "crime",
    district: "kalutara",
    month: "August",
  },
  {
    id: "m_42",
    age: 21,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "August",
  },
  {
    id: "m_43",
    age: 55,
    gender: "M",
    motive: "crime",
    district: "kalutara",
    month: "August",
  },
  {
    id: "m_44",
    age: 35,
    gender: "M",
    motive: "personal",
    district: "puttalam",
    month: "August",
  },
  {
    id: "m_45",
    age: 26,
    gender: "M",
    motive: "personal",
    district: "colombo",
    month: "September",
  },
  {
    id: "m_46",
    age: 58,
    gender: "M",
    motive: "personal",
    district: "hambantota",
    month: "September",
  },
  {
    id: "m_47",
    age: 28,
    gender: "M",
    motive: "crime",
    district: "hambantota",
    month: "October",
  },
  {
    id: "f_04",
    age: 28,
    gender: "F",
    motive: "crime",
    district: "hambantota",
    month: "October",
  },
  {
    id: "m_48",
    age: 38,
    gender: "M",
    motive: "crime",
    district: "matara",
    month: "October",
  },
  {
    id: "m_49",
    age: 54,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "November",
  },
  {
    id: "m_50",
    age: 43,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "November",
  },
  {
    id: "f_05",
    age: 48,
    gender: "F",
    motive: "crime",
    district: "galle",
    month: "November",
  },
  {
    id: "f_06",
    age: 59,
    gender: "F",
    motive: "crime",
    district: "hambantota",
    month: "November",
  },
  {
    id: "m_51",
    age: 68,
    gender: "M",
    motive: "crime",
    district: "hambantota",
    month: "November",
  },
  {
    id: "m_52",
    age: 34,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "December",
  },
  {
    id: "m_53",
    age: 47,
    gender: "M",
    motive: "crime",
    district: "galle",
    month: "December",
  },
  {
    id: "m_54",
    age: 26,
    gender: "M",
    motive: "crime",
    district: "colombo",
    month: "December",
  },
];

initD3Physics(shootingData);

function initD3Physics(data) {
  nodes = data;

  nodes.forEach((d) => {
    d.x = width / 2;
    d.y = height / 2;
  });

  const circles = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("id", (d) => d.id)
    .attr("r", radius)
    .attr("fill", (d) => (d.gender === "M" ? COLOR_MALE : COLOR_FEMALE))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);

  const labelGroup = svg.append("g").attr("id", "labels");

  simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-15))
    .force(
      "collide",
      d3
        .forceCollide()
        .radius(radius + 2)
        .iterations(4)
    )
    .on("tick", ticked);

  function ticked() {
    circles
      .attr(
        "cx",
        (d) => (d.x = Math.max(radius, Math.min(width - radius, d.x)))
      )
      .attr(
        "cy",
        (d) => (d.y = Math.max(radius, Math.min(height - radius, d.y)))
      );
  }

  const states = [
    { name: "state_total", func: applyTotalForces },
    { name: "state_age", func: applyAgeForces },
    { name: "state_gender", func: applyGenderForces },
    { name: "state_motivation", func: applyMotivationForces },
    { name: "state_district", func: applyDistrictForces },
    { name: "state_month", func: applyMonthForces }, // ADDED THIS LINE
  ];

  // Trigger for the specific text sections
  states.forEach((state) => {
    ScrollTrigger.create({
      trigger: `.step[data-state='${state.name}']`,
      start: "top center",
      end: "bottom center", // Tells GSAP when the section is "over"
      toggleClass: {
        targets: `.step[data-state='${state.name}'] .content`,
        className: "active",
      }, // Fades text in and out
      onEnter: state.func,
      onEnterBack: state.func,
    });
  });

  // NEW: Trigger to show the legend only when inside the D3 section
  // FIXED: Tells the body when to reveal the active legend
  ScrollTrigger.create({
    trigger: ".d3-scrollytelling",
    start: "top center",
    end: "bottom top",
    toggleClass: { targets: "body", className: "show-legends" },
  });

  applyTotalForces();
}

/* ========================================= */
/* LABEL HELPER FUNCTIONS (RESTORED)         */
/* ========================================= */
function clearLabels() {
  d3.select("#labels").selectAll("*").remove();
}

function addSvgLabel(text, x, y) {
  d3.select("#labels")
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .style("font-size", "26px")
    .style("font-weight", "bold")
    .style("fill", "#1a1a1a")
    .text(text);
}

function applyTotalForces() {
  clearLabels();
  restoreGenderView();
  addSvgLabel("60 Lives Lost", width / 2, height / 2 + 200);
  simulation
    .force("x", d3.forceX(width / 2).strength(0.08))
    .force("y", d3.forceY(height / 2).strength(0.08))
    .alpha(1)
    .restart();
}

// NEW: UTILITY FUNCTION TO RESTORE GENDER VIEW
function restoreGenderView() {
  d3.selectAll("circle")
    .transition()
    .duration(500)
    .attr("fill", (d) => (d.gender === "M" ? COLOR_MALE : COLOR_FEMALE));

  // Uses new active-legend class
  document.getElementById("d3-legend").classList.add("active-legend");
  document.getElementById("d3-age-legend").classList.remove("active-legend");
}

function applyAgeForces() {
  clearLabels();

  d3.selectAll("circle")
    .transition()
    .duration(500)
    .attr("fill", (d) => ageColorScale(d.age));

  // Swaps the active-legend class
  document.getElementById("d3-legend").classList.remove("active-legend");
  document.getElementById("d3-age-legend").classList.add("active-legend");

  let ageScale = d3.scaleLinear().domain([6, 68]).range([300, 1600]);
  simulation
    .force("x", d3.forceX((d) => ageScale(d.age)).strength(0.15))
    .force("y", d3.forceY(height / 2).strength(0.05))
    .alpha(1)
    .restart();
}

/* ========================================= */
/* ADAPTIVE D3 FORCE FUNCTIONS               */
/* ========================================= */

/* ========================================= */
/* ADAPTIVE D3 FORCE FUNCTIONS - FIXED       */
/* ========================================= */

// This helper checks the width every time a scroll happens

/* ========================================= */
/* ADAPTIVE D3 FORCE FUNCTIONS - RESIZED     */
/* ========================================= */

/* ========================================= */
/* ADAPTIVE D3 FORCE FUNCTIONS - RESIZED     */
/* ========================================= */

const getMobileState = () => window.innerWidth < 768;

function applyGenderForces() {
  clearLabels();
  restoreGenderView();
  const mobile = getMobileState();

  // Side-by-side layout for both Desktop AND Mobile!
  const xM = mobile ? width * 0.35 : width / 3;
  const xF = mobile ? width * 0.75 : (width / 3) * 2;
  const yBase = mobile ? 450 : height / 2;

  addSvgLabel("Male (54)", xM, yBase + (mobile ? 260 : 200));
  addSvgLabel("Female (6)", xF, yBase + (mobile ? 260 : 200));

  simulation
    .force("x", d3.forceX((d) => (d.gender === "M" ? xM : xF)).strength(0.1))
    .force("y", d3.forceY(yBase).strength(0.1))
    .alpha(1)
    .restart();
}

function applyMotivationForces() {
  clearLabels();
  restoreGenderView();
  const mobile = getMobileState();

  const xC = mobile ? width * 0.35 : width / 3;
  const xP = mobile ? width * 0.75 : (width / 3) * 2;
  const yBase = mobile ? 450 : height / 2;

  addSvgLabel("Organised Crime (46)", xC, yBase + (mobile ? 280 : 250));
  addSvgLabel("Personal/Other (14)", xP, yBase + (mobile ? 280 : 200));

  simulation
    .force(
      "x",
      d3.forceX((d) => (d.motive === "crime" ? xC : xP)).strength(0.1)
    )
    .force("y", d3.forceY(yBase).strength(0.1))
    .alpha(1)
    .restart();
}

function applyDistrictForces() {
  clearLabels();
  restoreGenderView();
  const districts = [
    "colombo",
    "galle",
    "hambantota",
    "gampaha",
    "matara",
    "kalutara",
    "puttalam",
    "mannar",
    "kurunegala",
    "ratnapura",
  ];
  const districtCounts = {};
  nodes.forEach(
    (d) => (districtCounts[d.district] = (districtCounts[d.district] || 0) + 1)
  );

  const mobile = getMobileState();
  const cols = mobile ? 3 : 5;
  const colWidth = width / (cols + 1);

  // Adjusted spacing to fit the larger mobile dots
  const rowHeight = mobile ? 250 : 0;
  const dotBaseY = mobile ? 180 : height / 2 - 50;
  const labelBaseY = mobile ? 310 : height / 2 + 180;

  districts.forEach((dist, i) => {
    let xPos, yPos;
    if (mobile) {
      xPos = ((i % cols) + 1) * colWidth;
      yPos = Math.floor(i / cols) * rowHeight + labelBaseY;
    } else {
      xPos = d3
        .scalePoint()
        .domain(districts)
        .range([150, width - 150])(dist);
      yPos = labelBaseY;
    }

    const group = d3.select("#labels");
    group
      .append("text")
      .attr("x", xPos)
      .attr("y", yPos)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .style("font-weight", "bold")
      .text(dist.charAt(0).toUpperCase() + dist.slice(1));
    group
      .append("circle")
      .attr("cx", xPos)
      .attr("cy", yPos + 35)
      .attr("r", 18)
      .style("fill", "#000");
    group
      .append("text")
      .attr("x", xPos)
      .attr("y", yPos + 35)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("fill", "#fff")
      .text(districtCounts[dist] || 0);
  });

  simulation
    .force(
      "x",
      d3
        .forceX((d) => {
          const i = districts.indexOf(d.district);
          const xTarget = ((i % cols) + 1) * colWidth;
          return mobile
            ? xTarget
            : d3
                .scalePoint()
                .domain(districts)
                .range([150, width - 150])(d.district);
        })
        .strength(0.8)
    )
    .force(
      "y",
      d3
        .forceY((d) => {
          const i = districts.indexOf(d.district);
          return mobile
            ? Math.floor(i / cols) * rowHeight + dotBaseY
            : dotBaseY;
        })
        .strength(0.8)
    )
    .alpha(1)
    .restart();
}

function applyMonthForces() {
  clearLabels();
  restoreGenderView();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthCounts = {};
  nodes.forEach(
    (d) => (monthCounts[d.month] = (monthCounts[d.month] || 0) + 1)
  );

  const mobile = getMobileState();
  const cols = mobile ? 3 : 6;
  const colWidth = width / (cols + 1);

  // Adjusted spacing to fit the larger mobile dots
  const rowHeight = mobile ? 250 : 350;
  const dotBaseY = mobile ? 180 : 350;
  const labelBaseY = mobile ? 310 : 490;

  months.forEach((month, i) => {
    const xPos = ((i % cols) + 1) * colWidth;
    const yPos = Math.floor(i / cols) * rowHeight + labelBaseY;

    const group = d3.select("#labels");
    group
      .append("text")
      .attr("x", xPos)
      .attr("y", yPos)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .style("font-weight", "bold")
      .text(shortMonths[i]);
    group
      .append("circle")
      .attr("cx", xPos)
      .attr("cy", yPos + 35)
      .attr("r", 18)
      .style("fill", "#000");
    group
      .append("text")
      .attr("x", xPos)
      .attr("y", yPos + 35)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .style("fill", "#fff")
      .text(monthCounts[month] || 0);
  });

  simulation
    .force(
      "x",
      d3
        .forceX((d) => {
          const i = months.indexOf(d.month);
          return ((i % cols) + 1) * colWidth;
        })
        .strength(0.8)
    )
    .force(
      "y",
      d3
        .forceY((d) => {
          const i = months.indexOf(d.month);
          return Math.floor(i / cols) * rowHeight + dotBaseY;
        })
        .strength(0.8)
    )
    .alpha(1)
    .restart();
}

/* ========================================= */
/* STRICT LEGEND SWAPPER                     */
/* ========================================= */

// 1. Force the correct default state when the page first loads
document.getElementById("d3-legend").classList.add("active-legend");
document.getElementById("d3-age-legend").classList.remove("active-legend");

// 2. Check every single step as the user scrolls
gsap.utils.toArray(".step").forEach((step) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top center", // Triggers when the text hits the middle
    onEnter: () => toggleLegends(step),
    onEnterBack: () => toggleLegends(step), // Handles scrolling upwards
  });
});

// 3. The logic: Only show Age legend if on the Age step!
function toggleLegends(step) {
  // Check if the current step is the Age section
  if (
    step.id === "age-step" ||
    step.getAttribute("data-state") === "state_age"
  ) {
    document.getElementById("d3-legend").classList.remove("active-legend");
    document.getElementById("d3-age-legend").classList.add("active-legend");
  } else {
    // For every other section (Total, Gender, Motives, etc.), show Male/Female
    document.getElementById("d3-age-legend").classList.remove("active-legend");
    document.getElementById("d3-legend").classList.add("active-legend");
  }
}
