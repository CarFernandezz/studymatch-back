const user = require('../models/user');//importacion del modelo de datos para el usuario
const career = require('../models/careers');//importacion del modelo de datos para las carreras
const bcrypt = require('bcryptjs'); //importacion de bcryptjs para hashear contraseñas
const jwt = require('jsonwebtoken'); //importacion de jsonwebtoken para crear tokens
const { validateRegister } = require('../utils/validators'); //importacion de validadores

exports.register=async(req,res)=>{
    try {
        const {email,password,nombre,carrera,anio,materias}=req.body;//obtencion de los datos del usuario desde el cuerpo de la solicitud

        //Validar datos de entrada
        const validation = validateRegister(req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: 'Datos inválidos', errors: validation.errors });
        }

        const userExists=await user.findOne({email});//verificacion de si el usuario ya existe en la base de datos

        if(userExists){
            return res.status(400).json({message:'El email ya está registrado'});
        }

        //Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser=new user({
            email,
            password: hashedPassword,
            nombre,
            carrera,
            anio,
            materias
        });

        await newUser.save();//guardado del usuario en la base de datos

        newUser.password=undefined;//eliminacion de la contraseña del usuario para no enviarla en la respuesta

        res.status(201).json({
            message:"usuario registrado exitosamente",
            user: newUser
        });

    } catch (error) {
        res.status(500).json({message:"Error al registrar el usuario", error});
    }
};


//Login de usuario
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;//obtencion de los datos del usuario desde el cuerpo de la solicitud

        //Validar que email y password no estén vacíos
        if(!email || !password){
            return res.status(400).json({message:'Email y contraseña son requeridos'});
        }

        const loginUser=await user.findOne({email}).populate('carrera');//busca el usuario

        if(!loginUser){
            //Mensaje genérico para evitar enumeración de usuarios
            return res.status(401).json({message:'Credenciales inválidas'});
        }

        //Comparar la contraseña hasheada
        const validPassword = await bcrypt.compare(password, loginUser.password);
        if(!validPassword){
            //Mensaje genérico
            return res.status(401).json({message:'Credenciales inválidas'});
        }

        //Generar token JWT
        const token = jwt.sign(
            { userId: loginUser._id, email: loginUser.email },
            process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_2024', //cambiar en producción
            { expiresIn: '24h' }
        );

        loginUser.password=undefined;//eliminacion de la contraseña del usuario 

        res.json({
            message:"Inicio de sesion exitoso",
            token: token,
            user: loginUser
        });

        
    } 
    catch (error) {
        res.status(500).json({message:"Error al iniciar sesion", error});

    }
};