let charactersList = document.getElementById('charactersList'); /* ul */
let searchInput = document.getElementById('searchInput'); /* input */
let hpcharacter = [];

searchInput.addEventListener('keyup', (e) => {
    const searchCharacter = e.target.value.toLowerCase();
    console.log(searchCharacter)
    const filterCharacters = hpcharacter.filter( character => {
        return(
            character.name.toLowerCase().includes(searchCharacter) || 
            character.house.toLowerCase().includes((searchCharacter))
        );
    });
    display(filterCharacters);
});
const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.onrender.com/api/characters');
        hpcharacter = await res.json();
        display(hpcharacter);
        //console.log(data);
    } catch(e) {
        console.log(e);
    }
};

const display = (characters) => {
    const htmlString = characters.map((character) => {
        if(character.house === "" && character.image === "") {
            return `
            <li class="card">
                <h2>No image was found!</h2> 
                <h2>Name: ${character.name}</h2>
                <h2>No house was found!</h2>
            </li>`
        }
        if(character.image === "") {
            return `
            <li class="card">
                <h2>No image was found!</h2> 
                <h2>Name: ${character.name}</h2>
                <h2>House: ${character.house}</h2>
            </li>
        `;
        } 
        if(character.house === "") {
            return `
            <li class="card">
                <img src=${character.image} alt="${character.name} image" />
                <h2>Name: ${character.name}</h2>
                <h2>No house was found!</h2>
            </li>`
        } else {
            return `
            <li class="card">
                <img src=${character.image} alt="${character.name} image" /> 
                <h2>Name: ${character.name}</h2>
                <h2>House: ${character.house}</h2>
            </li>
        `;
        }
    }).join('');
    charactersList.innerHTML = htmlString;
}

loadCharacters();