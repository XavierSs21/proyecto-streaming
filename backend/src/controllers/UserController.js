import User from "../models/user.js";

const createUser = async(req, res) => {
    try{

        const {nombre, correo, telefono, pais, password} = req.body;

        if(!nombre|| !correo || !telefono ||!pais || !password){
            res.status(401).json({message: "Los campos son obligatorios"})
            return;
        }

        const userExist = await User.findOne({correo});

        if(userExist){
            res.status(400).json({message: "El correo ingresado ya esta registrado"})
            return;
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            nombre, correo, password: hashpassword, pais, telefono
        });

        const token = jwt.sign(
            {userId: newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: "2d"}
        )

        res.status(201).json({message: "Usuario creado", token, user: 
            {id: newUser._id, 
                nombre: newUser.nombre, 
                correo: newUser.correo, 
                telefono: newUser.telefono,
                pais: newUser.pais,
                createdAt: newUser.createdAt,

            }});


    }catch(error){
        console.log(error)
        res.status(500).json({message: "Algo ocurrio"});
    }
}

const loginUser = async(req, res)=> {
    try{
        const {correo, password} = req.body;

        const user = await User.findOne({correo});
        if(!user){
            res.status(404).json({message: "Usuario no encontrado"});
            return
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            res.status(400).json({message: "Contrasena incorrecta"});
            return
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({message: "Login exitoso", token, user: 
            {id: user._id, 
                nombre: user.nombre, 
                correo: user.correo,
                telefono: user.telefono,
                pais: user.pais,
                createdAt: user.createdAt

            }})

    }catch(error){
        console.log(error)
        res.status(500).json({message: "Algo ocurrio"});

    }
}

export default {
    createUser,
    loginUser,
}