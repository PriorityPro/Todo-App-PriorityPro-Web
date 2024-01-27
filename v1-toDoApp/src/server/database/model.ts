// import { Pool, QueryResult } from "pg";
import pkg, { QueryResult } from 'pg'
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const connectionString = process.env.PG_URI || '';

const pool = new Pool({ connectionString });

export { pool };

export const query = (
  text: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: string[] | undefined | any
): Promise<QueryResult> => {
  console.log('executed query', text);
  return new Promise<QueryResult>((resolve, reject) => {
    pool.query(text, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};