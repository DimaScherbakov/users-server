import {User} from "../models/user";
import {BasicStatistics, UserStatistics} from "../models/user-statistics";

const dbConnenct = require('./db'),
    config = require('../config/config');

const conf = require('../config/config');

module.exports = {
    getLength: async (): Promise<number> => {
        let counter = 0;
        const usersRef = await dbConnenct.collection('users').get();
        usersRef.forEach(() => counter = counter + 1);
        return counter;
    },
    isPage: (page: number, itemsLength: number): boolean => {
        return page * conf.usersPerPage <= itemsLength;
    },
    getUsersPerPage: async (page: number): Promise<Array<User>> => {
        const users: Array<User> = [];
        const usersRef = await dbConnenct.collection('users')
            .orderBy('id')
            .startAt(page * config.usersPerPage)
            .limit(config.usersPerPage)
            .get();
        usersRef.forEach((doc: any) => {
            users.push(doc.data())
        });
        return users;
    },
    getUserBasicStats: async (userId: number): Promise<Array<BasicStatistics>> => {
        const stats: Array<BasicStatistics> = [];
        const statsRef = await dbConnenct.collection('users_statistic')
            .where("user_id", "==", userId)
            .get();
        statsRef.forEach((doc: any) => {
            const data = doc.data();
            const stat = {
                clicks: data.clicks,
                user_id: data.user_id
            };
            stats.push(stat);
        });
        return stats;
    },
    getUserStatistics: async (userId: number): Promise<Array<UserStatistics>> => {
        const stats: Array<UserStatistics> = [];
        const statsRef = await dbConnenct.collection('users_statistic')
            .where("user_id", "==", userId)
            .get();
        statsRef.forEach((doc: any) => {
            const data = doc.data();
            stats.push(data);
        });
        return stats;
    }
};
