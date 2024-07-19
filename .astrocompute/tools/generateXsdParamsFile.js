module.exports = ({github, context, targetPath}) => {
    const fs = require('node:fs');
    const path = require('node:path');
    
    const dir = fs.readdirSync(targetPath, {withFileTypes: true});
    
    const xsdFiles = dir.filter((dirent) => {
        if (!dirent.isFile()) {
            return false;
        }
        
        return dirent.name.endsWith('.xsd');
    })
    
    let xsdParams = '';
    
    xsdParams += `<xsd xmlns='http://microsoft.com/dotnet/tools/xsd/'>\n`;
    xsdParams += `  <generateClasses language='CS' namespace='DarwinPushPort.v24'>\n`;
    
    for (let i = 0; i < xsdFiles.length; i++) {
        let lastFilePrefix = '';
        
        if (i + 1 === xsdFiles.length) {
            lastFilePrefix = `.${path.sep}`
        }
        xsdParams += `    <schema>${lastFilePrefix}${xsdFiles[i].name}</schema>\n`;
    }
    
    xsdParams += `  </generateClasses>\n`;
    xsdParams += `</xsd>\n`;
    
    const outFile = fs.writeFileSync(`${targetPath}${path.sep}xsdParams.xml`, xsdParams);


    let outFileName = xsdFiles[xsdFiles.length - 1].name.split('.')[0];
    outFileName += '.cs';
    
    return {
        outFileName
    };
};