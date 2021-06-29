const { response } = require("express");
const usuario = require("../models/usuario");
const Usuario = require("../models/usuario");

const getUsuarios = async (req, res = response) => {

    const usuarios = await usuario
    .find({_id: { $ne: req.uid}})
    .sort("-online")
    .limit(20)

    res.json({
        ok: true,
        usuarios
    })

}

module.exports = {
    getUsuarios
}