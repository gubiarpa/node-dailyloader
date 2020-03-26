const readRaw = (data) => {
    /* I. Is not null file */
    if ((data == null) || (data == '')) {
        return false;
    }

    /* II. Split by line */
    const lines = data.split('\n');

    /* III. Valid header (ej. 'Province/State,Country/Region,Last Update,Confirmed' */
    let header = lines[0]; header = header.trim();
    let validHeader = ValidHeader(header);
    if (!validHeader.isValid){
        return {
            error: 'The fields in the upload file do not match the required fields.',
            detail: validHeader.errorArray
        }   
    }

    /* IV. Read body */
    for (const i in lines) {
        if (i > 0) {
            console.log('i:', i, lines[i]);
        }
    }
}

const ValidHeader = (header) => {
    
    let isValid;
    let errorArray = [];

    try {

        // Split by comma (ej. ['Country', 'Province'])
        let fields = header.split(',');
        
        /* Matching with each field */
        let requiredFields = [
            'Province/State',
            'Country/Region',
            'Last Update',
            'Confirmed',
            'Deaths',
            'Recovered'
        ];
        
        for (const requiredfield of requiredFields) {
            // Does header line have the requiredField?
            if (fields.find((e) => e == requiredfield) == null) errorArray.push(requiredfield);
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

module.exports = readRaw;