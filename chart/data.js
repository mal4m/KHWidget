const ctx = document.getElementById('myChartLeft').getContext("2d");
const ctx2 = document.getElementById('myChartRight').getContext("2d");
// Create a radial gradient
// The inner circle is at x=300, y=300, with radius=200
// The outer circle is at x=100, y=100, with radius=70
const gradient1 = ctx.createRadialGradient(300, 300, 200, 300, 300, 300);

gradient1.addColorStop(1, "#30f93b");
gradient1.addColorStop(0, "#bfff13");

const gradient2 = ctx.createRadialGradient(2, 300, 200, 2, 300, 300);
gradient2.addColorStop(0, "#2f9fff");
gradient2.addColorStop(1, "#3a6bfe");

// Data calculations go here //
var health = document.getElementById("healthinput").value;
var completeHealth = document.getElementById("maxhealthinput").value;
var damageHealth = document.getElementById("damageinput").value;
var emptyHealth = completeHealth - health;

var magic = 2;
var completeMagic = 4;
var emptyMagic = completeMagic - magic;

var myChartLeft = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [health, damageHealth, emptyHealth],
      backgroundColor: [gradient1, '#800000', '#171928',],
      rotation: 180,
      borderWidth: 0,
      circumference: 180,
      cutout: 103,
              }],
          },
    options: {
      layout: {padding: 0,},
      hoverBorderWidth: 0,
      hoverOffset: 0,
      responsive: true,
      aspectRatio: .51,
      animation: {duration: 1500,},
      legend: {display: false,},
      plugins: {tooltip: {enabled: false,} },
      hover: {mode: null},
    }
});
var myChartRight = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [emptyMagic, magic],
      backgroundColor: ['#171928',gradient2,],
      borderWidth: 0,
      circumference: 180,
      cutout: 103,
              }],
         },
      options: {
        layout: {padding: 0,},
        hoverBorderWidth: 0,
        hoverOffset: 0,
        responsive: true,
        aspectRatio: .51,
        animation: {duration: 1500,},
        legend: {display: false,},
        plugins: {tooltip: {enabled: false,} },
        hover: {mode: null},
      }

});
var elV = document.getElementById("magicinput");
var elW = document.getElementById("maxmagicinput");

var elX = document.getElementById("maxhealthinput");
var elY = document.getElementById("healthinput");
var elZ = document.getElementById("damageinput");
function limit() {
elV.value=Math.min(Math.round(elW.value),elV.value);
elY.value=Math.min(Math.round(elX.value),elY.value);
elZ.value=Math.min(Math.round(elY.value),elZ.value);
}

elV.onchange=limit;
elW.onchange=limit;
elX.onchange=limit;
elY.onchange=limit;
elZ.onchange=limit;

// Health Input Functionality //
var healthinput = document.getElementById('healthinput');
var maxhealthinput = document.getElementById('maxhealthinput');
var damageinput = document.getElementById('damageinput');
healthinput.addEventListener('change', updateHealthChart);
maxhealthinput.addEventListener('change', updateHealthChart);
damageinput.addEventListener('change', updateHealthChart);

function updateHealthChart(){
myChartLeft.data.datasets[0].data[1] = damageinput.value;
myChartLeft.data.datasets[0].data[0] = healthinput.value - damageinput.value;
myChartLeft.data.datasets[0].data[2] = maxhealthinput.value - healthinput.value;
myChartLeft.update();
  }

// DMG UPDATE BUTTON //
const updateHP = document.getElementById('hpupdate');
updateHP.addEventListener('click', updateHealth);
updateHP.addEventListener('click', updateHealthChart);

function updateHealth(){
document.getElementById('damageinput').value = '0';
document.getElementById('healthinput').value = myChartLeft.data.datasets[0].data[0];
myChartLeft.update();
}

// HEAL UP BUTTON
const healHP = document.getElementById('healup');
healHP.addEventListener('click', updateHealth);
healHP.addEventListener('click', fillHP);
healHP.addEventListener('click', updateHealthChart);

function fillHP(){
document.getElementById('healthinput').value = document.getElementById("maxhealthinput").value;
myChartLeft.update();
}

// Magic Input functionality
const magicinput = document.getElementById('magicinput');
const maxmagicinput = document.getElementById('maxmagicinput');
magicinput.addEventListener('change', updateMagicChart);
maxmagicinput.addEventListener('change', updateMagicChart);

function updateMagicChart(){
myChartRight.data.datasets[0].data[0] = maxmagicinput.value - magicinput.value;
myChartRight.data.datasets[0].data[1] = magicinput.value;
myChartRight.update();}
