module.exports = function(sequelize, Sequelize) {
    var Week = sequelize.define('week', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        schedule_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        week_number: {
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

    return Week;
}