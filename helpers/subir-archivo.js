import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { v4 as uuidv4 } from 'uuid';

const Extensiones = ['png','jpg','jpeg','gif']
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const subirarchivo =(files,ExtensionesPermitidas= Extensiones,carpeta = '')=>{
    return new Promise((resolve, reject) => {
        
        const {archivo} = files;
        const nombrecortado = archivo.name.split('.');
        const Extension = nombrecortado[nombrecortado.length -1];
        
        // Validar extensión
        if (!ExtensionesPermitidas.includes(Extension.toLowerCase())) {
            return reject(`Extensión ${Extension} no permitida: ${ExtensionesPermitidas.join(', ')}`);
        }

        // Nombre único
        const nombreTemp = uuidv4() + '.' + Extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
        archivo.mv(uploadPath, (err) => {
        if (err) {
        return reject(err);
        }
        return resolve(nombreTemp)
        });
    })
}

export {
    subirarchivo
}