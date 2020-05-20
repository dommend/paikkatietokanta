module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("Locations", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT('long')
    },
    markedImportant: {
      type: Sequelize.BOOLEAN
    },
    coordinateN: {
      type: Sequelize.STRING(15)  
    },
    coordinateE: {
      type: Sequelize.STRING(15) 
    },
    videoEmbed:  {
      type: Sequelize.STRING
    },
    url:  {
      type: Sequelize.STRING
    },
    flickrTag:  {
      type: Sequelize.STRING
    },
    flickrMore:  {
      type: Sequelize.STRING
    }
  });

  return Location;
};