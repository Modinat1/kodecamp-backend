// function numFactorial(num) {
//   if (num < 0) return undefined;
//   let result = 1;
//   for (let i = 2; i <= num; i++) {
//     result *= i;
//   }
//   return result;
// }

// console.log(numFactorial(3));

// function largestNumber(arr) {
//   if (!Array.isArray(arr) || arr.length === 0) return undefined;
//   let largest = arr[0];
//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > largest) {
//       largest = arr[i];
//     }
//   }
//   return largest;
// }

// console.log(largestNumber([1, 2, 3, 4, 5, 10]));

// function consonantCount(str) {
//   const vowels = "aeiou";

//   const splitStr = str.split("");
//   const consonants = splitStr.filter(
//     (char) => !vowels.includes(char.toLowerCase()) && char.match(/[a-z]/i)
//   );
//   return consonants.length;
// }

// console.log(consonantCount("Hello World!"));

// function multiplicationTable(num) {
//   if (typeof num !== "number" || num <= 0) return undefined;
//   let table = "";
//   for (let i = 1; i <= 12; i++) {
//     table += `${num} x ${i} = ${num * i}\n`;
//   }
//   return table;
// }

// console.log(multiplicationTable(5));

// function reverseString(str, callbackFn) {
//   if (typeof str !== "string") return undefined;
//   const reversed = str.split("").reverse().join("");
//   return callbackFn(reversed);
// }

// console.log(reverseString("hello", (result) => result.toLowerCase()));

// function reverseString(str, callbackFn) {
//   if (typeof str !== "string") return undefined;
//   const reversed = str.split("").reverse().join("");
//   return callbackFn(reversed);
// }

// console.log(reverseString("hello", (result) => result));

class ProvisionStore {
  #shopName;
  #shopLocation;

  constructor(shopName, shopLocation) {
    this.#shopName = shopName;
    this.#shopLocation = shopLocation;
    this.products = [];
  }
  static validStockStatuses = ["in-stock", "low-stock", "out-of-stock"];

  addProduct(productName, cost, stockStatus) {
    if (!ProvisionStore.validStockStatuses.includes(stockStatus)) {
      throw new Error(
        `Invalid stock status. Must be one of: ${ProvisionStore.validStockStatuses.join(
          ", "
        )}`
      );
    }

    const newProduct = {
      id: Math.floor(Math.random() * 1000000),
      productName: productName,
      cost: cost,
      stockStatus: stockStatus,
      createdAt: new Date(),
    };

    this.products.push(newProduct);
  }

  getProducts() {
    return this.products;
  }

  updateProduct(id, productToUpdate) {
    const index = this.products.findIndex((item) => item.id === id);
    const { stockStatus, ...restOfUpdate } = productToUpdate;
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...restOfUpdate,
      };
    }
  }
  deleteProduct(id) {
    this.products = this.products.filter((item) => item.id !== id);
  }
}
const myStore = new ProvisionStore();

myStore.addProduct("shoes", 150, "in-stock");
myStore.addProduct("bags", 15000, "out-of-stock");
myStore.addProduct("cloths", 150, "in-stock");

const productId = myStore.products[0].id;

myStore.updateProduct(productId, {
  productName: "yam",
  cost: 500,
  stockStatus: "low-stock",
});

// myStore.deleteProduct(productId);

// console.log(myStore.products);
console.log(myStore.getProducts());
