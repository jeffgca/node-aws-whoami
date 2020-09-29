const AWS = require("aws-sdk");
const _ = require('lodash');

// def whoami(session=None):
//     session = session or boto3.Session()

//     data = {}
//     data['Region'] = session.region_name

//     response = session.client('sts').get_caller_identity()

//     for field in ['Account', 'Arn', 'UserId']:
//         data[field] = response[field]

//     data['Type'], name = data['Arn'].rsplit(':', 1)[1].split('/',1)

//     if data['Type'] == 'assumed-role':
//         data['Name'], data['RoleSessionName'] = name.rsplit('/', 1)
//     else:
//         data['Name'] = name
//         data['RoleSessionName'] = None

//     data['AccountAliases'] = []
//     try:
//         #pedantry
//         paginator = session.client('iam').get_paginator('list_account_aliases')
//         for response in paginator.paginate():
//             data['AccountAliases'].extend(response['AccountAliases'])
//     except ClientError as e:
//         if e.response.get('Error', {}).get('Code') != 'AccessDenied':
//             raise

function whoami(session, callback) {
    AWS.config.getCredentials(function(err) {
        if (err) console.log(err.stack);
        // credentials not loaded
        else {
            // console.log("Accesskey:", AWS.config.credentials.accessKeyId);
            console.log(AWS.config.credentials);
        }


        AWS.config.update({region: 'us-west-2'});

        let sts = new AWS.STS();

        sts.getCallerIdentity((err, result) => {
            if (err) throw err;

            let _data = {};
            // console.log(result);

            _.each(['Account', 'Arn', 'UserId'], (key) => {
                _data[key] = result[key];
            });

            console.log(_data);
            
        })
    });
}

if (require.main === module) {
    whoami();
}