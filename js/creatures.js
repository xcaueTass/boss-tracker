// creatures.js
const CREATURES = {
    // 1 ponto
    'Butterfly (Blue)': {
        charmPoints: 1,
        gif: 'gifs/butterfly_blue.gif',
        respawn: 'Rapid Respaw / Goblin City',
        bomb: { viable: 'Sim', type: 'Fire' },
        bestLocation: 'Port Hope',
        event: 'Nenhum',
        hp: 2,
        weakness: 'Neutro',
        bestLocationCoordinates: [32344, 32223, 7],
        typeWeakness: 'fire'
    },
    'Butterfly (Purpple)': {
        charmPoints: 1,
        gif: 'gifs/Butterfly_(Violeta).gif',
        respawn: 'Rapid Respaw / Goblin City',
        bomb: { viable: 'Sim', type: 'Fire' },
        bestLocation: 'Port Hope',
        event: 'Nenhum',
        hp: 2,
        weakness: 'Neutro',
        bestLocationCoordinates: [32344, 32223, 7],
        typeWeakness: 'fire'
    },
    'Butterfly (Red)': {
        charmPoints: 1,
        gif: 'gifs/Butterfly_(Vermelho).gif',
        respawn: 'Rapid Respaw / Goblin City',
        bomb: { viable: 'Sim', type: 'Fire' },
        bestLocation: 'Port Hope',
        event: 'Nenhum',
        hp: 2,
        weakness: 'Neutro',
        bestLocationCoordinates: [32344, 32223, 7],
        bombLocationCoordinates: [
            [32341, 31791, 7],
            [32343, 31790, 7],
            [32344, 31792, 7]
        ],
        typeWeakness: 'fire'
    },
    'Cat': {
        charmPoints: 1,
        gif: 'gifs/Cat.gif',
        respawn: 'Rapid Respaw / Goblin City',
        bomb: { viable: 'Sim', type: 'Fire' },
        bestLocation: 'Thais',
        event: 'Nenhum',
        hp: 20,
        weakness: 'Neutro',
        bestLocationCoordinates: [32342, 31790, 7], 
        typeWeakness: 'fire'
    },
    'Dog': {
        charmPoints: 1,
        gif: 'gifs/Dog.gif',
        respawn: 'Rapid Respaw / Goblin City',
        bomb: { viable: 'Sim', type: 'Fire' },
        bestLocation: 'Edron',
        event: 'Nenhum',
        hp: 20,
        weakness: 'Neutro',
        bestLocationCoordinates: [33207, 31843, 7],
        typeWeakness: 'fire'
    },

    // Especiais
    'Acolyte of Darkness': {
        charmPoints: 30,
        gif: 'gifs/Acolyte_of_Darkness.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Deeper Drefia (Darashia)',
        event: 'Lightbearer - Novembro',
        hp: 325,
        weakness: 'Holy',
        bestLocationCoordinates: [33014, 32385, 11],
        isSpecial: true,
        typeWeakness: 'holy'
    },
    'Bane Bringer': {
        charmPoints: 50,
        gif: 'gifs/Bane_Bringer.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Green Claw Swap (Venore)',
        event: 'Bewitched - Junho',
        hp: 2500,
        weakness: 'Fire',
        bestLocationCoordinates: [32735, 31952, 13],
        isSpecial: true,
        typeWeakness: 'Fire'
    },
    'Bane of Light': {
        charmPoints: 50,
        gif: 'gifs/Bane_of_Light.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Formorgor Glacier (Svargrond)',
        event: 'Lightbearer - Novembro',
        hp: 1100,
        weakness: 'Energy',
        bestLocationCoordinates: [32080, 31126, 1],
        isSpecial: true,
        typeWeakness: 'Energy'
    },
    'Berrypest': {
        charmPoints: 5,
        gif: 'gifs/Berrypest.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Winterberry Cellar (Thais)',
        event: 'Annual Autumn Vintage - Outubro',
        hp: 500,
        weakness: 'Fire',
        bestLocationCoordinates: [32582, 31575, 8],
        isSpecial: true,
        typeWeakness: '-'
    },
    'Bride of Night': {
        charmPoints: 50,
        gif: 'gifs/Bride_of_Night.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Dwacatra (Kazordoon)',
        event: 'Lightbearer - Novembro',
        hp: 275,
        weakness: 'Poison',
        bestLocationCoordinates: [32608, 31932, 14],
        isSpecial: true,
        typeWeakness: 'Poison'
    },
    'Cake Golem': {
        charmPoints: 30,
        gif: 'gifs/Cake_Golem.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Invasão - Carlin | Thais | Darashia | Edron | Liberty Bay',
        event: 'A Piece of Cake - Fevereiro',
        hp: 444,
        weakness: 'Fisico',
        bestLocationCoordinates: [32337, 32216, 7],
        isSpecial: true,
        typeWeakness: 'Fisico'
    },
    'Crustacea Gigantica': {
        charmPoints: 50,
        gif: 'gifs/Crustacea_Gigantica.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Calassa (Liberty Bay)',
        event: 'Invasão',
        hp: 1600,
        weakness: 'Energy',
        bestLocationCoordinates: [32015, 32754, 12],
        bombLocationCoordinates: [
            [32113, 32733, 12],
            [32114, 32804, 12]
        ],
        isSpecial: true,
        typeWeakness: 'Energy'
    },
    'Crystal Wolf': {
        charmPoints: 50,
        gif: 'gifs/Crystal_Wolf.gif',
        respawn: 'Normal Respaw',
        bomb: { viable: 'Nâo', type: '-' },
        bestLocation: 'Shadowthorn (Venore)',
        event: 'Invasão - Elfo de Fogo',
        hp: 750,
        weakness: 'Energy',
        bestLocationCoordinates: [33137, 32149, 7],
        isSpecial: true,
        typeWeakness: 'Energy'
    },
};
