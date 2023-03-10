const { HTTP_STATUS } = require("../utils/http");
const router = require("express").Router();
const { SearchBarManager } = require("../managers/search_bar_manager");
const { SongsManager } = require("../managers/songs_manager");
const { PlaylistManager } = require("../managers/playlist_manager");

const songsManager = new SongsManager();
const playlistManager = new PlaylistManager();

const searchBarManager = new SearchBarManager(songsManager, playlistManager);

/**
 * Retourne une liste de chansons et de playlists qui correspondent à la recherche
 * Prends les attributs à partir de la query de la requête
 * @memberof module:routes/search_bar
 * @name GET /search/
 */
router.get("/", async (request, response) => {
  try {
    const exact = request.query.exact === "true";
    const searchParameters = request.query.search_query;
    response.status(HTTP_STATUS.SUCCESS).json(await searchBarManager.search(searchParameters, exact));
  } catch (error) {
    response.status(HTTP_STATUS.SERVER_ERROR).send(error);
  }
});

module.exports = { router, searchBarManager };
