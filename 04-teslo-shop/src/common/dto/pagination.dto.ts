import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    required: false,
    type: Number,
    description: 'The limit of items to get',
    default: 10,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    type: Number,
    description: 'The offset of items to get',
    default: 0,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
