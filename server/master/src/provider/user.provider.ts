import { Connection } from "typeorm";
import { ProviderRepository } from "src/constants/provider.constants";
import { User } from "src/entity/User.entity";

export const UserProvider = [
  {
    provide: ProviderRepository.USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User)
  },
];