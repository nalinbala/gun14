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
// RESPONSIVE DIMENSIONS & DOT SIZES
// ==========================================
const svg = d3.select("#visual-stage");
const width = window.innerWidth;
const height = window.innerHeight;
const isMobileView = width < 768;

// Increased dot size drastically to match mockup
const radius = isMobileView ? 12 : 18;
svg.attr("width", width).attr("height", height);

// ==========================================
// RESTORED COLORS AND SCALES
// ==========================================
const COLOR_MALE = "#3e5c76";
const COLOR_FEMALE = "#ee6c4d";

const ageColorScale = d3
  .scaleLinear()
  .domain([6, 12, 18, 30, 45, 60, 68])
  .range([
    "#1e6b3c",
    "#4cb050",
    "#ffeb3b",
    "#ff9800",
    "#f44336",
    "#b71c1c",
    "#880e4f",
  ]);

// ==========================================
// YOUR ORIGINAL DATA
// ==========================================
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

// Connect your data to the D3 simulation engine!
const nodes = shootingData;

// ==========================================
// SIMULATION & DRAWING THE DOTS
// ==========================================
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "collide",
    d3
      .forceCollide()
      .radius(radius + 1.5)
      .iterations(2)
  )
  .force("x", d3.forceX(width / 2).strength(0.05))
  .force("y", d3.forceY(height / 2).strength(0.05));

// This draws the physical circles on the screen
const nodeElements = svg
  .append("g")
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", radius)
  .attr("fill", "#666")
  .attr("stroke", "#ffffff") // Restores the white outline
  .attr("stroke-width", 1.5); // Sets the thickness of the outline

// CRITICAL FIX 1: Create the invisible "labels" group!
// Appended after the circles so the text naturally draws on top of the dots.
svg.append("g").attr("id", "labels");

// This makes the circles move mathematically
simulation.on("tick", () => {
  nodeElements.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
});

/* ========================================= */
/* LABEL HELPER FUNCTIONS                    */
/* ========================================= */
/* LABEL HELPER FUNCTIONS                    */
/* ========================================= */

/* ========================================= */
/* LABEL HELPER FUNCTIONS                    */
/* ========================================= */
function clearLabels() {
  d3.select("#labels").selectAll("*").remove();
}

function addSvgLabel(text, x, y, size = "20px") {
  d3.select("#labels")
    .append("text")
    .attr("x", x)
    .attr("y", y)
    .attr("text-anchor", "middle")
    .style("font-size", isMobileView ? size : "26px")
    .style("font-weight", "bold")
    .style("fill", "#1a1a1a")
    .text(text);
}

/* ========================================= */
/* TRUE RESPONSIVE D3 FORCE FUNCTIONS        */
/* ========================================= */

function applyTotalForces() {
  clearLabels();
  restoreGenderView();

  // MATCHING MOCKUP 1: Tighter cluster, bold label right below it
  const yCenter = isMobileView ? height * 0.45 : height / 2;

  if (isMobileView) {
    addSvgLabel("60 Lives Lost", width / 2, yCenter + 150, "20px");
  } else {
    addSvgLabel("60 Lives Lost", width / 2, yCenter + 200, "26px");
  }

  simulation
    .force("x", d3.forceX(width / 2).strength(isMobileView ? 0.12 : 0.08))
    .force("y", d3.forceY(yCenter).strength(isMobileView ? 0.12 : 0.08))
    .alpha(1)
    .restart();
}

function restoreGenderView() {
  d3.selectAll("circle")
    .transition()
    .duration(500)
    .attr("fill", (d) => (d.gender === "M" ? COLOR_MALE : COLOR_FEMALE));
  document.getElementById("d3-legend").classList.add("active-legend");
  document.getElementById("d3-age-legend").classList.remove("active-legend");
}

