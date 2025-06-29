const nodeMailer = require('nodemailer');

exports.enviarCorreoDonacion = async (req, res) => {
    // Obtener datos del formulario de donacion
    const { name, email, phone, componentType: componentType, description, pickup } = req.body;
    const userName = name.split(" ")[0];
    // Configuracion del transporte
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'donartec.donacion@gmail.com', // Email
            pass: 'uekk kuqo nfpn uvde' //CONTRASEÑA DE APLICACION de la cuenta de gmail
        }
    });

    const mailOptions = {
        // correo que enviara el mensaje
        from: 'donartec.donacion@gmail.com',
        // correo que recibira el mensaje 
        to: 'donartec.donacion@gmail.com',
        // asunto
        subject: `Nueva donación de: ${name}, Componente: ${componentType}`,
        // Cuerpo del correo
        html: `
        <h2>Donacion Recibida</h2>
        <br>
        <p><strong>Nombre:</strong> ${name}</p>
        <P><strong>Correo:</strong> ${email}</p>
        <P><strong>Telefono:</strong> ${phone}</p>
        <P><strong>Tipo Componente:</strong> ${componentType}</p>
        <P><strong>Descripcion:</strong> ${description}</p>
        <P><strong>Recoger?:</strong> ${pickup}</p>
        `
    }

    const userMailOptions = {
        // origen
        from: 'donartec.donacion@gmail.com',
        // destino
        to: email,
        // asunto
        subject: 'Recibimos tu interes!',
        // cuerpo del correo
        html: `
        <h2>¡${userName} tu donación marcara la diferencia!</h2>
        <br>
        <p>
            Acércate a la jefatura de carrera del <strong>Area Informatica</strong> para dejar tu donación de ${componentType}<br>
            Nosotros nos encargaremos de darle una nueva vida.<br>
            Si tienes alguna duda no dudes en contactarnos a este mismo correo: donartec.donacion@gmail.com
        </p>
        <br>
        <p style="font-size: 16px; font-weight: bold; margin-top: 20px;">
            El equipo de <strong>DonArtec &lt;3</strong> agradece tu apoyo.
        </p>
        `
    }

    try {
        // enviar correo utilizando una promesa
        await transporter.sendMail(mailOptions); //DonArtec
        await transporter.sendMail(userMailOptions); //Usuario
        res.redirect('/gracias');
    } catch (error) {
        console.error('Error al enviar el correo: ', error);
        res.status(500).send('Error al enviar el correo.');
    }
}