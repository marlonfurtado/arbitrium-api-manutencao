module.exports = function(sequelize, Sequelize) {
    var Result = sequelize.define('result', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        day_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        interview_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status_family_activity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_family_event: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_family_bonus: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_work_activity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_work_event: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_work_bonus: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_health_activity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_health_event: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_health_bonus: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_money_activity: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_money_event: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        status_money_bonus: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        underscored: true
    });

    return Result;
}