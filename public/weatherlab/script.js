const $ = (id) => document.getElementById(id);
const cityData = {
  Seattle:{country:'United States',temp:16,feels:14,condition:'Partly cloudy',wind:12,humidity:68,pressure:1016,rain:24},
  London:{country:'United Kingdom',temp:14,feels:12,condition:'Cloudy',wind:16,humidity:74,pressure:1012,rain:38},
  Tokyo:{country:'Japan',temp:22,feels:23,condition:'Mostly sunny',wind:9,humidity:55,pressure:1018,rain:12},
  Agra:{country:'India',temp:27,feels:28,condition:'Clear skies',wind:8,humidity:42,pressure:1014,rain:5},
  Mumbai:{country:'India',temp:30,feels:33,condition:'Partly cloudy',wind:14,humidity:71,pressure:1009,rain:18},
  Paris:{country:'France',temp:17,feels:16,condition:'Light clouds',wind:11,humidity:61,pressure:1015,rain:20},
  Sydney:{country:'Australia',temp:24,feels:25,condition:'Sunny',wind:13,humidity:59,pressure:1017,rain:9}
};
let activeCity='Seattle', fahrenheit=false, climateChart, rainChart, pressureChart;
const palette={grid:'rgba(150,160,175,.12)',ticks:'#7f8793',temp:'#91d5f2',humidity:'#b7a5f4'};
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function renderCity(city){
  const data=cityData[city];if(!data){toast('City not found in this demo. Try Seattle, London, Tokyo, Agra, Mumbai, Paris or Sydney.');return}
  activeCity=city;
  $('cityName').textContent=`${city}, ${data.country}`;
  $('temperature').textContent=fahrenheit?Math.round(data.temp*9/5+32):data.temp;
  $('feels').textContent=(fahrenheit?Math.round(data.feels*9/5+32):data.feels)+'°';
  $('condition').textContent=data.condition;
  $('wind').innerHTML=`${data.wind} <em>km/h</em>`;
  $('humidity').innerHTML=`${data.humidity}<em>%</em>`;
  $('pressure').innerHTML=`${data.pressure}<em> hPa</em>`;
  $('rain').innerHTML=`${data.rain}<em>%</em>`;
  document.querySelectorAll('.saved-city').forEach(b=>b.classList.toggle('active',b.dataset.city===city));
  if(climateChart){const offset=(data.temp-16);climateChart.data.datasets[0].data=climateChart.data.datasets[0].data.map((v,i)=>v+offset+Math.sin(i)*.35);climateChart.data.datasets[1].data=climateChart.data.datasets[1].data.map(v=>Math.max(20,Math.min(95,v+(data.humidity-68)*.35)));climateChart.update();}
  if(rainChart){rainChart.data.datasets[0].data=[data.rain*.35,data.rain*.7,data.rain,data.rain*.8,data.rain*.55];rainChart.update();}
}
function makeLineChart(id,labels,datasets,extra={}){
  return new Chart($(id),{type:'line',data:{labels,datasets},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{backgroundColor:'#11151c',borderColor:'#343b46',borderWidth:1,titleColor:'#fff',bodyColor:'#d8dde5',padding:10,displayColors:true}},elements:{line:{tension:.38,borderWidth:2},point:{radius:0,hoverRadius:4,hitRadius:12}},scales:{x:{grid:{display:false},ticks:{color:palette.ticks,font:{size:9},maxRotation:0}},y:{grid:{color:palette.grid},ticks:{color:palette.ticks,font:{size:9}},...extra.y},...(extra.scales||{})}},});
}
function initCharts(){
 const labels=['12 AM','03 AM','06 AM','09 AM','12 PM','03 PM','06 PM','09 PM'];
 climateChart=makeLineChart('climateChart',labels,[
  {label:'Temperature',data:[11,10,12,15,18,19,17,14],borderColor:palette.temp,backgroundColor:'rgba(145,213,242,.10)',fill:true,yAxisID:'y'},
  {label:'Humidity',data:[79,82,76,70,63,58,64,68],borderColor:palette.humidity,backgroundColor:'transparent',fill:false,yAxisID:'y1'}
 ],{scales:{y1:{position:'right',min:0,max:100,grid:{display:false},ticks:{color:palette.ticks,font:{size:9},callback:v=>v+'%'}},y:{ticks:{callback:v=>v+'°'}}}});
 rainChart=makeLineChart('rainChart',['09 AM','12 PM','03 PM','06 PM','09 PM'],[{label:'Rain chance',data:[12,18,24,20,13],borderColor:'#91d5f2',backgroundColor:'rgba(145,213,242,.12)',fill:true} ],{y:{min:0,max:60,ticks:{display:false}}});
 pressureChart=makeLineChart('pressureChart',labels,[{label:'Pressure',data:[1012,1013,1014,1015,1016,1017,1016,1016],borderColor:'#91d5f2',backgroundColor:'rgba(145,213,242,.10)',fill:true}],{y:{ticks:{callback:v=>v+' hPa'}}});
}
$('searchBtn').addEventListener('click',()=>{const city=$('citySearch').value.trim();if(city){const match=Object.keys(cityData).find(c=>c.toLowerCase()===city.toLowerCase());if(match){renderCity(match);toast(`Showing ${match} weather`)}else toast('Try Seattle, London, Tokyo, Agra, Mumbai, Paris or Sydney.')}});
$('citySearch').addEventListener('keydown',e=>{if(e.key==='Enter')$('searchBtn').click()});
$('savedCities').addEventListener('click',e=>{const button=e.target.closest('[data-city]');if(button)renderCity(button.dataset.city)});
$('unitToggle').addEventListener('click',()=>{fahrenheit=!fahrenheit;$('unitToggle').textContent=fahrenheit?'°F':'°C';renderCity(activeCity);document.querySelectorAll('.day-card>b').forEach((el,i)=>{const c=[16,18,15,17,13,18,20][i];el.textContent=(fahrenheit?Math.round(c*9/5+32):c)+'°'});});
$('themeToggle').addEventListener('click',()=>{document.body.classList.toggle('light');$('themeToggle').textContent=document.body.classList.contains('light')?'☀':'◐'});
$('addCity').addEventListener('click',()=>{const name=prompt('Enter a demo city: Seattle, London, Tokyo, Agra, Mumbai, Paris or Sydney');if(!name)return;const city=Object.keys(cityData).find(c=>c.toLowerCase()===name.trim().toLowerCase());if(!city){toast('That city is not in the demo dataset.');return}let button=document.querySelector(`[data-city="${city}"]`);if(!button){button=document.createElement('button');button.className='saved-city';button.dataset.city=city;button.innerHTML=`<i></i><span>${city}<small>${cityData[city].country}</small></span><b>${cityData[city].temp}°</b>`;$('savedCities').append(button)}renderCity(city)});
$('refreshCities').addEventListener('click',()=>toast('Demo city conditions refreshed.'));
document.querySelectorAll('.tabs button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));button.classList.add('active');const mode=button.dataset.range;const cards=[...document.querySelectorAll('.day-card')];cards.forEach((card,i)=>{if(mode==='today'){card.style.opacity='1'}else if(mode==='tomorrow'){card.style.opacity=i===1?'1':'.48'}else card.style.opacity='1'});if(mode==='tomorrow')toast('Tomorrow forecast highlighted');if(mode==='week')toast('7-day forecast selected')}));
$('chartRange').addEventListener('change',e=>{const week=e.target.value==='7';climateChart.data.labels=week?['Thu','Fri','Sat','Sun','Mon','Tue','Wed']:['12 AM','03 AM','06 AM','09 AM','12 PM','03 PM','06 PM','09 PM'];climateChart.data.datasets[0].data=week?[14,15,17,13,18,20,19]:[11,10,12,15,18,19,17,14];climateChart.data.datasets[1].data=week?[70,74,65,81,62,58,60]:[79,82,76,70,63,58,64,68];climateChart.update();toast(week?'Showing 7-day trend':'Showing 24-hour trend')});
initCharts();
