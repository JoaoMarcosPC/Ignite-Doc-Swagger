import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const admUser = this.usersRepository.findById(user_id);

    if(!admUser) {
        throw new Error("Usuário com esse id não encontrado");
    }

    if(admUser.admin === false) {
        throw new Error("Você não tem acesso. Faça login como adm");
    }

    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