function applyAgeForces() {
  clearLabels();
  d3.selectAll("circle")
    .transition()
    .duration(500)
    .attr("fill", (d) => ageColorScale(d.age));
  document.getElementById("d3-legend").classList.remove("active-legend");
  document.getElementById("d3-age-legend").classList.add("active-legend");

  if (isMobileView) {
    // MATCHING MOCKUP 2: Vertical Bar Chart / Histogram
    const bins = [
      { label: "0-10", max: 10 },
      { label: "11-20", max: 20 },
      { label: "21-30", max: 30 },
      { label: "31-40", max: 40 },
      { label: "41-50", max: 50 },
      { label: "51-60", max: 60 },
      { label: "61-70", max: 70 },
    ];

    // Mathematically sort and stack the dots into columns
    let ageSorted = [...nodes].sort((a, b) => a.age - b.age);
    let binCounts = [0, 0, 0, 0, 0, 0, 0];
    ageSorted.forEach((n) => {
      let bIndex = bins.findIndex((b) => n.age <= b.max);
      if (bIndex === -1) bIndex = 6;
      n.targetBin = bIndex;
      n.stackPos = binCounts[bIndex]++;
    });

    const colW = width / 8;
    const baseline = height * 0.7;
    const dotSpacing = radius * 2.1;

    bins.forEach((b, i) => {
      let xPos = (i + 1) * colW;

      // Rotated Bottom Labels
      d3.select("#labels")
        .append("text")
        .attr("x", xPos)
        .attr("y", baseline + 30)
        .attr("text-anchor", "end")
        .attr("transform", `rotate(-90, ${xPos}, ${baseline + 30})`)
        .style("font-size", "16px")
        .style("fill", "#1a1a1a")
        .text(b.label);

      // Top Number Counts
      let peakY = baseline - binCounts[i] * dotSpacing - 15;
      d3.select("#labels")
        .append("text")
        .attr("x", xPos)
        .attr("y", peakY)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("fill", "#1a1a1a")
        .text(binCounts[i]);
    });

    // High strength forces to lock them exactly into bar chart columns
    simulation
      .force("x", d3.forceX((d) => (d.targetBin + 1) * colW).strength(1))
      .force(
        "y",
        d3.forceY((d) => baseline - d.stackPos * dotSpacing).strength(1)
      )
      .alpha(1)
      .restart();
  } else {
    let ageScaleX = d3
      .scaleLinear()
      .domain([6, 68])
      .range([width * 0.1, width * 0.9]);
    simulation
      .force("x", d3.forceX((d) => ageScaleX(d.age)).strength(0.15))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .alpha(1)
      .restart();
  }
}

function applyGenderForces() {
  clearLabels();
  restoreGenderView();

  const xM = isMobileView ? width / 2 : width / 3;
  const xF = isMobileView ? width / 2 : (width / 3) * 2;
  const yM = isMobileView ? height * 0.35 : height / 2;
  const yF = isMobileView ? height * 0.7 : height / 2;

  if (isMobileView) {
    addSvgLabel("Male (54)", xM, yM + 140, "20px");
    addSvgLabel("Female (6)", xF, yF + 60, "20px");
  } else {
    addSvgLabel("Male (54)", xM, yM + 200);
    addSvgLabel("Female (6)", xF, yF + 200);
  }

  simulation
    .force("x", d3.forceX((d) => (d.gender === "M" ? xM : xF)).strength(0.1))
    .force("y", d3.forceY((d) => (d.gender === "M" ? yM : yF)).strength(0.1))
    .alpha(1)
    .restart();
}

function applyMotivationForces() {
  clearLabels();
  restoreGenderView();

  const xC = isMobileView ? width / 2 : width / 3;
  const xP = isMobileView ? width / 2 : (width / 3) * 2;
  const yC = isMobileView ? height * 0.35 : height / 2;
  const yP = isMobileView ? height * 0.7 : height / 2;

  if (isMobileView) {
    addSvgLabel("Organised Crime (46)", xC, yC + 130, "20px");
    addSvgLabel("Personal/Other (14)", xP, yP + 80, "20px");
  } else {
    addSvgLabel("Organised Crime (46)", xC, yC + 250);
    addSvgLabel("Personal/Other (14)", xP, yP + 200);
  }

  simulation
    .force(
      "x",
      d3.forceX((d) => (d.motive === "crime" ? xC : xP)).strength(0.1)
    )
    .force(
      "y",
      d3.forceY((d) => (d.motive === "crime" ? yC : yP)).strength(0.1)
    )
    .alpha(1)
    .restart();
}

