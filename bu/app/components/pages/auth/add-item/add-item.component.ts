import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/Products-model';
import { store } from 'src/app/redux/store';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styles: [],
})
export class AddItemComponent implements OnInit {
  public items: ProductModel[];
  public item: ProductModel = new ProductModel();

  public addForm = this.item;
  public cats = [];
  public fileToUpload: File = null;

  constructor(private router: Router, private shopService: ShopService) {}

  ngOnInit() {
    store.subscribe(() => {
      this.cats = store.getState().cats;
      console.info(this.cats);
    });
    this.cats = store.getState().cats;
  }

  public addItem() {
    console.info(this.addForm);
    if (!this.addForm.imageUrl) {
      alert('You must add an image...');
      return;
    }
    if (this.addForm.imageUrl) {
      const formData: FormData = new FormData();
      formData.append('image', this.addForm.imageUrl);

      formData.append('item', JSON.stringify(this.item));
      // console.table('@addform:'+ this.addForm);
      console.table('@addform:' + JSON.stringify(formData));

      // formData.append('fileKey', fileToUpload, fileToUpload.name);
    }

    this.shopService.addOneProductAsync(this.addForm).subscribe(
      (res) => {
        console.table('product added successfully,', res);
      },
      (err) => alert(err.message)
    );
  }
  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
}
