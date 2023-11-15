import nodemailer from "nodemailer";

export const SendMail = async (req, res) => {
  try {
    const { nombre, apellido, correo, telefono, mensage } = req.body;

    const textMess = `\nNombre: ${nombre}\n
                    Apellido: ${apellido}\n
                    Correo: ${correo}\n
                    Teléfono: ${telefono}\n
                    Mensage: ${mensage}\n`;

    let smtpTransport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "roilanlauzardosotolongo@gmail.com",
        pass: "euba owtt znzs epjj",
      },
    });

    const info = await smtpTransport.sendMail({
      from: "roilanlauzardosotolongo@gmail.com",
      to: "roilanlauzardosotolongo@gmail.com",
      subject: "Message",
      text: textMess,
    });

    res.json(info);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: ["Db Error"] });
  }
};
