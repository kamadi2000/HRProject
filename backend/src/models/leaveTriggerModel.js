//const {executeSQL} = require("../database/database");
const {trigger} = require("../database/database");

class TriggerLeave{
    async leaveTrigger(){   
        try{
            await trigger(`
            DELIMITER //
            CREATE TRIGGER leave_trigger AFTER UPDATE
            ON leave_detail
            FOR EACH ROW
            BEGIN
            IF NEW.leave_type='annual' THEN
                UPDATE leave_count SET annual_count = leave_count.annual_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
            END IF;
            
            IF NEW.leave_type='casual' THEN
                UPDATE leave_count SET casual_count = leave_count.casual_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
            END IF;
            
            IF NEW.leave_type='maternity' THEN
                UPDATE leave_count SET maternity_count = leave_count.maternity_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
            END IF;
            
            IF NEW.leave_type='noPay' THEN
                UPDATE leave_count SET noPay_count = leave_count.noPay_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
            END IF;
            END;
            //
            DELIMITER;
            `)
        }
        catch(e){
            console.log(e)
        }
    }
}
/*
class Trigger{
    async leaveTrigger(){
        try{
            await  executeSQL(`DELIMITER //
            CREATE TRIGGER leave_trigger AFTER UPDATE
            ON leave_detail
            FOR EACH ROW
            BEGIN
                IF NEW.leave_type='annual' THEN
                    UPDATE leave_count SET annual_count = leave_count.annual_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
            
                IF NEW.leave_type='casual' THEN
                    UPDATE leave_count SET casual_count = leave_count.casual_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
            
                IF NEW.leave_type='maternity' THEN
                    UPDATE leave_count SET maternity_count = leave_count.maternity_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
            
                IF NEW.leave_type='noPay' THEN
                    UPDATE leave_count SET noPay_count = leave_count.noPay_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
                END IF;
            END;
            //
            DELIMITER`,[]);
     
        }catch(e){
            console.log(e);
        }
    }
    
}
*/
/*
const triggerDefinition = `
DELIMITER //
CREATE TRIGGER leave_trigger AFTER UPDATE
ON leave_detail
FOR EACH ROW
BEGIN
  IF NEW.leave_type='annual' THEN
    UPDATE leave_count SET annual_count = leave_count.annual_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
  END IF;

  IF NEW.leave_type='casual' THEN
    UPDATE leave_count SET casual_count = leave_count.casual_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
  END IF;

  IF NEW.leave_type='maternity' THEN
    UPDATE leave_count SET maternity_count = leave_count.maternity_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
  END IF;

  IF NEW.leave_type='noPay' THEN
    UPDATE leave_count SET noPay_count = leave_count.noPay_count+1 WHERE leave_count.emp_ID=NEW.emp_ID;
  END IF;
END;
//
DELIMITER;
`;

connection.query(triggerDefinition, function (error, results, fields) {
  if (error) {
    console.error(error);
  } else {
    console.log('Trigger created successfully.');
  }
});
*/
module.exports = {TriggerLeave}

