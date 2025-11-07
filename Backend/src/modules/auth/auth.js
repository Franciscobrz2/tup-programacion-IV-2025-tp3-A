import { db } from "../../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy} from "passport-jwt";

export function authConfig() {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }

  passport.use(
    new Strategy(jwtOptions, async () => {
        next(null, payload)
    })
  );
}

export const verificarAutenticacion = passport.authenticate("jwt", {
  session: false,
});

export async function authLogin (req, res) {
  const { email, password } = req.body;


  // Consultar por el usuario a la base de datos
  const [usuarios] = await db.execute(
    "SELECT * FROM usuario WHERE email = ?",
    [email?.trim()]
  );

  if (usuarios.length === 0) {
    return res
    .status(400)
    .json({ success: false, error: "Usuario inválido" });
  }

  // Verificar la contraseña
  const hashedPassword = usuarios[0].password_hash;

  const passwordComparada = await bcrypt.compare(password, hashedPassword);

  if (!passwordComparada) {
    return res
    .status(400)
    .json({ success: false, error: "Contraseña inválido" });
  }


  // Generar jwt
  const payload = { 
    userId: usuarios[0].id, 
    nombre: usuarios[0].nombre, 
    email: usuarios[0].email 
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  // Devolver jwt y otros datos
  res.json({
    success: true,
    token,
    nombre: usuarios[0].nombre, 
  });
  
}