const local = require('./generateXsdParamsFile.js');

result = local({github: 'github', context: 'context', targetPath: '../../v24/schemas'});

console.log(JSON.stringify(result, null, 2))