import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

type EarthquakeImportAuditInfo = {
  successCount: number;
  errorCount: number;
  errors: unknown[];
};

@Entity({ name: 'earthquake_import_audit' })
export class EarthquakeImportAudit {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('jsonb')
  info: EarthquakeImportAuditInfo;
}
