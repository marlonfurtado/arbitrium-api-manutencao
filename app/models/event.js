module.exports = function(sequelize, DataTypes) {
    var Event = sequelize.define('event', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING(500),
            notEmpty: true
        },
        family_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        work_points: {
            type: DataTypes.INTEGER,
            notEmpty: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        op_work: {
            type: DataTypes.STRING(500),
            notEmpty: true

        },
        op_family: {
            type: DataTypes.STRING(500),
            notEmpty: true
        },
        min_hour: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        max_hour: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        underscored: true
    });

    return Event;
}