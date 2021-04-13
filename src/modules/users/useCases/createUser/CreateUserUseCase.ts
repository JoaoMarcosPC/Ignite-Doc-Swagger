import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const checkIfEmailAlreadyTaken = this.usersRepository.findByEmail(email);

    if(checkIfEmailAlreadyTaken){
        throw new Error("Email já está em uso");
    }

    const newUser = this.usersRepository.create({name, email});

    return newUser;
  }
}

export { CreateUserUseCase };
