import config from '@/.osswrc.json';
import { ServerContext } from '@/core/widgets-manifest';
import { getDatabaseUri, withConnection } from '@/utils/mysql';
import { RowDataPacket } from 'mysql2/promise';

export function createServerContext (): ServerContext {
  return {
    async runSql (dbName: string, sql: string): Promise<{ data: any[]; columns: { name: string; type: number }[] }> {
      const db = config.db.find(db => db.name = dbName);
      if (!db) {
        throw new Error(`Unknown datasource ${dbName}`);
      }
      const uri = getDatabaseUri(process.env[db.env] || db.database);

      const [data, columns] = await withConnection(uri, conn => conn.query<RowDataPacket[]>(sql));
      return { data, columns: columns.map(({ name, type }) => ({ name, type })) };
    }
  }
}