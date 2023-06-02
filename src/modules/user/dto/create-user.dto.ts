import {IsBoolean, IsEmail, IsString, Length} from 'class-validator';

export default class CreateUserDto {

  @IsString({message: 'Имя обязательное поле'})
  @Length(1, 15, {message: 'Минимальная длина 1 символ, максимальная длина 15 символов'})
  public name!: string ;

  @IsEmail({}, {message: 'Должен быть указан валидный адрес электронной почты'})
  public email!: string;

  @IsString({message: 'Пароль обязательное поле'})
  @Length(6, 12, {message: 'Минимальная длина 6 символов, максимальная длина 12 символов'})
  public password!: string;

  @IsBoolean()
  public isAdmin?: boolean;
}
