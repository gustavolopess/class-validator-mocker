# class-validator-mocker

![](https://github.com/gustavolopess/class-validator-mocker/actions/workflows/continuous_integration.yml/badge.svg)


Uses decorators from [class-validator](https://github.com/typestack/class-validator) to generate
objects filled with random values with types based on used decorators.

## Usage

Once you have a class decorated with [class-validator](https://github.com/typestack/class-validator) decorators, you can create a random mocked object using
```ts
const randomMockedObj = ClassValidatorMocker.create<DecoratedClass>(DecoratedClass);
```

### Example

```ts
import {IsString, IsNumber, IsBoolean, IsUUID} from 'class-validator';
import {ClassValidatorMocker} from 'class-validator-mocker';

class MyClass {
    @IsString()
    stringProperty: string;

    @IsNumber()
    numberProperty: number;

    @IsBoolean()
    booleanProperty: boolean;

    @IsUUID()
    uuidProperty: string;
}

const myClassDataMock = ClassValidatorMocker.create<MyClass>(MyClass);

console.log(myClassDataMock);
```

This code could print something like
```ts
{
    stringProperty: '909f126026795c20df',
    numberProperty: 87310,
    booleanProperty: false,
    uuidProperty: 'd967f1b0-3457-4bac-a465-4e714ebe532a'
}

```

### Passing partial object
The `ClassValidatorMocker.create` method accepts an optional argument - a partial object of the type being handled:

```ts
create<T>(constructor: new () => T, partial: Partial<T> = {}): T
```

If the two last lines from example above would be changed to
```ts
const myClassDataMock = ClassValidatorMocker.create<MyClass>(MyClass, { numberProperty: 12 });

console.log(myClassDataMock);
```
The printed object could change to something like
```ts
{
    stringProperty: '909f126026795c20df',
    numberProperty: 12,
    booleanProperty: false,
    uuidProperty: 'd967f1b0-3457-4bac-a465-4e714ebe532a'
}
```
Meaning that all properties have randomly generated values, except the `numberProperty` who came from `partial` parameter.
