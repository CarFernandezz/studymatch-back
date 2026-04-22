const bcrypt = require('bcrypt');//importacion de bcrypt para encriptar las contraseñas
const jwt = require('jsonwebtoken');//importacion de jsonwebtoken para generar tokens
const User = require('../models/user');//importacion del modelo de datos para el usuario

exports.register=async(req,res)=>{
    try {
        const {email,password,name,lastname,nombre,carrera,anio,materias}=req.body;//obtencion de los datos del usuario desde el cuerpo de la solicitud

        const userExists=await User.findOne({email});//verificacion de si el usuario ya existe en la base de datos

        if(userExists){
            return res.status(400).json({message:'El usuario ya existe'});
        }

        const hashedPassword=await bcrypt.hash(password,10);//encriptacion de la contraseña del usuario

        const newUser=new User({
            email,
            password: hashedPassword,
            nombre: nombre || name,
            carrera,
            anio: anio ? Number(anio) : undefined,
            materias
        });

        await newUser.save();//guardado del usuario en la base de datos

        newUser.password=undefined;//eliminacion de la contraseña del usuario para no enviarla en la respuesta

        res.status(201).json({
            message:"usuario registrado exitosamente",
            newUser
        });

    } catch (error) {
        res.status(500).json({message:"Error al registrar el usuario", error});
    }
};


//Login de usuario
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const foundUser=await User.findOne({email}).populate('carrera');

        if(!foundUser){
            return res.status(400).json({message:'El usuario no existe'});
        }

        const passwordMatch=await bcrypt.compare(password,foundUser.password);
        if(!passwordMatch){
            return res.status(400).json({message:'Contraseña incorrecta'});
        }

        const token = jwt.sign(
            { userId: foundUser._id, email: foundUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        foundUser.password=undefined;

        res.json({
            message:"Inicio de sesion exitoso",
            token,
            user: foundUser
        });

        
    } 
    catch (error) {
        res.status(500).json({message:"Error al iniciar sesion", error});

    }
};

exports.getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.userId).populate('carrera').select('-password');
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        };

        res.json({user});
    }
    catch (error) {
        res.status(500).json({message:"Error al obtener el perfil del usuario", error});
    }
} 