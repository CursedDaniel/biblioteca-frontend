import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../../core/services/crud.service';
import { ENTITY_LIST, FieldConfig } from '../../core/config/entities.config';

type Row = Record<string, any>;
type Mode = 'closed' | 'view' | 'create' | 'edit';

@Component({
  selector: 'app-entity-page',
  imports: [ReactiveFormsModule],
  templateUrl: './entity-page.html',
  styleUrl: './entity-page.css',
})
export class EntityPage {
  private crud = inject(CrudService);
  protected cfg = ENTITY_LIST.find(
    e => e.route === inject(ActivatedRoute).snapshot.data['entity']
  )!;

  protected rows = signal<Row[]>([]);
  protected lookups = signal<Record<string, Row[]>>({});
  protected loading = signal(false);
  protected error = signal<string | null>(null);
  protected mode = signal<Mode>('closed');
  protected selected = signal<Row | null>(null);
  protected form = new FormGroup<Record<string, FormControl>>({});

  constructor() {
    for (const f of this.cfg.fields) {
      this.form.addControl(
        f.key,
        new FormControl(f.type === 'checkbox' ? false : '', f.required ? Validators.required : [])
      );
    }
    this.load();
    this.loadLookups();
  }

  protected get tableFields() {
    return this.cfg.fields.filter(f => !f.hideInTable);
  }

  protected load() {
    this.loading.set(true);
    this.error.set(null);
    this.crud.getAll<Row>(this.cfg.endpoint).subscribe({
      next: d => { this.rows.set(d); this.loading.set(false); },
      error: e => this.fail(e),
    });
  }

  private loadLookups() {
    for (const f of this.cfg.fields.filter(x => x.lookup)) {
      this.crud.getAll<Row>(f.lookup!.endpoint).subscribe(d =>
        this.lookups.update(l => ({ ...l, [f.key]: d }))
      );
    }
  }

  protected display(row: Row, f: FieldConfig): string {
    const v = row[f.key];
    if (f.lookup) {
      const hit = this.lookups()[f.key]?.find(o => o[f.lookup!.valueKey] === v);
      return hit ? hit[f.lookup.labelKey] : String(v ?? '');
    }
    return v === null || v === undefined ? '' : String(v);
  }

  protected openView(row: Row) {
    this.crud.getById<Row>(this.cfg.endpoint, row[this.cfg.idField]).subscribe({
      next: r => { this.selected.set(r); this.mode.set('view'); },
      error: e => this.fail(e),
    });
  }

  protected openCreate() {
    this.form.reset();
    this.selected.set(null);
    this.mode.set('create');
  }

  protected openEdit(row: Row) {
    this.crud.getById<Row>(this.cfg.endpoint, row[this.cfg.idField]).subscribe({
      next: r => { this.selected.set(r); this.form.patchValue(r); this.mode.set('edit'); },
      error: e => this.fail(e),
    });
  }

  protected close() { this.mode.set('closed'); }

  protected save() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const body = this.form.getRawValue();
    const id = this.selected()?.[this.cfg.idField];
    const req$ = this.mode() === 'edit'
      ? this.crud.update<Row>(this.cfg.endpoint, id, body)
      : this.crud.create<Row>(this.cfg.endpoint, body);
    req$.subscribe({
      next: () => { this.close(); this.load(); },
      error: e => this.fail(e),
    });
  }

  protected remove(row: Row) {
    if (!confirm('¿Eliminar este registro?')) return;
    this.crud.delete(this.cfg.endpoint, row[this.cfg.idField]).subscribe({
      next: () => this.load(),
      error: e => this.fail(e),
    });
  }

  private fail(e: any) {
    const d = e?.error?.detail;
    this.error.set(
      Array.isArray(d) ? d.map((x: any) => x.msg).join(' · ')
        : typeof d === 'string' ? d
        : (e?.message ?? 'Error de red')
    );
    this.loading.set(false);
  }
}