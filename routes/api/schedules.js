const express = require('express');
const {Router} = express;
const Schedule = require('../../models/Item');
const router = Router();
var schedule = require('node-schedule');
const e = require('express');
router.get('/', (req, res) => {
    // Schedule.find().then(items => res.json(items))
    Schedule.find().then(items => {
        res.json(items);
        for(var i = 0; i < items.length; i++) {
            var properDate = String(items[i].startsOn).split('-')[0];
            var endDate = '';
            if(items[i] && items[i].endsOn && items[i].endsOn['type'] == 'On') {
                endDate = items[i].endsOn['endDate']
            }
            
            let startTime = new Date(items[i].startsOn);
            if(items[i].endsOn['endDate']) {
                let endTime = new Date(items[i].endsOn['endDate']);
            }


            var stringMatrix = '*';
            var month = "*";
            if(items[i].repeats == "Weekly") {
                var matrix = [];
                for(var j = 0; j < items[i].repeatDays.length; j++) {
                    if(items[i].repeatDays[j] == "Sunday") {
                        matrix.push(0);
                    }
                    else if(items[i].repeatDays[j] == "Monday") {
                        matrix.push(1);
                    }
                    else if(items[i].repeatDays[j] == "Tuesday") {
                        matrix.push(2);
                    }
                    else if(items[i].repeatDays[j] == "Wednesday") {
                        matrix.push(3);
                    }
                    else if(items[i].repeatDays[j] == "Thursday") {
                        matrix.push(4);
                    }
                    else if(items[i].repeatDays[j] == "Friday") {
                        matrix.push(5);
                    }
                    else if(items[i].repeatDays[j] == "Saturday") {
                        matrix.push(6);
                    }
                }
                stringMatrix = matrix.toString();
    
                
            }
            else if(items[i].repeats == "Monthly") {
                month = "1";
            }       
            var masterString = '* * ' + month + ' * ' + stringMatrix;
            if(startTime && endTime) {
                var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: masterString }, function(){
                    console.log('Time for tea!');
                });
            }
            else {
                var j = schedule.scheduleJob(masterString, function(){
                    console.log('The answer to life, the universe, and everything!');
                });
            }
            
        }
    })
});



module.exports = router;