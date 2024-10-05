export type AppConfig = {
  nodeEnv: string;
  name: string;
  description: string;
  version: string;
  apiPrefix: string;
  frontendDomain?: string;
  port: string;
};

export type DatabaseConfig = {
  mongoUrl?: string;
};

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
};
