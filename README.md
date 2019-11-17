<p align="center"><img src="https://avatars1.githubusercontent.com/u/43827489?s=400&u=45ac0ac47d40b6d8f277c96bdf00244c10508aef&v=4"/></p>
<p align="center">
    <a href="https://badgen.net/travis/nestjsx/automapper"><img src="https://badgen.net/travis/nestjsx/automapper" alt="travis"/></a>
    <a href="https://badgen.net/npm/v/nestjsx-automapper"><img src="https://badgen.net/npm/v/nestjsx-automapper" alt="npm"/></a>
    <a href="https://badgen.net/npm/dt/nestjsx-automapper"><img src="https://badgen.net/npm/dt/nestjsx-automapper" alt="downloads"/></a>
    <a href="https://badgen.net/bundlephobia/minzip/nestjsx-automapper"><img src="https://badgen.net/bundlephobia/minzip/nestjsx-automapper" alt="bundlephobia"/></a>
    <a href="https://badgen.net/github/license/nestjsx/automapper"><img src="https://badgen.net/github/license/nestjsx/automapper" alt="license"/></a>
    <a href="https://coveralls.io/repos/github/nestjsx/automapper/badge.svg?branch=master"><img src="https://coveralls.io/repos/github/nestjsx/automapper/badge.svg?branch=master" alt="coveralls"/></a>
    <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/nestjsx/automapper.svg" alt="Greenkeeper"/></a>
</p>
<h1 align="center">NestJSX Automapper</h1>
<p align="center">A wrapper around <a href="https://github.com/nartc/mapper">@nartc/automapper</a> to be used with <strong>NestJS</strong> as a <code>Module</code>.</p>

## Documentations

This module is a wrapper around `@nartc/automapper` so all usage documentations should be referenced at the link below. 

Github Pages [https://nartc.github.io/mapper/](https://nartc.github.io/mapper/)
Github Repo [https://github.com/nartc/mapper](https://github.com/nartc/mapper)

## Features

- [x] Mapping between two classes
- [x] Mapping for nested classes
- [x] Array/List Mapping
- [x] Flattening
- [x] Basic ReverseMap
- [x] Value Converters
- [x] Value Resolvers
- [x] Async
- [x] Before/After Callback
- [x] Naming Conventions (PascalCase and camelCase)

#### Future features:

- [ ] Type Converters - Help needed
- [ ] Value Transformers

#### Might not support / Need use-case:

- [x] Null Substitution - It makes more sense to use `fromValue()` instead of implement `nullSubstitution()`. Please let me know of a use-case where `nullSubstitution()` makes sense.

Contributions are appreciated.


## Setup
```
npm i -s nestjsx-automapper
```

Installing `nestjsx-automapper` will also install `@nartc/automapper`.

**Note 1**: Please make sure that you've read `@nartc/automapper` documentations to familiarize yourself with `AutoMapper`'s terminology and how to setup your `Profile` and such.

1. Import `AutomapperModule` in `AppModule` and call `.forRoot()` method.

```typescript
@Module({
  imports: [AutomapperModule.forRoot()]
})
export class AppModule {}
```
 
`AutomapperModule.forRoot()` method expects an `AutomapperModuleRootOptions`. When you call `AutomapperModule.forRoot()`, a new instance of `AutoMapper` will be created with the `name` option. There are two properties on the options that you can pass in:
- `name`: Name of this `AutoMapper` instance. Default to `"default"`.
- `config`: A configuration function that will get called automatically.

Both options are optional. If you pass in `config` and configure your `AutoMapper` there, that is totally fine, but the following approach is recommended. Refer to [@nartc/automapper: usage](https://github.com/nartc/mapper#usage) 

2. `AutoMapper` has a concept of `Profile`. A `Profile` is a class that will house some specific mappings related to a specific domain model. Eg: `User` mappings will be housed by `UserProfile`. Refer to [@nartc/automapper: usage](https://github.com/nartc/mapper#usage) for more information regarding `Profile`.

`nestjsx-automapper` exposes a `@Profile()` to decorate your `Profile` class.

```typescript 
@Profile()
class UserProfile extends MappingProfileBase {}
```

`@Profile(name?: string)` takes in an optional `name` parameter, this is the `name` of the `AutoMapper` instance you want to add this Profile on to.

3. Inject an instance of `AutoMapper` in your `Service`:

```typescript
export class UserService {
  constructor(@InjectMapper() private readonly _mapper: AutoMapper) {}
}
```

**Note**: `AutoMapper` is imported from `@nartc/automapper`. `InjectMapper` decorator is imported from `nest-automapper`.

`InjectMapper()` accepts an optional argument `name` which will tell the decorator to inject the right instance of `AutoMapper`. Default to `"default"`.

4. Use `AutoMapper` on your domain models:

```typescript
...
const result = await newUser.save();
return this._mapper.map(result.toJSON(), UserVm);
...
```
