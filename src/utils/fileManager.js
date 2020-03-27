const processFile = (config, content) => {
    /* I. Is not null file */
    if ((content == null) || (content == '')) {
        return false;
    }

    /* II. Split by line */
    const lines = content.split('\n');

    /* III. Valid header (ej. 'Province/State,Country/Region,Last Update,Confirmed' */
    let header = lines[0].trim();
    let headerValidation = ValidateHeader(config.definedFields, header);

    console.log('•', headerValidation);
    if (!headerValidation.isValid){
        return {
            result: 'The fields in the upload file do not match the required fields.',
            matchDetail: headerValidation.matchArray,
            errorDetail: headerValidation.errorArray
        };
    }
    return;
    /* IV. Read body */
    for (const i in lines) {
        if (i > 0) {
            console.log('i:', i, lines[i]);
        }
    }
}

const ValidateHeader = (definedFields, header) => {
    // (array, string) => {...}
    
    let isValid = false; // ¿Cabecera válida?
    let matchArray = []; // Lista campos con posiciones en CSV
    let errorArray = []; // Lista campos no encontrados

    try {

        let fields = header.split(','); // fields from file

        for (const definedfield of definedFields) {
            // Ej. definedField.csvMatchName = ['Province/State', 'Province_State', 'Prov_Stat']
            
            if (definedfield.required == true) {

                let founded = false, matchPosition = -1, i = 0;

                while ((!founded) && (i < definedfield.csvMatchName.length)) {
                    let matchItem = definedfield.csvMatchName[i++];
                        // ej. matchItem = 'Province_State'
                    matchPosition = fields.findIndex((e) => e == matchItem);
                    founded = (matchPosition > -1);
                }

                if (founded) {
                    matchArray.push({ name: definedfield.name, index: matchPosition});
                } else {
                    errorArray.push(definedfield.name);
                }
            }
        }

        isValid = (errorArray.length == 0);

    } catch (error) {
        isValid = false;
        matchArray = [];
        errorArray = [error];
    }

    return {
        isValid,
        matchArray,
        errorArray
    }
}

module.exports = processFile;