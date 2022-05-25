
// const request = require('supertest');
// const assert = require('assert');
// const express = require('express');
import {getNowPlaying, getUpcoming, getPopular} from '../../services/movie-database-service';



describe('movieDatabaseService', () => {

    describe('getNowPlaying', () => {
        it('responds with json', async () => {
            const data = await getNowPlaying();

            expect(data).toBeTruthy();
            expect(data.length).toBeGreaterThan(0);
        });
    });

    describe('getUpcoming', () => {
        it('responds with json', async () => {
            const data = await getUpcoming();

            expect(data).toBeTruthy();
            expect(data.length).toBeGreaterThan(0);
        });
    });

    describe('getPopular', () => {
        it('responds with json', async () => {
            const data = await getPopular();

            expect(data).toBeTruthy();
            expect(data.length).toBeGreaterThan(0);
        });
    });


});// describe movieDatabaseService