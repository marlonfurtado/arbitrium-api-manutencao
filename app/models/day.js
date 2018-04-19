module.exports = function(sequelize, Sequelize) {
    var Day = sequelize.define('day', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        week_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        day_number: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW
        }
    }, {
        underscored: true
    });

    return Day;
}