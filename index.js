//////////////
// we have a basic skeleton here to help you start.
// if you dont want to use it you dont have to -
// just clear the file and start from scratch
//////////////

// notice in our html we have a node with ID "app"
// hint: use this reference later to inject data into your page
const app = document.getElementById('app');

// Select our HTML select box for sorting our data - (mentioned in html)
const dataSort = document.getElementById("data-sort");
// listen for change in state
dataSort.addEventListener("change", async (event) => {
  console.log("Data Sort Change");
  console.log(event.target.value);

  // re-fetching data from our API 
  const data = await getData();
  const sortedData = sortData(data, event.target.value);
  // re-render our app with the sorted data
  await renderUI(sortedData);
})

// Here we select our HTML select box for filtering our data
const dataFilter = document.getElementById("data-filter");

// FILTERS LISTENERS 
dataFilter.addEventListener("change", async (event) => {
  console.log("Data Filter Change");
  console.log(event.target.value);
  const data = await getData();
  const filteredData = filterData(data, event.target.value);
  await renderUI(filteredData);
})

//---FETCH ---- 
const API_SOURCE = 'https://api.nobelprize.org/2.1/nobelPrizes';

async function getData() {
  // This function extracts data from noble prize API
  // return: data from noble prize source
  let data = null;
  const response = await fetch(API_SOURCE);
  data = await response.json();
  return data;
}

function clearUI() {
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
}




async function renderUI(data) {

  clearUI();

  const { nobelPrizes } = data;
  const recordTemplate = document.getElementById("data-record-template");

  for (const prize of nobelPrizes){
  console.log(prize);
  console.log("here i am");
  console.log(prize.laureates[0].knownName.en);
   

    const card = Object.assign(document.createElement("div"),{ className: "item" });
    const cardContent = Object.assign(document.createElement("div"), { className: "content" });
    cardContent.innerHTML= ` Category<h2> ${prize.category.en} </h2> \
                            Name<h3> ${prize.laureates[0].knownName.en} </h3> \
                            Year<h3> ${prize.awardYear} </h3>  \
                            Sum <h3> ${prize.prizeAmount} </h3>`
                          
    card.appendChild(cardContent);
    app.appendChild(card);
   // app.appendChild(recordClone);
  } 
  
}


function filterData(data, key) {
  data.nobelPrizes = data.nobelPrizes.filter((prize) => {
    if (key === "chemistry") {
      return prize.category.en === "Chemistry";
    } else if (key === "physics") {
      return prize.category.en === "Physics";
    } else if (key === "literature") {
      return prize.category.en === "Literature";
    } else if (key === "peace") {
      return prize.category.en === "Peace";
    } else if (key === "physiology-medicine") {
      return prize.category.en === "Physiology or Medicine";
    } else {
      return true;
    }
  });
  return data;
}

function sortData(data, key) {
  data.nobelPrizes = data.nobelPrizes.sort((a, b) => {
    if (a.awardYear > b.awardYear) {
      return key === "oldest-first" ? 1 : -1;
    }
    if (a.awardYear < b.awardYear) {
      return key === "newest-first" ? -1 : 1;
    }
    return 0;
  })
  return data;
}



const data = await getData();
console.log(data);

await renderUI(data);
