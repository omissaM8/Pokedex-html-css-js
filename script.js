let UrlBase = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100";
let PokeInfo = document.getElementById("PokeContainer");
 
async function fetchPokemons() {
    const response = await fetch(UrlBase);
    const links = await response.json();
    const PokeLinks = links.results;
 
    // Mappa ogni Pokémon a una richiesta fetch e usa Promise.all per aspettare che tutte siano completate
    const fetchPromises = PokeLinks.map(LinkItem => fetch(LinkItem.url).then(res => res.json()));
 
    const pokemonsData = await Promise.all(fetchPromises);
 
    pokemonsData.forEach((data, index) => {
        const PokeId = index + 1; // Assumendo che l'API restituisca i Pokémon in ordine e partendo da 1
        const UrlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${PokeId}.gif`;
 
        const CreatePokemon = document.createElement("div");
        CreatePokemon.classList.add("PokemonInfo");
 
        CreatePokemon.innerHTML = `
            <div style="height:60px"><img src="${UrlImg}" class="img-fluid mx-auto"></div>
            <div>${data.name}</div>
        `;
 
        PokeInfo.appendChild(CreatePokemon);
        
        CreatePokemon.addEventListener('click', ()=>{
            ClickFunction(data, UrlImg);
        });
    });
}
 
fetchPokemons().catch(error => console.error('There was a problem fetching the Pokemon data:', error));



function ClickFunction(dataItem,UrlImage){
    const ContImg = document.getElementById("ImgContainer");
    const ContName = document.getElementById("NameContainer");
    const ContType = document.getElementById("TypeContainer");
    let TypeTemp = document.createElement("div");
    const TypeArray = dataItem.types;

    ContImg.innerHTML=`
        <div  class="d-flex justify-content-center w-100"><img src="${UrlImage}"></div>
    `
    ContName.innerHTML=`
        <div  class="d-flex justify-content-center w-100"><p>${dataItem.name}</p></div>
    `
    ContType.innerHTML = ``;
    TypeArray.forEach(type => {
        TypeTemp.innerHTML=`
        <div class="TypeDiv"><p>${dataItem.types[0].type.name}</p></div>
        <div class="TypeDiv"><p>${dataItem.types[1].type.name}</p></div>
        `
        ContType.appendChild(TypeTemp);
    })
}
