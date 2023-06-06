import {IsEmail, IsString} from 'class-validator';

export default class LoginUserDto {

  @IsEmail({}, {message: 'Должен быть указан валидный адрес электронной почты'})
  public email!: string;

  @IsString({message: 'Пароль обязательное поле'})
  public password!: string;
}