function applyDistrictForces() {
  clearLabels();
  restoreGenderView();

  const districtsDesktop = [
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

  if (isMobileView) {
    // MOBILE VIEW: 3 Columns, NO NUMBERS OR BADGES
    const cols = 3;
    const colWidth = width / (cols + 1);
    const rowHeight = height * 0.18; // Tight, clean spacing
    const dotBaseY = height * 0.22;

    districtsDesktop.forEach((dist, i) => {
      let xPos = ((i % cols) + 1) * colWidth;
      let yPosLabel = dotBaseY + Math.floor(i / cols) * rowHeight + 50;

      d3.select("#labels")
        .append("text")
        .attr("x", xPos)
        .attr("y", yPosLabel)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#1a1a1a")
        .text(dist.charAt(0).toUpperCase() + dist.slice(1));
    });

    simulation
      .force(
        "x",
        d3
          .forceX((d) => {
            const i = districtsDesktop.indexOf(d.district);
            return ((i % cols) + 1) * colWidth;
          })
          .strength(0.8)
      )
      .force(
        "y",
        d3
          .forceY((d) => {
            const i = districtsDesktop.indexOf(d.district);
            return dotBaseY + Math.floor(i / cols) * rowHeight;
          })
          .strength(0.8)
      )
      .alpha(1)
      .restart();
  } else {
    // DESKTOP VIEW: Split into two rows of 5 WITH numbers
    const colsDesk = 5;
    const colWidthDesk = width / (colsDesk + 1);
    const rowHeightDesk = height * 0.32;
    const dotBaseYDesk = height * 0.4;

    districtsDesktop.forEach((dist, i) => {
      let xPos = ((i % colsDesk) + 1) * colWidthDesk;
      let yPosLabel =
        dotBaseYDesk + Math.floor(i / colsDesk) * rowHeightDesk + 90;

      const group = d3.select("#labels");
      group
        .append("text")
        .attr("x", xPos)
        .attr("y", yPosLabel)
        .attr("text-anchor", "middle")
        .style("font-size", "22px")
        .style("font-weight", "bold")
        .style("fill", "#1a1a1a")
        .text(dist.charAt(0).toUpperCase() + dist.slice(1));
      group
        .append("circle")
        .attr("cx", xPos)
        .attr("cy", yPosLabel + 35)
        .attr("r", 18)
        .style("fill", "#000");
      group
        .append("text")
        .attr("x", xPos)
        .attr("y", yPosLabel + 35)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("fill", "#fff")
        .style("font-size", "16px")
        .text(districtCounts[dist] || 0);
    });

    simulation
      .force(
        "x",
        d3
          .forceX((d) => {
            const i = districtsDesktop.indexOf(d.district);
            return ((i % colsDesk) + 1) * colWidthDesk;
          })
          .strength(0.8)
      )
      .force(
        "y",
        d3
          .forceY((d) => {
            const i = districtsDesktop.indexOf(d.district);
            return dotBaseYDesk + Math.floor(i / colsDesk) * rowHeightDesk;
          })
          .strength(0.8)
      )
      .alpha(1)
      .restart();
  }
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

  if (isMobileView) {
    // MOBILE VIEW: 3 Columns, NO NUMBERS OR BADGES
    const cols = 3;
    const colWidth = width / (cols + 1);
    const rowHeight = height * 0.18;
    const dotBaseY = height * 0.22;

    months.forEach((month, i) => {
      const xPos = ((i % cols) + 1) * colWidth;
      const yPosLabel = dotBaseY + Math.floor(i / cols) * rowHeight + 50;

      d3.select("#labels")
        .append("text")
        .attr("x", xPos)
        .attr("y", yPosLabel)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#1a1a1a")
        .text(shortMonths[i]);
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
            return dotBaseY + Math.floor(i / cols) * rowHeight;
          })
          .strength(0.8)
      )
      .alpha(1)
      .restart();
  } else {
    // DESKTOP VIEW: 6 columns, WITH badges
    const cols = 6;
    const colWidth = width / (cols + 1);
    const rowHeight = height * 0.32;
    const dotBaseY = height * 0.4;

    months.forEach((month, i) => {
      const xPos = ((i % cols) + 1) * colWidth;
      const yPosLabel = dotBaseY + Math.floor(i / cols) * rowHeight + 90;

      const group = d3.select("#labels");
      group
        .append("text")
        .attr("x", xPos)
        .attr("y", yPosLabel)
        .attr("text-anchor", "middle")
        .style("font-size", "22px")
        .style("font-weight", "bold")
        .style("fill", "#1a1a1a")
        .text(shortMonths[i]);
      group
        .append("circle")
        .attr("cx", xPos)
        .attr("cy", yPosLabel + 25)
        .attr("r", 18)
        .style("fill", "#000");
      group
        .append("text")
        .attr("x", xPos)
        .attr("y", yPosLabel + 25)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .style("fill", "#fff")
        .style("font-size", "16px")
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
            return dotBaseY + Math.floor(i / cols) * rowHeight;
          })
          .strength(0.8)
      )
      .alpha(1)
      .restart();
  }
}

