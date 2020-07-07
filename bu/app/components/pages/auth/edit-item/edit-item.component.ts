import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styles: [],
})
export class EditItemComponent implements OnInit {
  public product = new ProductModel();
  public productID?: Number;
  public name: String = '';
  public price: Number = 0;
  public imageUrl: String = '';
  public itemDescription: String = '';
  public catID: String = '';

  constructor(
    private shopService: ShopService,
    private myActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const id = +this.myActivatedRoute.snapshot.params.id;
      this.product = await this.shopService.getOneProductAsync(id);
      this.productID = this.product[0].productID;
      this.name = this.product[0].itemName;
      this.price = this.product[0].price;
      this.imageUrl = this.product[0].imageUrl;
      this.itemDescription = this.product[0].itemDescription;
      this.catID = this.product[0].catID;
    } catch (err) {
      alert(err.message);
    }
  }
}
