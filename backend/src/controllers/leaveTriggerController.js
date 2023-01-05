const { TriggerLeave } = require('../models/leaveTriggerModel');

var triggerLeave = new TriggerLeave();

class leaveTriggerController{
    async leaveTrigger(){
        await triggerLeave.leaveTrigger();
    }
}
module.exports = {leaveTriggerController};