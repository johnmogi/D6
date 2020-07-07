import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/Products-model';
import { ShopService } from 'src/app/services/shop.service';
import { store } from 'src/app/redux/store';
import { AdminService } from 'src/app/services/admin.service';
import { AuthModel } from 'src/app/models/Auth-model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styles: [],
})
export class EditItemComponent implements OnInit {
  public user = new AuthModel(); // kick out un-logged users
  public product: ProductModel = new ProductModel();
  public productID?: number;
  public name: string = '';
  public price = 0;
  public imageUrl: string = '';
  public itemDescription: string = '';
  public cats = [];
  public catID: string = '';
  public editItemForm = {
    productID: 0,
    itemName: '',
    price: 0,
    imageUrl: '',
    itemDescription: '',
    catID: 0,
  };

  constructor(
    private myActivatedRoute: ActivatedRoute,
    private shopService: ShopService,
    private adminService: AdminService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const id = +this.myActivatedRoute.snapshot.params.id;
      store.subscribe(() => {});
      // * Fetch this item details:
      this.product = await this.shopService.getOneProductAsync(id);
      this.productID = this.product[0].productID;
      this.name = this.product[0].itemName;
      this.price = +this.product[0].price;
      this.imageUrl = this.product[0].imageUrl;
      this.itemDescription = this.product[0].itemDescription;
      this.catID = this.product[0].catID;
    } catch (err) {
      alert(err.message);
    }
    this.shopService.getAllcats().subscribe(
      (res) => {
        this.cats = res;
      },
      (err) => alert(err.message)
    );
    this.user = store.getState().user;
    if (this.user === null || !this.user.isAdmin) {
      this.router.navigateByUrl('/');
    }
  }
  catch(err) {
    alert(err.message);
  }

  public editItem(id) {
    if (!this.editItemForm.itemName) {
      this.editItemForm.itemName = this.name;
    }
    if (!this.editItemForm.itemDescription) {
      this.editItemForm.itemDescription = this.itemDescription;
    }
    if (!this.editItemForm.price) {
      this.editItemForm.price = +this.price;
    }
    if (!this.editItemForm.imageUrl) {
      this.editItemForm.imageUrl = this.imageUrl;
    }

    this.editItemForm.catID = +this.catID;
    this.editItemForm.productID = +this.productID;

    console.info('id :' + JSON.stringify(this.editItemForm));

    this.adminService.editItem(this.editItemForm).subscribe(
      () => {
      },
      (err) => alert(err.message)
    );
    this.router.navigateByUrl('dashboard');
  }
}
