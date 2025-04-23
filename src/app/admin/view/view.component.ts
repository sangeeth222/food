import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  ProductDetails: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const productId = Number(params['id']);
      if (productId) {
        this.getProductById(productId);
      } else {
        console.error('Invalid product ID:', params['id']);
      }
    });
  }

  getImage(image: string): string {
    return `http://localhost:8080/products/getProductImage/${image}`;
  }

  getProductById(id: number) {
    this.api.getProductById(id).subscribe(
      (response: any) => {
        this.ProductDetails = response;
        console.log('API Response:', response);
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/admin']);
  }
}
