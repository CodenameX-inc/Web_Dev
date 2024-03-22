// const tasklist = ""
import express from 'express';
import cors from 'cors'
import fs from 'fs'
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const PORT = 5000;

const DB_PATH = './database/TaskList.sqlite';
const tableName = 'TaskList';

export {express, cors, fs, bodyParser, rootDir, PORT, DB_PATH, tableName};