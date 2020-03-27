const processFile = (config, content) => {
    /* I. Is not null file */
    if ((content == null) || (content == '')) {
        return false;
    }

    /* II. Split by line */
    const lines = content.split('\n');

    /* III. Valid header (ej. 'Province/State,Country/Region,Last Update,Confirmed' */
    let header = lines[0].trim();
    let headerValidation = ValidateHeader(config.fields, header);
    if (!headerValidation.isValid){
        console.log({
            result: 'The fields in the upload file do not match the required fields.',
            detail: headerValidation.errorArray
        });
        return;
    }

    /* IV. Read body */
    for (const i in lines) {
        if (i > 0) {
            console.log('i:', i, lines[i]);
        }
    }
}

const ValidateHeader = (requiredFields, header) => {
    
    let isValid;
    let errorArray = [];

    try {

        // Split by comma (ej. ['Country', 'Province'])
        let fields = header.split(',');
        
        for (const requiredfield of requiredFields) {
            // Does header line have the requiredField?
            if (
                (requiredfield.required) &&
                (fields.find((e) => e == requiredfield.name) == null)
                ) errorArray.push(requiredfield.name);
        }
    
        isValid = (errorArray.length == 0);

    } catch (error) {
        isValid = false;
        errorArray = [error];
    }

    return {
        isValid,
        errorArray
    }
}

module.exports = processFile;