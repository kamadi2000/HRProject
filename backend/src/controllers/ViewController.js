const { View } = require('../models/ViewModel');

var view = new View();
class viewController{
    async createView(){
        await view.createView();
    }
}

module.exports = {viewController};