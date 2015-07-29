var instancelist = {
    getAll: function(req, res) {
        console.log("inside getall");
        var allProducts = data; // Spoof a DB call
        res.json(allProducts);
    }
};
var data = [];
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config/awsconfig.json');
// configure AWS security tokens
//AWS.config.update({accessKeyId: 'AKIAIQCTWHINV5RJMYFA', secretAccessKey: 'oMvuPVq9qduXw5vNZjCOJTKeiNlPkxv0JzYBe4io'});

// Set your region for future requests.
//AWS.config.update({region: 'us-west-2'});

var ec2 = new AWS.EC2();
var instances_ecs = [];
// returns all running ec2 instances and its details
ec2.describeInstances(function(err, result) {
                    if (err)
                        console.log(err);
                    var inst_id = '-';
                    for (var i = 0; i < result.Reservations.length; i++) {
                        var res = result.Reservations[i];
                        var instances = res.Instances;
                        for (var j = 0; j < instances.length; j++) {
                            console.log(instances[j]);
                           // var instanceName = instances[j].Name;
                            var instanceID = instances[j].InstanceId;
                            var instanceType = instances[j].InstanceType;
                            var stateCode = instances[j].State.Code;
                            var stateName = instances[j].State.Name;
                            var publicIP = instances[j].PublicIpAddress;
                            var privateIP = instances[j].PrivateIpAddress;
                            var imageID = instances[j].ImageId;
                            var az = instances[j].Placement.AvailabilityZone;
                            console.log('instanceID ' + instanceID + " state " + stateName + " public ip " + publicIP + 'private ip' + privateIP + 'image id ' + imageID+ 'Availability zone'+az);
                            var obj = {instanceID: instanceID,instanceType: instanceType,state: stateName,publicIP: publicIP,privateIP: privateIP,imageID: imageID,availabilityZone:az};
                            data.push(obj);
                        }
                    }
                });

module.exports = instancelist;