// Un diccionario vacio
const teamsDatabase = {};

// funcion Un ususario que e acaba de registrar tenga un equipo vacio
const bootstrapTeam = (userid) => {
  // Cada vez que se registra un usuario pone este equipo
  teamsDatabase[userid] = [];
}

const getTeamOfUser = (userId) => {
  return teamsDatabase[userId];
}
const addPokemon = (userId, pokemon) => {
  teamsDatabase[userId].push(pokemon);
}

const setTeam = (userId, team) => {
  teamsDatabase[userId] = team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;

