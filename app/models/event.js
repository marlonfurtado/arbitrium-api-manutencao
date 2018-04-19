module.exports = function(sequelize, Sequelize) {
    var Event = sequelize.define('event', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        family_points: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        work_points: {
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

    return Event;
}