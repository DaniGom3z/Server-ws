import { ConnectionOptions, createConnection } from "mysql2";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

const config : ConnectionOptions = {
    host: 'apimulti.crsomqkaqd5t.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'danigomez123',
    database: 'multi'
}

const conn : Connection = createConnection(config);

export const db = conn.promise();