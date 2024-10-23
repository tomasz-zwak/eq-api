import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Feature as GeoJSONProperties,
  Geometry as GeoJSONGeometry,
  Properties as EarthquakeProperties,
} from 'src/earthquake/client/earthquake-api-query-response.type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
export class Earthquakes {
  @Field(() => [Earthquake])
  entries: Earthquake[];

  @Field()
  total: number;
}

@ObjectType()
export class Geometry implements GeoJSONGeometry {
  @Field({ nullable: true })
  type: string;

  @Field(() => [Number])
  coordinates: number[];
}

@Entity({ name: 'earthquake' })
@ObjectType()
export class Earthquake implements Partial<EarthquakeProperties> {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
  @ApiProperty()
  @Column({ name: 'external_id', type: 'varchar', unique: true })
  @Field(() => String, { name: 'id' })
  externalId: GeoJSONProperties['id'];

  @ApiProperty()
  @Column()
  @Field()
  state: string;

  @ApiProperty()
  @Column()
  @Field()
  country: string;

  @ApiProperty()
  @Column({ type: 'jsonb', nullable: true })
  @Field(() => Geometry)
  geometry?: Geometry;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  mag?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  place?: string;

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: number) => new Date(value),
      from: (value) => value,
    },
    nullable: true,
  })
  @Field(() => Date)
  time: number;

  @Column({
    type: 'timestamp',
    transformer: {
      to: (value: number) => new Date(value),
      from: (value) => value,
    },
    nullable: true,
  })
  @Field(() => Date)
  updated?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tz?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  detail?: string;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  felt?: number;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  cdi?: number;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  mmi?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  alert?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  tsunami?: number;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  sig?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  net?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  code?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ids?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  sources?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  types?: string;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  nst?: number;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  dmin?: number;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  rms: number;

  @Column({ type: 'double precision', nullable: true })
  @Field({ nullable: true })
  gap?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  magType?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  title?: string;
}

@InputType()
export class EarthquakeFiltersInput {
  @Field(() => Date, {
    nullable: true,
  })
  date: Date;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  country?: string;
}

@InputType()
export class GeometryInput extends PartialType(Geometry, InputType) {}

@InputType()
export class EarthquakeInput extends PartialType(
  OmitType(Earthquake, ['geometry', 'id', 'createdAt']),
  InputType,
) {
  @Field(() => GeometryInput, { nullable: true })
  geometry?: GeometryInput;
}
