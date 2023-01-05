//const {executeSQL} = require("../database/database");
const mysql = require('mysql2');
const { config } = require('../database/config')
require('dotenv').config();

const {trigger} = require("../database/database");

class TriggerLeave {
    constructor() {
        this.pool = mysql.createPool({
            host:config.HOST,
            user: config.USER,
            password: config.PASSWORD,
            database: config.DATABASE
        });
    }
   
    async leaveTrigger() {
        try {
            const [results] = await this.pool.query(`
                CREATE TRIGGER IF NOT EXISTS leave_trigger AFTER UPDATE ON leave_detail
                FOR EACH ROW
                BEGIN
                IF NEW.leave_type='annual' THEN
                    UPDATE leave_count SET annual_count = leave_count.annual_count-1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
                
                IF NEW.leave_type='casual' THEN
                    UPDATE leave_count SET casual_count = leave_count.casual_count-1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
                
                IF NEW.leave_type='maternity' THEN
                    UPDATE leave_count SET maternity_count = leave_count.maternity_count-1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
                
                IF NEW.leave_type='noPay' THEN
                    UPDATE leave_count SET noPay_count = leave_count.noPay_count-1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
                END;
            `);
            console.log(results);
        } catch (e) {
            console.log(e);
        }
    }

    async leaveCountColomnTrigger() {
        try {
            const [results] = await this.pool.query(`
                CREATE TRIGGER IF NOT EXISTS leaveCount_column_trigger AFTER INSERT ON employment_detail
                FOR EACH ROW
                BEGIN
                INSERT INTO leave_count (emp_ID, annual_count, casual_count, maternity_count, noPay_count)
                    VALUES (NEW.emp_ID, (SELECT annual FROM leave_initialize Where emp_ID=new.emp_ID), (SELECT casual FROM leave_initialize Where emp_ID=new.emp_ID), (SELECT maternity FROM leave_initialize Where emp_ID=new.emp_ID), (SELECT noPay FROM leave_initialize Where emp_ID=new.emp_ID));
                END;

            `);
            console.log(results);
        } catch (e) {
            console.log(e);
        }
    }
}
module.exports = {TriggerLeave}

