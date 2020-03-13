import {User} from "../models/user";
import {BasicStatistics, UserStatistics} from "../models/user-statistics";

const express = require('express'),
    router = express.Router(),
    usersService = require('../services/users'),
    config = require('../config/config');

router.get('/page/:pageIndex', async (request: any, response: any) => {
    try {
        let pageIndex = +request.params.pageIndex;
        const usersLength = await usersService.getLength();

        if (!pageIndex) {
            pageIndex = 1;
        }
        if (!usersService.isPage(pageIndex, usersLength)) {
            throw new Error('Page number is unreachable.')
        }

        const usersPerPage: Array<User> = await usersService.getUsersPerPage(pageIndex);
        const usersDashboard: Array<{ user: User, basicStats: BasicStatistics }> = await Promise.all(usersPerPage.map(async (user: User) => {
            const basicStats: BasicStatistics = await usersService.getUserBasicStats(user.id);
            return {user, basicStats};
        }));
        response.json({
            data: usersDashboard
        });

    } catch (error) {
        response.status(500).send(error);
    }

});
router.get('/pages-count', async (req: any, resp: any) => {
    try {
        const length = await usersService.getLength();
        const usersPerPage = length % config.usersPerPage;
        const pages = usersPerPage === 0 ? length % usersPerPage : usersPerPage + 1;

        resp.send({
            length: pages
        })
    } catch (error) {
        resp.status(500).send(error);
    }
});

router.get('/user-statistics/:userId', async (req: any, resp: any) => {
    try {
        const userId: number = +req.params.userId;
        const stats: Array<UserStatistics> = await Promise.all(usersService.getUserStatistics(userId));

        resp.send({
            data: stats
        })
    } catch (error) {
        resp.status(500).send(error);
    }
});

module.exports = router;
