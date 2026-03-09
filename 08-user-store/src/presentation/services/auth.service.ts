import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from '../../domain/dtos/auth/login.user.dto';
import { EmailService } from "./email.service";

export class AuthService {

  // DI
  constructor(
    private readonly emailService: EmailService,
  ) { }

  public async registerUser(registerUserDto: RegisterUserDto) {

    const existUser = await UserModel.findOne({ email: registerUserDto.email });

    if (existUser) throw CustomError.badRequest('Email already exist');

    try {

      const user = new UserModel(registerUserDto);

      user.password = await bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      await this.sendEmailValidationLink(user.email)

      const { password, ...userEntity } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');

      return {
        user: userEntity,
        token
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

  private async sendEmailValidationLink(email: string) {

    const token = await JwtAdapter.generateToken({ email });

    if (!token) throw CustomError.internalServer('Erro getting token');

    const link = `${envs.WEBSERVICE_URL}/api/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Link on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options);

    if (!isSent) throw CustomError.internalServer('Error sending email');
  }

  public async validateEmail(token: string) {

    const payload = await JwtAdapter.validateToken(token);

    if (!payload) throw CustomError.unauthorized('Invalid token');

    const { email } = payload as { email: string };

    if (!email) throw CustomError.internalServer('Email not in token');

    const user = await UserModel.findOne({ email });

    if (!user) throw CustomError.internalServer('Email not exists');

    user.emailValidated = true;

    await user.save();

    return true;

  }
}