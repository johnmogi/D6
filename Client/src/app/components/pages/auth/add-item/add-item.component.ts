import {Router, ActivatedRoute} from '@angular/router';
import {ProductModel} from 'src/app/models/Products-model';
import {ShopService} from 'src/app/services/shop.service';
import {AdminService} from 'src/app/services/admin.service';
import {store} from 'src/app/redux/store';
import { CategoryModel } from 'src/app/models/Category-model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({selector: 'app-add-item', templateUrl: './add-item.component.html', styles: []})
export class AddItemComponent implements OnInit {
 public uploadedFile: File = null;
  public products: ProductModel[];
    public product : ProductModel = new ProductModel();
    public formValid : Boolean = false;
    // public cats = new CategoryModel();
    public cats = [];
public srcResult = '';
    public addItItemForm = {
        itemName: '',
        price: 1,
        imageUrl: '',
        itemDescription: '',
        catID: 0
    }
  

    constructor(private http: HttpClient, private shopService : ShopService, private adminService : AdminService, private router : Router) {}

    async ngOnInit() {
        try {
          this.shopService.getAllcats().subscribe(
            (res) => {
              this.cats = res;
            },
            (err) => alert(err.message)
          );
          console.log(this.cats)
          // * Fetch this item details:

        } catch (err) {
            alert(err.message);
        }
    }
    public validateForm() {
        if (!this.addItItemForm.itemName || !this.addItItemForm.catID || !this.addItItemForm.itemDescription || !this.addItItemForm.price) {
            alert("one of the fields is missing, check and try again")
            return
        }
        if(this.addItItemForm.price<1){
          alert("Item price must be positive, wer'e here to profit...")
          return
        }
        else {
            this.formValid = true;
        }
    }
    public loadImage(event: any): void {
      this.uploadedFile= <File>event.target.files[0];
    }
    
    public uploadImage(): void {
      
      const itemForm: FormData = new FormData();
      itemForm.append('imageUrl', JSON.stringify(this.uploadedFile));
// itemForm.append('imageUrl', this.uploadedFile, this.uploadedFile.name);
// console.log(itemForm.getAll('imageUrl'));

      console.log(itemForm)
      this.adminService.addItem(this.addItItemForm)
      .subscribe(res => {
        console.log(res)
        alert('you have added an item...');
       
      }, err => console.log(err))

    }
      // console.info("files :" + JSON.stringify(event.target))

      // this.product.imageUrl = event.target.files.item(0);
      // console.info("files :" + JSON.stringify(this.product.imageUrl))

      // this.product.imageUrl = event.target.files[0];
   

    public addItem() {
        this.validateForm();
        if (!this.formValid) {
            return
        }
        // unable to send files atm
        this.adminService.addItem(this.addItItemForm)
        .subscribe(res => {
          alert('you have added an item...');
         
        }, err => console.log(err))
  

    }

  
}
