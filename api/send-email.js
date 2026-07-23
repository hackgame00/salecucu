const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, phone, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // TLS
        auth: {
            user: 'salecucu00@gmail.com',
            pass: 'bjru gimd udeb fzmd'
        }
    });

    let mailSubject = subject || 'Thông báo: Có người vừa tải SaleCuCu POS';
    let textBody = '';
    let htmlBody = '';

    if (message) {
        // This is from the contact form
        mailSubject = 'Yêu cầu tư vấn mới từ SaleCuCu POS';
        textBody = `Bạn có một yêu cầu tư vấn mới:\n\nHọ và tên: ${name}\nSố điện thoại: ${phone}\nEmail: ${email || 'Không có'}\n\nNội dung: ${message}`;
        htmlBody = `<h3>Yêu cầu tư vấn mới từ SaleCuCu POS</h3>
                    <p><strong>Họ và tên:</strong> ${name}</p>
                    <p><strong>Số điện thoại:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email || 'Không có'}</p>
                    <p><strong>Nội dung:</strong><br/> ${message.replace(/\n/g, '<br/>')}</p>`;
    } else {
        // This is from the download form
        textBody = `Có một người dùng vừa tải phần mềm:\n\nHọ và tên: ${name}\nSố điện thoại: ${phone}\nEmail: ${email || 'Không có'}\n\nHãy liên hệ chăm sóc khách hàng này nhé!`;
        htmlBody = `<h3>Có người vừa tải phần mềm SaleCuCu POS</h3>
                    <p><strong>Họ và tên:</strong> ${name}</p>
                    <p><strong>Số điện thoại:</strong> ${phone}</p>
                    <p><strong>Email:</strong> ${email || 'Không có'}</p>`;
    }

    const mailOptions = {
        from: '"SaleCuCu POS System" <salecucu00@gmail.com>',
        to: 'hackgame00@icloud.com', // Sending notification to the owner
        subject: mailSubject,
        text: textBody,
        html: htmlBody
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Lỗi gửi email:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
