"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database"); //conexion
const userRoutes_1 = require("./routes/userRoutes"); //enruptador
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
// Configurar la caché para recursos estáticos
const staticOptions = {
    maxAge: 30 * 24 * 60 * 60, // Tiempo de caché en segundos (30 días en este ejemplo)
};
// Configuración de archivos estáticos
app.use(express_1.default.static(path_1.default.join(__dirname, '/public')));
// Instancia del servidor
const server = http_1.default.createServer(app);
// Configuración del motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '/views'));
//configurar cookies
app.use((0, cookie_parser_1.default)());
// Configuración de recuperación de datos y envío
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// Configuración de cors
app.use((0, cors_1.default)());
database_1.sequelize
    .authenticate()
    .then(() => {
    console.log('Conexión a la base de datos establecida correctamente');
    // Sincronización del modelo con la base de datos
    return database_1.sequelize.sync({ force: false });
})
    .catch((error) => {
    console.error('Error al conectar a la base de datos:', error.message);
});
// Routers
app.use('/', userRoutes_1.userRoutes);
server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
