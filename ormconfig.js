var dbConfig = {
  synchronize:  true, // SHOULD BE DISABLED IN PRODUCTION
  autoLoadEntities: true,
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: "nestdev-db",
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: "nestdev",
      migrationRun: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: "localhost",
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: "nestdevtest",
      migrationRun: true,
      entities: ['**/*.entity.ts'],
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: "localhost",
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'nestdev',
      migrationRun: true,
      entities: ['**/*.entity.ts'],
    });
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbConfig;
