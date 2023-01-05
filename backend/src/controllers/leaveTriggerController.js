const { TriggerLeave } = require('../models/leaveTriggerModel');

var triggerLeave = new TriggerLeave();

class leaveTriggerController{
    async leaveTrigger(){
        await triggerLeave.leaveTrigger();
    }
    async leaveCountColomnTrigger(){
        await triggerLeave.leaveCountColomnTrigger();
    }
}

module.exports = {leaveTriggerController};