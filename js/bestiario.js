// bestiario.js
let currentZoom = 2;
let currentCoords = { x: 0, y: 0, z: 7 };

function openMap(x, y, z) {
    const url = `https://tibiamaps.io/map#${x},${y},${z}:2`;
    const windowFeatures = "width=1024,height=768,scrollbars=yes,resizable=yes";
    window.open(url, "TibiaMapWindow", windowFeatures);
}

function filterCreatures(points) {
    const container = document.getElementById('creaturesContainer');
    container.innerHTML = '';

    document.querySelectorAll('.charm-points-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });

    event.target.classList.add('active');

    for (const [name, data] of Object.entries(CREATURES)) {
        const isSpecial = data.isSpecial === true;

        if (
            (points === 'special' && isSpecial) ||  // Mostra apenas especiais
            (points !== 'special' && !isSpecial && data.charmPoints === points)  // Mostra só normais
        ) {

            let bombSpotsButtons = '';
            if (data.bombLocationCoordinates && data.bombLocationCoordinates.length > 0) {
                bombSpotsButtons = data.bombLocationCoordinates.map((coords, index) => `
                    <button class="map-button" onclick="openMap(${coords[0]}, ${coords[1]}, ${coords[2]})">
                        Spot ${index + 1}
                    </button>
                `).join(' ');
            }

            const card = document.createElement('div');
            card.className = 'creature-card';

            card.innerHTML = `
                <div class="creature-gif">
                    <img src="${data.gif}" alt="${name}" onerror="this.src='gifs/default.gif'">
                </div>
                <div class="creature-name">${name}</div>
                <div class="creature-info">
                    <p><img src="imagens/charm.png" style="width: 16px; margin-right: 5px; vertical-align: middle;">
                    <span class="info-label">Charm Points:</span> ${data.charmPoints}</p>

                    <p><img src="imagens/hp.png" style="width: 16px; margin-right: 5px; vertical-align: middle;">
                    <span class="info-label"> HP:</span> ${data.hp}</p>

                    <p><img src="imagens/${data.weakness}.png" style="width: 16px; margin-right: 5px; vertical-align: middle;">
                    <span class="info-label"> Fraqueza:</span> ${data.weakness}</p>

                    <p><span class="info-label">Respawn:</span> ${data.respawn}</p>

                    <p><span class="info-label">Bomb:</span> ${data.bomb.viable} (${data.bomb.type})
                    <img src="imagens/${data.typeWeakness}.png" style="width: 16px; margin-right: 5px; vertical-align: middle;"></p>

                    <p><span class="info-label">Melhor Local:</span> ${data.bestLocation}
                    <button class="map-button" onclick="openMap(${data.bestLocationCoordinates[0]}, ${data.bestLocationCoordinates[1]}, ${data.bestLocationCoordinates[2]})">
                        Ver no Mapa
                    </button></p>

                    ${bombSpotsButtons}

                    <p><span class="info-label">World Change:</span> ${data.event}</p>
                </div>
            `;

            container.appendChild(card);
        }
    }
}

function openBombSpots(coordsArray) {
    if (!Array.isArray(coordsArray) || coordsArray.length === 0) return;

    const firstSpot = coordsArray[0];
    const x = firstSpot[0];
    const y = firstSpot[1];
    const z = firstSpot[2];

    const url = `https://tibiamaps.io/map#${x},${y},${z}:2`;
    const windowFeatures = "width=1024,height=768,scrollbars=yes,resizable=yes";
    window.open(url, "TibiaMapWindow", windowFeatures);
}

