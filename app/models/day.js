module.exports = function(sequelize, DataTypes) {
    var Day = sequelize.define('day', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        week_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        day_number: {
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

    return Day;
}