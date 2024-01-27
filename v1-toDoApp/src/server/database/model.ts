// import { Pool, QueryResult } from "pg";
import pkg, { QueryResult } from 'pg'
const { Pool } = pkg;

const PG_URI = 'postgres://thdnzpea:l5qYwcKa98pld1Shfs1PUYpsIqNO-p7G@heffalump.db.elephantsql.com/thdnzpea';

const pool = new Pool({
  connectionString: PG_URI
});

export { pool, PG_URI };

export const query = (
  text: string,
  params: string[]
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