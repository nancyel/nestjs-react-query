import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export const capitalize = (text: string) => text.toUpperCase();

const isValidCharacter = (value: string) =>
  ['A', 'U', 'G', 'C'].includes(value);

const validateCodon = (values: string[]) => {
  const isValid = values.every(isValidCharacter);
  if (!isValid) {
    throw new BadRequestException('valid character includes A, U, G, C');
  }
};
export const validateRNACodon = (data: TransformFnParams) => {
  if (data.key === 'rnaCodon') {
    validateCodon(data.value.split(''));
  }
  return data.value;
};

export const transformToArray = (data: TransformFnParams) => {
  try {
    const arrayStr = JSON.parse(data.value);
    return arrayStr;
  } catch (err) {
    throw new BadRequestException(`${data.key} must be an array of numbers.`);
  }
};
