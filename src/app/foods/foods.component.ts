import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { SnackbarService } from 'src/app/snackbar.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  userId: any; // Store the ID of the logged-in user
  nonVegItems: any[] = []; // Array to hold non-vegetarian products
  imagePaths: { [key: number]: string } = {}; // Object to map product IDs to image paths
  category: any; // Holds the current category from query parameters

  constructor(
    private apiService: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    // Subscribe to query parameters to react to changes
    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params['id'];
      console.log(this.category, "<========");
      this.fetchProductsByCategory(); // Fetch products when category changes
    });

    // Get user ID from local storage
    const userData = localStorage.getItem("res");
    if (userData) {
      const userItem = JSON.parse(userData);
      this.userId = userItem.id; // Ensure this is correctly set
    }
  }

  fetchProductsByCategory() {
    this.apiService.get(`/products/getByCategory/${this.category}`).subscribe((response) => {
      console.log("Fetched products successfully");
      this.nonVegItems = response; // Set the fetched products to nonVegItems

      // Fetch image paths for each product
      this.nonVegItems.forEach(product => {
        this.fetchImage(product.id);
      });
    });
  }

  fetchImage(productId: number) {
    this.apiService.get(`/products/getproductDetailsById/${productId}`).subscribe(
      (response) => {
        this.imagePaths[productId] = response.filePath; // Store the image path in the imagePaths object
      },
      (error) => {
        console.error('Error fetching image:', error);
      }
    );
  }

  addToCart(product: any) {
    if (this.userId) {
      const payload = {
        productName: product.productName,
        quantity: 1,
        price: product.price,
        image: this.imagePaths[product.id], // Use the imagePaths for the correct image
        user: { id: this.userId },
        productId: product.id
      };

      this.apiService.post("/cart", payload).subscribe((response) => {
        this.snackbarService.showSuccessMessage(response.message);
      });
    } else {
      this.router.navigate(['login']); // Redirect to login if user is not logged in
    }
  }

  buy() {
    
    console.log('User  ID:', this.userId); // Debugging line
    if (this.userId) {
      this.router.navigate(['buy']); // Navigate to buy page if user is logged in
    } else {
      console.log('Redirecting to login'); // Debugging line
      this.router.navigate(['login']); // Redirect to login if user is not logged in
    }

  }

  loadImage() {
    console.log("Image Loaded Successfully");
  }
}







