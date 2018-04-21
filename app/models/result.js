module.exports = function(sequelize, DataTypes) {
    var Result = sequelize.define('result', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        day_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        interview_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status_family_activity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_family_event: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_family_bonus: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_work_activity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_work_event: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_work_bonus: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_health_activity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_health_event: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_health_bonus: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_money_activity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_money_event: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status_money_bonus: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        underscored: true
    });

    return Result;
}