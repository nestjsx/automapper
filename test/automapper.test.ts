import { AutoMapper, MappingProfileBase } from '@nartc/automapper';
import { Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Expose } from 'class-transformer';
import { AutomapperModule } from '../src';
import { getMapperToken } from '../src/utils/getMapperToken';
import { MAPPER_MAP } from '../src/utils/mapperMap';

class Mock {
  @Expose()
  foo!: string;
}

class MockVm {
  @Expose()
  bar!: string;
}

class MockProfile extends MappingProfileBase {
  constructor() {
    super();
  }

  configure(mapper: AutoMapper): void {
    mapper
      .createMap(Mock, MockVm)
      .forMember(d => d.bar, opts => opts.mapFrom(s => s.foo))
      .reverseMap();
  }
}

@Module({
  imports: [AutomapperModule.forRoot()],
})
class MockModule {}

@Module({
  imports: [AutomapperModule.forFeature({ profiles: [new MockProfile()] })],
})
class MockSubModule {}

describe('AutoMapper test', () => {
  let moduleFixture: TestingModule;
  let mapper: AutoMapper;
  let mapperMap: Map<string, AutoMapper>;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [MockModule, MockSubModule],
    }).compile();
    mapperMap = moduleFixture.get<Map<string, AutoMapper>>(MAPPER_MAP);
    mapper = moduleFixture.get<AutoMapper>(getMapperToken());
  });

  afterAll(() => {
    mapper.dispose();
  });

  it('AutomapperModule has been initialized', () => {
    expect(mapperMap.size).toBeGreaterThan(0);
    expect(mapper).toBeTruthy();
    expect(mapper).toEqual(mapperMap.get(getMapperToken()));
  });

  it('AutomapperModule - map', () => {
    const _mock = new Mock();
    _mock.foo = 'baz';

    const vm = mapper.map(_mock, MockVm);
    expect(vm).toBeTruthy();
    expect(vm.bar).toEqual(_mock.foo);
    expect(vm).toBeInstanceOf(MockVm);
  });

  it('AutomapperModule - reverseMap', () => {
    const _mockVm = new MockVm();
    _mockVm.bar = 'should be foo';

    const _mock = mapper.map(_mockVm, Mock);
    expect(_mock).toBeTruthy();
    expect(_mock).toBeInstanceOf(Mock);
    expect(_mock.foo).toEqual(_mockVm.bar);
  });
});
