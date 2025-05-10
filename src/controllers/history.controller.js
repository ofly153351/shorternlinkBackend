const prisma = require('../lib/prisma');


exports.getHistory = async (req, res) => {
    const { userId } = req.params; // รับ userId จาก request parameters

    try {
        const history = await prisma.history.findMany({
            where: { userId: parseInt(userId) },
            select: {
                beforeLink: true,
                afterLink: true,
                createdAt: true,
                Clicked: true,
            },
        });

        if (history.length === 0) {
            return res.status(404).json({ error: 'History not found' });
        }

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};