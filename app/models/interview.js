module.exports = function(sequelize, Sequelize) {
    var Interview = sequelize.define('interview', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        researcher_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        initial_date: {
            type: Sequelize.DATE,
            notEmpty: true
        },
        conclusion_date: {
            type: Sequelize.DATE,
            allowNull: true
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
        underscored:true
    });

    return Interview;
}