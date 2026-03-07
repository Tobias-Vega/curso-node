import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from '../../domain/dtos/auth/login.user.dto';

export class AuthService {

  // DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exist');

    try {

      const user = new UserModel(registerUserDto);

      user.password = await bcryptAdapter.hash(registerUserDto.password)

      await user.save();

      const { password, ...userEntity } = UserEntity.fromObject(user);

      return {
        user: userEntity
      };

    } catch (error) {
      throw CustomError.internalServer(`Expected error`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {

    const user = await UserModel.findOne({ email: loginUserDto.email });

    if (!user) throw CustomError.badRequest(`Invalid credentials`);

    const isMatching = await bcryptAdapter.compare(loginUserDto.password, user.password);

    if (!isMatching) throw CustomError.badRequest(`Invalid credentials`);

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) throw CustomError.internalServer(`Error while creating JWT`);

    return {
      user: userEntity,
      token: token,
    }
  }
}