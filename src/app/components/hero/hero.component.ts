import { Component, ViewChild } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})

export class HeroComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  heroes: any = {};
  filter: string = '';
  selected: any = null;
  searchValue = new FormControl();
  displayedColumns: string[] = ['id', 'name', 'age', 'actions'];
  dataSource = new MatTableDataSource<Hero>();
  title: string = '';
  loading: boolean = false;
  heroForm = new FormGroup({
    "name": new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    "age": new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
  });

  constructor(
    private heroService: HeroService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getHeroes();
  }

  // GET HEROES FILTRANDO SERVICIO (TEXTO EXACTO AL VALOR)
  // getHeroes(): void {
  //   this.heroService.getHeroes(this.filter).subscribe((response: any) => {
  //     this.heroes = response;
  //     this.dataSource = new MatTableDataSource<Hero>(this.heroes);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  // GET HEROES FILTRANDO CON INCLUDE (TEXTO INCLUYE VALOR)
  getHeroes(): void {
    this.loading = true;
    this.heroService.getHeroes().subscribe((response: any) => {
      if (this.filter) {
        this.heroes = response.filter((hero: Hero) => hero.name.includes(this.filter));
      } else {
        this.heroes = response;
      }
      this.loading = false;
      this.dataSource = new MatTableDataSource<Hero>(this.heroes);
      this.dataSource.paginator = this.paginator;
    });
  }

  select(hero: Hero | string): void {
    this.selected = hero;
    if (this.selected == 'new') {
      this.title = 'New hero';
    } else {
      this.title = 'Edit hero';
      this.heroForm.setValue({
        name: this.selected.name,
        age: this.selected.age
      });
    }
  }

  cancel(): void {
    this.heroForm.reset();
    this.selected = null;
    this.getHeroes();
  }

  editHero(): void {
    this.loading = true;
    if (this.selected === 'new') {
      // ADD HERO
      const newId = this.setNewId().toString();
      const data: any = {
        'id': newId,
        'name': this.heroForm.value.name,
        'age': this.heroForm.value.age
      };
      this.heroService.createHero(data).subscribe((response) => {
        this.applyActions();
        this.loading = false;
      });
    } else {
      // EDIT HERO
      if (this.heroForm.valid) {
        this.heroService.editHero(this.selected.id, this.heroForm.value).subscribe((response) => {
          this.applyActions();
          this.loading = false;
        });
      }
    }
  }

  applyActions(): void {
    this.getHeroes();
    this.heroForm.reset();
    this.selected = null;
  }

  openDialog(elementToDelete: Hero): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: `Are you sure you want to delete?`
      })
      .afterClosed()
      .subscribe((confirm: Boolean) => {
        if (confirm) {
          this.deleteHero(elementToDelete);
        }
      });
  }

  deleteHero(element: Hero): void {
    this.heroService.deleteHero(element.id).subscribe(() => {
      this.getHeroes();
    });
  }

  searchByName(): void {
    this.filter = this.searchValue.value;
    this.getHeroes();
  }

  clearInputSearch(): void {
    this.searchValue.setValue('');
    this.searchByName();
  }

  setNewId(): number {
    const max = Math.max(...this.heroes.map((elem: Hero) => Number(elem.id)));
    return max + 1;
  }
}
