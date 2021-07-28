const Serie = require("../models/Serie");
const Episode = require("../models/Episode");
const SportsPlayer = require("../models/SportsPlayer");
const { Sequelize } = require("sequelize");
const dbConnection = require("../config/db");

// FIND
exports.findAllSeries = async () => {
  return await Serie.findAll({
    include: [
      {
        model: Episode,
        attributes: ["id", "number", "title", "duration", "photo"],
      },
      { model: SportsPlayer, attributes: ["name", "photo"] },
    ],
  });
};

// FIND LAST UPDATE --> QUERY
exports.findAllSeriesLastUpdate = async () => {
  return await Serie.findAll({
    include: [
      {
        model: Episode,
        attributes: ["id", "number", "title", "duration", "photo"],
      },
      { model: SportsPlayer, attributes: ["name", "photo"] },
    ],
    limit: [6],
    order: [["createdAt", "DESC"]],
  });
};

exports.findSerieById = async (id) => {
  return await Serie.findByPk(id, {
    include: [
      {
        model: Episode,
        attributes: ["id", "number", "title", "duration", "photo"],
      },
      { model: SportsPlayer, attributes: ["name"] },
    ],
    order: [["episodes", "number", "ASC"]],
  });
};

exports.findSerieByCategoryId = async ({ categoryId }) => {
  return await Serie.findAll({
    include: [{ model: SportsPlayer, attributes: ["name", "photo"] }],
    where: { categoryId },
  });
};

exports.searchSerie = async (filter) => {
  const { title } = filter;
  return await Serie.findAll({ where: { title } });
};
// INSERT
exports.insertSerie = async (serie) => {
  return await Serie.create(serie);
};

// UPDATE
exports.updateSerie = async (id, serieDetails) => {
  return await Serie.update(serieDetails, { where: { id } });
};

// DELETE
exports.deleteSerie = async (id) => {
  return await Serie.destroy({ where: { id } });
};
