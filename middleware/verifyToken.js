"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'randy';
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        // Verificar y decodificar el token
        jsonwebtoken_1.default.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                console.log('tOKEN INVALIDO');
                res.redirect('/login');
            }
            else {
                // Token válido, almacenar los datos decodificados en el objeto de solicitud para su uso posterior
                req.user = decodedToken;
                console.log('datos del token desde el middleware JWT', req.user);
                next();
            }
        });
    }
    else {
        // No se proporcionó el token
        res.redirect('/login');
    }
}
exports.default = verifyToken;
