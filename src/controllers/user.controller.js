const { hashPassword, verifyPassword } = require('../utils/hashpass');

const prisma = require('../lib/prisma');

exports.createUser = async (req, res) => {
    const { userName, password } = req.body;

    // ตรวจสอบว่าค่าถูกส่งมาหรือไม่
    if (!userName || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { userName },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                userName,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { userName },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await verifyPassword(user.password, password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }



        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.createShortUrl = async (req, res) => {
    const { userId, beforeLink, afterLink } = req.body;

    if (!userId || !beforeLink || !afterLink) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Check if the user already has a short link for the given beforeLink
        const existingLink = await prisma.history.findFirst({
            where: { userId: userId, beforeLink: beforeLink },
        });

        if (existingLink) {
            return res.status(200).json({
                message: 'Link already exists',
                data: existingLink
            });
        }

        const newLink = await prisma.history.create({
            data: {
                userId: userId,
                beforeLink: beforeLink,
                afterLink: afterLink,
                Clicked: 0,
            },
        });

        res.status(201).json({ message: 'Link created successfully', data: newLink });
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

