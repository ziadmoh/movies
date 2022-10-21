import {  Component, Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FileUpload } from 'primeng/fileupload';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { MoviesService } from 'src/app/services/movies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private _mS:MoviesService,
    private router:Router,private ac:ActivatedRoute,
    private toastr:ToastrService,
    private _appS:AppSharedService) { }

  filteredMovies:any[] =[]

  allMovies:any[] =[]

  categories:any[] =[]

  SERVER_URL = environment.SERVER_URL

  moviesDescVisibilty:any [] =[]

  selectedCategoryId:any;

  actionList: any[] = []

  selectedMovie: any = {};

  visibledeleteDialog:boolean = false

  visibleAddDialog:boolean = false;

  visibleUpdateDialog:boolean = false;

  newMovieForm: UntypedFormGroup;

  updateMovieForm: UntypedFormGroup;

  uploadedImgs:any [] = [];

  movieUpdateImage :any = ''

  isCategoriesLoaded:boolean = false

  isMoviesLoaded:boolean = false


  ngOnInit(): void {

    this.getAllCategories();
    this.getMoviesList();

      this.actionList = [{
        label: 'Actions',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-pencil',
            command: () => {
              this.showUpdateDialog()
            }
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.showDeleteDialog()
            }
          },
        ]
      },
    ];
    this.initNewMovieForm();
    this.initUpdateMovieForm();
  }

  onUpload(event) {
    for(let file of event.files) {
      this.uploadedImgs.push(file);
  }
}

  initNewMovieForm(){
    this.newMovieForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "category": new FormControl(null, Validators.required),
      "description": new FormControl(null, Validators.required),
    })
  }
  initUpdateMovieForm(){
    this.updateMovieForm = new FormGroup({
      "name": new FormControl(null, Validators.required),
      "category": new FormControl(null, Validators.required),
      "description": new FormControl(null, Validators.required),
    })
  }
  

  getMoviesList(){
    this.ac.queryParams.subscribe(params =>{
      if(params.categoryId){
        this.listByCategory(params.categoryId)
      }else{
        this.getAllMovies();
      }
    })
  }




  getAllMovies(){
    this.isMoviesLoaded = false
    this._mS.getAllMovies().subscribe((res:any) =>{
      if(res.status && res.status =="success"){
        this.filteredMovies = res.message;
        this.allMovies = res.message;
        res.message.forEach(mv =>{
          this.moviesDescVisibilty.push(false);
        })
        this.isMoviesLoaded = true
      }
    })
  }

  getAllCategories(){
    this._mS.getAllCategoreis().subscribe((res:any) =>{
      if(res.status && res.status =="success"){
        this.categories = res.message;
        this.isCategoriesLoaded = true
      }
    })
  }

  listByCategory(id){
    this.isMoviesLoaded = false
    this.selectedCategoryId = id;
    this.router.navigate([], {
      queryParams: {
        'categoryId': id,
      },
      queryParamsHandling: 'merge'
    })
    this._mS.listByCategory(id).subscribe((res:any) =>{
      if(res.status && res.status =="success"){
        this.filteredMovies = res.message;
        this.isMoviesLoaded = true
      }
    })
  }

  onMouseEnterMovie(i){
    this.moviesDescVisibilty[i] = true;
  }

  onMouseLeaveMovie(i){
    this.moviesDescVisibilty[i] = false;
  }

  resetFilter(){
    this.selectedCategoryId = '';
    this.router.navigate([], {
      queryParams: {
        'categoryId': null,
      },
      queryParamsHandling: 'merge'
    })
  }

  showDeleteDialog() {
    this.visibledeleteDialog = true

  }

  onDeleteMovie() {
    this._mS.deleteMovie(this.selectedMovie.id).subscribe((res: any) => {
      if (res.status == 'success') {
        this.toastr.success('movie deleted successfully!');
        this.getMoviesList();

        this.visibledeleteDialog = false
      } else {
        this.toastr.error('Error!');
      }
    })
  }

  showAddDialog() {
    this.uploadedImgs =[]
    this.visibleAddDialog = true
    this.initNewMovieForm();
    this.newMovieForm.updateValueAndValidity();
  }


  onAddMovie() {
    if (this.newMovieForm.valid && this.uploadedImgs.length ) {
        const form = new FormData();
        form.append('name',this.newMovieForm.get('name').value)
        form.append('image',this.uploadedImgs[0])
        form.append('category_id',this.newMovieForm.get('category').value.id)
        form.append('description',this.newMovieForm.get('description').value)
        this._mS.createMovie(form).subscribe((res:any) =>{
          console.log(res)
          if (res.status && res.status =="success") {
            this.visibleAddDialog = false
            this.toastr.success(res.message, "Added successfully!");
            this.getMoviesList();
            this.uploadedImgs =[]
          } else {
            this.toastr.error('Error!');
          }
        })
    } else {
      if(!this.uploadedImgs.length){
        this.toastr.error('Please select a photo')
      }

      if(this.newMovieForm.get('name').invalid){
        this.toastr.error('Please enter movie name')
      }

      if(this.newMovieForm.get('category').invalid){
        this.toastr.error('Please select a category')
      }

      if(this.newMovieForm.get('description').invalid){
        this.toastr.error('Please enter a description')
      }
      
  
    }
  }


  showUpdateDialog() {
    this.movieUpdateImage =''
    this.visibleUpdateDialog = true;
    let category = this.categories.find(cat =>{
      return cat.id ==this.selectedMovie.category_id
    })
    this.updateMovieForm  = new FormGroup({
      "name": new FormControl(this.selectedMovie.name, Validators.required),
      "category": new FormControl(category, Validators.required),
      "description": new FormControl(this.selectedMovie.description, Validators.required),
    })
    
    this.updateMovieForm.updateValueAndValidity();
  }

  

  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) return;
    this.movieUpdateImage = event.target.files[0]
    this.selectedMovie.image = URL.createObjectURL(this.movieUpdateImage);
  }


  onUpdateMovie() {
    if (this.updateMovieForm.valid ) {
        const form = new FormData();
        form.append('name',this.updateMovieForm.get('name').value)
        form.append('image',this.movieUpdateImage? this.movieUpdateImage:this.selectedMovie.image)
        form.append('category_id',this.updateMovieForm.get('category').value.id)
        form.append('description',this.updateMovieForm.get('description').value)
        form.append('_method','put')
        this._mS.updateMovie(this.selectedMovie.id,form).subscribe((res:any) =>{
          if (res.status && res.status =="success") {
            this.visibleUpdateDialog = false
            this.toastr.success("Updated successfully!");
            this.getMoviesList();
            this.uploadedImgs =[]
          } else {
            this.toastr.error('Error!');
          }
        })
    } else {

      if(this.updateMovieForm.get('name').invalid){
        this.toastr.error('Please enter movie name')
      }

      if(this.updateMovieForm.get('category').invalid){
        this.toastr.error('Please select a category')
      }

      if(this.updateMovieForm.get('description').invalid){
        this.toastr.error('Please enter a description')
      }
      
  
    }
  }



  


}
