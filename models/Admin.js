const { Datatypes } = require("sequelize");
const sequelize = require("../database/config");

const Admin = sequelize.define("Admin", {
    admin_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },

    admin_name: {
        type: Datatypes.STRING(255),
        allowNull: false,
    },
})