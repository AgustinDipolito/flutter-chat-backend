
//path 
// api/login


const { Router, response } = require("express");
const { check } = require("express-validator");
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");

const router = Router();

router.post("/new", [

    check("nombre", "obligatory name").not().isEmpty(),
    check("password", "obligatory password").not().isEmpty(),
    check("email", "obligatory email").isEmail(),


    validarCampos
], crearUsuario);

router.post("/", [
    check("password", "obligatory password").not().isEmpty(),
    check("email", "obligatory email").isEmail(),

], login);

router.get("/renew", validarJWT, renewToken);



module.exports = router;