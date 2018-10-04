'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {  
  if (db[modelName].associate) {    
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
 
//Models/tables
db.User = require('../models/user.js')(sequelize, Sequelize);  
db.Shop = require('../models/shop.js')(sequelize, Sequelize);
db.Admin = require('../models/admin.js')(sequelize, Sequelize);
db.Country = require('../models/country.js')(sequelize, Sequelize);
db.Province = require('../models/province.js')(sequelize, Sequelize);
db.Emp = require('../models/employee.js')(sequelize, Sequelize);
db.Room = require('../models/room.js')(sequelize, Sequelize);
db.Rs = require('../models/rating_shop.js')(sequelize, Sequelize);
db.Remp = require('../models/rating_emp.js')(sequelize, Sequelize);
db.Client = require('../models/client_info.js')(sequelize, Sequelize); 
db.Discount = require('../models/discount.js')(sequelize, Sequelize); 
db.Booking = require('../models/booking.js')(sequelize, Sequelize);
db.Status = require('../models/status.js')(sequelize, Sequelize); 
db.Service = require('../models/shop_service.js')(sequelize, Sequelize); 

 //Relations
// db.Shop.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id', onDelete: 'CASCADE'});  
// db.User.hasMany(db.Shop, {foreignKey: 'user_id', sourceKey: 'id', onDelete: 'CASCADE'});  
db.Admin.hasOne(db.Shop, {foreignKey: 'adminID', sourceKey: 'adminID', onDelete: 'CASCADE'});
db.User.hasOne(db.Client, {foreignKey: 'userID', sourceKey: 'userID', onDelete: 'CASCADE'});
db.Shop.hasMany(db.Emp, {foreignKey: 'shopID', sourceKey: 'shopID', onDelete: 'CASCADE'});
db.Shop.hasMany(db.Rs, {foreignKey: 'shopID', sourceKey: 'shopID', onDelete: 'CASCADE'});
db.Shop.hasMany(db.Discount, {foreignKey: 'shopID', sourceKey: 'shopID', onDelete: 'CASCADE'});
db.Shop.hasMany(db.Booking, {foreignKey: 'shopID', sourceKey: 'shopID', onDelete: 'CASCADE'});
db.Shop.hasMany(db.Emp, {foreignKey: 'shopID', sourceKey: 'shopID', onDelete: 'CASCADE'});
db.Shop.belongsTo(db.Admin, {foreignKey: 'adminID', targetKey: 'adminID', onDelete: 'CASCADE'});
db.Shop.belongsTo(db.Province,{foreignKey: 'provinceID', target: 'provinceID', onDelete: 'CASCADE'});
db.Shop.belongsTo(db.Country,{foreignKey: 'countryID', target: 'countryID', onDelete: 'CASCADE'});
db.Shop.belongsTo(db.Status,{foreignKey: 'statusID', target: 'statusID', onDelete: 'CASCADE'});
db.Shop.belongsTo(db.Service,{foreignKey: 'serviceID', target: 'serviceID', onDelete: 'CASCADE'});
db.Emp.belongsTo(db.Shop, {foreignKey: 'shopID', targetKey: 'shopID', onDelete: 'CASCADE'});
db.Emp.hasMany(db.Remp, {foreignKey: 'empID', sourceKey: 'empID', onDelete: 'CASCADE'});
db.Country.hasMany(db.Province, {foreignKey: 'countryID', sourceKey: 'countryID', onDelete: 'CASCADE'});
db.Province.belongsTo(db.Country, {foreignKey: 'countryID', targetKey: 'countryID', onDelete: 'CASCADE'});
db.Room.belongsTo(db.Shop, {foreignKey: 'shopID', targetKey: 'shopID', onDelete: 'CASCADE'});
db.Rs.belongsTo(db.Shop, {foreignKey: 'shopID', targetKey: 'shopID', onDelete: 'CASCADE'});
db.Remp.belongsTo(db.Emp, {foreignKey: 'empID', targetKey: 'empID', onDelete: 'CASCADE'});
db.Client.belongsTo(db.User, {foreignKey: 'userID', targetKey: 'userID', onDelete: 'CASCADE'});
db.Discount.belongsTo(db.Shop, {foreignKey: 'shopID', targetKey: 'shopID', onDelete: 'CASCADE'});
db.Booking.belongsTo(db.Shop, {foreignKey: 'shopID', targetKey: 'shopID', onDelete: 'CASCADE'});

module.exports = db;
