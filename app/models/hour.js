module.exports = function(sequelize, DataTypes) {
    var Hour = sequelize.define('hour', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        activity_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hour_number: {
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
        }
    }, {
        underscored: true
    });

    return Hour;
}