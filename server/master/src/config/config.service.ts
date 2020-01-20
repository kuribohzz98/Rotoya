import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    let current_path = __dirname.split('\\');
    current_path.pop();
    current_path.pop();
    this.envConfig['path_file_upload'] = current_path.join('\\') + this.envConfig['PATH_FILE_UPLOAD'];
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}