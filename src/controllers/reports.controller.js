const e = require('express');
const prisma = require('../lib/prisma');

exports.getReports = async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    try {
        // ทำให้ทุกการดึงข้อมูลทำงานพร้อมกัน
        const [totalClicks, totalLinks, totalLinksToday] = await Promise.all([
            // ดึงจำนวนคลิกทั้งหมด
            prisma.history.aggregate({
                _sum: {
                    Clicked: true
                }
            }),
            // ดึงจำนวนลิงก์ทั้งหมด
            prisma.history.aggregate({
                _count: {
                    historyId: true
                }
            }),
            // ดึงจำนวนลิงก์ที่ถูกคลิกในวันนี้
            prisma.history.aggregate({
                where: {
                    createdAt: {
                        gte: startOfDay,
                        lt: endOfDay
                    }
                },
                _count: {
                    historyId: true
                }
            })
        ]);

        // ส่งข้อมูลทั้งหมดกลับไปยัง frontend
        res.status(200).json({
            totalClicks: totalClicks._sum.Clicked || 0,
            totalLinks: totalLinks._count.historyId || 0,
            totalLinksToday: totalLinksToday._count.historyId || 0
        });
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

exports.incrementLinkClicked = async (req, res) => {
    const { afterlink, userId } = req.body;

    if (!afterlink || !userId) {
        return res.status(400).json({ error: 'Both afterlink and userId are required' });
    }

    try {
        const existingLink = await prisma.history.findFirst({
            where: {
                afterLink: afterlink,
                userId: userId,
            }
        });

        if (!existingLink) {
            return res.status(404).json({ error: 'Link not found for this user' });
        }

        const updatedLink = await prisma.history.update({
            where: { historyId: existingLink.historyId },
            data: {
                Clicked: existingLink.Clicked + 1,
            },
        });

        res.status(200).json({
            afterLink: afterlink,
            totalClicked: updatedLink.Clicked,
        });
    } catch (error) {
        console.error('Error updating click count:', error);

        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getUserClicked = async (req, res) => {
    const { userId, afterLink } = req.query;

    console.log("Query received:", { userId, afterLink });

    if (!userId || !afterLink) {
        return res.status(400).json({ error: 'userId and afterLink are required' });
    }

    try {
        const userClicks = await prisma.history.findFirst({
            where: {
                userId: parseInt(userId), // <- ต้องแน่ใจว่า userId เป็นตัวเลข
                afterLink: afterLink
            },
            select: {
                Clicked: true
            }
        });

        console.log("Query result:", userClicks);

        res.status(200).json({
            userClicked: userClicks?.Clicked || 0
        });
    } catch (error) {
        console.error("🔥 Prisma error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getAllClickedThisLink = async (req, res) => {
    const { afterLink } = req.query;

    if (!afterLink) {
        return res.status(400).json({ error: 'afterLink is required' });
    }

    try {
        const totalClicks = await prisma.history.aggregate({
            _sum: {
                Clicked: true
            },
            where: {
                afterLink: afterLink
            }
        });

        res.status(200).json({
            totalClicked: totalClicks._sum.Clicked || 0
        });
    } catch (error) {
        console.error("🔥 Error counting total clicks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};