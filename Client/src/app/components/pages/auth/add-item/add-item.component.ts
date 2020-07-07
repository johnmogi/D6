import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/Products-model';
import { ShopService } from 'src/app/services/shop.service';
import { AdminService } from 'src/app/services/admin.service';
import { store } from 'src/app/redux/store';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthModel } from 'src/app/models/Auth-model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styles: [],
})
export class AddItemComponent implements OnInit {
  public user = new AuthModel(); // kick out un-logged users

  public uploadedFile: File = null;
  public products: ProductModel[];
  public product: ProductModel = new ProductModel();
  public formValid: Boolean = false;
  public cats = [];
  public srcResult = '';
  public addItItemForm = {
    itemName: '',
    price: 1,
    imageUrl: '',
    itemDescription: '',
    catID: 0,
  };

  constructor(
    private http: HttpClient,
    private shopService: ShopService,
    private adminService: AdminService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      this.shopService.getAllcats().subscribe(
        (res) => {
          this.cats = res;
        },
        (err) => alert(err.message)
      );
      console.log(this.cats);
      // * Fetch this item details:
    } catch (err) {
      alert(err.message);
    }

    this.user = store.getState().user;
    if (this.user === null || !this.user.isAdmin) {
      this.router.navigateByUrl('/');
    }
  }
  public validateForm() {
    if (
      !this.addItItemForm.itemName ||
      !this.addItItemForm.catID ||
      !this.addItItemForm.itemDescription ||
      !this.addItItemForm.price
    ) {
      alert('one of the fields is missing, check and try again');
      return;
    }
    if (this.addItItemForm.price < 1) {
      alert("Item price must be positive, wer'e here to profit...");
      return;
    } else {
      this.formValid = true;
    }
  }
  public loadImage(event: any): void {
    this.uploadedFile = <File>event.target.files[0];
  }

  public uploadImage(): void {
    const itemForm: FormData = new FormData();
    itemForm.append('imageUrl', JSON.stringify(this.uploadedFile));

    console.log(itemForm);
    this.adminService.addItem(this.addItItemForm).subscribe(
      () => {
        alert('you have added an item...');
      },
      (err) => console.log(err)
    );
  }

  public addItem() {
    this.validateForm();
    if (!this.formValid) {
      return;
    }
    // unable to send files atm
    this.adminService.addItem(this.addItItemForm).subscribe(
      (res) => {
        alert('you have added an item...');
      },
      (err) => console.log(err)
    );
  }
}
