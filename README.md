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

## Migrations

#### Migrate to v3

`forRoot()` method will be deprecated soon (still available in v3). Please use `withMapper()` instead.

## Documentations

This module is a wrapper around `@nartc/automapper` so all usage documentations should be referenced at the link below.

Github Pages [https://automapper.netlify.com/](https://automapper.netlify.com/)
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

Contributions are appreciated.


## Setup
```
npm i -s nestjsx-automapper
```

Installing `nestjsx-automapper` will also install `@nartc/automapper`.

**Note 1**: Please make sure that you've read `@nartc/automapper` documentations to familiarize yourself with `AutoMapper`'s terminology and how to setup your `Profile` and such.

### Setup

1. Import `AutomapperModule` in `AppModule` and call `.withMapper()` method

```typescript
@Module({
  imports: [AutomapperModule.withMapper()],
})
export class AppModule {}
```

`AutomapperModule.withMapper()` has the following overloads:

```typescript
static withMapper(name?: string, options?: AutoMapperGlobalSettings);
static withMapper(options?: AutoMapperGlobalSettings);
```

- `name`: Name of the `AutoMapper` instance being created with `withMapper()`. Default to `"default"`
- `options`: Check [AutoMapperGlobalSettings](https://automapper.netlify.app/docs/usages/init/with-global-settings/) for more information

2. `nestjsx-automapper` exposes a `@Profile()` decorator to decorate your `Profile` classes.

```typescript
@Profile()
class UserProfile extends ProfileBase {}
```

`@Profile()` takes in an optional `name` argument. This is the `name` if the `AutoMapper` instance you use to create the instance with `withMapper()`. Default to `"default"`

Usually, `NestJS` will have many **Feature Modules** for each of the **Domain Models**. Hence, a `Profile` should stay in close to where the **feature module** is.
If you want to separate `Profile` out to a separate file, then you need to make sure that file gets executed by importing it somewhere (again, the module is a good place).

3. Inject the `AutoMapper` instance in your `Injectable`

```typescript
@Injectable()
export class UserService {
  constructor(@InjectMapper() private readonly mapper: AutoMapper) {}
}
```

`@InjectMapper()` takes in an optional `name` argument which will tell the decorator which `AutoMapper` instance to inject. Default to `"default"`

> `InjectMapper` is imported from `nestjsx-automapper`. `AutoMapper` is imported from `@nartc/automapper`

4. Use `AutoMapper` on your models

```typescript
// ...
const result = await newUser.save();
return this.mapper.map(result.toJSON(), UserVm, User);
```