/* ========================================= */
/* STRICT LEGEND SWAPPER                     */
/* ========================================= */

// 1. Force the correct default state when the page first loads
document.getElementById("d3-legend").classList.add("active-legend");
document.getElementById("d3-age-legend").classList.remove("active-legend");

// 2. Check every single step as the user scrolls
gsap.utils.toArray(".step").forEach((step, index) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top center", // Triggers when the text hits the middle
    onEnter: () => handleStepEnter(step),
    onEnterBack: () => handleStepEnter(step), // Handles scrolling upwards
    onLeaveBack: () => {
      // FIX: If we scroll all the way back up past the first step, hide the text!
      if (index === 0) {
        document
          .querySelectorAll(".step .content")
          .forEach((el) => el.classList.remove("active"));
      }
    },
  });
});

// 3. The Master Controller: Fires animations AND legends
function handleStepEnter(step) {
  const state = step.getAttribute("data-state");

  // CRITICAL FIX 2: Fade the HTML text in and out as you scroll!
  document
    .querySelectorAll(".step .content")
    .forEach((el) => el.classList.remove("active"));
  const currentContent = step.querySelector(".content");
  if (currentContent) {
    currentContent.classList.add("active");
  }

  // A. Fire the correct D3 physics layout based on the text section
  if (state === "state_total") applyTotalForces();
  else if (state === "state_age") applyAgeForces();
  else if (state === "state_gender") applyGenderForces();
  else if (state === "state_motivation") applyMotivationForces();
  else if (state === "state_district") applyDistrictForces();
  else if (state === "state_month") applyMonthForces();

  // B. Toggle the legends based on the current step
  if (state === "state_age" || step.id === "age-step") {
    document.getElementById("d3-legend").classList.remove("active-legend");
    document.getElementById("d3-age-legend").classList.add("active-legend");
  } else {
    document.getElementById("d3-age-legend").classList.remove("active-legend");
    document.getElementById("d3-legend").classList.add("active-legend");
  }
}

// 4. MASTER LEGEND VISIBILITY SWITCH
// Turns the legends on when you reach the D3 section,
// and hides them if you scroll back up to the intro canvas.
ScrollTrigger.create({
  trigger: ".d3-scrollytelling",
  start: "top center",
  onEnter: () => document.body.classList.add("show-legends"),
  onLeaveBack: () => document.body.classList.remove("show-legends"),
});
