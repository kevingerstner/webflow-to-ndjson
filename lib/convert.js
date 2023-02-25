var colorParse = require("parse-color");

export function convertFileToJSON(fileData, settings) {

    let convertedData = [];
    let { headers, _id, _type, enabled, types } = settings;

    fileData?.forEach((row) => {
        let convertedRow = {};
        // set _id name
        convertedRow["_id"] = `imported-${_type}-${row[headers[_id]]}`.toLowerCase();
        // set _type
        convertedRow["_type"] = _type;

        // Loop through all keys in the row
        let values = Object.values(row);
        let keys = Object.keys(row);

        for (let i = 0; i < keys.length; i++) {
            // rename keys
            convertedRow[headers[i]] = values[i];

            // convert values to type
            switch (types[i]) {
                case "string":
                    break;
                case "color":
                    convertedRow[headers[i]] = convertHSLAToColor(values[i]);
                    break;
                case "number":
                    convertedRow[headers[i]] = convertStringToNumber(values[i]);
                    break;
                case "slug":
                    convertedRow[headers[i]] = convertStringToSlug(values[i]);
                    break;
                default:
                    break;
            }
            // delete disabled columns
            if (enabled[i] === false) delete convertedRow[headers[i]];

        }

        // delete the original id column
        delete convertedRow[headers[_id]];

        convertedData.push(convertedRow);
    });

    return convertedData;
}

export function convertHSLAToColor(hsla) {
    var parsedColor = colorParse(hsla);
    let color = {
        _type: 'color',
        alpha: parsedColor.hsla[3],
        hex: parsedColor.hex,
        hsl: {
            _type: 'hslaColor',
            h: parsedColor.hsla[0],
            s: parsedColor.hsla[1],
            l: parsedColor.hsla[2],
            a: parsedColor.hsla[3],
        },
        hsv: {
            _type: 'hsvaColor',
            h: parsedColor.hsv[0],
            s: parsedColor.hsv[1],
            v: parsedColor.hsv[2],
            a: parsedColor.hsla[3],
        },
        rgb: {
            _type: 'rgbaColor',
            r: parsedColor.rgba[0],
            g: parsedColor.rgba[1],
            b: parsedColor.rgba[2],
            a: parsedColor.rgba[3],
        }
    }
    return color;
}

export function convertStringToNumber(string) {
    return Number(string);
}

export function convertStringToSlug(string) {
    return {
        _type: 'slug',
        current: string
    }
}