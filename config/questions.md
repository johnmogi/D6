 public getAllProductsAsync3(): Promise<ProductModel[]> {
        return this.http.get<ProductModel[]>("http://localhost:3000/products").toPromise();
    }
    .toPromise();