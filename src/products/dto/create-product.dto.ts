import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  namespace: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  companyId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  status: string;
}
