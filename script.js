
let characters = [];

function fetchCharactersFromServer() {
    return new Promise((resolve) => {
        const loadingDiv = document.getElementById('loading-message');
        if (loadingDiv) loadingDiv.style.display = 'block';
        
        setTimeout(() => {
            const serverData = [
                { name: "Dan Heng: 4-star", role: "Single-target Wind DPS (The Hunt)", lightCone: "In the Night" },
                { name: "Dan Heng: Imbibitor Lunae", role: "Imaginary Destruction DPS", lightCone: "Brighter Than the Sun" },
                { name: "Dan Heng: Permansor Terrae", role: "Wind Support / Sub-DPS", lightCone: "But the Battle Isn't Over" }
            ];
            
            if (loadingDiv) loadingDiv.style.display = 'none';
            resolve(serverData);
        }, 1000);
    });
}

function renderCharacters() {
    const container = document.getElementById('characters-container');
    if (!container) return;
    

    container.innerHTML = '';
    

    if (characters.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #888;">No characters yet. Add one! </p>';
        return;
    }
    

    characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <h3> ${escapeHtml(character.name)}</h3>
            <p><strong>Role:</strong> ${escapeHtml(character.role)}</p>
            <p><strong>Best Light Cone:</strong> ${escapeHtml(character.lightCone)}</p>
            <button class="delete-btn" onclick="deleteCharacter(${index})"> Delete</button>
        `;
        container.appendChild(card);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function addCharacter() {
    const nameInput = document.getElementById('char-name');
    const roleInput = document.getElementById('char-role');
    const lcInput = document.getElementById('char-lc');
    
    const name = nameInput?.value.trim();
    const role = roleInput?.value.trim();
    const lightCone = lcInput?.value.trim();
    

    if (!name) {
        alert(' Please enter character name!');
        return;
    }
    if (!role) {
        alert(' Please enter role!');
        return;
    }
    if (!lightCone) {
        alert(' Please enter best light cone!');
        return;
    }
    
    characters.push({ name, role, lightCone });
    

    renderCharacters();
    
   
    nameInput.value = '';
    roleInput.value = '';
    lcInput.value = '';
    
    console.log(` Added: ${name}`);
}

function deleteCharacter(index) {
    const deletedName = characters[index]?.name;
    characters.splice(index, 1);
    renderCharacters();
    console.log(` Deleted: ${deletedName}`);
}

async function initApp() {
    console.log(' Loading characters from server...');
    
    try {
        const serverCharacters = await fetchCharactersFromServer();
        characters = [...serverCharacters]; 
        renderCharacters();
        console.log(` Loaded ${characters.length} characters`);
    } catch (error) {
        console.error(' Error loading data:', error);
        const container = document.getElementById('characters-container');
        if (container) {
            container.innerHTML = '<p style="text-align: center; color: #ef4444;">Failed to load data. Please refresh.</p>';
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

window.addCharacter = addCharacter;
window.deleteCharacter = deleteCharacter;